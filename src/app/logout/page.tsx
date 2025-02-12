'use server'
import { signout } from "@/actions/signout";
import { redirect } from 'next/navigation'

export default async function Logout() {
  const response = await signout();

  if (response.error) {
    console.error(response.message);
    return redirect("/questions");
  }

  redirect("/");
}
