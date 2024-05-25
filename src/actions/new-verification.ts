"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/db";

export const newVerification = async (token: string) => {
  try {
    const verificationToken = await getVerificationTokenByToken(token);
    if (!verificationToken)
      return { success: false, message: "Invalid Token!" };

    const tokenHasExpired = verificationToken.expires < new Date();

    if (tokenHasExpired)
      return { success: false, message: "Token has expired!" };

    const user = await getUserByEmail(verificationToken.email);

    if (!user) return { success: false, message: "Email does not exist!" };

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await db.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    return {
      success: true,
      message:
        "Email verified successfully! Please login with your credentials.",
    };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
};
