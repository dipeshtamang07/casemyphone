"use server";

import { auth } from "@/auth";
import { db } from "@/db";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!dbUser) {
    throw new Error("Unauthorized");
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: dbUser.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) throw new Error("Order Not Found");

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
