import { Button, Modal, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { memo } from "react";
import { useMutation } from "react-query";
import { appUserAtom, firebaseUserAtom, registrationModalAtom } from "shared/atoms";
import { createUser as createUserMutation } from "shared/queries";
import { User } from "shared/types";


const RegistrationModal = () => {
  const [modalOpened, setModalOpened] = useAtom(registrationModalAtom);
  const [firebaseUser] = useAtom(firebaseUserAtom);
  const [, setAppUser] = useAtom(appUserAtom);
  const { mutate: createUser } = useMutation("createUser", {
    mutationFn: createUserMutation,
    onSuccess: ({ data: { data: appUser } }) => {
      setAppUser(appUser);
      setModalOpened(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const register = async (userType: "recruiter" | "candidate") => {
    if (!firebaseUser || !firebaseUser.email) {
      return;
    }

    const user: Omit<User, "id"> = {
      email: firebaseUser.email,
      isRecruiter: userType === "recruiter",
    };
    createUser(user);
  };
  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      centered
    >
      <div className="flex flex-col gap-4">
        <Text className="text-center">Look like we have a new user.</Text>
        <Text className="text-center">Tell us what you&apos;re looking for!</Text>
        <div className="flex flex-col gap-4">
          <Button
            onClick={async () => {
              await register("candidate");
            }}
            color="teal"
          >
            I&apos;m looking for a job
          </Button>
          <Button
            onClick={async () => {
              await register("recruiter");
            }}
            color="indigo"
          >
            I&apos;m looking for candidates
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(RegistrationModal);
