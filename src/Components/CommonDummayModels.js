import React from "react";
import { Image, View, Text, StyleSheet } from "@react-pdf/renderer";
import backgroundBlur from "../Assets/Images/backgroundBlur.png";

const CommonDummy = () => {
  const styles = StyleSheet.create({
    containers: {
      margin: 18,
      marginBottom: 10
    },
    containerWrapper: {
      height: 140,
      backgroundColor: "#F7F9FC",
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16
    },
    containerHeading: {
      height: "25%",
      backgroundColor: "#E8EEFB",
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8
    },
    subComtainerWrapper: {
      height: "75%",
      margin: 12,
      backgroundColor: "white",
      borderRadius: 10,
      border: `1px solid #E3E7F1`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    imageWrapper: {
      position: "absolute",
      minWidth: "100%",
      minHeight: "100%",
      top: 0,
      left: 60,
      display: "block",
      height: "100%",
      width: "100%"
    },
    textWrapper: {
      width: 200,
      height: 25,
      backgroundColor: "#00A3FF",
      borderRadius: "50%",
      fontSize: 10,
      color: "white",
      fontWeight: "heavy",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  });
  return (
    <View style={styles.containers}>
      <View
        style={styles.containerWrapper}
      >
        <View style={styles.containerHeading}></View>

        <View
          style={styles.subComtainerWrapper}
        >
          <View style={styles.imageWrapper} >
            <Image
              source={backgroundBlur}
              style={{
                width: "80%",
                height: "auto"
              }}
            />
          </View>
          <View style={styles.textWrapper} >
            <Text style={{ fontWeight: 800 }}>Only Focus on Crime Graph</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommonDummy;
