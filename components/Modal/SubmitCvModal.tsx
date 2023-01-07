import { Button, Modal, TextInput } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { createCV } from "shared/queries";
import { useRouter } from "next/router";
import { appUserAtom, cvInfoAtom } from "shared/atoms";
import { faker } from "@faker-js/faker";

export const submitCvModalAtom = atom(false);

export const SubmitCvModal = () => {
  const [opened, setOpened] = useAtom(submitCvModalAtom);
  const [cvInfo] = useAtom(cvInfoAtom);
  const [user] = useAtom(appUserAtom);
  const router = useRouter();

  const { mutate: createCVInDB, isLoading } = useMutation("createCV", {
    mutationFn: createCV,
    onSuccess: ({ data }) => {
      if (data.error) {
        // TODO: show error
        return;
      }

      const cv = data.data;
      router.push(`/cv/${cv.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<{ name: string }>({
    validate: {
      name: (value) => (!!value ? null : "Invalid name"),
    },
  });

  const generateRandomName = () => {
    const adj = faker.word.adjective();
    const noun = faker.word.noun();
    const name = `${adj}-${noun}`;
    form.setValues({ name });
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        form.reset();
        setOpened(false);
      }}
      title="Generate PDF"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          if (isLoading) {
            return;
          }

          if (!user) {
            router.push("/generate");
            return;
          }

          if (!cvInfo) {
            // TODO: show error
            return;
          }

          createCVInDB({
            cvBody: cvInfo,
            name: values.name.trim(),
            email: user.email,
          });
        })}
      >
        <TextInput
          withAsterisk
          label="CV name"
          placeholder="Name your CV something cool"
          {...form.getInputProps("name")}
        />
        <div className="flex justify-between pt-4">
          <Button onClick={generateRandomName}>Random name</Button>
          <Button color="green" loading={isLoading} type="submit">
            Generate
          </Button>
        </div>
      </form>
    </Modal>
  );
};
