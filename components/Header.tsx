import { Button, Header } from "@mantine/core";
import { memo, useCallback } from "react";
import { loginWithPopup, logout } from "shared/fb";
import { useAtom } from "jotai";
import { firebaseUserAtom } from "shared/atoms";
import Link from "next/link";

const HEADER_HEIGHT = 64;
const CustomHeader = () => {
  const [fbUser] = useAtom(firebaseUserAtom);

  const login = useCallback(async () => {
    try {
      await loginWithPopup();
    } catch (e: unknown) {
      console.error(e);
    }
  }, []);

  return (
    <Header
      className="flex justify-between items-center p-4"
      height={HEADER_HEIGHT}
    >
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-writing-sign"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" />
          <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
          <path d="M16 7h4" />
        </svg>
      </Link>

      <div>
        <Button
          color={fbUser ? "gray" : "green"}
          onClick={() => {
            if (fbUser) {
              logout();
            } else {
              login();
            }
          }}
        >
          {fbUser ? "Logout" : "Login"}
        </Button>
      </div>
    </Header>
  );
};

const MemoHeader = memo(CustomHeader);
export { MemoHeader as Header, HEADER_HEIGHT };
