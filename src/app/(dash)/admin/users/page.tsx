"use client";

import { Button } from "@/components/ui/button";
import { signup } from "@/actions/signup";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Users() {
  const [users, setUsers] = useState<
    { username: string; password: string; email: string }[]
  >([]);
  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
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
    <div className="min-h-screen h-screen w-screen overflow-auto bg-black rounded-md text-gray-200 p-8">
      <FileUpload onChange={handleFileSelect} />
      <div className="w-full flex flex-row justify-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="bg-black text-black dark:text-white flex items-center space-x-4 px-8 sm:w-full"
          typeof="submit"
        >
          <span
            className="w-full bg-black hover:bg-black text-sm text-white"
            onClick={async (e) => {
              const smth = await signup(users);

              console.log(smth);
            }}
          >
            Create Users
          </span>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
