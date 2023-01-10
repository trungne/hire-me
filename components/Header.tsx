import { Button, Header } from "@mantine/core";
import { memo, useCallback } from "react";
import { User, Home } from "tabler-icons-react";
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
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Button>
            <Home />
          </Button>
        </Link>
        {fbUser && (
          <Link href="/user">
            <Button>
              <User />
            </Button>
          </Link>
        )}
      </div>

      <div className="flex ">
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
