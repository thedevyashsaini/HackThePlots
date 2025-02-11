import {db} from "@/drizzle";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {asc, eq} from "drizzle-orm";
import {questionTable, submissionTable} from "@/drizzle/schema";
import {auth} from "@/functions/auth";


export default async function Questions() {
    const payload = await auth()
    const [questions, completed] = await Promise.all(
        [
            db.query.questionTable.findMany({
                orderBy: [asc(questionTable.no)]
            }),
            db.query.submissionTable.findMany({
                where: eq(submissionTable.user_id, payload.id),
                with: {
                    question: true
                }
            })
        ]
    )
    let flag = false;

    return (
        <>
            {
                // I THINK this will differentiate between completed, next and incomplete questions????
                questions.map((question) => {
                    // Completed question
                    if (completed.some(submission => submission.question_id === question.id)) {
                        return (
                            <Link href={`/questions/${question.no}`} key={question.id}>
                                <Card key={question.id}>
                                    <CardHeader>
                                        <CardDescription>{question.no}</CardDescription>
                                        <CardTitle>{question.title}</CardTitle>
                                    </CardHeader>
                                    <CardFooter>
                                        {question.score}
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    } else if (!flag) {
                        flag = true
                        return (
                            <Link href={`/questions/${question.no}`} key={question.id}>
                                <Card key={question.id}>
                                    <CardHeader>
                                        <CardDescription>{question.no}</CardDescription>
                                        <CardTitle>{question.title}</CardTitle>
                                    </CardHeader>
                                    <CardFooter>
                                        {question.score}
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    } else {
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