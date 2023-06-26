import { StyleSheet, Text, View, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import BottomNav from "../Components/BottomNav";
import { primaryColor, secondaryColor } from "../Styles/Theme1";
// imporining icons
import { Foundation } from "@expo/vector-icons";

const Player = ({ navigation }) => {
  const [isplaying, setisplaying] = useState(false);
  const imgkrishna =
    "https://static.toiimg.com/thumb/msid-77430902,width-1070,height-580,imgsize-853342,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg";

  // const tempimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbe_o9LIUUBbQ--bAtXZ6hGo4PTrfbjYDvA&usqp=CAU";

  const tempimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDReJwlDhiSQiPjVUGPkVPwrULwUEtjv9MgA&usqp=CAU";


  // image rotation
  let rotateValueHolder = new Animated.Value(0);
  const startImageRotationFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => startImageRotationFunction());
  };

  useEffect(() => {
    if (isplaying == true) {
      startImageRotationFunction();
    } else {
      rotateValueHolder.setValue(0);
      rotateValueHolder.stopAnimation();
    }
  }, [isplaying]);

  const RotateData = rotateValueHolder.interpolate({
    inputRange:[0,1],
    outputRange:['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <View style={styles.bottomnav}>
        <BottomNav activepage={"player"} navigation={navigation} />
      </View>

      <Animated.Image source={{ uri: tempimg }} style={[styles.imgbig, {transform:[{rotate:RotateData}]}]} />

      {/* krishna img have to put on background */}
      {/* <Image source ={{uri: imgkrishna}} style={styles.imgbig} /> */}

      <View style={styles.container2}>
        <Text style={styles.text1}>Listen Krishna</Text>
        <Text style={styles.text2}>in your service - Gaur Nitai Group</Text>
      </View>

      <View style={styles.container3}>
        <View style={styles.musiccompletedout}>
          <View style={styles.musiccompletedin}></View>
        </View>
        <View style={styles.timecont}>
          <Text style={styles.time}>00:00</Text>
          <Text style={styles.time}>05:00</Text>
        </View>
      </View>

      <View style={styles.container4}>
        <Foundation
          name="previous"
          size={24}
          color="black"
          style={styles.icon}
        />

        {isplaying == false ? (
          <Foundation
            name="play"
            size={24}
            color="black"
            style={styles.icon}
            onPress={() => setisplaying(true)}
          />
        ) : (
          <Foundation
            name="pause"
            size={24}
            color="black"
            style={styles.icon}
            onPress={() => setisplaying(false)}
          />
        )}
        <Foundation name="next" size={24} color="black" style={styles.icon} />
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0a422",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },

  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  imgbig: {
    width: 300,
    height:300,
    borderRadius: 150,
    marginVertical: 20,
    
  },
  text1: {
    fontSize: 20,
    color: primaryColor,
    width: 300,
    textAlign: "center",
    alignSelf: "center",
  },

  text2: {
    fontSize: 15,
    color: secondaryColor,
    width: 200,
    textAlign: "center",
    alignSelf: "center",
  },

  container3: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  time: {
    fontSize: 15,
    color: secondaryColor,
  },
  musiccompletedout: {
    width: "100%",
    height: 5,
    backgroundColor: secondaryColor,
    borderRadius: 5,
  },
  musiccompletedin: {
    width: "50%",
    height: 5,
    backgroundColor: primaryColor,
  },
  timecont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  icon: {
    color: primaryColor,
    fontSize: 40,
  },
  container4: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    marginBottom: 20,
  },
});
