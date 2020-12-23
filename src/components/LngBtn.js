
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';


const LngBtn = ({
    onPress,
    lng
}) => {
    return (
        <View style={styles.container}>
            <Text>For {lng}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 12,
        color: colors.redColor
    }
});


export default LngBtn;
