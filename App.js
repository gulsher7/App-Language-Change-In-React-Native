
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import RNRestart from 'react-native-restart'
//3rd party packages
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Picker, Image } from 'react-native-ui-lib';
import axios from 'axios'

//constants
import { imagePath } from './src/constants/imagesPath';
import strings from './src/constants/lng/LocalizedStrings';
import { fontFamily } from './src/styles/fontFamily';

//reusbale/custom components 
import BtnComp from './src/components/BtnComp';
import CardDetail from './src/components/CardDetail';
import { colors } from './src/styles/colors';
import { setLng, getLng } from './src/helper/changeLng';


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [confirm, setConfirm] = useState(0)
  const [recoverd, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)

  useEffect(() => {
    getCountryNames()
    getCovidCases('India')
    selectedLng()

  }, [])

  const selectedLng = async () => {
    const lngData = await getLng()
    if (!!lngData) {
      strings.setLanguage(lngData)
    }
    console.log("selected Language data==>>>", lngData)
  }

  const getCovidCases = async (countryName) => {
    try {
      const res = await axios.get(`https://covid19.mathdro.id/api/countries/${countryName}`)
      console.log("res===>>>", res)
      setConfirm(res.data.confirmed.value)
      setRecovered(res.data.recovered.value)
      setDeaths(res.data.deaths.value)

    } catch (error) {
      console.log(error)
    }
  }
  const getCountryNames = async () => {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/all');
      // console.log("res==>>>>", res)
      setAllCountries(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  const onCountryChange = (data) => {
    console.log("data==>>>", data)
    setSelectedCountry(data)
  }

  const onSearch = () => {
    getCovidCases(selectedCountry.value)
  }

  const onChangeLng = (lng) => {
    if (lng === 'en') {
      setLng('en')
      RNRestart.Restart()
      return;
    }
    if (lng === 'hi') {
      setLng('hi')
      RNRestart.Restart()
      return;
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imagePath.bgImage}
        style={{ flex: 1 }}
        resizeMode="stretch"
      />
      <View style={{ padding: 16 }}>
        <Text style={styles.updateText}>{strings.CASE_UPDATE} {selectedCountry.value}</Text>
        <Text style={styles.newestText} >{strings.NEWEST_UPDATE}: {'11 Dec 2020'}</Text>

        <View style={{ flexDirection: 'row', justifyContent: "space-around", marginVertical: moderateVerticalScale(12) }}>
          <BtnComp
            btnText={'For English'}
            onPress={() => onChangeLng('en')}
            bgColor={colors.bgRedColor}
            textColor={colors.redColor}
          />
          <BtnComp
            btnText={'For Hindi'}
            onPress={() => onChangeLng('hi')}
            bgColor={colors.bgGreenColor}
            textColor={colors.greenColor}
          />
        </View>

        <View style={styles.flexView}>
          <View style={{ flex: 1 }}>
            <Picker
              value={selectedCountry}
              placeholder="Search By Country"
              onChange={onCountryChange}
              hideUnderline
              showSearch
              placheholderTextColor='gray'
              containerStyle={styles.pickerStyle}
            >
              {allCountries.map((option, index) => (
                <Picker.Item key={index} value={option.name} label={option.name} />
              ))}
            </Picker>
          </View>
          <BtnComp
            btnText={strings.SEARCH}
            onPress={onSearch}
          />
        </View>
        <View style={styles.flexView}>
          <CardDetail
            heading={strings.CONFIRMED}
            value={confirm}
          />
          <CardDetail
            heading={strings.RECOVERED}
            value={recoverd}
            bgColor={colors.bgGreenColor}
            textColor={colors.greenColor}
          />
          <CardDetail
            heading={strings.DECEASED}
            value={deaths}
            bgColor={colors.bgGrayColor}
            textColor={colors.grayColor}
          />
        </View>

        <Text style={styles.conronTextStyle}>{strings.CORONAVIRUS}</Text>
        <Image
          source={imagePath.symptomsIcon}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  updateText: {
    fontSize: moderateScale(20),
    fontFamily: fontFamily.medium
  },
  newestText: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.regular,
    marginTop: moderateVerticalScale(4)
  },
  pickerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    padding: moderateScale(6),
    height: moderateScale(48)
  },
  flexView: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
    justifyContent: "space-between"
  },
  conronTextStyle: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.medium,
    color: colors.redColor,
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginVertical: moderateVerticalScale(16)
  }
});


export default App;
