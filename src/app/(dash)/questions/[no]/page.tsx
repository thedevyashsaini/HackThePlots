import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import {
  assetTable,
  questionTable,
  transcriptTable,
  userTable,
} from "@/drizzle/schema";
import { auth } from "@/functions/auth";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { Question } from "@/types/General";
import { assetsPanel, QuestionPanel } from "@/components/question-no";

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

  const question = await db
    .select()
    .from(questionTable)
    .where(eq(questionTable.no, parseInt(no)))
    .leftJoin(assetTable, eq(questionTable.id, assetTable.question_id))
    .leftJoin(transcriptTable, eq(assetTable.id, transcriptTable.audio_id))
    .execute()
    .then((rows) => {
      // Group the results to reconstruct the nested structure
      if (rows.length === 0) return null;

      const questionData = rows[0].questions;
      const assets = rows
        .filter((row) => row.asset !== null)
        .map((row) => {
          if (!row.asset?.type) {
            console.warn(`Missing type for asset: ${row.asset?.id}`);
            // Provide a default type or skip this asset
            return null;
          }
          return {
            ...row.asset,
            // Ensure required properties are present
            id: row.asset.id,
            url: row.asset.url || "",
            name: row.asset.name || "",
            question_id: row.asset.question_id,
            type: row.asset.type,
            downloadable: row.asset.downloadable ?? false,
            transcript: row.transcript
              ? {
                  audio_id: row.transcript.audio_id,
                  transcript_id: row.transcript.transcript_id,
                }
              : undefined,
          };
        })
        .filter(Boolean) as NonNullable<Question["assets"]>;

      return {
        ...questionData,
        assets: assets,
      };
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
