import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import { List, Searchbar } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import { Button } from 'react-native-paper'
import Axios from 'axios';
import RBSheet from "react-native-raw-bottom-sheet";
import theme1 from "../components/styles/DarkTheme"
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import SelectTwo from '../components/SelectTwo'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import WatsappIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../responsiveLayout/ResponsiveLayout'
import Spinner from 'react-native-loading-spinner-overlay';
import { RadioButton } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { LineDotsLoader } from 'react-native-indicator';
import { Linking } from 'react-native';


function DealerEntryList({ navigation, route }) {

  const [isVisible, setIsVisible] = useState(false)

  const [loading, setLoading] = useState(true)

  const [tableData, setTableData] = useState()
  const [length, setLength] = useState()
  const [data, setData] = useState()


  const [tableData1, setTableData1] = useState()
  const [length1, setLength1] = useState()
  const [data1, setData1] = useState()

  const [searchName, setSearchName] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [filteredData, setFilteredData] = useState()
  
  const [filteredData1, setFilteredData1] = useState()
  const [routeName, setRouteName] = useState()
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false)

  const [selectedBuyerItems, setSelectedBuyerItems] = useState([])
  const [selectedSellerItems, setSelectedSellerItems] = useState([])

  const [selectedBuyerItems1, setSelectedBuyerItems1] = useState([])
  const [selectedSellerItems1, setSelectedSellerItems1] = useState([])

  const [selectedBrokerItems, setSelectedBrokerItems] = useState([])


  const [buyerId, setBuyerId] = useState("");
  const [selllerId, setSellerId] = useState("");

  const [buyerId1, setBuyerId1] = useState("");
  const [selllerId1, setSellerId1] = useState("");
  const [brokerId, setBrokerId] = useState("");


  const [buyerItems, setBuyerItems] = useState([])
  const [sellerItems, setSellerItems] = useState([])

  const [buyerItems1, setBuyerItems1] = useState([])
  const [sellerItems1, setSellerItems1] = useState([])

  const [brokeritems, setBrokerItems] = useState([])
  const [buyer, setBuyer] = useState()
  const [seller, setSeller] = useState()

  const [buyer1, setBuyer1] = useState()
  const [seller1, setSeller1] = useState()

  const [broker, setBroker] = useState()
  const [count, setCount] = useState(0)

  const [id, setId] = useState()
  const [isSelected, setIsSelected] = useState(true)
  const [mobile, setMobile] = useState()
  const[showInput,setShowInput]=useState(false)
  const[loadingCount,setLoadingCount]=useState(0)

  const handleBuyerId = (item) => {
    setBuyer(item.name)
    setBuyerId(item.id)
  }

  const handleSellerId = (item) => {
    setSeller(item.name)
    setSellerId(item.id)
  }

const handleShow=()=>{
  getDealerList(startDate, endDate, selectedIndex)
  getPaymentOutstanding();
}


  const handleBuyerId1 = (item) => {
    setBuyer1(item.name)
    setBuyerId1(item.id)
    setMobile(item.mobile)
    setShowInput(true)
  }

  const handleSellerId1 = (item) => {
    setSeller1(item.name)
    setSellerId1(item.id)
    setMobile(item.mobile)
    setShowInput(true)
  }
  const handleBrokerId = (item) => {
    setBroker(item.name)
    setBrokerId(item.id)
  }

  const clearAll = () => {

    setBuyerId("")
    setSellerId("")
    setBrokerId("")
    setBuyer("")
    setSeller("")
    setBroker("")
    setCount(count + 1)
  }


  useEffect(() => {
    getDealerList(startDate, endDate, selectedIndex)
  }, [count]);

  const handleSingleIndexSelect = (index) => {
    // For single Tab Selection SegmentedControlTab
    setSelectedIndex(index);
    getDealerList(startDate, endDate, index);
  };

  var RBref = useRef()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

      let todayDate = moment(new Date()).format("DD/MM/YYYY")
      let date = moment(await AsyncStorage.getItem("startingDate")).format("DD/MM/YYYY")

      setStartDate(date)
      setEndDate(todayDate)
      setRouteName(route.name)
      getDealerList(date, todayDate, 0);
    })
    return unsubscribe;
  }, [navigation])


  const getBuyers = async () => {
    const masterid = await AsyncStorage.getItem("masterid")
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    await fetch(`http://www.softsauda.com/deal_entry/party_listB?ptyp=B&masterid=${masterid}`, data)
      .then(response => response.json())
      .then(data => {

        data.results.map(dat => {
          setBuyerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name }])
          setBuyerItems1(oldArray => [...oldArray, { id: dat.id, name: dat.party_name, mobile: dat.mob_no }])

        })
      })
    getSellers()
  }


  //Seller List
  const getSellers = async () => {
    const masterid = await AsyncStorage.getItem("masterid")
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    await fetch(`http://www.softsauda.com/deal_entry/party_listS?ptyp=S&masterid=${masterid}`, data)

      .then(response => response.json())
      .then(data => {

        data.results.map(dat => {
          setSellerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name }])
          setSellerItems1(oldArray => [...oldArray, { id: dat.id, name: dat.party_name, mobile: dat.mob_no }])
        })
      })

    getBrokers()
  }

  //Sub Brokers List
  const getBrokers = async () => {
    const masterid = await AsyncStorage.getItem("masterid")
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    await fetch(`http://www.softsauda.com/deal_entry/party_subbroker?masterid=${masterid}`, data)

      .then(response => response.json())
      .then(data => {
        data.results.map(dat => (
          setBrokerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name }])

        ))
        getPaymentOutstanding()
       
      })

  }

  const getDealerList = async (start, end, index) => {

    setLoading(true)
    const masterid = await AsyncStorage.getItem("masterid")
    const compid = await AsyncStorage.getItem("companyCode")
    const divid = await AsyncStorage.getItem("divisionCode")
    var bk;
    if (index == 0) {
      bk = "DE"
    }
    else if (index == 1) {
      bk = "SD"
    }
    else if (index == 2) {
      bk = "DLV"
    }
    Axios({
      method: 'POST',
      url: `http://www.softsauda.com/deal_entry/appdealentry_list?masterid=${masterid}`,
      data: {
        'masterid': masterid,
        'compid': compid,
        'divid': divid,
        'main_bk': bk,
        'start_date': start,
        'end_date': end,
        'sl_code': selllerId,
        'sb_code': brokerId,
        'br_code': buyerId,
        'bb_code': brokerId
      }
    })
      .then(response => {
        setLength(response.data.data.length)
        setData(response.data.data)
        setTableData(response.data.data)
        setFilteredData(response.data.data)
        if(loadingCount==1)
        { 
              setLoading(false)
        }
       else{
         getBuyers()
       }

      })

  }


  //Payment Outstanding
  const getPaymentOutstanding = async () => {
    setLoading(true);
    let todayDate = moment(new Date()).format("DD/MM/YYYY")
    let date = moment(await AsyncStorage.getItem("startingDate")).format("DD/MM/YYYY")
    const masterid = await AsyncStorage.getItem("masterid")
    const compid = await AsyncStorage.getItem("companyCode")
    const divid = await AsyncStorage.getItem("divisionCode")
    var bk;
    Axios({
      method: 'POST',
      url: `http://www.softsauda.com/sauda_register/apipendingoutstading?sl_code&sb_code&start_date=${date}&end_date=${todayDate}&masterid=${masterid}&compid=${compid}&divid=${divid}`,
      data: {
        "slcode" : "",
        "sl_code" : selllerId,
        "sbcode" : "",
        "sb_code" :brokerId ,
        "brcode" : "",
        "br_code" :buyerId,
        "bbcode" :"",
        "bb_code" :brokerId,
        "pendingdelv":"",
        "sl_brok":"",
        "start_date": date,
        "end_date": todayDate,
        "wghtbalform": "",
        "wghtbalto": "",
       "masterid":masterid,
       "compid":compid,
       "divid":divid
      }
    })
      .then(response => {
        setFilteredData1(response.data.hhtml)
        setData1(response.data.hhtml)
        setTableData1(response.data.hhtml)
        setLoadingCount(1)
        setLoading(false)
      })

  }









  const filter = (text) => {

    if(selectedIndex!==3)
    {
    const array = [...tableData]
    const newArray = array.filter(table => (
      ((table.br_code).toLowerCase()).includes(text.toLowerCase())) || ((table.sl_code).toLowerCase()).includes(text.toLowerCase())
      )
    setFilteredData(newArray)
    }
    else{
      
    const array = [...tableData1]
    const newArray = array.filter(table => (
      ((table.br_code).toLowerCase()).includes(text.toLowerCase())) || ((table.sl_code).toLowerCase()).includes(text.toLowerCase())
      )
    setFilteredData1(newArray)
    }

  }



  const handleModal = (id) => {
    setIsVisible(true)
    setId(id)
  }




  const handleWhatsapp = () => {
    setIsVisible(true)
    setLoading(true)
    const getUrl = async () => {
      const URL = `http://www.softsauda.com/contract_sauda/apicontractregisterprintpdf/` + id + `&printurl=` + await AsyncStorage.getItem("printurl")

      Axios.get(URL)
        .then(response => {
          setLoading(false)
          Linking.openURL(`whatsapp://send?text=${response.data.path}="&phone=+91${mobile}`)
        })
    }
    getUrl();
  }

  const handleShare = (id) => {
    const getUrl = async () => {


      setLoading(true)
      const URL = `http://www.softsauda.com/contract_sauda/apicontractregisterprintpdf/` + id + `&printurl=` + await AsyncStorage.getItem("printurl")
      Axios.get(URL)
        .then(response => {
          loadAndSharePDF(response.data.path)
        })
    }
    getUrl();

  }



  async function loadAndSharePDF(path) {
    
    const { uri: localUri } = await FileSystem.downloadAsync(
      path,
      FileSystem.documentDirectory + 'Contract Register.pdf'
    ).catch((error) => {
      console.error(error)
    })


    setLoading(false)
    await Sharing.shareAsync(localUri)

      .catch((err) => console.log('Sharing::error', err))


  }


  return (



    <ScrollView keyboardShouldPersistTaps='always' >
      {/*handle Modal */}

      <Modal isVisible={isVisible}>
        <View style={styles.card}>

          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setIsVisible(false)} >
              <Text style={{margin:10,padding:10,fontSize:15}}>Close</Text>
            </TouchableOpacity>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
              <View style={{ display: "flex", flexDirection: "row", marginRight: 10 }}>
                <Checkbox
                  status={isSelected ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setIsSelected(!isSelected);
                  }}
                />
                <Text style={{ color: "black", top: 10 }}>Buyer</Text>

              </View>
              <View style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}>

                <Checkbox
                  status={!isSelected ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setIsSelected(!isSelected);
                  }}
                />

                <Text style={{ color: "black", top: 10 }}>Seller</Text>

              </View>
            </View>
            {
              isSelected &&
              <View style={[styles.column, { width: wp("90%") }]}>
                <SelectTwo items={buyerItems1} selectedItem={selectedBuyerItems1} handleId={handleBuyerId1} width={wp('80%')} placeholder="Buyer" borderColor="black" defaultValue={buyer1} />
              </View>
            }
            {
              !isSelected &&
              <View style={[styles.column, { width: wp("90%") }]}>
                <SelectTwo items={sellerItems1} selectedItem={selectedSellerItems1} handleId={handleSellerId1} width={wp('80%')} placeholder="Seller" borderColor="black" defaultValue={seller1} />
              </View>
            }
{
  showInput&&
  <>
        <TextInput
       style={[styles.input1]}
       placeholder=" Mobile No."
       defaultValue={mobile}
       onChangeText={text => setMobile(text)}   />
   

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>

              <TouchableOpacity
                style={styles.button2}
                onPress={()=>handleWhatsapp()}
              >

                <Text style={{ color: "white" }}>Share</Text>
              </TouchableOpacity>

            </View>
            </>
}
          </View>
        </View>
      </Modal>


      <View style={{ backgroundColor: "#CBD9F5", borderRadius: 6, margin: 10 }}>
        <SegmentedControlTab
          values={['Deal', 'Contract', 'Delivery', 'Payment']}
          selectedIndex={selectedIndex}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          onTabPress={handleSingleIndexSelect}
        />
      </View>

      {
        !loading ?
          <>

            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 0, padding: 0, margin: 0 }} />

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

              <Searchbar
                placeholder="Search"
                defaultValue={searchName}
                onChangeText={text => filter(text)}
                style={{
                  borderWidth: 0.5, width: wp("90%"), height: hp("4.5%"), flex: 0.95, marginLeft: 10,
                  marginTop: 10, padding: 5, borderRadius: 10
                }}
              />
              <TouchableOpacity style={{
                height: hp("6%"), flex: 0.1,
                marginLeft: 10, backgroundColor: "#D9D9D9",
                alignItems: "center",
                padding: 5, borderRadius: 10, marginTop: 5,
                paddingLeft: 5, paddingRight: 5, marginRight: 5
              }}
                onPress={() => RBref.open()}>
                <Icon name="filter" size={wp("7%")} color="black"
                  style={{ top: 5 }} />
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 0, padding: 0, margin: 10 }} />

            <View>
{selectedIndex!==3?
              <FlatList
                data={filteredData}
                renderItem={({ item, index }) => (
                  <>
                    <List.Section style={{ top: 8 }} >
                      <List.Accordion
                        title={`Seller Name:${item.sl_code}`}
                        description={`Buyer Name:${item.br_code}`}
                     
                        left={props =>
                          <View style={{ display: "flex", flexDirection: "column", padding: 10, borderRightWidth: 0.6 }}>
                            {selectedIndex == 1 ?
                              <View style={{ display: "flex", flexDirection: "row", marginBottom: 10, marginRight: 20 }}>

                                <WatsappIcon reverse name="whatsapp" size={wp("7%")} color="black"
                                  style={{ marginLeft: 0, marginRight: 10 }} onPress={() => handleModal(item.id)} />


                                <Icon reverse name="share" size={wp("7%")}
                                  onPress={() => handleShare(item.id)} style={{ marginLeft: 10 }} />


                              </View> :
                              <Text style={{ fontSize: 15 }}>{item.vouc_code}.</Text>

                            }
                            <Text style={{ fontSize: 10 }}>{((item.sd_date).substring(0, 10)).split('-').reverse().join('/')}</Text>
                          </View>
                        }>

                        {item.cs_group.map((prod, i) => (
                          <>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 0, padding: 0, margin: 0 }} />

                            <View style={{ flex: 1, flexDirection: "row", backgroundColor: theme1.MEDIUM_BLUE_COLOR }}>

                              <List.Item title={i == 0 ? "Product" : ""} description={prod.pcode} index={i} style={{ marginTop: 5, flex: 0.25, borderRightWidth: 0.8 }} />
                              <List.Item title={i == 0 ? "Brand" : ""} index={i} description={prod.brandcode} style={{ marginTop: 5, flex: 0.25, borderRightWidth: 0.8 }} />
                              <List.Item title={i == 0 ? "Pack" : ""} index={i} description={prod.pcks} style={{ marginTop: 5, flex: 0.18, borderRightWidth: 0.8 }} />
                              <List.Item title={i == 0 ? "Qty" : ""} index={i} description={prod.qty} style={{ marginTop: 5, flex: 0.2, borderRightWidth: 0.8 }} />
                              <List.Item title={i == 0 ? "Wght" : ""} index={i} description={prod.wghts} style={{ marginTop: 5, flex: 0.2, borderRightWidth: 0.8 }} />
                              <List.Item title={i == 0 ? "Rate" : ""} index={i} description={`₹${prod.sdrate}`} style={{ marginTop: 5, flex: 0.26 }} />

                            </View>

                          </>

                        ))}
                      </List.Accordion>
                    </List.Section>
                    <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 0, padding: 0, margin: 0 }} />
                  </>
                )}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.1}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} //Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                updateCellsBatchingPeriod={100} // Increase time between renders
                windowSize={7}
              />:   
              <>
              <FlatList
              data={filteredData1}
              renderItem={({ item, index }) => (
                <>
                  <List.Section style={{ top: 8 }} >
                    <List.Accordion
                      title={`Seller Name:${item.sl_code}`}
                      description={`Buyer Name:${item.br_code}`}
                      description1={`₹ ${item.cs_group[0].totamt_bal} `}
       
                      left={props =>
                        <View style={{ display: "flex", flexDirection: "column", padding: 10, borderRightWidth: 0.6 }}>
                          {selectedIndex == 1 ?
                            <View style={{ display: "flex", flexDirection: "row", marginBottom: 10, marginRight: 20 }}>

                              <WatsappIcon reverse name="whatsapp" size={wp("7%")} color="black"
                                style={{ marginLeft: 0, marginRight: 10 }} onPress={() => handleModal(item.id)} />


                              <Icon reverse name="share" size={wp("7%")}
                                onPress={() => handleShare(item.id)} style={{ marginLeft: 10 }} />


                            </View> :
                            <Text style={{ fontSize: 15 }}>{item.vouc_code}.</Text>

                          }
                          <Text style={{ fontSize: 10 }}>{((item.sd_date).substring(0, 10)).split('-').reverse().join('/')}</Text>
                        </View>
                      }>

                      {item.cs_group.map((prod, i) => (
                        <>
                          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 0, padding: 0, margin: 0 }} />

                          <View style={{ flex: 1, flexDirection: "row", backgroundColor: theme1.MEDIUM_BLUE_COLOR }}>

                            <List.Item title={i == 0 ? "Bargain Amt" : ""} description={`₹${prod.barg_amt}`} index={i} style={{ marginTop: 5, flex: 0.27, borderRightWidth: 0.8 }} />
                            <List.Item title={i == 0 ? "Rec. Amt" : ""} index={i} description={`₹${prod.totamt_rec}`} style={{ marginTop: 5, flex: 0.25, borderRightWidth: 0.8 }} />
                            <List.Item title={i == 0 ? "Discount" : ""} index={i} description={`₹${prod.totexp_rec}`} style={{ marginTop: 5, flex: 0.25, borderRightWidth: 0.8 }} />
                            <List.Item title={i == 0 ? "Balance" : ""} index={i} description={`₹${prod.totamt_bal}`} style={{ marginTop: 5, flex: 0.25, borderRightWidth: 0.8 }} />
                          
                          </View>

                        </>

                      ))}
                    </List.Accordion>
                  </List.Section>
                  <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 0, padding: 0, margin: 0 }} />
                </>
              )}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              removeClippedSubviews={true} // Unmount components when outside of window 
              initialNumToRender={2} //Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={100} // Increase time between renders
              windowSize={7}
            />
              
              </>
              
              
              }






              <RBSheet
                animationType="fade"
                ref={ref => {
                  RBref = ref;
                }}
                openDuration={250}
                customStyles={{
                  container: {
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                    backgroundColor: theme1.LIGHT_BLUE_COLOR,
                    height: hp("40%")
                  }
                }}
              >
                <ScrollView keyboardShouldPersistTaps='always' >
                  <View style={{ display: "flex", flexDirection: "row", paddingLeft: 10 }}>
                    <Text style={{ width: wp("10%"), flex: 0.35, marginTop: 22, fontSize: (wp("3%")) }}>Start Date:</Text>
                    <DatePicker

                      style={{ width: wp('80%'), borderRadius: 5, margin: 10, flex: 0.65 }}
                      date={startDate}
                      mode="date"
                      placeholder="Date"
                      format="DD/MM/YYYY"

                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 40000,
                          top: 9,
                          marginLeft: 0,
                          height: hp("2.8%"),
                          width: wp("3.5%")

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
                    <Text style={{ width: wp("10%"), flex: 0.3, marginTop: 22, fontSize: wp("3%") }}>End Date:</Text>
                    <DatePicker

                      style={{ width: wp('80%'), borderRadius: 5, margin: 10, flex: 0.7 }}
                      date={endDate}
                      mode="date"
                      placeholder="Date"
                      format="DD/MM/YYYY"

                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {

                          position: 'absolute',
                          left: 40000,
                          top: 9,
                          marginLeft: 0,
                          height: hp("2.8%"),
                          width: wp("3.5%")
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

                  <View style={[styles.column]}>
                    <SelectTwo items={buyerItems} selectedItem={selectedBuyerItems} handleId={handleBuyerId} width={wp('80%')} placeholder="Buyer" borderColor="black" defaultValue={buyer} />
                  </View>
                  <View style={styles.column}>
                    <SelectTwo items={sellerItems} selectedItem={selectedSellerItems} handleId={handleSellerId} width={wp('80%')} placeholder="Seller" borderColor="black" defaultValue={seller} />
                  </View>


                  <View style={styles.column}>
                    <SelectTwo items={brokeritems} selectedItem={selectedBrokerItems} handleId={handleBrokerId} width={wp('80%')} placeholder="Buyer Broker" borderColor="black" defaultValue={broker} />
                  </View>
                  <View style={styles.column}>
                    <SelectTwo items={brokeritems} selectedItem={selectedBrokerItems} handleId={handleBrokerId} width={wp('80%')} placeholder="Seller Broker" borderColor="black" defaultValue={broker} />
                  </View>


                  <View style={[styles.column, { justifyContent: "center" }]}>


                    <TouchableOpacity style={styles.button1} onPress={() => handleShow()}>

                      <Text style={{ color: "white" }}>Show</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => clearAll()}>

                      <Text style={{ color: "white" }}>Clear All</Text>
                    </TouchableOpacity>

                  </View>
                </ScrollView>
              </RBSheet>
            </View>

          </> :
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 150 }}>
            <LineDotsLoader size="medium" size={20} />
          </View>


      }

    </ScrollView>

  )
}

export default DealerEntryList
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  title: { backgroundColor: '#f6f8fa' },
  titleText: { textAlign: 'center' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginHorizontal: 7, backgroundColor: '#c8e1ff', borderRadius: 2, justifyContent: "center" },
  btnText: { textAlign: 'center' },
  cnt: {
    flex: 1,
    padding: 32,
    paddingTop: 80,
    justifyContent: 'flex-start',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  tabStyle: {
    borderColor: theme1.MEDIUM_BLUE_COLOR,
  },
  activeTabStyle: {
    backgroundColor: theme1.MEDIUM_BLUE_COLOR,
  },
  button1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: wp("40%"),
    backgroundColor: theme1.DARK_BLUE_COLOR,
    padding: 10,
    paddingHorizontal: 25,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,

  },
  column: {
    display: "flex",
    flexDirection: "row",

  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    height: hp("50%"),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 10,
    marginBottom: 5,
    marginTop: 10,
    alignItems: "center"
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("70%"),
    top: 4,
    left: 0,
    backgroundColor: theme1.DARK_BLUE_COLOR,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  input1: {
    height: 35,
    width: wp('80%'),
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