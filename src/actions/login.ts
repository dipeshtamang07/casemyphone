"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { generateVerificationToken } from "./verification-token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success)
      return { success: false, message: "Invalid login fields!" };

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user || !user.password) {
      return { success: false, message: "Email does not exist!" };
    }

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(user.email);

      // TODO: SEND EMAIL

      return {
        success: true,
        message: "Email verification needed! Please check your email.",
      };
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch)
      return { success: false, message: "Invalid credentials!" };

    try {
      await signIn("credentials", {
        email,
        password
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { success: false, message: "Invalid credentials!" };
          default:
            return { success: false, message: "Something went wrong!" };
        }
      }
    }

    return { success: true, message: "Login Successful!" };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
};
