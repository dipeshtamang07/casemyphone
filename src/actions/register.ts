"use server";

import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { generateVerificationToken } from "./verification-token";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(data);
    if (!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }

    const { name, email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return { success: false, message: "Email already in use!" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    // TODO: SEND Verification EMAIL

    return { success: true, message: "Verification email sent!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
