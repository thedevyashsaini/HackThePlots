
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { questionTable } from "@/drizzle/schema";
import FlagForm from "@/components/FlagForm";
import { Label } from "@/components/ui/label";
import { auth } from "@/functions/auth";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { Question } from "@/types/General";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input_2";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { flagSubmit } from "@/actions/flagSubmit";

export default async function Question({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  const no = (await params).no;
  const payload = await auth();

  const question = await db.query.questionTable.findFirst({
    where: eq(questionTable.no, parseInt(no)),
    with: {
      assets: true,
    },
  });

  if (!question) return <h1>It don't exist homedawg.</h1>;

  return (
    <>
      <div className="hidden md:block w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={25} defaultSize={50}>
            {/* {questionPanel(question)} */}
            <Component type={true} question={question}/>
          </ResizablePanel>
          <ResizableHandle withHandle />
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
            return <img key={asset.id} src={asset.url} alt={asset.name} />;
          }
        })}
      </CardContent>
    </Card>
  );
};

const Component = (props: {type: boolean, question: Question}) => {
  return (
    <div className={`flex flex-col ${props.type ? "h-full" : "h-[60%]"} bg-black border border-zinc-800 rounded-lg text-white`}>
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white opacity-75">{props.question.no}.</span>
          <h1 className="text-xl font-semibold">{props.question.title}</h1>
        </div>
        <div className="mt-1 text-sm text-zinc-400">
          Points: <span className="text-[#8b5cf6]">{props.question.score}</span>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">

        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-800 mt-auto">
        <FlagForm type={props.type} question={props.question}/>
      </div>
    </div>
  );
};
