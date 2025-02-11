"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {flagSubmit} from "@/actions/flagSubmit";

export default function FlagForm({questionID}: { questionID: string }) {
    return (
        <form action={async (formData) => {
            let flag = formData.get("flag")?.toString()
            if (!flag) return alert("Enter a flag u moron")

            const submission = await flagSubmit(questionID, flag)

            if (submission.error) alert(submission.message)

            alert(submission.message)
        }}>
            <Input name={"flag"} placeholder={"flag"}/>
            <Button type={"submit"}>Submit</Button>
        </form>
    )
}