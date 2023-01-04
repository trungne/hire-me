import { Text, useMantineTheme } from "@mantine/core";
import { MonthPicker } from "mantine-dates-6";

type Props = {
  startDate?: string;
  endDate?: string;
  startDateInputProps: any;
  endDateInputProps: any;
};
const MonthInput = ({
  startDate,
  endDate,
  startDateInputProps,
  endDateInputProps,
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
          defaultDate={startDate ? new Date(startDate) : undefined}
          {...startDateInputProps}
          label="Start Date"
          placeholder="Start Date"
        />
      </div>
      <div className="text-center">
        <Text
          style={{
            color: theme.colors.gray[9],
          }}
          component="label"
          className="font-['Montserrat'] font-medium text-[14px]"
        >
          End date
        </Text>
        <MonthPicker
          defaultDate={endDate ? new Date(endDate) : undefined}
          {...endDateInputProps}
          label="End Date"
          placeholder="End Date"
        />
      </div>
    </div>
  );
};

export default MonthInput;
