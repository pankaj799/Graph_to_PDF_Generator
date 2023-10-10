import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  Document,
  Page,
  Image,
  View,
  Text,
  Font,
  PDFDownloadLink,
  StyleSheet
} from "@react-pdf/renderer";
import axios from "axios";

// Assets
import logoMark from "../Assets/Images/logoMark.png";
import locationShare from "../Assets/Images/locationShare.png";
import blueLine from "../Assets/Images/blueLine.png";

// components
import CommonDummy from "../Components/CommonDummayModels";

// fonts
import PoppinsSemiBold from "../Assets/Fonts/Poppins-SemiBold.ttf";
import PoppinsExtraBold from "../Assets/Fonts/Poppins-ExtraBold.ttf";
import PoppinsMedium from "../Assets/Fonts/Poppins-Medium.ttf";
import PoppinsLight from "../Assets/Fonts/Poppins-Light.ttf";

const ChartJsImage = require('chartjs-to-image');

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [data, setData] = useState(null);

  Font.register({
    family: "Poppins",
    fonts: [
      {
        src: PoppinsMedium,
        fontWeight: "normal"
      },
      {
        src: PoppinsLight,
        fontWeight: "light"
      },
      {
        src: PoppinsSemiBold
      },
      {
        src: PoppinsExtraBold,
        fontWeight: "bold"
      }
    ]
  });

  useEffect(() => {
    axios
      .get("https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all", {
        params: {
          from: "2015",
          to: "2020",
          API_KEY: "iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
        }
      })
      .then(function (response) {
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Updating hook when data from the api is received and set in data 
  useEffect(() => {
    if (data && data?.length > 0) {
      const myChart = new ChartJsImage();
      myChart.setConfig({
        type: "line",
        data: {
          labels: data?.map((row) => row.data_year),
          datasets: [
            {
              label: "Arrests",
              data: data?.map((res) => res.Arson),
              backgroundColor: "transparent",
              borderColor: "rgb(53, 162, 235)",
              pointBackgroundColor: "#1463FF",
              pointHitRadius: 15,
              borderWidth: 2
            }
          ]
        }
      });
      myChart.toDataUrl().then((img) => setImageSrc(img));
    }
  }, [data]);

  // styles for pdf 
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Poppins"
    },
    header: {
      fontSize: 4,
      marginTop: 18,
      marginLeft: 18,
      marginRight: 18,
      marginBottom: 0
    },
    headerAdjustments: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    commonDesignForImages: {
      width: 15,
      height: 15
    },
    companyNameText: {
      fontSize: 13,
      marginLeft: 4,
      fontWeight: 400,
      fontFamily: "Poppins"
    },
    addressText: {
      flex: 1,
      fontSize: 10,
      textAlign: "right",
      fontWeight: "bold",
      fontFamily: "Poppins"
    },
    crimeGraphHeading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 18,
      marginRight: 18
    },
    blueLine: {
      width: "100%",
      height: 2
    },
    containers: {
      margin: 18
    },
    graphContainer: {
      height: 200,
      backgroundColor: "#F2F4F5",
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16
    },
    graphHeader: {
      height: "25%",
      backgroundColor: "#E8EEFB",
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      display: "flex",
      justifyContent: "center",
      paddingLeft: 10
    },
    graphSubContainer: {
      height: "200px",
      margin: 12,
      backgroundColor: "white",
      borderRadius: 10,
      border: `1px solid #E3E7F1`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    footer: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
      fontSize: 4,
      marginLeft: 18,
      marginRight: 18
    },
    footerLeftHeading: {
      fontSize: 10,
      color: "#1463FF",
      flex: 1,
      textAlign: "left",
      fontWeight: "bold",
      fontFamily: "Poppins"
    },
    footerRightHeading: {
      flex: 1,
      fontSize: 10,
      textAlign: "right",
      color: "#626E99",
      fontWeight: "bold",
      fontFamily: "Poppins"
    },
    printButton: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '14px 40px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 700,
      color: '#626E99',
      cursor: 'pointer'
    },
    loadingButton: {
      borderRadius: '8px',
      padding: '14px 40px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 700,
      backgroundColor: '#626E99',
      color: 'white'
    }
  });

  const MyDoc = () => (
    <Document>
      <Page style={styles.page}>

        {/* header */}

        <View style={styles.header} fixed>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 0 }}
          >
            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Image source={logoMark} style={styles.commonDesignForImages} />
              <Text style={styles.companyNameText}>RealAssist.AI</Text>
            </View>
            <Text style={styles.addressText}>
              123 Main Street, Dover, NH 03820-4667
            </Text>
          </View>
          <View>
            <Image source={blueLine} style={styles.blueLine} />
          </View>
        </View>

        {/* Crime Title with blue bar */}

        <CommonDummy />
        <CommonDummy />
        <CommonDummy />

        {/* Heading for crime graph */}

        <View>
          <View style={styles.crimeGraphHeading}>
            <Image source={locationShare} style={styles.commonDesignForImages} />
            <Text style={{ marginLeft: 5, marginRight: 10, fontSize: 10 }}>
              Crime
            </Text>
            <Image source={blueLine} style={styles.blueLine} />
          </View>
        </View>

        {/* Burglary Graph with real data from API provided */}

        <View style={styles.containers}>
          <View style={styles.graphContainer}>
            <View style={styles.graphHeader}>
              <Text style={{ color: "#1463FF", fontSize: 10 }}>Burglary</Text>
            </View>

            <View style={styles.graphSubContainer}>
              <Image
                src={`${imageSrc}`}
              // styel={{
              //   width: "80%",
              //   height: "auto"
              // }}
              />
            </View>
          </View>
        </View>

        {/* footer */}

        <View style={styles.footer} fixed>
          <View>
            <Image source={blueLine} style={styles.blueLine} />
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
          >
            <Text style={styles.footerLeftHeading}>
              Report Genereted on September 26, 2023
            </Text>
            <Text style={styles.footerRightHeading}>
              <Text style={{ color: "#090E24" }}>
                RealAssist Property Report | Page 1
              </Text>{" "}
              of 25
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="App">
      <h1>Graph PDF generator</h1>
      {data && data?.length > 0 && <PDFDownloadLink document={<MyDoc />} fileName="graphGeneratedFile.pdf">
        {({ blob, url, loading, error }) => {
          if (!loading) {
            return <>
              <button style={styles.printButton}>Print now!</button>
            </>
          } else {
            return <button style={styles.loadingButton}>Loading Document !</button>
          }
        }}
      </PDFDownloadLink>}
    </div>
  );
}
