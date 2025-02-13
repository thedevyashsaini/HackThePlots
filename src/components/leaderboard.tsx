"use client";
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

export function Leaderboard(props: { teams: any[] }) {
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
        {props.teams.slice(0, 10).map((team, index) => (
          <TableRow key={team.id} className="mb-4">
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell title={team.username}>
              {team.username.slice(0, 12)}
            </TableCell>
            <TableCell>{team.progress - 1}</TableCell>
            <TableCell className="text-right">{team.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>52</TableCell>
          <TableCell>team 69</TableCell>
          <TableCell>-2</TableCell>
          <TableCell className="text-right">10</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
