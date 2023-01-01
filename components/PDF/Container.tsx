import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { Style } from "@react-pdf/types";

const Container = ({
  children,
  marginHorizontal = 0,
  marginVertical = 0,
}: {
  children: ReactNode;
  marginHorizontal?: number;
  marginVertical?: number;
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          marginLeft: marginHorizontal,
          marginRight: marginHorizontal,
          marginTop: marginVertical,
          marginBottom: marginVertical,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Container;
