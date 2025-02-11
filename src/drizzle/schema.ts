import {pgTable, text, uuid, bigint, timestamp, boolean, uniqueIndex, unique} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const userTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').unique().notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    role: text("role", {enum: ["participant", "admin"]}).notNull()
}).enableRLS();

export const userRelations = relations(userTable, ({many}) => ({
    submissions: many(submissionTable)
}))

export const questionTable = pgTable("questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    no: bigint("no", {mode: "number"}).unique().notNull(),
    title: text("title").notNull(),
    question: text("question"),
    flag: text("flag"),
    score: bigint("score", {mode: "number"}).notNull()
}).enableRLS()

export const questionRelations = relations(questionTable, ({many}) => ({
    submissions: many(submissionTable),
    assets: many(assetTable)
}))

export const submissionTable = pgTable("submission", {
    id: uuid("id").defaultRandom().primaryKey(),
    question_id: uuid("question_id").references(() => questionTable.id).notNull(),
    user_id: uuid("user_id").references(() => userTable.id).notNull(),
    position: bigint("position", {mode: "number"}).notNull(),
    time: timestamp({withTimezone: true, mode: 'string'}).notNull(),
}, (t) => ({
    first: unique('custom_name').on(t.question_id, t.user_id).nullsNotDistinct()
})).enableRLS()

export const submissionRelations = relations(submissionTable, ({one, many}) => ({
    question: one(questionTable, {
        fields: [submissionTable.question_id],
        references: [questionTable.id]
    }),
    user: one(userTable, {
        fields: [submissionTable.user_id],
        references: [userTable.id]
    }),
    assets: many(assetTable)
}))

export const assetTable = pgTable("asset", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    question_id: uuid("question_id").references(() => questionTable.id).notNull(),
    url: text("url").notNull(),
    type: text("type", {enum: ["image", "video", "audio"]}).notNull(),
    downloadable: boolean("downloadable").notNull()
}).enableRLS()

export const assetRelations = relations(assetTable, ({one}) => ({
    question: one(questionTable, {
        fields: [assetTable.question_id],
        references: [questionTable.id]
    })
}))