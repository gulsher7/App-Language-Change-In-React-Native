
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { fontFamily } from '../styles/fontFamily';
import { colors } from '../styles/colors';


const BtnComp = ({
    onPress = () => { },
    btnText,
    bgColor = colors.btnColor,
    textColor = colors.whiteColor
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.btnStyle, backgroundColor: bgColor }}
        >
            <Text style={{ ...styles.btnTextStyle, color: textColor }}>{btnText}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    btnStyle: {
        height: moderateScale(48),
        backgroundColor: colors.btnColor,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: moderateScale(8),
        marginLeft: moderateScale(12)
    },
    btnTextStyle: {
        color: colors.whiteColor,
        fontSize: moderateScale(14),
        fontFamily: fontFamily.bold,
        paddingHorizontal: moderateScale(12)
    }
});

export default BtnComp;
