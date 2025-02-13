"use server";

import { Errors } from "@/classes/Errors";
import { auth } from "@/functions/auth";
import bcrypt from "bcrypt";
import { db } from "@/drizzle";
import { userTable } from "@/drizzle/schema";

export async function signup(
  data: {
    username: string;
    email: string;
    password: string;
  }[],
) {
  try {
    const payload = await auth();
    if (payload.role !== "admin") {
      return Errors.AuthError("You are not authorized to perform this action");
    }

    data.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    });

    for (let i = 0; i < data.length; i++) {
      data[i].password = await bcrypt.hash(data[i].password, 10);
    }

    console.log(data);

    try {
      await db.insert(userTable).values(data);

      return {
        message: "Sign up successful",
        error: false,
      };
    } catch (e) {
      return Errors.DBError(e);
    }
  } catch (e) {
    return Errors.AuthError(e);
  }
}
