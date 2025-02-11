"use client"

import {signIn} from "@/actions/signin";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()

    return (
        <form action={async (formData) => {
            const email = formData.get("email")?.toString()
            const password = formData.get("password")?.toString()

            if (!email || !password) {
                return alert("Please enter email and password")
            }

            const response = await signIn(email, password)

            if (response.error) {
                return alert(response.message)
            }

            router.push("/questions")
        }}>
            <Input name={"email"} type="email" placeholder="Email"/>
            <Input name={"password"} type="password" placeholder="Password"/>
            <Button type="submit">Sign In</Button>
        </form>
    )
}
