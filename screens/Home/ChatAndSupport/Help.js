import React from 'react'
import { Image,StyleSheet,View ,Text} from 'react-native';
import WebView from 'react-native-webview'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from '../../responsiveLayout/ResponsiveLayout'
  import { Video } from 'expo-av'
  import VideoPlayer from 'expo-video-player'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Grid, Row, Col } from 'react-native-easy-grid'
function Help() {
    return (
        <ScrollView>
 <Grid>

 <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>SOFT SAUDA</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=MRE1X8kTNvg&feature=youtu.be' }}
            />
               
</View>
 
  </Row>
  













<Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Party Master Creation</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=YBQF_Jd5VpI&feature=youtu.be' }}
            />
               
</View>
 
  </Row>
  






  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Product Master</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=qAdK5NgE31w&feature=youtu.be' }}
            />
               
</View>
 
  </Row>




  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Contract Creation</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=7Gw1WslUlDc&feature=youtu.be' }}
            />
               
</View>
 
  </Row>





  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Delivery Entry</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=qVKoMHYh8z4&feature=youtu.be' }}
            />
               
</View>
 
  </Row>


  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Payment Entry</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=8_B9XQyAHXU&feature=youtu.be'}}
            />
               
</View>
 
  </Row>


  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Bill Genration</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=qbGPdYU710Y&feature=youtu.be' }}
            />
               
</View>
 
  </Row>



  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Bill Register</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=_S_faDXOVdg&feature=youtu.be' }}
            />
               
</View>
 
  </Row>



  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Bill Distribution</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=Sb27xVRpYMY&feature=youtu.be' }}
            />
               
</View>
 
  </Row>



  <Row style={[styles.container1,{marginBottom:20}]}>
  <View style={styles.card}>
         <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10,textAlign:"center"}}>Brokerage Updation</Text>  

                     <WebView
                    style={ { width:wp("87.5%"), height:hp("55%")
                   }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=Qul-aHtuBoM&feature=youtu.be' }}
            />
               
</View>
 
  </Row>


</Grid>




  
        </ScrollView>
    )
}

export default Help

const styles = StyleSheet.create({
    image:{
      width:wp("100%"),
      height:hp("30%")
    },
    card: {
      marginLeft:10,
      marginRight:20,
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      padding: 10,
      marginBottom: 5,
      marginTop:10
  }
})