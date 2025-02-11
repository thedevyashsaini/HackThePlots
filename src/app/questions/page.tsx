import {db} from "@/drizzle";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {asc, eq} from "drizzle-orm";
import {questionTable, submissionTable} from "@/drizzle/schema";
import {auth} from "@/functions/auth";


export default async function Questions() {
    const payload = await auth()
    const questions = await db.query.questionTable.findMany({
        orderBy: [asc(questionTable.no)]
    })
    const completed = await db.query.submissionTable.findMany({
        where: eq(submissionTable.user_id, payload.id),
        with: {
            question: true
        },
        orderBy: [asc(submissionTable.position)]
    })

    return (
        <>
            {
                questions.map((question) => {
                    // Completed question
                    if (completed.some(submission => submission.question_id === question.id)) {
                        return (
                            <Card key={question.id}>
                                <CardHeader>
                                    <CardDescription>{question.no}</CardDescription>
                                    <CardTitle>{question.title}</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    {question.score}
                                </CardFooter>
                            </Card>
                        )
                    }
                })
            }
        </>
    )
}