import React,{useState,useEffect,useRef} from 'react'
import { View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,Linking,FlatList } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import { List, Searchbar, TouchableRipple } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import {Button} from 'react-native-paper'
import Axios from 'axios';
import moment from 'moment';
import { Grid, Row, Col } from 'react-native-easy-grid'
import RBSheet from "react-native-raw-bottom-sheet";
import WatsappIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import SelectTwo from '../../components/SelectTwo'

import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../responsiveLayout/ResponsiveLayout'

function Telephone({navigation,route}) {




  const[loading,setLoading]=useState(true)
  const[tableData,setTableData]=useState()
  const[data,setData]=useState()
  const[length,setLength]=useState()
  const[partyName,setPartyName]=useState()
  const[division,setDivision]=useState()
  const[filteredData,setFilteredData]=useState()
  const[searchName,setSearchName]=useState()
  const[page,setPage]=useState(1)
  const[isModalVisible,setIsModalVisible]=useState(false)
 
  const [selllerId, setSellerId] = useState();
  const [sellerItems, setSellerItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [phoneNumber,setPhoneNumber]=useState()
  const[inputBox,setShowInputBox]=useState(false)
  const[shareItem,setShareItem]=useState()
  const[cityList,setCityList]=useState()
  const[stateList,setStateList]=useState()

  const[cityId,setCityId]=useState()
  const[stateId,srtStateId]=useState()

  const [cityItems, setCityItems] = useState([])
  const [stateItems, setStateItems] = useState([])

  const[selectedCityItems,setSelectedCityItems]=useState([])
  const[selectedStateItems,setSelectedStateItems]=useState([])



  const handleCityId = (item) => {
    setCityId(item.id)
}

const handleOpenModal=(id)=>{
  RBref1.open()
  var item = data.find(item => item._id === id);
  setShareItem({
    "PARTY-NAME":item.party_name,
    "ADDRESS":item.address1,
    "CITY":item.city_name.city_name,
    "PHONE NUMBER":item.mob_no,
    "PAN NUMBER":item.pan_no,
    "GSTIN NUMBER":item.gstin,
    "FSSAI NUMBER":item.fssai

  })
 

}


  useEffect(()=>{
    const unsubscribe =navigation.addListener('focus', async() => {
      getTelphoneList()
    
      })
      return unsubscribe;
    },[navigation])

    const handleSellerId = (item) => {
      setPhoneNumber(item.mobile)
      setSellerId(item.id)
      setShowInputBox(true)
  }
  
 
    var RBref=useRef()
    var RBref1=useRef()

   const shareToWhatsAppWithContact = () => {
     var item=(JSON.stringify(shareItem)).split(",")
     var i;
     var shareText="From :" +" Demo" +"\n"
     for(i=0;i<item.length;i++)
     {
         shareText+=item[i]+"\n"
     }
     shareText.replace("{"," ")
     shareText.replace("}"," ")
    Linking.openURL(`whatsapp://send?text=${shareText}&phone=+91${phoneNumber}`);
       }

  const getTelphoneList=async()=>{
   
    const masterid = await AsyncStorage.getItem("masterid")

    const URL =  `http://www.softsauda.com/telephonic_directory/getsummary?stateid=&cityid=&masterid=${masterid}`
     
    Axios.get(URL)
    .then(response => {
          setLength(response.data.party.length)
          setData(response.data.party)
          getSellers()
        })
  
  }
  
  // Seller lIst
  const getSellers = async () => {
    const masterid = await AsyncStorage.getItem("masterid")
    const dat = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    await fetch(`http://www.softsauda.com/deal_entry/party_listS?ptyp=S&masterid=${masterid}`, dat)

        .then(response => response.json())
        .then(dat => {

            dat.results.map(da => (
                setSellerItems(oldArray => [...oldArray, { id: da.id, name: da.party_name ,mobile:da.mob_no}])
            ))
            
       setLoading(false)
        }
        )

}



// Get City List

const getCity = async () => {
 const URL =  `http://www.softsauda.com/add_city/getcitylist`
     
Axios.get(URL)
.then(response => {
  response.data.city_name.map(dat => (
    setCityItems(oldArray => [...oldArray, { id: dat._id, name: dat.city_name }])
  ))
  getState()
    })

}

//Get State List
const getState= async () => {
      
  const URL =  `http://www.softsauda.com/add_city/getstatelist`
      
 Axios.get(URL)
 .then(response => {
       setStateItems(response.data.state_name)
     
       setLoading(false)
     })
 
 }
 

  const filter=(text,type)=>{
    if(type=="party")
    {
    const array=[...tableData]
    const newArray=array.filter(table =>((table.pcd.party_name).toLowerCase()).includes(text.toLowerCase()))
    setFilteredData(newArray)
    }
    else{
    const array=[...tableData]
    const newArray=array.filter(table =>((table.bill_divcode.div_mast).toLowerCase()).includes(text.toLowerCase()))
    setFilteredData(newArray)
    }
   
   }

const fetchMoreTelephone = () => {
  setPage(page+1)
  getTelphoneList();
    }
  

    return (
      


      <ScrollView keyboardShouldPersistTaps='always'>

{
  !loading?
  <>
        
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}} >
          
        
        <Searchbar
      placeholder="Search"
      defaultValue={searchName}
          onChangeText={text=>filter(text)}
          style={{borderWidth:0.5,width:wp("90%"),height:hp("4.5%"), flex:0.97,marginLeft:10,
          marginTop:10,padding:5,borderRadius:10}}
    />
          <TouchableOpacity style={{height:hp("6%"),flex:0.1,
          marginLeft:10,backgroundColor:"#D9D9D9",
          borderRadius:10,marginTop:5,
          paddingLeft:10,paddingRight:10,marginRight:8}}
          onPress={() => RBref.open()}>
         <Icon name="filter" size={wp("7%")} color="black" 
         style={{top:5}} />
        </TouchableOpacity>
      

        </View>
        <View style={{ borderBottomColor: 'grey',borderBottomWidth: 0.5,marginBottom:0,padding:0,margin:10}}/>
   
        <View>
{/* Whatsapp Share Block */}
<RBSheet
          ref={ref => {
            RBref1 = ref;
          }}
          openDuration={250}
          customStyles={{
            container: {
              borderTopEndRadius:20,
              borderTopStartRadius:20,
              backgroundColor:theme1.LIGHT_BLUE_COLOR
            }
          }}
        >

<View style={[styles.card,{height:hp("40%")}]}>







      <Button onPress={()=>setIsModalVisible(false)} style={{left:50}}>
      <Icon name="chevrons-down" size={wp("7%")} color="black" />
       
        </Button>
      <View style={styles.column}>
                     
    <SelectTwo items={sellerItems} selectedItem={selectedItems}
     handleId={handleSellerId} width={wp('80%')} placeholder="Seller" />


          </View>   
        
          {
       inputBox?
       <>
       <View style={{borderWidth:1,borderColor:"grey"}}></View>
       <View style={styles.column}>
    
       <TextInput
       style={[styles.input]}
       placeholder=" Mobile No."
       defaultValue={phoneNumber}
       onChangeText={text => setPhoneNumber(text)}   />
      <TouchableOpacity onPress={()=>shareToWhatsAppWithContact()}>
       <Button><Text>Share </Text></Button>
</TouchableOpacity>

</View>
    </> :<></>
     }
      </View>

          </RBSheet>
       













           <RBSheet
          ref={ref => {
            RBref = ref;
          }}
          openDuration={250}
          customStyles={{
            container: {
              borderTopEndRadius:20,
              borderTopStartRadius:20,
              backgroundColor:theme1.LIGHT_BLUE_COLOR
            }
          }}
        >



<ScrollView keyboardShouldPersistTaps='always' >
    <View style={{display:"flex",flexDirection:"row",paddingLeft:10,margin:0}}>
    <SelectTwo items={cityItems} selectedItem={selectedCityItems} handleId={handleCityId} width={wp('80%')} placeholder="City" borderColor="black"  />
          
    </View>

    <View style={[styles.column, { justifyContent: "center" }]}>

<TouchableOpacity 
                                style={styles.button1}
                              >
                                    
                                <Text style={{color:"white"}}>Show</Text>
                            </TouchableOpacity>
                      </View>

                      </ScrollView>
          </RBSheet>
       
        </View>


        <View>
        <FlatList
data={data}
renderItem={({ item, index }) => (

            <>
        <List.Section >
        <List.Accordion 
        title={`${item.party_name?item.party_name:""},${item.pcd?item.pcd.city_name.city_name:""}`}
        description={`${item.city_name?item.city_name.city_name:""} `}
        description1={`${item.mob_no?item.mob_no:""} `}
        left={props =>
        <View style={{display:"flex",flexDirection:"column",padding:10,borderRightWidth:0.6}}>
          <View style={{display:"flex",flexDirection:"row",marginBottom:10,marginRight:20}}>
  
 <WatsappIcon reverse name="whatsapp" size={wp("7%")} color="black"
  style={{marginLeft:10}}  onPress={() => handleOpenModal(item._id)} />



    </View>
        </View>
        }>

   <View style={{ borderBottomColor: 'grey',borderBottomWidth: 1,marginBottom:0,padding:0,margin:0 }}/>
     
     <View style={{backgroundColor:"#CBD9F5"}}>
            <List.Item title={`Product:${item.address1}`} style={{marginTop:5}} />
           <List.Item title={`Brand:${item.pan_no}`} />
           <List.Item title={`Packing:${item.gstin}`} />
           <List.Item title={`Quantity:${item.fssai}`} />
           <List.Item title={`Weight:${item.fssai}`}  style={{marginBottom:5}}/>
           </View>



      </List.Accordion>
      </List.Section>
        <View style={{ borderBottomColor: 'grey',borderBottomWidth: 0.5,marginBottom:0,padding:0,margin:0}}/>
         </>
        )}
        keyExtractor={(item, index) => index}
        onEndReached={fetchMoreTelephone}
        onEndReachedThreshold={0.1}
        />
       
      
          </View>






        </>:    <ActivityIndicator size="large" color="skyblue" size={100} />
     
  }
</ScrollView>
      
    )
}

export default Telephone
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  title: { backgroundColor: '#f6f8fa' },
  titleText: { textAlign:'center' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginHorizontal: 7, backgroundColor: '#c8e1ff', borderRadius: 2, justifyContent: "center" },
  btnText: { textAlign: 'center' },
  cnt: {
    flex: 1,
    padding: 32,
    paddingTop: 80,
    justifyContent: 'flex-start',
  },
  column: {
    display: "flex",
    flexDirection: "row",
},
  button1: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("95%"),
    backgroundColor: theme1.DARK_BLUE_COLOR,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom:20,
    marginLeft:10
   
},
card: {
  backgroundColor: "white",
  borderRadius: 15,
  padding: 10,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  padding: 10,
  marginBottom: 10
},
input: {
  height: 35,
  flex: 1,
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


});