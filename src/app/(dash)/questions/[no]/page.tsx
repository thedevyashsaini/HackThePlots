import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { questionTable, transcriptTable, userTable } from "@/drizzle/schema";
import FlagForm from "@/components/FlagForm";
import { auth } from "@/functions/auth";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { Question } from "@/types/General";
import { ScrollArea } from "@/components/ui/scroll-area";
import AudioCaptionPlayer from "@/components/AudioCaptionPlayer";

export default async function Question({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  const no = (await params).no;
  const payload = await auth();

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, payload.id),
  });

  const question = await db.query.questionTable.findFirst({
    where: eq(questionTable.no, parseInt(no)),
    with: {
      assets: {
        with: {
          transcript: {
            columns: {
              audio_id: true,
              transcript_id: true,
            },
          },
        },
      },
    },
  });

  console.log(question);

  if (!user) return <h1>It don't exist homedawg</h1>;
  if (!question) return <h1>It don't exist homedawg</h1>;
  if (user.progress < question.no) {
    return <h1>Nuh uh, you can't see that homedawg</h1>;
  }

  return (
    <>
      <div className="hidden md:block w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={25} defaultSize={50}>
            <QuestionPanel
              type={true}
              question={question}
              attempt={user.progress == question.no}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={25} defaultSize={50}>
            {assetsPanel(question)}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="md:hidden h-full">
        <QuestionPanel
          type={false}
          question={question}
          attempt={user.progress == question.no}
        />
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

const QuestionPanel = (props: {
  type: boolean;
  question: Question;
  attempt: boolean;
}) => {
  return (
    <div
      className={`flex flex-col ${
        props.type ? "h-full" : "min-h-[60%] max-h-[80%]"
      } bg-black border border-zinc-800 rounded-lg text-white`}
    >
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white opacity-75">
            {props.question.no}.
          </span>
          <h1 className="text-xl font-semibold">{props.question.title}</h1>
        </div>
        <div className="mt-1 text-sm text-zinc-400">
          Points: <span className="text-[#8b5cf6]">{props.question.score}</span>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {props.question.assets?.map(async (asset) => {
            if (
              asset.type == "audio" &&
              !asset.downloadable &&
              asset.transcript
            ) {
              const transcript = await db.query.transcriptTable.findFirst({
                where: eq(transcriptTable.audio_id, asset.transcript.audio_id),
                with: {
                  audio: {
                    columns: {
                      url: true,
                    },
                  },
                  transcript: {
                    columns: {
                      url: true,
                    },
                  },
                },
              });
              if (!transcript) return null;
              return (
                <AudioCaptionPlayer
                  key={asset.id}
                  srt_url={transcript.transcript.url}
                  audio_url={transcript.audio.url}
                  questionNumber={props.question.no.toString()}
                />
              );
            }
          })}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-800 mt-auto">
        {props.attempt && (
          <FlagForm type={props.type} question={props.question} />
        )}
      </div>
    </div>
  );
};
