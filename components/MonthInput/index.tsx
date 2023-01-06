import { Button, Text, useMantineTheme } from "@mantine/core";
import { MonthPicker } from "mantine-dates-6";

type Props = {
  startDate?: string;
  endDate?: string;
  startDateInputProps: any;
  endDateInputProps: any;
  onPresentClicked: () => void;
};
const MonthInput = ({
  startDate,
  endDate,
  startDateInputProps,
  endDateInputProps,
  onPresentClicked,
}: Props) => {
  const theme = useMantineTheme();

  return (
    <div className="flex justify-center gap-4">
      <div className="text-center">
        <Text
          style={{
            color: theme.colors.gray[9],
          }}
          component="label"
          className="font-['Montserrat'] font-medium text-[14px]"
        >
          Start date
        </Text>
        <MonthPicker
          defaultValue={startDate ? new Date(startDate) : undefined}
          placeholder="Start Date"
          {...startDateInputProps}
        />
      </div>
      <div className="text-center">
        <div className="flex gap-4 justify-center items-center">
          <Text
            style={{
              color: theme.colors.gray[9],
            }}
            component="label"
            className="font-['Montserrat'] font-medium text-[14px]"
          >
            End date
          </Text>
          <Button color="teal" onClick={onPresentClicked} size="xs">
            Present
          </Button>
        </div>
        <MonthPicker
          placeholder="End Date"
          defaultValue={
            endDate && endDate !== "Present" ? new Date(endDate) : undefined
          }
          {...endDateInputProps}
        />
      </div>
    </div>
  );
};

export default MonthInput;
