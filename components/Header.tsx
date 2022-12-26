import { Button, Header, CopyButton } from "@mantine/core";
import { memo, useCallback } from "react";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { firebaseAuth } from "shared/fb";
import { FirebaseError } from "firebase/app";
import { useAtom } from "jotai";
import { idTokenAtom } from "shared/atoms";
const provider = new GoogleAuthProvider();

const HEADER_HEIGHT = 64;
const CustomHeader = () => {
  const [idToken, setIdToken] = useAtom(idTokenAtom);
  const login = useCallback(async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      const idToken = await result.user.getIdToken();

      // TODO: call login api and set access token here
      setIdToken(idToken);
    } catch (e: unknown) {
      console.error(e);
    }
  }, []);

  const logout = useCallback(() => {
    signOut(firebaseAuth);
  }, []);
  return (
    <Header
      className="flex justify-between items-center p-4"
      height={HEADER_HEIGHT}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-writing-sign"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" />
        <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
        <path d="M16 7h4" />
      </svg>
      <div>
        <Button
          color={idToken ? "gray" : "green"}
          onClick={() => {
            if (idToken) {
              logout();
            } else {
              login();
            }
          }}
        >
          {idToken ? "Logout" : "Login"}
        </Button>
        {idToken && (
          <CopyButton value={idToken}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {copied ? "Copied" : "Copy id token"}
              </Button>
            )}
          </CopyButton>
        )}
      </div>
    </Header>
  );
};

const MemoHeader = memo(CustomHeader);
export { MemoHeader as Header, HEADER_HEIGHT };
