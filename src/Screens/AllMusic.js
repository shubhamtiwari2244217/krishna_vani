import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import BottomNav from "../Components/BottomNav";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import { setActiveSong_global,  setAllSongs_global } from "../redux/action";
import {
  backgroundColor1,
  primaryColor,
} from "../Styles/Theme1";
import musicicon from "../../assets/musicicon.jpeg";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const AllMusic = ({ navigation }) => {
  // const [allSongs, setAllSongs] = useState([
  //   "Please allow permission to show all music",
  // ]);

  const mySongs = useSelector((state) => state.allSongs_global);
  // console.log(mySongs);

  const permissionPopUp = async () => {
    Alert.alert(
      "Permission Required",
      "This app requires permission to access your media",
      [
        {
          text: "Accept",
          onPress: () => MediaLibrary.requestPermissionsAsync(),
        },
        { text: "Cancel", onPress: () => permissionPopUp() },
      ]
    );
  };

  const getpermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);

    if (permission.granted == true) {
      console.log("Permission granted, showing the music");
      getAllSongs();
    }

    if (permission.granted == false && permission.canAskAgain == true) {
      const askpermission = await MediaLibrary.requestPermissionsAsync();
      console.log(askpermission);

      if (
        askpermission.status == "denied" &&
        askpermission.canAskAgain == true
      ) {
        permissionPopUp();
        console.log("Permission denied, Please allow me to show all music");
      }
      if (askpermission.status == "granted") {
        console.log("Permission Granted, showing all music");
        getAllSongs();
      }
      if (
        askpermission.status == "denied" &&
        askpermission.canAskAgain == false
      ) {
        console.log(
          "Can't Show music, please allow this permission from setting"
        );
      }
    }
  };

  useEffect(() => {
    getpermission();
  }, []);

  const dispatch = useDispatch();

  const getAllSongs = async () => {
    const songs = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    // console.log(songs.assets)
    dispatch(setAllSongs_global(songs));
  };
  // console.log(mySongs.assets);

  let activeSongUri = 'null';
  if (mySongs?.assets) {
    activeSongUri = mySongs.assets[0].uri;
    // console.log(activeSongUri);
  }

  const [activeSong, setActiveSong] = useState('');
  const activeSong_global = useSelector(state => state.activeSong_global);
  // console.log(activeSong_global)

  useEffect(()=>{
    setActiveSong(activeSong_global)
  }, [])
    
  const updateCurrentSong=(item) =>{
    setActiveSong(item);
    dispatch(setActiveSong_global(item))
    console.log(activeSong_global)

  }

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.bottomnav}>
        <BottomNav activepage={"allmusic"} navigation={navigation} />
      </View>
      <Text style={styles.head1}>My Songs</Text>
      <ScrollView style={styles.cont2}>
        {mySongs?.assets &&
          mySongs.assets.map((item) => (
            <View key={item.id}>
              {item.uri == activeSong.uri ? (
                <View style={styles.activeSongCard}>
                  <Image source={musicicon} style={styles.songImg} />
                  <Text style={styles.activeSongName}>{item.filename}</Text>
                  <FontAwesome5
                    name="pause"
                    size={24}
                    color="pink"
                    style={styles.iconActive}
                  />
                  <MaterialIcons
                    name="playlist-add"
                    size={24}
                    color="purple"
                    style={styles.iconActive}
                  />
                </View>
              ) : (
                <View style={styles.songCard}>
                  <Image source={musicicon} style={styles.songImg} />
                  <Text style={styles.songName}>{item.filename}</Text>
                  <FontAwesome5
                    name="play"
                    size={24}
                    color="pink"
                    style={styles.icon}
                    onPress={()=>updateCurrentSong(item)}
                  />
                  <MaterialIcons
                    name="playlist-add"
                    size={24}
                    color="purple"
                    style={styles.icon}
                    
                  />
                </View>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default AllMusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    // justifyContent: 'center',
  },

  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  head1: {
    color: primaryColor,
    fontSize: 20,
    backgroundColor: "#3d423e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    width: "50%",
    textAlign: "center",
    alignItems: "center",
  },
  songName: {
    color: primaryColor,
    fontSize: 17,
    fontWeight: "bold",
    margin: 10,
    width: "60%",
  },
  cont2: {
    width: "100%",
  },

  songImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  songCard: {
    flexDirection: "row",
    backgroundColor: "#3d423e",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: primaryColor,
  },
  iconActive: {
    marginHorizontal: 2,
    color: backgroundColor1,
  },
  activeSongCard: {
    flexDirection: "row",
    backgroundColor: primaryColor,
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  activeSongName: {
    color: backgroundColor1,
    fontSize: 17,
    fontWeight: "bold",
    margin: 10,
    width: "60%",
  },
});
