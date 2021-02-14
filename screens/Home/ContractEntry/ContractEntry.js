import React, { Component, useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Button, ActivityIndicator, Dimensions } from 'react-native';
import { Form, Input, Label, Item } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
import SearchableDropdown from 'react-native-searchable-dropdown';
import SelectTwo from '../../components/SelectTwo'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import moment from 'moment'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { number } from 'prop-types';
import Toast from 'react-native-simple-toast';
import * as Updates from 'expo-updates'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../responsiveLayout/ResponsiveLayout'
import theme1 from '../../components/styles/DarkTheme'
import Autocomplete from 'react-native-autocomplete-input';
import { Checkbox } from 'react-native-paper';
import { LineDotsLoader } from 'react-native-indicator';
const { width, height } = Dimensions.get('window')

function ContractEntry({ navigation, route }) {


    const [isSMSSeller, setIsSMSSeller] = useState(false)
    const [isSMSBuyer, setIsSMSBuyer] = useState(false)
    const [isMailSeller, setIsMailSeller] = useState(false)
    const [isMailBuyer, setIsMailBuyer] = useState(false)



    const [dealNumberOne, setDealNumberOne] = useState("")
    const [dealNumberTwo, setDealNumberTwo] = useState("")
    const [poNumber, setPoNumber] = useState("")
    const [topRemarks, setTopRemarks] = useState("")
    const [deliveryDetailsArray, setDeliveryDetailsArray] = useState([])
    const [deliveryDetails, setDeliveryDetails] = useState("")
    const [discount, setDiscount] = useState("")
    const [credit, setCredit] = useState("")
    const [paymentDetailsArray, setPaymentDetailsArray] = useState([])
    const [paymentDetails, setPaymentDetails] = useState("")
    const [packingDetailsArray, setPackingDetailsArray] = useState([])
    const [packingDetails, setPackingDetails] = useState("")
    const [TermsArray, setTermsArray] = useState([{ id: "", name: "" }])
    const [Terms, setTerms] = useState({ id: "", name: "" })

    const [remarks, setRemarks] = useState("")

    const [selectedBuyerItems, setSelectedBuyerItems] = useState([])
    const [selectedSellerItems, setSelectedSellerItems] = useState([])
    const [selectedSellerBrokerItems, setSelectedSellerBrokerItems] = useState([])
    const [selectedBuyerBrokerItems, setSelectedBuyerBrokerItems] = useState([])
    const [selectedProductItems, setSelectedProductItems] = useState([])
    const [selectedBrandItems, setSelectedBrandItems] = useState([])
    const [selectedPartyTermItems, setSelectedPartyTermItems] = useState([])
    const [selectedStationItems, setSelectedStationItems] = useState([])
    const [selectedToItems, setSelectedToItems] = useState([])


    const [termId, setTermId] = useState("")

    const [buyerId, setBuyerId] = useState("");
    const [selllerId, setSellerId] = useState("");
    const [sellerBrokerId, setSellerBrokerId] = useState("");
    const [buyerBrokerId, setBuyerBrokerId] = useState("");
    const [productId, setProductId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [cityId, setCityId] = useState("");
    const [partyTermId, setPartyTermId] = useState("")
    const [stationId, setStationId] = useState("")
    const [toId, setToId] = useState("")

    const [date, setDate] = useState("");
    const [poDate, setPoDate] = useState("");

    const [periodUptoDate, setPeriodUptoDate] = useState("")

    const [buyerItems, setBuyerItems] = useState([])
    const [sellerItems, setSellerItems] = useState([])
    const [sellerBrokeritems, setSellerBrokerItems] = useState([])
    const [buyerBrokeritems, setBuyerBrokerItems] = useState([])
    const [productItems, setProductItems] = useState([])
    const [brandItems, setBrandItems] = useState([])
    const [cityItems, setCityItems] = useState([])
    const [partyTermItems, setPartyTermItems] = useState([])
    const [stationItems, setStationItems] = useState([])
    const [toItems, setToItems] = useState([])
    const [brokerType, setBrokerType] = useState()
    const [packItems, setPackItems] = useState([])
    const [packValue, setpackvalue] = useState()
    const [weight, setWeight] = useState()

    const [loading, setLoading] = useState(false)
    const [contract_sauda_group, setProductList] = useState([{ p_code: "", bag: "", pck: "", sd_rate: "", slbrk_rt: "", brbrk_rt: "", amount: "", wght: "", brbrk_typ: "", slbrk_type: "", brbrk_amt: "", slbrk_amt: "" }])

    const [buyerBrokerage, setBuyerBrokerage] = useState("")
    const [sellerBrokerage, setSellerBrokerage] = useState("")
    const [buyerBrokerageType, setBuyerBrokerageType] = useState("")
    const [sellerBrokerageType, setSellerBrokerageType] = useState("")
    const [buyerBrokerageAmount, setBuyerBrokerageAmount] = useState("")
    const [sellerBrokerageAmount, setSellerBrokerageAmount] = useState("")

    const [bag, setBag] = useState("")
    const [amount, setAmount] = useState("")
    const [rate, setRate] = useState("")

    const [productRemarks, setProductRemarks] = useState("")
    const [disabled, setDisabled] = useState(true)

    const [show, setShow] = useState(true)
    const [show1, setShow1] = useState(true)
    const [show2, setShow2] = useState(true)


    const [selectedIndex, setSelectedIndex] = useState(0);
    // Refs

    const [buyer, setBuyer] = useState("")
    const [seller, setSeller] = useState("")
    const [sellerBroker, setSellerBroker] = useState("")
    const [buyerBroker, setBuyerBroker] = useState("")
    const [stationCity, setStationCity] = useState("")
    const [toCity, setToCity] = useState("")
    const [partyTerm, setPartyTerm] = useState("")
    const [station, setStation] = useState("")
    const [to, setTo] = useState("")


    const [deliveryLoading, setDeliveryLoading] = useState("")
    const dealOneRef = useRef()
    const dealTwoRef = useRef()
    const remarksRef = useRef()
    const billNumberRef = useRef()
    const bagRefs = useRef([])
    const rateRef = useRef([])
    const amountRef = useRef([])
    const buyerBrokerageRef = useRef([])
    const sellerBrokerageRef = useRef([])
    const productRemarksRef = useRef([])
    const dateRef = useRef()
    const deliveryDetailsRef = useRef([])
    const packingDetailsRef = useRef([])
    const paymentDetailsRef = useRef([])
    const discountRef = useRef([])
    const creditRef = useRef([])
    const termsRef = useRef([])
    const remarkRef = useRef([])


    const [filteredPaymentDetailsArray, setFilteredPaymentDetailsArray] = useState([]);
    const [filteredDeliveryDetailsArray, setFilteredDeliveryDetailsArray] = useState([]);
    const [filteredPackingDetailsArray, setFilteredPackingDetailsArray] = useState([]);
    const [filteredTermsArray, setFilteredTermsArray] = useState([{ id: "", name: "" }]);



    const findPaymentDetails = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredPaymentDetailsArray(
                paymentDetailsArray.filter((payment) => payment.search(regex) >= 0)
            );
        } else {
            setFilteredPaymentDetailsArray([]);
        }
    };


    const findDeliveryDetails = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredDeliveryDetailsArray(
                deliveryDetailsArray.filter((payment) => payment.search(regex) >= 0)
            );
        } else {
            setFilteredDeliveryDetailsArray([]);
        }
    };

    const findPackingDetails = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredPackingDetailsArray(
                packingDetailsArray.filter((payment) => payment.search(regex) >= 0)
            );
        } else {
            setFilteredPackingDetailsArray([]);
        }
    };


    const findTerms = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredTermsArray(
                TermsArray.filter((payment) => payment.name.search(regex) >= 0)
            );
        } else {
            setFilteredTermsArray([]);
        }
    };

    // City List
    const getCity = async () => {
        const URL = `http://www.softsauda.com/add_city/getcitylist`
        axios.get(URL)
            .then(response => {
                response.data.city_name.map(dat => (
                    setStationItems(oldArray => [...oldArray, { id: dat._id, name: dat.city_name }]),
                    setToItems(oldArray => [...oldArray, { id: dat._id, name: dat.city_name }])
                ))

                getPartyTerm()
            })
    }


    //Party Term
    const getPartyTerm = async () => {
        const masterid = await AsyncStorage.getItem("masterid")
        const URL = ` http://www.softsauda.com/contract_sauda/getpartyterm?masterid=${masterid}`
        axios.get(URL)
            .then(response => {
                response.data.term_name.map(dat => (
                    setPartyTermItems(oldArray => [...oldArray, { id: dat._id, name: dat.term_name }])
                ))
                getNarration()
            })
    }


    //Get Narration
    const getNarration = async () => {
        const masterid = await AsyncStorage.getItem("masterid")
        const URL = ` http://www.softsauda.com/contract_sauda/getnarration?masterid=${masterid}&type=Contact Form`
        axios.get(URL)
            .then(response => {
                response.data.narration_name.map(dat => (
                    setTermsArray(oldArray => [...oldArray, { id: dat._id, name: dat.narration_name }])
                ))


            })
        axios.get(` http://www.softsauda.com/contract_sauda/getnarration?masterid=${masterid}&type=Payment Entry`)
            .then(response => {
                response.data.narration_name.map(dat => (
                    setPaymentDetailsArray(oldArray => [...oldArray, dat.narration_name])
                ))


            })
        axios.get(` http://www.softsauda.com/contract_sauda/getnarration?masterid=${masterid}&type=Delivery Entry`)
            .then(response => {
                response.data.narration_name.map(dat => (
                    setDeliveryDetailsArray(oldArray => [...oldArray, dat.narration_name])
                ))


            })
        axios.get(` http://www.softsauda.com/contract_sauda/getnarration?masterid=${masterid}&type=Packing`)
            .then(response => {
                response.data.narration_name.map(dat => (
                    setPackingDetailsArray(oldArray => [...oldArray, dat.narration_name])
                ))
                getDealerList()

            })
    }


    const handleSingleIndexSelect = (index) => {
        // For single Tab Selection SegmentedControlTab
        setSelectedIndex(index);
    };


    //OnFocus

    const onFocusChange = (name, i) => {
        if (name == "dealOne") {

            dealOneRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "dealTwo") {
            dealTwoRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "remarks") {
            remarksRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "billNumber") {
            billNumberRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "bag") {
            (bagRefs.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "rate") {
            (rateRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "amount") {
            (amountRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "buyerBrokerage") {
            (buyerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "sellerBrokerage") {
            (sellerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "productRemarks") {
            (productRemarksRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "deliveryDetails") {
            (deliveryDetailsRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "discount") {
            (discountRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "credit") {
            (creditRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "paymentDetails") {
            (paymentDetailsRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }

        else if (name == "packingDetails") {
            (packingDetailsRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "terms") {
            (termsRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "remarks1") {
            (remarkRef.current).setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }

    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let todayDate = moment(new Date()).format("DD/MM/YYYY")

            setDate(todayDate)

        })
        return unsubscribe;
    }, [navigation])

    const onBlurChange = (name, i) => {

        if (name == "dealOne") {
            dealOneRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "dealTwo") {

            dealTwoRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "remarks") {
            remarksRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "billNumber") {
            billNumberRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "bag") {

            (bagRefs.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "rate") {
            (rateRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "amount") {
            (amountRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "buyerBrokerage") {
            (buyerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "sellerBrokerage") {
            (sellerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "productRemarks") {
            (productRemarksRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "deliveryDetails") {
            (deliveryDetailsRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "discount") {
            (discountRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }

        else if (name == "credit") {
            (creditRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }

        else if (name == "paymentDetails") {
            (paymentDetailsRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "packingDetails") {
            (packingDetailsRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "terms") {
            (termsRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "remarks1") {
            (remarkRef.current).setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
    }



    // Functions
    const handleBuyerId = (item) => {
        setBuyer(item.name)
        setBuyerId(item.id)
    }

    const handleSellerId = (item) => {
        setSeller(item.name)
        setSellerId(item.id)
    }
    const handleSellerBrokerId = (item) => {
        setSellerBroker(item.name)
        setSellerBrokerId(item.id)
    }

    const handleBuyerBrokerId = (item) => {
        setBuyerBroker(item.name)
        setBuyerBrokerId(item.id)
    }
    const handleCityId = (item) => {
        setCity(item.name)
        setCityId(item.id)
    }


    const handlePartyTermId = (item) => {
        setPartyTerm(item.name)
        setPartyTermId(item.id)
    }

    const handleNarrationId = (item) => {
        setNarration(item.name)
        setNarrationId(item.id)
    }

    const handleStationId = (item) => {
        setStation(item.name)
        setStationId(item.id)
    }

    const handleToId = (item) => {
        setTo(item.name)
        setToId(item.id)
    }



    const handleProductId = (item, product, index) => {
        setProductId(item.id)

        const URL = `http://www.softsauda.com/deal_entry/getprdtlist?productid=${item.id}`
        axios.get(URL)
            .then(response => {
                const array = []
                response.data.product_mast.product_mast_group.map(data => (
                    array.push({ label: data.it_pck, value: data.it_pck })
                ))
                setPackItems(array)

                product.pck = array[0].value
                setpackvalue(product.pck)
                product.brbrk_rt = response.data.product_mast.product_mast_group[0].it_ratebr
                setBuyerBrokerage(product.brbrk_rt)
                product.slbrk_rt = response.data.product_mast.product_mast_group[0].it_ratesl
                setSellerBrokerage(product.slbrk_rt)

                product.brbrk_typ = response.data.product_mast.product_mast_group[0].it_ratetypbr
                setBuyerBrokerageType(product.brbrk_typ)

                product.slbrk_type = response.data.product_mast.product_mast_group[0].it_ratetypsl
                setSellerBrokerageType(product.slbrk_type)

                const list = [...contract_sauda_group];

                list[index]["p_code"] = item.id;
                list[index]["brbrk_rt"] = product.brbrk_rt;
                list[index]["slbrk_rt"] = product.slbrk_rt;
                list[index]["brbrk_typ"] = product.brbrk_typ;
                list[index]["slbrk_type"] = product.slbrk_type;
                setProductList(list);

            })

    }

    const handleBrandId = (id) => {
        setBrandId(id)
    }

    useEffect(() => {
        let isCancelled = false;
        getBuyers();
        return () => {
            isCancelled = true;
        };
    }, [])

    //Buyers List

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
                data.results.map(dat => (
                    setBuyerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name + "," + dat.cityname }])

                ))
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

                data.results.map(dat => (
                    setSellerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name + "," + dat.cityname }])
                ))
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
                    setSellerBrokerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name + "," + dat.cityname }])
                ))

                data.results.map(dat => (
                    setBuyerBrokerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name + "," + dat.cityname }])
                ))
            })
        getProducts()

    }

    // Product List
    const getProducts = async () => {

        const masterid = await AsyncStorage.getItem("masterid")
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(`http://www.softsauda.com/deal_entry/Product_list?masterid=${masterid}`, data)

            .then(response => response.json())
            .then(data => {
                data.results.map(dat => (

                    setProductItems(oldArray => [...oldArray, { id: dat.id, name: dat.product_name }])

                ))
            })
        getBrands()
    }

    //Brand List 
    const getBrands = async () => {

        const masterid = await AsyncStorage.getItem("masterid")
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(`http://www.softsauda.com/deal_entry/Brand_list?masterid=${masterid}`, data)

            .then(response => response.json())
            .then(data => {

                data.results.map(dat => (

                    setBrandItems(oldArray => [...oldArray, { id: dat.id, name: dat.brand_name }])

                ))
            })
        getCity()
    }



    const getDealerList = async () => {
        let todayDate = moment(new Date()).format("DD/MM/YYYY")
        let date = moment(await AsyncStorage.getItem("startingDate")).format("DD/MM/YYYY")

        const masterid = await AsyncStorage.getItem("masterid")
        const compid = await AsyncStorage.getItem("companyCode")
        const divid = await AsyncStorage.getItem("divisionCode")
        Axios({
            method: 'POST',
            url: `http://www.softsauda.com/deal_entry/appdealentry_list?masterid=${masterid}`,
            data: {
                'masterid': masterid,
                'compid': compid,
                'divid': divid,
                'main_bk': "SD",
                'start_date': date,
                'end_date': todayDate,
                'sl_code': selllerId,
                'sb_code': sellerBrokerId,
                'br_code': buyerId,
                'bb_code': buyerBrokerId
            }
        })
            .then(response => {
                if(response.data.data.length!==0)
                {
                setDate((((response.data.data[response.data.data.length - 1]).sd_date).substring(0, 10)).split('-').reverse().join('/'))
                setLoading(true)
                }
                else
                setLoading(true)
               })

    }

    // Change Product
    const handleProductDetails = (value, index, name, product) => {

        if (name == "bag") {
            setBag(value);
        }

        else if (name == "pck") {
            setpackvalue(value)
        }
        else if (name == "sd_rate") {
            setRate(value)
        }
        else if (name == "brbrk_rt") {
            setBuyerBrokerage(value)
        } else if (name == "slbrk_rt") {
            setSellerBrokerage(value)
        }

        else if (name == "amount") {
            setAmount(value)
        }
        const list = [...contract_sauda_group];
        list[index][name] = value;


        var weight = ((parseInt(list[index]["pck"])) * (parseInt(list[index]["bag"]))) / 100
        setWeight(weight)
        list[index]["wght"] = weight

        var total = ((parseInt(list[index]["pck"]) * (parseInt(list[index]["sd_rate"])) * (parseInt(list[index]["bag"]))) / 100).toString();

        if (isNaN(total)) {
            setAmount(value)

            list[index]["amount"] = value;
        }
        else if (!isNaN(total) && value != list[index]["amount"]) {
            setAmount(total)
            list[index]["amount"] = total;
        }

        var bamt
        var samt
        //Buyer Brokerage Amount
        if (list[index]["brbrk_typ"] == 'PQtl')
            bamt = parseInt(list[index]["brbrk_rt"]) * parseInt(list[index]["wght"])

        if (list[index]["brbrk_typ"] == 'PBag')
            bamt = parseInt(list[index]["brbrk_rt"]) * parseInt(list[index]["bag"])

        if (list[index]["brbrk_typ"] == '%')
            bamt = (parseInt(list[index]["amount"]) * 100) / parseInt(list[index]["brbrk_rt"])

        if (list[index]["brbrk_typ"] == 'Fix')
            bamt = list[index]["brbrk_rt"]


        //Seller Brokerage Amount
        if (list[index]["slbrk_type"] == 'PQtl')
            samt = parseInt(list[index]["slbrk_rt"]) * parseInt(list[index]["wght"])

        if (list[index]["slbrk_type"] == 'PBag')
            samt = parseInt(list[index]["slbrk_rt"]) * parseInt(list[index]["bag"])

        if (list[index]["slbrk_type"] == '%')
            samt = (parseInt(list[index]["amount"]) * 100) / parseInt(list[index]["slbrk_rt"])

        if (list[index]["slbrk_type"] == 'Fix')
            samt = list[index]["slbrk_rt"]



        setBuyerBrokerageAmount(bamt)
        setSellerBrokerageAmount(samt)
        list[index]["slbrk_amt"] = samt
        list[index]["brbrk_amt"] = bamt

        setProductList(list);

    };

    // Add Product

    const handleProductClick = (i) => {

        setProductList([...contract_sauda_group, { p_code: "", bag: "", pck: "", sd_rate: "", slbrk_rt: "", brbrk_rt: "", amount: "", wght: "", brbrk_typ: "", slbrk_type: "", brbrk_amt: "", slbrk_amt: "" }]);

    }

    //Remove Product

    const handleRemoveClick = index => {
        const list = [...contract_sauda_group];
        list.splice(index, 1);
        setProductList(list);
    };

    // Submit Details
    const handleSubmit = () => {
        const submitData = async () => {
            var deliveryLoad = "No"
            var sbBrok = "YES";
            var bbBrok = "YES";
            var chkmsgslr="";
            var chkmsgbyr="";
            var chkmailbyr="";
            var chkmailslr="";
            if(isMailSeller)
            chkmailslr="chkmailslr"
            if(isMailBuyer)
            chkmailbyr="chkmailbyr"
            if(isSMSSeller)
            chkmsgslr="chkmsgslr"
            if(isSMSBuyer)
            chkmsgbyr="chkmsgbyr"





            const bags = contract_sauda_group.map(bas => bas.bag)
            let numberArray = bags.map(Number)
            const totalBags = numberArray.reduce((acc, item) => (acc += item), 0);


            const weight = contract_sauda_group.map(bas => bas.wght)
            let numberArray1 = weight.map(Number)
            const totalWeight = numberArray1.reduce((acc, item) => (acc += item), 0);


            const amount = contract_sauda_group.map(bas => bas.amount)
            let numberArray2 = amount.map(Number)
            const totalAmount = numberArray2.reduce((acc, item) => (acc += item), 0);


            if (sellerBrokerId === null || sellerBrokerId === undefined) {
                sbBrok = "NO"
            }
            if (buyerBrokerId === null || buyerBrokerId === undefined) {
                bbBrok = "NO"
            }

            if (deliveryLoading === "delivery") {
                deliveryLoad = "Yes"
            }


            axios({
                method: 'POST',
                url: "http://www.softsauda.com/Contract_sauda/contractadd",
                data: {
                    brok_yn: "Y",
                    main_bk: 'SD',
                    c_j_s_p: dealNumberOne,
                    vouc_code: dealNumberTwo,
                    sd_date: date,
                    sl_brok: "YES",
                    sl_code: selllerId,
                    sl_cont: "",
                    sb_brok: sbBrok,
                    sb_code: sellerBrokerId,
                    sb_cont: "",
                    br_brok: "YES",
                    br_code: buyerId,
                    br_cont: "",
                    bb_brok: bbBrok,
                    bb_code: buyerBrokerId,
                    bb_cont: "",
                    pono: poNumber,
                    podt: poDate,
                    buy_whouse: "",
                    rmks: topRemarks,
                    delv_load: deliveryLoading,
                    delv_fr: "",
                    delv_to: periodUptoDate,
                    term: partyTermId,                //party terms
                    delvdt: deliveryDetails,           //deliver details
                    from_ct: stationId,        //station  
                    to_ct: toId,            // to        
                    paydiscrt: discount,   //discount
                    paycond: deliveryLoad,     //toggle Yes No         
                    cre_days: credit,   //  cerdits days
                    paydet: paymentDetails,     //payment Details
                    packdet: packingDetails,       //packkign details
                    party_terms: termId,  //narration Id
                    party_remarks: remarks,
                    tot_bags: totalBags,
                    tot_wght: totalWeight,
                    tot_amount: totalAmount,
                    co_code: await AsyncStorage.getItem("companyCode"),
                    div_code: await AsyncStorage.getItem("divisionCode"),
                    masterid: await AsyncStorage.getItem("masterid"),
                    usrnm: await AsyncStorage.getItem("user"),
                    blcocode: await AsyncStorage.getItem("divisionCode"),
                    contract_sauda_group: contract_sauda_group,
                    chkmsgbyr:chkmsgbyr,
                    chkmsgslr:chkmsgslr,
                    chkmailbyr:chkmailbyr,
                    chkmailslr:chkmailslr
                }
            })
                .then(respone => {
                    Toast.showWithGravity('Data Submitted.', Toast.LONG, Toast.BOTTOM);
                    setLoading(false)
                    setDealNumberOne("")
                    setDealNumberTwo("")
                    setSeller("")
                    setSellerId("")
                    setBuyer("")
                    setBuyerId("")
                    setSellerBrokerId("")
                    setBuyerBrokerId("")
                    setTopRemarks("")
                    setPoNumber("")
                    setPoDate("")
                    setProductList([{ p_code: "", bag: "", pck: "", sd_rate: "", slbrk_rt: "", brbrk_rt: "", amount: "", wght: "", brbrk_typ: "", slbrk_type: "", brbrk_amt: "", slbrk_amt: "" }])
                    setDeliveryLoading("")
                    setPeriodUptoDate("")
                    setDeliveryDetails("")
                    setStation("")
                    setStationId("")
                    setTo("")
                    setToId("")
                    setPartyTerm("")
                    setPartyTermId("")
                    setDiscount("")
                    setCredit("")
                    setPaymentDetails("")
                    setPackingDetails("")
                    setTerms({ id: "", name: "" })
                    setRemarks("")
                    setDate(new Date())
                    getDealerList()

                })
        }
        submitData()

    }

    useEffect(() => {
        if (typeof (buyerId) !== "undefined" && typeof (selllerId) !== "undefined") {
            var count = 0;
            for (var i = 0; i < contract_sauda_group.length; i++) {
                if (contract_sauda_group[i].p_code !== "" && contract_sauda_group[i].bag !== "" && contract_sauda_group[i].rate !== "") {
                    count++;
                }
            }
            if (count == contract_sauda_group.length) {

                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
        }


    }, [buyerId, selllerId, contract_sauda_group])

    //Handle Show less and More


    return (
        <>
            {loading ? (
                <>

                    <ScrollView keyboardShouldPersistTaps='always' style={styles.container}>
                        <Form style={styles.form}>

                            <View style={[styles.column, { top: 12 }]}>
                                <TextInput
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Deal No."
                                    ref={dealOneRef}
                                    onFocus={() => onFocusChange("dealOne")}
                                    onBlur={() => onBlurChange("dealOne")}
                                    defaultValue={dealNumberOne}
                                    onChangeText={text => setDealNumberOne(text)}
                                    onSubmitEditing={() => dealTwoRef.current.focus()}
                                />



                                <TextInput
                                    keyboardType="numeric"
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Deal No."
                                    onFocus={() => onFocusChange("dealTwo")}
                                    onBlur={() => onBlurChange("dealTwo")}
                                    ref={dealTwoRef}
                                    defaultValue={dealNumberTwo}
                                    onChangeText={text => setDealNumberTwo(text)}



                                />
                                <DatePicker

                                    style={{ width: wp('40%'), borderRadius: 5, margin: 10 }}
                                    date={date}
                                    mode="date"
                                    placeholder="Date"
                                    format="DD/MM/YYYY"

                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 1000,
                                            top: 4,
                                            marginLeft: 0,

                                        },
                                        dateInput: {
                                            borderRadius: 10,
                                            marginBottom: 12,
                                            marginRight: 15,
                                            height: 35

                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date)
                                    }}
                                />

                            </View>
                            <View style={styles.column}>
                                <SelectTwo items={sellerItems} selectedItem={selectedSellerItems} handleId={handleSellerId} width={wp('80%')} placeholder="Seller" borderColor="#ccc" defaultValue={seller} />
                            </View>

                            <View style={styles.column}>
                                <SelectTwo items={buyerItems} selectedItem={selectedBuyerItems} handleId={handleBuyerId} width={wp('80%')} placeholder="Buyer" borderColor="#ccc" defaultValue={buyer} />
                            </View>
                            {
                                sellerBrokeritems.length == 0 ? (<></>) : (
                                    <View style={styles.column}>
                                        <SelectTwo items={sellerBrokeritems} selectedItem={selectedSellerBrokerItems} width={wp('37%')} handleId={handleSellerBrokerId} placeholder="Seller Broker" borderColor="#ccc" defaultValue={sellerBroker} />

                                        <SelectTwo items={buyerBrokeritems} selectedItem={selectedBuyerBrokerItems} width={wp('37%')} handleId={handleBuyerBrokerId} placeholder="Buyer Broker" borderColor="#ccc" defaultValue={buyerBroker} />
                                    </View>
                                )}

                            <View style={{ left: 10 }}>
                                {show ?
                                    <TouchableOpacity onPress={() => setShow(!show)} style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ color: theme1.DARK_BLUE_COLOR, fontSize: 15 }}>Show More</Text>
                                        <Icon name="caret-down" size={wp("4%")} color="black" style={{ top: 3, left: 4 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setShow(!show)} style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ color: theme1.DARK_BLUE_COLOR, fontSize: 15 }}>Show Less</Text>
                                        <Icon name="caret-up" size={wp("4%")} color="black" style={{ top: 3, left: 4 }} />

                                    </TouchableOpacity>
                                }
                            </View>

                            {
                                !show ?
                                    <>
                                        <View style={styles.column}>
                                            <TextInput
                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('82%'), flex: 0.97 }]}
                                                placeholder="Remarks"
                                                onFocus={() => onFocusChange("remarks")}
                                                onBlur={() => onBlurChange("remarks")}
                                                ref={remarksRef}
                                                onSubmitEditing={() => billNumberRef.current.focus()}
                                                defaultValue={topRemarks}
                                                onChangeText={text => setTopRemarks(text)}

                                            />
                                        </View>

                                        <View style={styles.column}>
                                            <TextInput
                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('48%') }]}
                                                placeholder="PO Number"
                                                onFocus={() => onFocusChange("billNumber")}
                                                onBlur={() => onBlurChange("billNumber")}
                                                ref={billNumberRef}
                                                onSubmitEditing={() => bagRefs.current[0].focus()}
                                                defaultValue={poNumber}
                                                onChangeText={text => setPoNumber(text)}

                                            />


                                            <DatePicker
                                                style={{ width: wp('38%'), borderRadius: 5, margin: 10 }}
                                                date={poDate}
                                                mode="date"
                                                placeholder="PO date"
                                                format="DD/MM/YYYY"
                                                defa
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 360,
                                                        top: 4,
                                                        marginLeft: 0,

                                                    },
                                                    dateInput: {
                                                        borderRadius: 10,
                                                        marginBottom: 12,
                                                        marginRight: 15,
                                                        height: 35

                                                    }
                                                    // ... You can check the source to find the other keys.
                                                }}
                                                onDateChange={(date) => { setPoDate(date) }}
                                            />
                                        </View >

                                    </> : <></>
                            }


                            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 5 }} />

                            {/* Product Details*/}
                            <View style={{ marginTop: 30 }}>

                                {
                                    contract_sauda_group.map((x, i) => (
                                        <View style={styles.card}>

                                            <View style={styles.column}>

                                                <SelectTwo items={productItems} name="p_code"
                                                    selectedItem={selectedProductItems}
                                                    handleId={handleProductId} handleProduct={handleProductDetails}
                                                    width={wp('37%')} placeholder="Product" i={i}
                                                    product={x} borderColor="#ccc" />

                                                <SelectTwo items={brandItems} name="Brand"
                                                    selectedItem={selectedBrandItems} handleId={handleBrandId}
                                                    handleProduct={handleProductDetails} width={wp('37%')}
                                                    placeholder="Brand" i={i}  borderColor="#ccc" />

                                            </View>


                                            <View style={styles.column}>
                                                <TextInput
                                                    keyboardType="numeric"
                                                    name="bag"
                                                    style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                    placeholder="Bag"
                                                    onFocus={() => onFocusChange("bag", i)}
                                                    onBlur={() => onBlurChange("bag", i)}
                                                    ref={(element) => bagRefs.current[i] = element}
                                                    defaultValue={x.bag}
                                                    onChangeText={value => handleProductDetails(value, i, "bag")}
                                                    onSubmitEditing={() => rateRef.current[i].focus()}
                                                />
                                                <View style={{ width: wp("40%"), flex: 1.1, marginLeft: 15 }}>
                                                    <DropDownPicker
                                                        items={packItems}
                                                        defaultValue={x.pck}
                                                        onChangeItem={(item) => handleProductDetails(item.value, i, "pck")}
                                                        name="pck"
                                                        placeholder="Pack"
                                                        placeholderStyle={{ color: "black" }}
                                                        containerStyle={{ height: 35, top: 3, left: -5 }}
                                                        style={{ backgroundColor: '#fafafa', flex: 1 }}
                                                        itemStyle={{
                                                            justifyContent: 'flex-start'
                                                        }}
                                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                                    />
                                                </View>


                                            </View>



                                            <View style={styles.column}>

                                                <TextInput
                                                    keyboardType="numeric"
                                                    style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37.5%') }]}
                                                    placeholder="Rate"
                                                    name="sd_rate"
                                                    defaultValue={x.rate}
                                                    onChangeText={text => handleProductDetails(text, i, "sd_rate")}
                                                    onFocus={() => onFocusChange("rate", i)}
                                                    onBlur={() => onBlurChange("rate", i)}
                                                    ref={(element) => rateRef.current[i] = element}
                                                    onSubmitEditing={() => amountRef.current[i].focus()}

                                                />

                                                <TextInput
                                                    keyboardType="numeric"
                                                    style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                    name="amount"
                                                    placeholder="Amount"
                                                    defaultValue={isNaN(x.amount) ? "0" : x.amount}
                                                    onChangeText={text => handleProductDetails(text, i, "amount")}
                                                    onFocus={() => onFocusChange("amount", i)}
                                                    onBlur={() => onBlurChange("amount", i)}
                                                    ref={(element) => amountRef.current[i] = element}

                                                />

                                            </View>

                                            <View style={{ left: 10 }}>
                                                {show1 ?
                                                    <TouchableOpacity onPress={() => setShow1(!show1)} style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ color: theme1.DARK_BLUE_COLOR, fontSize: 15 }}>Show More</Text>
                                                        <Icon name="caret-down" size={wp("4%")} color="black" style={{ top: 3, left: 4 }} />
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity onPress={() => setShow1(!show1)} style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ color: theme1.DARK_BLUE_COLOR, fontSize: 15 }}>Show Less</Text>
                                                        <Icon name="caret-up" size={wp("4%")} color="black" style={{ top: 3, left: 4 }} />

                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            {
                                                !show1 ?
                                                    <>
                                                        <View style={styles.column}>
                                                            <TextInput
                                                                keyboardType="numeric"
                                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                                placeholder="Buyer BrokerRage"
                                                                name="brbrk_rt"
                                                                defaultValue={x.brbrk_rt}
                                                                onChangeText={text => handleProductDetails(text, i, "brbrk_rt")}
                                                                onFocus={() => onFocusChange("buyerBrokerage", i)}
                                                                onBlur={() => onBlurChange("buyerBrokerage", i)}
                                                                ref={(element) => buyerBrokerageRef.current[i] = element}
                                                                onSubmitEditing={() => sellerBrokerageRef.current[i].focus()}

                                                            />
                                                            <TextInput
                                                                keyboardType="numeric"
                                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                                placeholder="Seller Brokerage"
                                                                name="slbrk_rt"
                                                                defaultValue={x.slbrk_rt}
                                                                onChangeText={text => handleProductDetails(text, i, "slbrk_rt")}
                                                                onFocus={() => onFocusChange("sellerBrokerage", i)}
                                                                onBlur={() => onBlurChange("sellerBrokerage", i)}
                                                                ref={(element) => sellerBrokerageRef.current[i] = element}
                                                                onSubmitEditing={() => productRemarksRef.current[i].focus()}

                                                            />

                                                        </View>


                                                        <View style={styles.column}>
                                                            <TextInput
                                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('77%') }]}
                                                                placeholder="Product Remarks"
                                                                defaultValue={x.productRemarks}
                                                                onChangeText={(text) => setProductRemarks(text)}
                                                                onFocus={() => onFocusChange("productRemarks", i)}
                                                                onBlur={() => onBlurChange("productRemarks", i)}
                                                                ref={(element) => productRemarksRef.current[i] = element}
                                                            />

                                                        </View>

                                                    </> : <></>
                                            }
                                            <View style={[styles.column, { justifyContent: "space-around", marginBottom: 20 }]}>
                                                {
                                                    contract_sauda_group.length - 1 === i &&
                                                    <TouchableOpacity onPress={() => handleProductClick(i)} style={[styles.button, { flex: 1 }]}>
                                                        <Text style={{ color: "white" }}>Add Product</Text>
                                                    </TouchableOpacity>}

                                                {
                                                    contract_sauda_group.length !== 1 ?
                                                        <TouchableOpacity onPress={() => handleRemoveClick(i)}
                                                            style={styles.button}>
                                                            <Text style={{ color: "white" }}>Remove</Text>
                                                        </TouchableOpacity>

                                                        : (<></>)}

                                            </View>


                                        </View>

                                    ))}
                            </View>

                        </Form>

                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: -100 }} />


                        {/*Section 1 */}

                        <View style={{ left: 10, alignItems: "center" }}>
                            {show2 ?
                                <TouchableOpacity onPress={() => setShow2(!show2)} style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{ color: theme1.DARK_BLUE_COLOR, fontSize: 15 }}>Show More</Text>
                                    <Icon name="caret-down" size={wp("4%")} color="black" style={{ top: 3, left: 4 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => setShow2(!show2)} style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{ color: theme1.DARK_BLUE_COLOR, fontSize: 15 }}>Show Less</Text>
                                    <Icon name="caret-up" size={wp("4%")} color="black" style={{ top: 3, left: 4 }} />

                                </TouchableOpacity>
                            }
                        </View>


                        <Form style={styles.form}>
                            <View style={{ marginBottom: 50 }}>


                                {
                                    !show2 ?
                                        <>
                                            <View style={[styles.column, { top: 12 }]}>
                                                <DropDownPicker
                                                    items={[
                                                        { label: 'Delivery', value: 'delivery' },
                                                        { label: 'Loading', value: 'loading' },
                                                    ]}

                                                    placeholderStyle={{ color: "black" }}
                                                    containerStyle={{ height: 35, top: 5, left: 0, width: wp("45%") }}
                                                    style={{ backgroundColor: "transparent", flex: 1 }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start'
                                                    }}
                                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                                    onChangeItem={item => setDeliveryLoading(item.value)}
                                                    placeholder="Select"
                                                />

                                                <DatePicker

                                                    style={{ width: wp('45%'), borderRadius: 5, margin: 10 }}
                                                    date={periodUptoDate}
                                                    mode="date"
                                                    placeholder="Period Upto"
                                                    format="DD/MM/YYYY"

                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    customStyles={{
                                                        dateIcon: {
                                                            position: 'absolute',
                                                            left: 1000,
                                                            top: 4,
                                                            marginLeft: 0,

                                                        },
                                                        dateInput: {
                                                            borderRadius: 10,
                                                            marginBottom: 12,
                                                            marginRight: 15,
                                                            height: 35

                                                        }
                                                        // ... You can check the source to find the other keys.
                                                    }}
                                                    onDateChange={(date) => {
                                                        setPeriodUptoDate(date)
                                                    }}
                                                />

                                            </View>

                                            <View style={[styles.column, { top: 12 }]}>
                                                <View style={[styles.autocompleteInput, { marginRight: 10, left: -1 }]}>
                                                    <Autocomplete
                                                        style={[styles.input, { width: wp("29%"), flex: 1, top: 1 }]}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        containerStyle={styles.autocompleteContainer}
                                                        data={filteredDeliveryDetailsArray}
                                                        defaultValue={
                                                            JSON.stringify(deliveryDetails) === '{}' ?
                                                                '' :
                                                                deliveryDetails
                                                        }
                                                        onChangeText={(text) => findDeliveryDetails(text)}
                                                        placeholder="Delivery Details"
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setDeliveryDetails(item);
                                                                    setFilteredDeliveryDetailsArray([]);
                                                                }}>
                                                                <Text style={styles.itemText}>
                                                                    {item}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                <SelectTwo items={stationItems} selectedItem={selectedStationItems} handleId={handleStationId} width={wp('80%')} placeholder="Station" borderColor="#ccc" defaultValue={station} />
                                                <SelectTwo items={toItems} selectedItem={selectedToItems} handleId={handleToId} width={wp('80%')} placeholder="To" borderColor="#ccc" defaultValue={to} />

                                            </View>
                                            <View style={[styles.column, { top: 12 }]}>


                                                <SelectTwo items={partyTermItems} selectedItem={selectedPartyTermItems} handleId={handlePartyTermId} width={wp('80%')} placeholder="Party Terms" borderColor="#ccc" defaultValue={partyTerm} />

                                                <View style={{ borderRadius: 6, margin: 3, flex: 1, width: wp("50%") }}>
                                                    <SegmentedControlTab
                                                        values={['Discount', 'Credit']}
                                                        selectedIndex={selectedIndex}
                                                        tabStyle={[styles.tabStyle, { color: "black" }]}
                                                        activeTabStyle={[styles.activeTabStyle, { color: "black" }]}
                                                        onTabPress={handleSingleIndexSelect}
                                                        tabTextStyle={{ color: "black" }}
                                                        activeTabTextStyle={{ color: "black" }}
                                                    />
                                                </View>
                                            </View>


                                            <View style={[styles.column, { top: 12 }]}>
                                                <TextInput
                                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                                    placeholder="Discount"
                                                    ref={discountRef}
                                                    onFocus={() => onFocusChange("discount")}
                                                    onBlur={() => onBlurChange("discount")}
                                                    defaultValue={discount}
                                                    onChangeText={text => setDiscount(text)}
                                                    onSubmitEditing={() => creditRef.current.focus()}
                                                />
                                                <TextInput
                                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                                    placeholder="Credit(Days)"
                                                    ref={creditRef}
                                                    onFocus={() => onFocusChange("credit")}
                                                    onBlur={() => onBlurChange("credit")}
                                                    defaultValue={credit}
                                                    onChangeText={text => setCredit(text)}
                                                    onSubmitEditing={() => paymentDetailsRef.current.focus()}
                                                />
                                            </View>



                                            <View style={[styles.column, { top: 12 }]}>
                                                <View style={styles.autocompleteInput}>
                                                    <Autocomplete
                                                        style={[styles.input, { width: wp("42%"), flex: 1 }]}

                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        containerStyle={styles.autocompleteContainer}
                                                        // Data to show in suggestion
                                                        data={filteredPaymentDetailsArray}
                                                        // Default value if you want to set something in input
                                                        defaultValue={
                                                            JSON.stringify(paymentDetails) === '{}' ?
                                                                '' :
                                                                paymentDetails
                                                        }
                                                        // Onchange of the text changing the state of the query
                                                        // Which will trigger the findFilm method
                                                        // To show the suggestions
                                                        onChangeText={(text) => findPaymentDetails(text)}
                                                        placeholder="Payment Details"
                                                        renderItem={({ item }) => (
                                                            // For the suggestion view
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setPaymentDetails(item);
                                                                    setFilteredPaymentDetailsArray([]);
                                                                }}>
                                                                <Text style={styles.itemText}>
                                                                    {item}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                <View style={styles.autocompleteInput}>
                                                    <Autocomplete
                                                        style={[styles.input, { width: wp("42%"), flex: 1 }]}

                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        containerStyle={styles.autocompleteContainer}
                                                        // Data to show in suggestion
                                                        data={filteredPackingDetailsArray}
                                                        // Default value if you want to set something in input
                                                        defaultValue={
                                                            JSON.stringify(packingDetails) === '{}' ?
                                                                '' :
                                                                packingDetails
                                                        }

                                                        onChangeText={(text) => findPackingDetails(text)}
                                                        placeholder="Packing Details"
                                                        renderItem={({ item }) => (
                                                            // For the suggestion view
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setPackingDeatils(item);
                                                                    setFilteredPackingDetailsArray([]);
                                                                }}>
                                                                <Text style={styles.itemText}>
                                                                    {item}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />

                                                </View>


                                            </View>


                                            <View style={[styles.column, { top: 12, left: 0 }]}>

                                                <View style={styles.autocompleteInput}>
                                                    <Autocomplete
                                                        style={[styles.input, { width: wp("90%"), flex: 1 }]}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        containerStyle={styles.autocompleteContainer}
                                                        // Data to show in suggestion
                                                        data={filteredTermsArray}
                                                        // Default value if you want to set something in input
                                                        defaultValue={
                                                            JSON.stringify(Terms) === '{}' ?
                                                                '' :
                                                                Terms.name
                                                        }
                                                        onChangeText={(text) => findTerms(text)}
                                                        placeholder="Terms And Conditions"
                                                        renderItem={({ item }) => (
                                                            // For the suggestion view
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setTerms(item);
                                                                    setTermId(item.id)
                                                                    setFilteredTermsArray([]);
                                                                }}>
                                                                <Text style={styles.itemText}>
                                                                    {item.name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />

                                                </View>



                                            </View>
                                        </>
                                        : <></>

                                }
                                <View style={[styles.column, { top: 12, left: 0 }]}>

                                    <TextInput
                                        style={[styles.input, { backgroundColor: "#D3FD7A", width: (wp("75%")) }]}
                                        placeholder="Remarks"
                                        ref={remarkRef}
                                        onFocus={() => onFocusChange("remarks1")}
                                        onBlur={() => onBlurChange("remarks1")}
                                        defaultValue={remarks}
                                        onChangeText={text => setRemarks(text)}
                                    />
                                </View>

                                <View style={[styles.column, { top: 12 ,alignItems:"center",justifyContent:"center"}]}>
                                    <View style={{ display: "flex", flexDirection: "row", marginRight: 10 }}>
                                        <Checkbox
                                            status={isSMSBuyer ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setIsSMSBuyer(!isSMSBuyer);
                                            }}
                                        />
                                        <Text style={{ color: "black", top: 10 }}>SMS Buyer</Text>

                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}>

                                        <Checkbox
                                            status={isSMSSeller ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setIsSMSSeller(!isSMSSeller);
                                            }}
                                        />

                                        <Text style={{ color: "black", top: 10 }}>SMS Seller</Text>

                                    </View>
                                </View>



                                <View style={[styles.column, { top: 12, left: 0, alignItems:"center",justifyContent:"center"}]}>



                                    <View style={{ display: "flex", flexDirection: "row", marginRight: 10 }}>
                                        <Checkbox
                                            status={isMailBuyer ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setIsMailBuyer(!isMailBuyer);
                                            }}
                                        />
                                        <Text style={{ color: "black", top: 10 }}> Mail Buyer</Text>

                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}>

                                        <Checkbox
                                            status={isMailSeller ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setIsMailSeller(!isMailSeller);
                                            }}
                                        />

                                        <Text style={{ color: "black", top: 10 }}>Mail Seller</Text>

                                    </View>

                                </View>


                            </View>


                        </Form>






                        <View style={[styles.column, { justifyContent: "center", marginBottom: 30, marginTop: -150 }]}>

                            <TouchableOpacity onPress={() => handleSubmit()}
                                style={disabled ? styles.button2 : styles.button1}

                                disabled={disabled}>
                                <Text style={{ color: "white" }}>Submit</Text>
                            </TouchableOpacity>
                        </View>





                    </ScrollView></>


            ) :

                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 150 }}>
                    <LineDotsLoader size="medium" size={20} />
                </View>

            }
        </>

    )
}



export default ContractEntry

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        width: '40%',
        height: "30%",
        top: -10,
        left: 120


    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,

    },
    button2: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        top: 4,
        left: 0,
        backgroundColor: "lightgrey",
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    autocompleteInput: {
        height: 40,
        flex: 1,
        width: wp('50%'),
        marginBottom: 10
    },
    dealnumber: {
        display: "flex",
        flexDirection: "row"
    },
    column: {
        display: "flex",
        flexDirection: "row"
    },
    item: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
    },

    input: {
        height: 40,
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
    progress: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 350,



    },

    form: {
        flex: 1,
        top: -110,
        marginTop: 100,
        marginHorizontal: 10,
        borderRadius: 12,
        padding: 10,

    },
    container: {
        flex: 1,
        flexDirection: "column",
        height: height,


    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("40%"),
        top: 4,
        left: 0,
        backgroundColor: theme1.DARK_BLUE_COLOR,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
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
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 5,
        marginTop: 10
    },
    tabStyle: {
        height: 42,
        borderColor: "#D3FD7A",
        color: "black",

    },
    activeTabStyle: {

        height: 42,
        color: "black",
        backgroundColor: "#D3FD7A",
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },

})
