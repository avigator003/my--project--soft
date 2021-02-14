import React, { useState ,useEffect} from 'react'
import { ImageBackground, View, StyleSheet, Button,TextInput,Text,Animated,ActivityIndicator, KeyboardAvoidingView, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Form, Input, Label, Item } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import * as Updates from 'expo-updates'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from '../responsiveLayout/ResponsiveLayout'
import theme1 from '../components/styles/DarkTheme'
import { LineDotsLoader } from 'react-native-indicator';
function Login(props) {

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [hidePassword,setHidePassword]=useState(true)
    const[showDivision,setShowDivision]=useState(false)
    const[showCompany,setShowCompany]=useState(false)
    const[responseData,setResponseData]=useState([])
    const[showLogin,setShowLogin]=useState(true)
    const[loading,setLoading]=useState(false)
    const[user,setUser]=useState()

    const divisionhandler = (companycode,sdate,eDate) => { 
        const company=async()=>{
        AsyncStorage.setItem("companyCode",  companycode)
        AsyncStorage.setItem("startingDate",  sdate)
        AsyncStorage.setItem("endDate",  eDate)
                
        setShowDivision(true)
            }
            company();
    
        }
        
   
        const homeHandler = (divisionCode,divName,divNm,printurl) => {
            const division=async()=>{
            AsyncStorage.setItem("divisionCode",divisionCode)
            AsyncStorage.setItem("divisionName",divName)
            AsyncStorage.setItem("divisionNm",divNm)
            AsyncStorage.setItem("printurl",printurl)
            props.navigation.navigate('Home')
            Updates.reloadAsync()
            }
            division();
        }

       
    const loginsubmit = () => {
        setLoading(true)
        axios({
            method: 'POST',
            url: "http://www.softsauda.com/userright/appuserlogin",
            data: {
                'usrnm': userName,
                'usrpwd': password
            }
        })
            .then(respone => {

                console.log("repsosne",respone.data.message)
                if(respone.data.message=="Wrong Username")
                {
                    setLoading(false)
                    Toast.showWithGravity('Invalid Username.', Toast.LONG, Toast.TOP);
                
                }
                else if(respone.data.message=="Wrong password")
                {
                    setLoading(false)
                    Toast.showWithGravity('Invalid Password.', Toast.LONG, Toast.TOP);
                
                }
                else{
                const setItem=async()=>{
                await AsyncStorage.setItem("masterid",  respone.data.masterid)
                await AsyncStorage.setItem("user",  respone.data.user_name)
                await AsyncStorage.setItem("responseData",JSON.stringify(respone.data))
                setUser(respone.data.user_name)
                setResponseData(respone.data)
                setShowLogin(false)
                setShowCompany(true)
                setLoading(false)
               }
            
               setItem();
            }
            })
            .catch(error=>{
                setLoading(false)
                Toast.showWithGravity(error, Toast.LONG, Toast.TOP);
            })

    }

    useEffect(()=>{
        const unsubscribe =props.navigation.addListener('focus', async() => {
         let u=await AsyncStorage.getItem("user")
         setUser(await AsyncStorage.getItem("user"))
         if(u)
         {
         setResponseData(JSON.parse(await AsyncStorage.getItem("responseData")))    
         setShowLogin(false)
         setShowCompany(true)
         props.navigation.setOptions({
            title:"Shift Company",headerStyle: {
            backgroundColor:"#D9EDF7"
              }
          })
      
         }
         else{
            props.navigation.setOptions({
                title:"Login "
              })
         setShowLogin(true)
         setShowCompany(false)  
         }
          });
          
          setUserName("")
          setPassword("")
          return unsubscribe;
        },[props.navigation])



    return (
        <>
        {
            !loading? 
        <>
        {
           !user &&
        <KeyboardAvoidingView style={styles.container}>
            <Image source={require("../../assets/login.png")} style={styles.image} resizeMode="contain" />
            
            <Form style={styles.form}>
                    <Item floatingLabel>
                    <Label>Username</Label>
                    <Input value={userName} onChangeText={(username) => setUserName(username)} autoCompleteType="username" ></Input>
                    
                </Item>


                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry={hidePassword} value={password} onChangeText={(password) => setPassword(password)} secureTextEntry={hidePassword} />
               
                </Item>
                <Item style={{position:"relative",top:-30,left:130,border:"none"}}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>setHidePassword(!hidePassword)}>
                    {
                        hidePassword? <FontAwesomeIcon name="eye-slash" size={23} color="black"/>
                  :
                   <FontAwesomeIcon name="eye" size={23} color="black"/>
                    }
                 </TouchableOpacity>
                
                    </Item> 
                    <View style={[styles.column, { justifyContent: "center" }]}>

<TouchableOpacity onPress={() => loginsubmit()} 
 style={styles.button1}
      >
                                    
                                <Text style={{color:"white"}}>Login</Text>
                            </TouchableOpacity>
                      </View>

                <Text style={{ top: 20 }}>Forgot Password ?</Text>

            </Form>


        </KeyboardAvoidingView>
}

{

    (user && showCompany)?

          (<ScrollView>
          
           <DataTable>
               <DataTable.Header>
                   <DataTable.Title>Company</DataTable.Title>
                   <DataTable.Title >Start Dtae</DataTable.Title>
                   <DataTable.Title >End Date</DataTable.Title>
                   <DataTable.Title >Enter</DataTable.Title>
               </DataTable.Header>
   
   
         {
         responseData.div_com?.map(dat=>(
                   <DataTable.Row>
                   <DataTable.Cell>{dat.com_name}</DataTable.Cell>
                   <DataTable.Cell >{((dat.sdate).substring(0,10)).split('-').reverse().join('/')}</DataTable.Cell>
                   <DataTable.Cell >{((dat.edate).substring(0,10)).split('-').reverse().join('/')}</DataTable.Cell>
                   <DataTable.Cell ><Button onPress={()=>divisionhandler(dat._id,dat.sdate,dat.edate)} title="Click  "/></DataTable.Cell>
                   </DataTable.Row>
            ))}
              
   
               </DataTable>
          
   {
       showDivision &&
   <>
           <View style={{ borderBottomColor: 'grey',borderBottomWidth: 1,marginBottom:0,padding:20,margin:10}}/>
             <Text style={{fontSize:23,fontWeight:'800',paddingLeft:85,backgroundColor:"#D9EDF7",width:"100%",
             height:50,borderRadius:10,textAlign:"left",paddingTop:10}}>Shift Division</Text>
      
               <DataTable>
                   <DataTable.Header>
                       <DataTable.Title>Divison</DataTable.Title>
                       <DataTable.Title >Code</DataTable.Title>
                       <DataTable.Title >Link</DataTable.Title>
                   </DataTable.Header>
   
   
                   {
         responseData.div_mast.map(dat=>(
                   <DataTable.Row>
                       <DataTable.Cell>{dat.div_mast}</DataTable.Cell>
                       <DataTable.Cell >{dat.div_code}</DataTable.Cell>
                       <DataTable.Cell ><Button title="Enter  " onPress={()=>homeHandler(dat._id,dat.div_code,dat.div_mast,dat.printurl?dat.printurl:"")} /></DataTable.Cell>
                   </DataTable.Row>
   
                   ))}
   
               </DataTable>
               </>
   }
   
           </ScrollView>):<></>

}
</>:

<View style={{alignItems:"center",justifyContent:"center",marginTop:150}}>        
<LineDotsLoader size="medium" size={20} />
</View>
}
        </>
    )
}

export default Login


const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        width: '40%',
        height: "30%",
        top: -27,
        left: 120



    },
    button1: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        top: 4,
        left: 0,
        backgroundColor: theme1.DARK_BLUE_COLOR,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: -50,
        margin: 25
    },
    container: {
        flex: 1,
        flexDirection: "column",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 110,
        backgroundColor: "lightgray",
        padding: 40,
        borderRadius: 10
    }
})