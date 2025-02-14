import Scoreboard from "@/components/scoreboard";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { db } from "@/drizzle";
import { questionTable } from "@/drizzle/schema";
import calculateScore from "@/functions/individualScore";

const ScoreboardPage = async () => {
  const [questions, submissions, users] = await Promise.all([
    db.query.questionTable.findMany({
      columns: {
        flag: false
      }
    }),
    db.query.submissionTable.findMany({}),
    db.query.userTable.findMany({
      columns: {
        password: false
      }
    }),
  ]);

  const questionsWithSubmissions = questions.map((question) => {
    const questionSubmissions = submissions.filter(
      (submission) => submission.question_id === question.id,
    );
    return {
      ...question,
      submissions: questionSubmissions.length,
    };
  });

  console.log(users);
  console.log(questionsWithSubmissions);

  const teams = users
    .map((user) => {
      const userSubmissions = submissions.filter(
        (submission) => submission.user_id === user.id,
      );
      let userScore = 0;
      for (let i = 1; i < user.progress; i++) {
        const question = questionsWithSubmissions.filter(
          (question) => question.no === i,
        )[0];
        console.log(question);
        const submission = userSubmissions.filter(
          (submission) => submission.question_id === question.id,
        )[0];
        const score: number = calculateScore(
          question.score,
          submission.position,
          question.submissions,
        );
        userScore += score;
      }
      return {
        ...user,
        score: userScore,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <BackgroundBeamsWithCollision>
      <Scoreboard
        teams={teams}
        submissions={submissions}
        questionsWithSubmissions={questionsWithSubmissions}
      />
    </BackgroundBeamsWithCollision>
  );
};

export default ScoreboardPage;
