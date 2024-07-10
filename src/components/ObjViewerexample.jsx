import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import { useData } from './datacontext';

export default function ThreedView({navigation}) {

const {clickedItem} = useData()
  const webViewRef = useRef(null);
  const url = `https://blend3d.netlify.app/?model=https://isikpgdobtvvdcfkrruy.supabase.co/storage/v1/object/public/unity/model.glb?t=2024-03-24T01%3A21%3A17.950Z`
  console.log(clickedItem?.s3URL)
  const tattviewer = `https://3dviewer.net/index.html#model=${clickedItem?.s3URL}`
  const hideHeaderFooterScript = `
  const header = document.querySelector('header');
  if (header) {
      header.style.display = 'none';
  }
  const footer = document.querySelector('footer');
  if (footer) {
      footer.style.display = 'none';
  }

  const toolbar = document.getElementById('toolbar');
  if (toolbar) {
    toolbar.style.display = 'none';
  }

  const title = document.querySelector('.title');
  if (title) {
    title.style.display = 'none';
  }
  
`;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
     <View style={styles.topbarcontainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <View style ={styles.backcontainer}>
          <Image source={require('../assets/Images/BackButton.png')} style={styles.backimage}></Image>
            <Text style={styles.back}>Back To Profile</Text>
            </View>
            </TouchableOpacity>
            </View>
      <View style={{flex: 3.5, marginBottom: 60, margin : 10}}>
        <WebView 
        ref={webViewRef}
        source={{ uri: tattviewer }}
        injectedJavaScript={hideHeaderFooterScript}
        javaScriptEnabled={true}
        />
        {/* <WebView
          originWhitelist={['*']}
          source={{html: widgetHTML, baseUrl: 'https://google.com'}}
          injectedJavaScript={widgetScript}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
    },
    topbarcontainer : {
      display : "flex",
      marginTop : "10%",
      justifyContent : "space-between",
      flexDirection : "row",
      marginLeft : "3%",
      position : "absolute",
      zIndex : 99999
    },
    backcontainer : {
      display : "flex",
      flexDirection : "row",
    },
    back :{ 
        marginLeft : 10,
      },
})