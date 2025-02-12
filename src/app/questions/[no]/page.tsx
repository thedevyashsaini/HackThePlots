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
import { question } from "@/types/General";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input_2";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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

  if (!question) return <h1>It don't exist homedawg</h1>;

  return (
    <>
      <div className="hidden md:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={25} defaultSize={50}>
            {/* {questionPanel(question)} */}
            <Component />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={25} defaultSize={50}>
            {assetsPanel(question)}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="md:hidden h-full">
        {questionPanel(question)}
        {assetsPanel(question)}
      </div>
    </>
  );
}

const questionPanel = (question: question) => {
  return (
    <Card className="h-fit min-h-[50%] md:h-full">
      <CardHeader>
        <CardDescription className="text-5xl font-bold text-white opacity-50">
          {question.no}.
        </CardDescription>
        <CardTitle className="">{question.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>{question.question ? question.question : null}</Label>

        <FlagForm questionID={question.id} />
      </CardContent>
      <CardFooter>{question.score}</CardFooter>
    </Card>
  );
};

const assetsPanel = (question: question) => {
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

const Component = () => {
  return (
    <div className="flex flex-col h-full min-h-[600px] bg-black border border-zinc-800 rounded-lg text-white">
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
        <form className="flex gap-2">
          <Input
            type="text"
            placeholder="flag{...}"
            className="flex-1 !bg-black border-zinc-700 text-white rounded-full placeholder-zinc-500"
            name="flag"
          />
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-black text-black dark:text-white flex items-center space-x-4 px-8 sm:w-full"
            typeof="submit"
          >
            <span className="w-full bg-black hover:bg-black text-white">
              Submit
            </span>
          </HoverBorderGradient>
        </form>
      </div>
    </div>
  );
};
