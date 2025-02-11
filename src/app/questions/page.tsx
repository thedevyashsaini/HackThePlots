import {db} from "@/drizzle";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {asc} from "drizzle-orm";
import {questionTable} from "@/drizzle/schema";


export default async function Questions() {
    const questions = await db.query.questionTable.findMany({
        orderBy: [asc(questionTable.no)]
    })

    return (
        <>
            {
                questions.map((question) => {
                    return (
                        <Link key={question.id} href={`/questions/${question.no}`}>
                            <Card>
                                <CardHeader>
                                    <CardDescription>{question.no}</CardDescription>
                                    <CardTitle>{question.title}</CardTitle>
                                </CardHeader>
                                <CardFooter>{question.score}</CardFooter>
                            </Card>
                        </Link>
                    )
                })
            }
        </>
    )
}