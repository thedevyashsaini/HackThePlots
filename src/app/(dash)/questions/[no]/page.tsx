import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {db} from "@/drizzle";
import {eq} from "drizzle-orm";
import {questionTable, userTable} from "@/drizzle/schema";
import FlagForm from "@/components/FlagForm";
import {Label} from "@/components/ui/label";
import {auth} from "@/functions/auth";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import type {Question} from "@/types/General";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input_2";
import {HoverBorderGradient} from "@/components/ui/hover-border-gradient";
import {flagSubmit} from "@/actions/flagSubmit";

export default async function Question({
                                           params,
                                       }: {
    params: Promise<{ no: string }>;
}) {
    const no = (await params).no;
    const payload = await auth();

    const user = await db.query.userTable.findFirst({
        where: eq(userTable.id, payload.id),
    })

    const question = await db.query.questionTable.findFirst({
        where: eq(questionTable.no, parseInt(no)),
        with: {
            assets: true,
        },
    });

    if (!user) return <h1>It don't exist homedawg</h1>;
    if (!question) return <h1>It don't exist homedawg</h1>;
    if (user.progress < question.no + 1) {
        return <h1>Nuh uh, you can't see that homedawg</h1>;
    }

    return (
        <>
            <div className="hidden md:block">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel minSize={25} defaultSize={50}>
                        {/* {questionPanel(question)} */}
                        <Component type={true} question={question}/>
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel minSize={25} defaultSize={50}>
                        {assetsPanel(question)}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <div className="md:hidden h-full">
                {/* {questionPanel(question)} */}
                <Component type={false} question={question}/>
                {assetsPanel(question)}
            </div>
        </>
    );
}


const assetsPanel = (question: Question) => {
    return (
        <Card className="min-h-[50%] h-fit md:h-full">
            <CardHeader>
                <CardTitle>Assets</CardTitle>
            </CardHeader>
            <CardContent>
                {question.assets?.map((asset) => {
                    if (asset.type == "image" && asset.downloadable) {
                        return <img key={asset.id} src={asset.url} alt={asset.name}/>;
                    }
                })}
            </CardContent>
        </Card>
    );
};

const Component = (props: { type: boolean, question: Question }) => {
    return (
        <div
            className={`flex flex-col ${props.type ? "h-full" : "h-[60%]"} bg-black border border-zinc-800 rounded-lg text-white`}>
            <div className="p-4 border-b border-zinc-800">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white opacity-75">1.</span>
                    <h1 className="text-xl font-semibold">An Elusive Memory</h1>
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                    Points: <span className="text-[#8b5cf6]">10</span>
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                        Your challenge description and content goes here. This area is
                        scrollable when the content overflows.
                    </p>
                    {/* Add more content as needed */}
                    <div className="space-y-2">
                        <p className="text-sm text-zinc-300">
                            Additional challenge details can go here.
                        </p>
                        <p className="text-sm text-zinc-300">
                            You can add multiple paragraphs of information.
                        </p>
                        <p className="text-sm text-zinc-300">
                            The content will scroll while keeping the header and footer fixed.
                        </p>
                    </div>
                </div>
            </ScrollArea>
            <div className="p-4 border-t border-zinc-800 mt-auto">
                <FlagForm type={props.type} question={props.question}/>
            </div>
        </div>
    );
};
