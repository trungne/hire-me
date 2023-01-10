import { Button, Divider, Modal, Select, TextInput } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createCV, deleteCvById, updateCvById } from "shared/queries";
import { useRouter } from "next/router";
import { appUserAtom, cvInfoAtom } from "shared/atoms";
import { faker } from "@faker-js/faker";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
type EditCVModalProps = {
  id: string;
  name: string;
};
export const editCVModalAtom = atom<EditCVModalProps | null>(null);

export const EditCvModal = () => {
  const [props, setProps] = useAtom(editCVModalAtom);
  const queryClient = useQueryClient();

  const { mutate: updateCV, isLoading: isUpdatingCV } = useMutation(
    "updateCV",
    {
      mutationFn: updateCvById,
      onSuccess: async ({ data }) => {
        closeModal();
        showNotification({
          title: "Success",
          message: "CV updated successfully",
          color: "green",
        });
        await queryClient.invalidateQueries("getAllCVs");
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

  const { mutate: deleteCV, isLoading: isDeletingCV } = useMutation(
    "deleteCV",
    {
      mutationFn: deleteCvById,
      onSuccess: async ({ data }) => {
        closeModal();
        showNotification({
          title: "Success",
          message: "CV deleted successfully",
          color: "green",
        });
        await queryClient.invalidateQueries("getAllCVs");
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
    initialValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!props) {
      return;
    }

    form.setValues({ name: props.name });
    return () => {
      form.reset();
    };
  }, [props]);

  const generateRandomName = () => {
    const adj = faker.word.adjective();
    const noun = faker.word.noun();
    const name = `${adj}-${noun}`;
    console.log(name);
    form.setValues({ name });
  };

  const closeModal = () => {
    form.reset();
    setProps(null);
  };

  return (
    <Modal centered opened={!!props} onClose={closeModal} title="Edit CV">
      <form
        onSubmit={form.onSubmit((values) => {
          if (!props?.id) {
            return;
          }
          updateCV({ id: props.id, name: values.name });
        })}
      >
        <TextInput required label="Name" {...form.getInputProps("name")} />
        <div className="flex justify-end pt-4">
          <Button onClick={generateRandomName}>Random name</Button>
        </div>
        <div className="flex justify-between pt-4">
          <Button
            onClick={() => {
              if (!props) {
                return;
              }
              deleteCV(props.id);
            }}
            color="red"
            loading={isDeletingCV || isUpdatingCV}
          >
            Delete
          </Button>
          <Button color="green" loading={isDeletingCV ||isUpdatingCV} type="submit">
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};
