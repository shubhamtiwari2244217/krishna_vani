import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../Components/BottomNav'

const AllPlaylist = ({navigation}) => {
  return (
    <View style={styles.container}>
    <Text>All Playlist</Text>
    <View style={styles.bottomnav}>
    <BottomNav activepage ={'allplaylists'} navigation={navigation}/>
    </View>
  </View>
  )
}

export default AllPlaylist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0a422' ,
    alignItems: 'center',
    justifyContent: 'center',
  },

bottomnav: {
    position: 'absolute',
    bottom:0,
    width:'100%',
    alignItems: 'center',
}
})