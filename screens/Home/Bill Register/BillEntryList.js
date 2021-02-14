import React,{useState,useEffect,useRef} from 'react'
import { View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,Linking,FlatList} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import { List, Searchbar } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import {Button} from 'react-native-paper'
import Axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import WatsappIcon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/Feather';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import { LineDotsLoader } from 'react-native-indicator';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../responsiveLayout/ResponsiveLayout'
import SelectTwo from '../../components/SelectTwo';



function BillEntryList({navigation,route}) {


  const[loading,setLoading]=useState(false)
  const[tableData,setTableData]=useState()
  const[data,setData]=useState()
  const[length,setLength]=useState()
  const[partyName,setPartyName]=useState()
  const[division,setDivision]=useState()
  const[startDate,setStartDate]=useState()
  const[endDate,setEndDate]=useState()
  const[filteredData,setFilteredData]=useState()
  const[routeName,setRouteName]=useState()
  const[searchName,setSearchName]=useState()
  const[page,setPage]=useState(1)
  const [selectedBuyerItems, setSelectedBuyerItems] = useState([])
  const [selectedSellerItems, setSelectedSellerItems] = useState([])
 

  const [buyerId, setBuyerId] = useState("");
  const [selllerId, setSellerId] = useState("");
 

  const [buyerItems, setBuyerItems] = useState([])
  const [sellerItems, setSellerItems] = useState([])
  

  const [buyer,setBuyer]=useState()
  const[seller,setSeller]=useState()
 

  const handleBuyerId = (item) => {
    setBuyer(item.name)
    setBuyerId(item.id)
    }

 const handleSellerId = (item) => {
    setSeller(item.name)
    setSellerId(item.id)
}





const clearAll=()=>{
  setBuyerId("")
  setSellerId("")
  setBuyer("")
  setSeller("")
}


  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleWhatsapp=(id,mobile)=>{
    setLoading(true)
    const URL=`http://www.softsauda.com/bill_ragister/billregisterprintpdf/`+id
    axios.get(URL)
    .then(response => {
     setLoading(false)
    Linking.openURL(`whatsapp://send?text=${response.data.path}&phone=+91${mobile}`)
    })
  
  }

  const handleShare=(id)=>{
    setLoading(true)
    const URL=`http://www.softsauda.com/bill_ragister/billregisterprintpdf/`+id
    axios.get(URL)
    .then(response => {
    loadAndSharePDF(response.data.path)
    })


  }
  


  async function loadAndSharePDF(path) {
    const {uri: localUri} = await FileSystem.downloadAsync(
      path,
      FileSystem.documentDirectory + 'Bill Register.pdf'
    ).catch((error) => {
      console.error(error)
    })
    
    
      setLoading(false)
      await Sharing.shareAsync(localUri)

      .catch((err) => console.log('Sharing::error', err))
  
  
  }
  useEffect(()=>{
    const unsubscribe =navigation.addListener('focus', async() => {
      
      let todayDate=moment(new Date()).format("DD/MM/YYYY")
      let date= moment(await AsyncStorage.getItem("startingDate")).format("DD/MM/YYYY")
      
       setStartDate(date)
       setEndDate(todayDate)
       setRouteName(route.name)
       getDealerList(date,todayDate)
      })
      return unsubscribe;
    },[navigation])


    var RBref=useRef()

  
  //Seller List
  

  const getDealerList=async(start,end)=>{
    setLoading(true)
    const masterid = await AsyncStorage.getItem("masterid")
    const compid = await AsyncStorage.getItem("companyCode")
    const divid = await AsyncStorage.getItem("divisionCode")
 
    Axios({
      method: 'POST',
      url: `http://www.softsauda.com/bill_ragister/apibillregdetail`,
      data: {
        "cocode":compid,
        "divid":divid,
         "start_date":start,
        "end_date":end
    }
  })
      .then(response=>{
        
          setLength(response.data.data.length)
          setData(response.data.data)
          response.data.data.map(dat => (
            setBuyerItems(oldArray => [...oldArray, { id: dat.pcd?dat.pcd.id:"", name: dat.pcd?dat.pcd.party_name:"" +","+dat.pcd?dat.pcd?.city_name?.city_name:""}])
          ))
    



          setTableData(response.data.data)
          setFilteredData(response.data.data)
          setLoading(false)
        })
   .catch(error=>console.log("error",error))
    
  }
  

  const filter=(text)=>{
    const array=[...tableData]
    const newArray=array.filter(table =>((table.pcd?table.pcd.party_name:"").toLowerCase()).includes(text.toLowerCase()))
    setFilteredData(newArray)
   }

 
    return (
      


      <ScrollView  keyboardShouldPersistTaps='always'>

{
  !loading?
  <>
        
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
          


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
        
 <FlatList
data={filteredData}
renderItem={({ item, index }) => (
  
            <>
        <List.Section >
        <List.Accordion 
        title={`${item.pcd?item.pcd.party_name:""},${item.pcd?item.pcd.city_name.city_name:""}`}
        description={`${item.bill_divcode.div_mast} `}
        description1={`₹ ${item.amount} `}
        left={props =>
        <View style={{display:"flex",flexDirection:"column",padding:10,borderRightWidth:0.6}}>
          <View style={{display:"flex",flexDirection:"row",marginBottom:10,marginRight:20}}>

          <WatsappIcon reverse name="whatsapp" size={wp("7%")} color="black"
          style={{marginLeft:0,marginRight:10}}  onPress={() => handleWhatsapp(item._id,item.pcd.mob_no)} />


          <Icon reverse name="share" size={wp("7%")} 
           onPress={() => handleShare(item._id)} style={{marginLeft:10}}  />   


    </View>
     <Text style={{fontSize:10}}>{((item.d_a_t_e).substring(0,10)).split('-').reverse().join('/')}</Text>
        </View>
        }>
{/*
<>
{ dat.cs_group.map((prod,i)=>(
  <>
   <View style={{ borderBottomColor: 'grey',borderBottomWidth: 1,marginBottom:0,padding:0,margin:0 }}/>
     
     <View style={{backgroundColor:"#CBD9F5"}}>
            <List.Item title={`Product:${prod.pcode}`} style={{marginTop:5}} />
           <List.Item title={`Brand:${prod.brandcode}`} />
           <List.Item title={`Packing:${prod.pcks}`} />
           <List.Item title={`Quantity:${prod.qty}`} />
           <List.Item title={`Weight:${prod.wghts}`}  style={{marginBottom:5}}/>
           </View>

        </>
           
           ))}

           </>
           */ }

      </List.Accordion>
      </List.Section>
        <View style={{ borderBottomColor: 'grey',borderBottomWidth: 0.5,marginBottom:0,padding:0,margin:0}}/>
         </>
         )}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true} // Unmount components when outside of window 
        initialNumToRender={10} //Reduce initial render amount
        maxToRenderPerBatch={10} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        initialNumToRender={2} //Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        windowSize={7} 
        />




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
<View style={{display:"flex",flexDirection:"row",paddingLeft:10}}>
<Text style={{width:wp("10%"),flex:0.25,marginTop:17}}>Start Date:</Text>
      <DatePicker

style={{ width: wp('80%'), borderRadius: 5, margin: 10 ,flex:0.75}}
date={startDate}
mode="date"
placeholder="Date"
format="DD/MM/YYYY"

confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{
    dateIcon: {
        position: 'absolute',
        left: 10,
        top: 9,
        marginLeft: 0,
        height:hp("2.8%"),
        width:wp("3.5%")

    },
    dateInput: {
        borderRadius: 10,
        marginRight: 15,
        height: hp("4%")

    }
    // ... You can check the source to find the other keys.
}}
onDateChange={(date) => {
    setStartDate(date)
}}
/>
</View>


<View style={{display:"flex",flexDirection:"row",paddingLeft:10,margin:0,top:-hp("3%")}}>
<Text style={{width:wp("10%"),flex:0.25,marginTop:17}}>End Date:</Text>
      <DatePicker

style={{ width: wp('80%'), borderRadius: 5, margin: 10 ,flex:0.75}}
date={endDate}
mode="date"
placeholder="Date"
format="DD/MM/YYYY"

confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{
    dateIcon: {
       
      position: 'absolute',
      left: 10,
      top: 9,
      marginLeft: 0,
      height:hp("2.8%"),
      width:wp("3.5%")
    },
    dateInput: {
      borderRadius: 10,
      marginRight: 15,
      height: hp("4%")
               }
    // ... You can check the source to find the other keys.
}}
onDateChange={(date) => {
    setEndDate(date)
}}
/>
</View>
<View style={[styles.column,{top:-30}]}>
<SelectTwo items={buyerItems} selectedItem={selectedBuyerItems} handleId={handleBuyerId} width={wp('80%')} placeholder="Buyer" borderColor="black" defaultValue={buyer} />
                </View>
 
                <View style={[styles.column, { justifyContent: "center" }]}>

          
<TouchableOpacity style={styles.button2} onPress={() => getDealerList(startDate, endDate) }>

  <Text style={{ color: "white" }}>Show</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button2} onPress={() => clearAll() }>

<Text style={{ color: "white" }}>Clear All</Text>
</TouchableOpacity>

</View>
</ScrollView>
          </RBSheet>
       
      
          </View>

        </>:   
        
      <View style={{alignItems:"center",justifyContent:"center",marginTop:150}}>        
        <LineDotsLoader size="medium" size={20} />
      </View>

  }
</ScrollView>
      
    )
}

export default BillEntryList
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  title: { backgroundColor: '#f6f8fa' },
  titleText: { textAlign:'center' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginHorizontal: 7, backgroundColor: '#c8e1ff', borderRadius: 2, justifyContent: "center" },
  btnText: { textAlign: 'center' },
  pdf: {
    flex:1,
    width:wp("100%"),
    height:hp("100%"),
},
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
button2: {
  flex:1,
  alignItems: "center",
  justifyContent: "center",
  width: wp("40%"),
  backgroundColor: theme1.DARK_BLUE_COLOR,
  padding: 10,
  paddingHorizontal: 25,
  marginHorizontal:20,
  borderRadius: 10,
  marginBottom: 20,

},
  button1: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("95%"),
    backgroundColor: theme1.DARK_BLUE_COLOR,
    padding: 10,
    top:-hp("3%"),
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom:20,
    marginLeft:10
   
},
});