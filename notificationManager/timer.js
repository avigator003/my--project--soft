// import BackgroundTimer from "react-native-background-timer";
import * as BackgroundFetch from "expo-background-fetch";
import { AsyncStorage } from "react-native";
import { registerForPushNotificationsAsync, sendPushNotification } from ".";
import * as TaskManager from "expo-task-manager";
import { CONSTANT } from "../shared/trans";
import axios from "axios"
// var timerId;
// import useAsyncStorage from "@rnhooks/async-storage";
const strings = CONSTANT.timer;
var data = [];
var makeRemoteRequest = async (userId) => {
  let baseUrl = `https://knekisan.com/`;
  const url = baseUrl + "api/v1/inquiry/user/" + userId;
  const url2 = baseUrl + "api/v1/users/" + userId;
  const url3 = baseUrl + "api/v1/users/" + userId;
  let token = await registerForPushNotificationsAsync();

  await fetch(url2)
    .then((res) => res.json())
    .then(async (res) => {
      console.log("aaaaaaaaaa");
      console.log({ res });

      if (res.expoToken) {
        if (res.expoToken.length >= 1) {
          if (token !== res.expoToken) {
            let obj = { id: userId };
            obj.expoToken = token;
            axios
              .post("https://knekisan.com/api/v1/users/update", obj)
              .then((res) => {
                console.log("inside update");
                console.log(res);
              })
              .catch((error) => {
                console.log({ error });
              });
          }
        } else {
          let obj = { id: userId };
          obj.expoToken = token;

          axios
            .post("https://knekisan.com/api/v1/users/update", obj)
            .then((res) => {
              console.log("inside update");
              console.log(res);
            })
            .catch((error) => {
              console.log({ error });
            });
        } 
      } else {
        let obj = { id: userId };
        obj.expoToken = token;

        axios
          .post("https://knekisan.com/api/v1/users/update", obj)
          .then((res) => {
            console.log("inside update");
            console.log(res);
          })
          .catch((error) => {
            console.log({ error });
          });
      }
    })
    .catch((error) => {
      console.log("error inside makeRemoteRequest ", error);
    });

  let newData;
  console.log("inside makeRemoteRequest", url);
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      newData = [...res.data];
    })
    .catch((error) => {
      console.log("error inside makeRemoteRequest ", error);
    });
  // console.log('inside makeRemoteRequest new Data is ',newData);
  return newData;
};
export var notify = async () => {
  console.log("\n\n\n notify started\n\n\n");
  //olddata
  let oldData;
  console.log("data is ", data);
  try {
    if (data && data.length) {
      oldData = [...data];
    }
  } catch (error) {
    console.log("error in sperading", error);
  }

  //userid and tooken
  let userId = await AsyncStorage.getItem("user");
  let userData = await AsyncStorage.getItem("userdata");
  userData = JSON.parse(userData);
  let aadhar = userData.aadharNumber || "Not Provided";
  let pan = userData.pan || "Not Provided";
  // let rate = item.rate;
  // let quantity = item.quantityRecieved;
  // let paymentDue = item.paymentDue;
  let token = await AsyncStorage.getItem("token");
  let lang;
  try {
    lang = await AsyncStorage.getItem("lang");
  } catch (error) {
    lang = "en";
  }
  lang = value || "en";
  if (token) {
    console.log(token);
  } else {
    token = await registerForPushNotificationsAsync();
    await AsyncStorage.setItem("token", token);
  }

  //confirmation that evrything is working fine
  // sendPushNotification(
  //   token,
  //   "inside notify",
  //   "this is a long paragraph under notify", {}
  // );

  //new data
  let newData;
  if (userId) {
    console.log("user id is ", userId);
    newData = await makeRemoteRequest(userId);
  } else {
    sendPushNotification(token, "error", "UserId not found", {});
    console.log("user id not found");
    return;
  }

  //showing status
  // if (newData && newData.length) {
  //   console.log('new datas are');
  //   newData.forEach(item=>console.log(item._id,item.status));
  // }
  // if (oldData && oldData.length) {
  //   console.log('old datas are');
  //   oldData.forEach(item => console.log(item._id, item.status));
  // }

  //logic goes here
  try {
    // let obj={}
    if (newData && newData.length) {
      data = [...newData];
      {
        // for(let i=0;i<newData.length;i++){
        //   let id = newData[i]._id
        //   if(id){
        //     if(obj.id){
        //       obj.id.push({
        //         status: newData[i].status,
        //         paymentRecievedFlag: newData[i].paymentRecievedFlag,
        //         quantityRecievedFlag: newData[i].quantityRecievedFlag
        //       })
        //     }
        //     else{
        //       obj.id = [{
        //         status: newData[i].status,
        //         paymentRecievedFlag: newData[i].paymentRecievedFlag,
        //         quantityRecievedFlag: newData[i].quantityRecievedFlag
        //       }]
        //     }
        //   }
        // }
      }
    }
    {
      // if (oldData && oldData.length) {
      //   for (let i = 0; i < oldData.length; i++) {
      //     let id = oldData[i]._id
      //     if (id) {
      //       if (obj.id) {
      //         obj.id.push({
      //           status: oldData[i].status,
      //           paymentRecievedFlag: oldData[i].paymentRecievedFlag,
      //           quantityRecievedFlag: oldData[i].quantityRecievedFlag
      //         })
      //       }
      //       else{
      //         obj.id = [{
      //           status: oldData[i].status,
      //           paymentRecievedFlag: oldData[i].paymentRecievedFlag,
      //           quantityRecievedFlag: oldData[i].quantityRecievedFlag
      //         }]
      //       }
      //     }
      //   }
      // }
      // && (newData.length === oldData.length)
      // console.log('obj is',obj)
    }
    if (newData && oldData && oldData.length && newData.length) {
      console.log("new data is", newData);
      console.log("old data is ", oldData);
      console.log(
        "olddata length is " +
          oldData.length +
          "new Data length is " +
          newData.length
      );
      {
        // for (let i = 0; i < oldData.length && i < newData.length;i++) {
        //     if (
        //       newData[i].status &&
        //       oldData[i].status &&
        //       (newData[i].status !== oldData[i].status)
        //     ) {
        //       let s = (newData[i].status === 'Approved' ? "अभिनंदन,जांच सफलतापूर्वक स्वीकृत" : "क्षमा करें, जांच अनुमोदन को अस्वीकार कर दिया गया है")
        //       sendPushNotification(token, newData[i].status, s, {});
        //     }
        //     if (
        //       newData[i].paymentRecievedFlag &&
        //       oldData[i].paymentRecievedFlag &&
        //       (newData[i].paymentRecievedFlag !== oldData[i].paymentRecievedFlag)
        //     ) {
        //       sendPushNotification(token, "भुगतान प्राप्त", "अभिनंदन,भुगतान सफलतापूर्वक प्राप्त किया गया", {});
        //     }
        //     if (
        //       newData[i].quantityRecievedFlag &&
        //       oldData[i].quantityRecievedFlag &&
        //       (newData[i].quantityRecievedFlag !== oldData[i].quantityRecievedFlag)
        //     ) {
        //       sendPushNotification(token, "प्राप्त मात्रा", "अभिनंदन,मात्रा सफलतापूर्वक प्राप्त की गई", {});
        //     }
        // }
      }
      oldData.forEach((itemX) => {
        let itemY = newData.find((item) => item._id === itemX._id);
        console.log("inside forEach old ");
        console.log(itemX._id, itemY._id);
        if (itemY) {
          if (itemY.status && itemX.status && itemY.status !== itemX.status) {
            let s =
              itemY.status === "Approved"
                ? strings.approve1[lang]
                : strings.approve2[lang];
            sendPushNotification(token, itemY.status, s, {});
          }
          if (
            itemY.paymentRecievedFlag &&
            itemX.paymentRecievedFlag &&
            itemY.paymentRecievedFlag !== itemX.paymentRecievedFlag
          ) {
            sendPushNotification(
              token,
              strings.payment1[lang],
              `${strings.payment2[lang]} ${itemY.utr} ${strings.payment3[lang]} ${itemY.paymentRecieved}`,
              {}
            );
          }
          if (
            itemY.quantityRecievedFlag &&
            itemX.quantityRecievedFlag &&
            itemY.quantityRecievedFlag !== itemX.quantityRecievedFlag
          ) {
            sendPushNotification(
              token,
              strings.quantity1[lang],
              `${strings.quantity2[lang]} ${aadhar}\n ${
                strings.quantity3[lang]
              } ${pan}\n ${strings.quantity4[lang]} ${
                itemY.quantityRecieved || "Not Available"
              } ${strings.quantity5[lang]} ${itemY.rate} \n ${
                strings.quantity6[lang]
              } ${itemY.paymentDue || "Not Available"}`,
              {}
            );
          }
        }
      });
    }
  } catch (error) {
    sendPushNotification(token, "error", "error fetching data", {});
    console.log("error while fetching data", error);
  }
  console.log("\n\n\n notify ended\n\n\n");
};

var intervalId;
const timerStart = async () => {
  console.log("timer started");
  let userId = await AsyncStorage.getItem("user");
  let userData = await AsyncStorage.getItem("userdata");
  console.log({ userData });
  data = await makeRemoteRequest(userId);
  console.log("data fetched", data);
  let token = await AsyncStorage.getItem("token");
  console.log(token);
  // sendPushNotification(token, "Timer start called", "Timer start CAlled", {});
  try {
    const NOTIFICATION = "NOTIFICATION";
    console.log("inside try block");
    let backgroundRegistationKey = await BackgroundFetch.registerTaskAsync(
      NOTIFICATION,
      {
        minimumInterval: 2,
        stopOnTerminate: false,
        startOnBoot: true,
      }
    );
    console.log("background fetch mounted status", backgroundRegistationKey);
    let registeredTasks = await TaskManager.getRegisteredTasksAsync();
    console.log("registred tasks are", registeredTasks);
  } catch (error) {
    console.log("error in background timer", error);
  }
};
export default timerStart;
