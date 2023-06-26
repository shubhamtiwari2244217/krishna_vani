import { StyleSheet, Text, View } from "react-native";
import React from "react";

// importing the headphone icon
import { FontAwesome5 } from "@expo/vector-icons";
// importing playlist icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// music icon
import { Ionicons } from "@expo/vector-icons";
import {
  backgroundColor1,
  backgroundColor2,
  primaryColor,
  themecol,
} from "../Styles/Theme1";
const BottomNav = ({ activepage, navigation}) => {
  console.log({ activepage });
  return (
    <View style={styles.container}>
      {activepage == 'allmusic' ? (
        <Ionicons
          name="musical-notes"
          size={50}
          color="black"
          style={styles.iconactive}
          
        />
      ) : (
        <Ionicons
          name="musical-notes"
          size={50}
          color="black"
          style={styles.icon}
          onPress={()=>navigation.navigate('allmusic')}
        />
      )}
      {
        (activepage == 'player' ? (
          <FontAwesome5
            name="headphones-alt"
            size={50}
            color="black"
            style={styles.iconactive}
          />
        ) : (
          <FontAwesome5
            name="headphones-alt"
            size={50}
            color="black"
            style={styles.icon}
            onPress={()=>navigation.navigate('player')}
          />
        ))
      }

      {
        (activepage == 'allplaylists' ? (
          <MaterialCommunityIcons
            name="playlist-music"
            size={50}
            color="black"
            style={styles.iconactive}
          />
        ) : (
          <MaterialCommunityIcons
            name="playlist-music"
            size={50}
            color="black"
            style={styles.icon}
            onPress={()=>navigation.navigate('allplaylists')}
          />
        ))
      }
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "flex-end",
    backgroundColor: 'gray',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    

  },
  icon: {
    color: primaryColor,
    // marginHorizontal: '100%',
    marginLeft:20,
    marginRight:20,
    
  },
  iconactive: {
    color: primaryColor,
    backgroundColor: themecol,
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: "40%",
  },
});
