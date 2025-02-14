"use server";

import { Errors } from "@/classes/Errors";
import { auth } from "@/functions/auth";
import bcrypt from "bcrypt";
import { db } from "@/drizzle";
import { userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

async function updateUser(user: {
  username: string;
  email: string;
  password: string;
}) {
  const dbUser = await db.query.userTable.findFirst({
    where: eq(userTable.email, user.email),
  });

  if (!dbUser) {
    await db.insert(userTable).values(user);
  } else {
    await db.update(userTable).set(user).where(eq(userTable.email, user.email));
  }
}

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

    for (let i = 0; i < data.length; i++) {
      data[i].password = await bcrypt.hash(data[i].password, 10);
    }

    try {
      const finalPromise = [];

      for (let i = 0; i < data.length; i++) {
        finalPromise.push(updateUser(data[i]));
      }

      await Promise.all(finalPromise);

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
