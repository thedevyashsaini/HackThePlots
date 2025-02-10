import {pgTable, text, uuid, bigint, timestamp, boolean} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').unique(),
    email: text("email").unique(),
    password: text("password"),
    role: text("role", {enum: ["participant", "admin"]})
}).enableRLS();

export const userRelations = relations(users, ({many}) => ({
    submissions: many(submissions)
}))

export const questions = pgTable("questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    no: bigint("no", {mode: "number"}),
    title: text("title"),
    question: text("question"),
    flag: text("flag"),
    score: bigint("score", {mode: "number"})
}).enableRLS()

export const questionRelations = relations(questions, ({many}) => ({
    submissions: many(submissions),
    assets: many(assets)
}))

export const submissions = pgTable("submission", {
    id: uuid("id").defaultRandom().primaryKey(),
    question_id: uuid("question_id").references(() => questions.id),
    user_id: uuid("user_id").references(() => users.id),
    position: bigint("position", {mode: "number"}),
    time: timestamp("time", {mode: "date"})
}).enableRLS()

export const submissionRelations = relations(submissions, ({one, many}) => ({
    question: one(questions, {
        fields: [submissions.question_id],
        references: [questions.id]
    }),
    user: one(users, {
        fields: [submissions.user_id],
        references: [users.id]
    }),
    assets: many(assets)
}))

export const assets = pgTable("asset", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    question_id: uuid("question_id").references(() => questions.id),
    url: text("url"),
    type: text("type", {enum: ["image", "video", "audio"]}),
    downloadable: boolean("downloadable")
}).enableRLS()

export const assetRelations = relations(assets, ({one}) => ({
    question: one(questions, {
        fields: [assets.question_id],
        references: [questions.id]
    })
}))