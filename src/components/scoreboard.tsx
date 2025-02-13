"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Progression from "@/components/progression";
import { Leaderboard } from "@/components/leaderboard";
import prepareChartData from "@/functions/prepareChartData";
import { Question, submission } from "@/types/General";

// const chartData = [
//   {
//     time: "00:00",
//     Team1: 100,
//     Team2: 80,
//     Team3: 90,
//     Team4: 70,
//     Team5: 85,
//     Team6: 95,
//     Team7: 75,
//     Team8: 88,
//     Team9: 92,
//     Team10: 78,
//   },
//   {
//     time: "01:00",
//     Team1: 120,
//     Team2: 100,
//     Team3: 110,
//     Team4: 90,
//     Team5: 105,
//     Team6: 115,
//     Team7: 95,
//     Team8: 108,
//     Team9: 112,
//     Team10: 98,
//   },
//   {
//     time: "02:00",
//     Team1: 14,
//     Team2: 12,
//     Team3: 130,
//     Team4: 110,
//     Team5: 125,
//     Team6: 135,
//     Team7: 115,
//     Team8: 128,
//     Team9: 132,
//     Team10: 118,
//   },
//   {
//     time: "03:00",
//     Team1: 160,
//     Team2: 140,
//     Team3: 150,
//     Team4: 130,
//     Team5: 145,
//     Team6: 155,
//     Team7: 135,
//     Team8: 148,
//     Team9: 152,
//     Team10: 138,
//   },
//   {
//     time: "04:00",
//     Team1: 180,
//     Team2: 160,
//     Team3: 170,
//     Team4: 150,
//     Team5: 165,
//     Team6: 175,
//     Team7: 155,
//     Team8: 168,
//     Team9: 172,
//     Team10: 158,
//   },
// ];

interface Teams {
  score: number;
  progress: number;
  id: string;
  username: string;
  email: string;
  password: string;
  role: "participant" | "admin";
}

interface QuestionWithSubmissions extends Question {
  submissions: number;
}

const scoreboard = (props: {
  teams: Teams[];
  submissions: submission[];
  questionsWithSubmissions: QuestionWithSubmissions[];
}) => {
  const chartData = prepareChartData(
    props.teams,
    props.submissions,
    props.questionsWithSubmissions,
  );

  return (
    <div className="min-h-screen h-screen w-screen overflow-auto bg-black rounded-md text-gray-200 p-8">
      <TextGenerateEffect words="Scorecard" />
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-4">
        <div className="h-full w-full rounded-xl border border-zinc-800 p-4">
          <h3 className="text-xl font-bold text-white m-2 mb-8">Progression</h3>
          <div className="w-full h-[500px] p-2">
            <Progression chartData={chartData} />
          </div>
        </div>
        <div className="h-full w-full rounded-xl border border-zinc-800 p-4">
          <h3 className="text-xl font-bold text-white m-2 mb-4">Leaderboard</h3>
          <div className="w-full h-full p-2">
            <Leaderboard teams={props.teams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default scoreboard;
