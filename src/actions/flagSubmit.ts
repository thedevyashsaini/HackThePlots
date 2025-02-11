"use server"

import {db} from "@/drizzle";
import {eq} from "drizzle-orm";
import {questionTable, submissionTable} from "@/drizzle/schema";
import {Errors} from "@/classes/Errors";
import {auth} from "@/functions/auth";
import {DateTime} from 'luxon';

export async function flagSubmit(questionID: string, flag: string) {
    try {
        const payload = await auth()
        try {
            const question = await db.query.questionTable.findFirst({
                where: eq(questionTable.id, questionID)
            })

            if (!question) return Errors.NotFound("Question doesn't exist")

            if (question.flag !== flag) {
                return Errors.Unsuccessful("Wrong Answer!")
            }

            const currentTime = DateTime.now();
            const postgresTimestamp = currentTime.toISO();


            await db.transaction(async (tx) => {
                const submissionCount = await tx.$count(submissionTable, eq(submissionTable.question_id, questionID))
                await tx.insert(submissionTable).values({
                    question_id: questionID,
                    user_id: payload.id,
                    position: submissionCount + 1,
                    time: postgresTimestamp
                })
            })
            return {
                message: "Correct Answer!",
                error: false
            }
        } catch (e) {
            return Errors.DBError(e)
        }
    } catch (e) {
        return Errors.AuthError(e)
    }
}