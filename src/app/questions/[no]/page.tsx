import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {db} from "@/drizzle";
import {eq} from "drizzle-orm";
import {questionTable} from "@/drizzle/schema";
import FlagForm from "@/components/FlagForm";
import {Label} from "@/components/ui/label";

export default async function Question({params}: { params: Promise<{ no: string }> }) {
    const no = (await params).no;
    console.log(no)
    let question = await db.query.questionTable.findFirst({
        where: eq(questionTable.no, parseInt(no)),
        with: {
            assets: true
        }
    })

    if (!question) return <h1>It don't exist homedawg</h1>;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardDescription>{question.no}</CardDescription>
                    <CardTitle>{question.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>
                        {
                            question.question ? (
                                question.question
                            ) : null
                        }
                    </Label>

                    <FlagForm questionID={question.id}/>
                </CardContent>
                <CardFooter>
                    {question.score}
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        question.assets.map((asset) => {
                            if (asset.type == "image" && asset.downloadable) {
                                return (
                                    <img key={asset.id} src={asset.url} alt={asset.name}/>
                                )
                            }
                        })
                    }
                </CardContent>
            </Card>
        </>
    );
}