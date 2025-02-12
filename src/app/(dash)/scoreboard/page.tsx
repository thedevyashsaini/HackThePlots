'use client'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, ResponsiveContainer, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const teams = [
  {
    id: 1,
    rank: 1,
    username: "Team 1",
    progress: 1,
    score: 100,
  },
  {
    id: 2,
    rank: 2,
    username: "Team 2",
    progress: 2,
    score: 200,
  },
  {
    id: 3,
    rank: 3,
    username: "Team 3",
    progress: 3,
    score: 300,
  },
  {
    id: 4,
    rank: 4,
    username: "Team 4",
    progress: 4,
    score: 400,
  },
  {
    id: 5,
    rank: 5,
    username: "Team 5",
    progress: 5,
    score: 500,
  },
  {
    id: 6,
    rank: 6,
    username: "Team 6",
    progress: 6,
    score: 600,
  },
  {
    id: 7,
    rank: 7,
    username: "Team 7",
    progress: 7,
    score: 700,
  },
  {
    id: 8,
    rank: 8,
    username: "Team 8",
    progress: 8,
    score: 800,
  },
  {
    id: 9,
    rank: 9,
    username: "Team 9",
    progress: 9,
    score: 900,
  },
  {
    id: 10,
    rank: 10,
    username: "Team 10",
    progress: 10,
    score: 1000,
  },
];

const chartData = [
    { time: '00:00', Team1: 100, Team2: 80, Team3: 90, Team4: 70, Team5: 85, Team6: 95, Team7: 75, Team8: 88, Team9: 92, Team10: 78 },
    { time: '01:00', Team1: 120, Team2: 100, Team3: 110, Team4: 90, Team5: 105, Team6: 115, Team7: 95, Team8: 108, Team9: 112, Team10: 98 },
    { time: '02:00', Team1: 14, Team2: 12, Team3: 130, Team4: 110, Team5: 125, Team6: 135, Team7: 115, Team8: 128, Team9: 132, Team10: 118 },
    { time: '03:00', Team1: 160, Team2: 140, Team3: 150, Team4: 130, Team5: 145, Team6: 155, Team7: 135, Team8: 148, Team9: 152, Team10: 138 },
    { time: '04:00', Team1: 180, Team2: 160, Team3: 170, Team4: 150, Team5: 165, Team6: 175, Team7: 155, Team8: 168, Team9: 172, Team10: 158 },
  ]

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
    '#F06292', '#AED581', '#7986CB', '#4DB6AC', '#FFD54F'
  ]

const scoreboard = () => {

    const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any[], label: string }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-gray-800 border border-gray-700 p-2 rounded">
              <p className="text-green-400">{`Time: ${label}`}</p>
              {payload.map((entry, index) => (
                <p key={index} style={{ color: entry.color }}>
                  {`${entry.name}: ${entry.value}`}
                </p>
              ))}
            </div>
          );
        }
        return null;
      };

  return (
    <div className="min-h-screen h-fit w-screen bg-black rounded-md text-gray-200 p-8">
      <TextGenerateEffect words="Scorecard" />
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-4">
         <div className="h-full w-full rounded-xl border border-zinc-800 p-4">
            <h3 className="text-xl font-bold text-white m-2 mb-8">Progression</h3>
            <div className="w-full h-[500px] p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
                <Legend />
                {Object.keys(chartData[0]).filter(key => key !== 'time').map((team, index) => (
                  <Line 
                    key={team} 
                    type="monotone" 
                    dataKey={team} 
                    stroke={colors[index]} 
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
                {Object.keys(chartData[0]).filter(key => key !== 'time').map((team, index) => (
                  <Scatter 
                    key={`scatter-${team}`} 
                    //@ts-ignore
                    data={chartData.filter(entry => entry[team] % 20 === 0)} 
                    fill={colors[index]} 
                    name={`${team} Solved`}
                  >
                    {chartData.map((entry, i) => (
                      <Scatter key={i} dataKey={team} fill={colors[index]} />
                    ))}
                  </Scatter>
                ))}
              </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
        <div className="h-full w-full rounded-xl border border-zinc-800 p-4">
            <h3 className="text-xl font-bold text-white m-2 mb-4">Leaderboard</h3>
            <div className="w-full h-full p-2">
            <TableDemo />
            </div>
        </div>
       

      </div>
    </div>
  );
};

export function TableDemo() {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Team Name</TableHead>
          <TableHead>Ques</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-full">
        {teams.map((team) => (
          <TableRow key={team.id} className="mb-4">
            <TableCell className="font-medium">{team.rank}</TableCell>
            <TableCell title={team.username}>{team.username.slice(0,12)}</TableCell>
            <TableCell>{team.progress - 1}</TableCell>
            <TableCell className="text-right">{team.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
          <TableRow>
            <TableCell >52</TableCell>
            <TableCell>team 69</TableCell>
            <TableCell>-2</TableCell>
            <TableCell className="text-right">10</TableCell>
          </TableRow>
        </TableFooter>
    </Table>
  );
}

export default scoreboard;
