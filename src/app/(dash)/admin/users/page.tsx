"use client";

import { Button } from "@/components/ui/button";
import { signup } from "@/actions/signup";
import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<
    { username: string; password: string; email: string }[]
  >([]);
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(",").map((h) => h.trim());

    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
    });

    let newData: { username: string; password: string; email: string }[] = [];

    for (let i = 0; i < data.length; i++) {
      newData.push({
        username: data[i]["Team Name"],
        password: data[i]["Team ID"],
        email: data[i]["Candidate's Email"],
      });
    }

    console.log(data, newData);
    setUsers(newData);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileSelect} />;
      <Button
        onClick={async (e) => {
          const smth = await signup(users);

          console.log(smth);
        }}
      >
        Upload Users
      </Button>
    </div>
  );
}
