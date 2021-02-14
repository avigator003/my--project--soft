import { StyleSheet, Dimensions } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../responsiveLayout/ResponsiveLayout'

const styles = StyleSheet.create({
  image: {
    width: wp("70%"),
    height: hp("30%"),
    marginLeft:15
  }
})

export default styles;