"use client";

import { Button } from "@/components/ui/button";
import { signup } from "@/actions/signup";

export default function Users() {
  return (
    <div>
      <Button
        onClick={async (e) => {
          const smth = await signup([
            {
              username: "test",
              email: "newTest@gmail.com",
              password: "123",
            },
            {
              username: "test2",
              email: "newTest1@gmail.com",
              password: "123",
            },
          ]);

          console.log(smth);
        }}
      >
        Upload Users
      </Button>
    </div>
  );
}
