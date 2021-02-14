import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform,StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../screens/responsiveLayout/ResponsiveLayout'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const [expoArray, setExpoArray] = useState([]);
  const [notification, setNotification] = useState(false);
  const[title,setTitle]=useState("")
  const[body,setBody]=useState("")
  
   useEffect(()=>{
    const getList=async()=>{
      const URL =  `http://www.softsauda.com/userright/apigetusermobile`
        Axios.get(URL)
       .then(response => {

        var array=[]
        response.data.data.map(token=>(
          array.push(token.token)
        ))
        console.log("array",array)
        setExpoArray(array)
      })
    
    }
    getList();
   },[])
  


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
       <Text style={{ fontSize: wp("5%"), fontWeight: "bold",width:wp("100%"),textAlign:"center" }}>SOFT SAUDA NOTIFICATION </Text>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('80%') }]}
          placeholder="Title"
          name="title"
          defaultValue={title}
          onChangeText={text => setTitle(text)}

        />
        <TextInput
          style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('80%'),height:hp("30%") }]}
          placeholder="Body"
          name="body"
          defaultValue={body}
          onChangeText={text => setBody(text)}

        />
      </View>
      <Button
        title="Press to Send a Notification"
        onPress={ () => sendPushNotification(title,body,expoArray)}
      />
    </View>
  );
}

export async function sendPushNotification(title,body,expoArray) {
  console.log("hey sneding",title,body,expoArray)
  const message = {
    to: expoArray,
    sound: "default",
    title: title || "Original Title",
    body: body || "Body",
    data: {
      data: "goes here",
    },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
Toast.showWithGravity('Notification Sent.', Toast.LONG, Toast.TOP);
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



const styles = StyleSheet.create({
  
  input: {
      height: 35,
      
      width: wp('22%'),
      borderStartWidth: 2,
      borderColor: "grey",
      borderEndWidth: 0.5,
      borderTopWidth: 0.5,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderBottomWidth: 0.5,
      margin: 4,
      padding: 8,
      borderRadius: 5
  },

})
