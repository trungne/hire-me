import { Button, Divider, Modal, Select, TextInput } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "react-query";
import { createCV, getAllCVsByEmail, updateCvById } from "shared/queries";
import { useRouter } from "next/router";
import { appUserAtom, cvInfoAtom } from "shared/atoms";
import { faker } from "@faker-js/faker";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

export const submitCvModalAtom = atom(false);

export const SubmitCvModal = () => {
  const [opened, setOpened] = useAtom(submitCvModalAtom);
  const [cvInfo] = useAtom(cvInfoAtom);
  const [user] = useAtom(appUserAtom);
  const router = useRouter();
  const [updatedCvId, setUpdatedCvId] = useState<string | null>(null);

  const { data } = useQuery(
    ["getAllCVs", user?.email],
    () => {
      if (user?.email) {
        return getAllCVsByEmail(user?.email);
      }
    },
    {
      enabled: !!user?.email,
    }
  );

  const allCv = data?.data.data;

  const { mutate: updateCV, isLoading: isUpdatingCV } = useMutation(
    "updateCV",
    {
      mutationFn: updateCvById,
      onSuccess: ({ data }) => {
        closeModal();
        router.push(`/cv/${updatedCvId}`);
      },
      onError: (error) => {
        console.log(error);
        closeModal();
        showNotification({
          title: "Error",
          message: "Something went wrong",
          color: "red",
        });
      },
    }
  );

  const { mutate: createCVInDB, isLoading: isCreatingCV } = useMutation(
    "createCV",
    {
      mutationFn: createCV,
      onSuccess: ({ data }) => {
        if (data.error) {
          showNotification({
            title: "Error",
            message: data.error.mgs,
            color: "red",
          });
          closeModal();
          return;
        }

        const cv = data.data;
        closeModal();
        router.push(`/cv/${cv.id}`);
      },
      onError: (error) => {
        console.log(error);
        closeModal();
        showNotification({
          title: "Error",
          message: "Something went wrong",
          color: "red",
        });
      },
    }
  );

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

  const closeModal = () => {
    form.reset();
    setUpdatedCvId(null);
    setOpened(false);
  };

  return (
    <Modal centered opened={opened} onClose={closeModal} title="Generate PDF">
      <form
        onSubmit={form.onSubmit((values) => {
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
          label="Create new CV by entering name"
          placeholder="Name your CV something cool"
          {...form.getInputProps("name")}
        />
        <div className="flex justify-between pt-4">
          <Button onClick={generateRandomName}>Random name</Button>
          <Button
            color="green"
            loading={isCreatingCV || isUpdatingCV}
            type="submit"
          >
            Create
          </Button>
        </div>

        {allCv && allCv.length > 0 && (
          <>
            <Divider className="my-4" />
            <div className="mt-4">
              <Select
                value={updatedCvId}
                onChange={setUpdatedCvId}
                data={allCv.map((cv) => {
                  return { value: cv.id, label: cv.name };
                })}
                label="Or select CV to update"
                placeholder="Select CV to update"
                clearable
              ></Select>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => {
                    if (!updatedCvId) {
                      showNotification({
                        title: "Error",
                        message: "Please select a CV to update",
                        color: "red",
                      });
                      return;
                    }

                    if (!cvInfo) {
                      showNotification({
                        title: "Error",
                        message: "Something went wrong",
                        color: "red",
                      });
                      return;
                    }
                    updateCV({ id: updatedCvId, cvBody: cvInfo });
                  }}
                  color="green"
                  loading={isCreatingCV || isUpdatingCV}
                >
                  Update
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};
