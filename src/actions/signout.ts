"use server"

import {Errors} from "@/classes/Errors";
import {cookies} from "next/headers";

export async function signout() {
    try {
        (await cookies()).delete("access_token")

        return {
            message: "Logout in successful",
            error: false,
        }
    } catch (e) {
        return Errors.Unsuccessful("Logout unsuccessful " + e)
    }
}