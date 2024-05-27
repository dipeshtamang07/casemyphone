import { Resend } from "resend";
import VerificationEmail from "@/components/email/VerificationEmail";
import { ShippingAddress } from "@prisma/client";
import OrderReceivedEmail from "@/components/email/OrderReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: VerificationEmail({ verificationLink: confirmationLink }),
  });
};

export const sendOrderReceivedEmail = async (
  email: string,
  orderId: string,
  orderDate: string,
  shippingAddress: ShippingAddress
) => {
  await resend.emails.send({
    from: "CaseMyPhone <onboarding@resend.dev>",
    to: email,
    subject: "Thanks for your order!",
    react: OrderReceivedEmail({
      orderId,
      orderDate,
      // @ts-ignore
      shippingAddress: shippingAddress,
    }),
  });
};
