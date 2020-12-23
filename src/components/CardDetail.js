
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { colors } from '../styles/colors';
import AnimateNumber from '@bankify/react-native-animate-number';
import { fontFamily } from '../styles/fontFamily';
import strings from '../constants/lng/LocalizedStrings';

const CardDetail = ({
    bgColor = colors.bgRedColor,
    textColor = colors.redColor,
    heading,
    value
}) => {
    return (
        <View style={{ ...styles.cardStyle, backgroundColor: bgColor }}>
            <Text style={{ ...styles.headerTextStyle, color: textColor }}>{heading}</Text>
            <Text style={{ ...styles.casesNumberTextStyle, color: textColor }}>
                <AnimateNumber value={value} interval={10} countBy={35000} />
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        paddingVertical: moderateScale(8),
        backgroundColor: colors.bgRedColor,
        paddingHorizontal: moderateScale(10),
        alignItems: 'center',
        borderRadius: moderateScale(4),
    },
    headerTextStyle: {
        fontSize: moderateScale(12),
        color: colors.redColor,
        fontFamily: fontFamily.medium,
        marginBottom: moderateScale(40)
    },
    casesNumberTextStyle: {
        fontSize: moderateScale(12),
        color: colors.redColor,
        fontFamily: fontFamily.bold
    },
});

export default CardDetail;