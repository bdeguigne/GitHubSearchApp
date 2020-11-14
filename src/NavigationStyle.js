import React from 'react';
import { Text, View, Image, StyleSheet } from "react-native";

var textColorUnfocus = '#999999';
var textColorFocus = '#333333';
var borderColorUnfocus = '#FFFFFF';
var borderColorFocus = "#333333"

export function RepositoriesTab(props) {
    const settingImageFocused = require("./assets/repoFocus.png");
    const settingImageUnfocused = require("./assets/repo.png");
    let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
    let textColor = props.focused ? textColorFocus : textColorUnfocus
    let borderColor = props.focused ? borderColorFocus : borderColorUnfocus

    return (
        <View style={{ width: containerStyle.width, flex: 1, flexDirection: containerStyle.flexDirection, alignItems: containerStyle.alignItems, justifyContent: containerStyle.justifyContent, borderTopColor: borderColor, borderTopWidth: containerStyle.borderTopWidth, padding: containerStyle.padding }}>
            <Image source={settingImage} style={styles.icon} />
            <Text style={{ color: textColor }}>Repositories</Text>
        </View>
    );
}

export function UsersTab(props) {
    const settingImageFocused = require("./assets/userFocus.png");
    const settingImageUnfocused = require("./assets/user.png");
    let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
    let textColor = props.focused ? textColorFocus : textColorUnfocus
    let borderColor = props.focused ? borderColorFocus : borderColorUnfocus

    return (
        <View style={{ width: containerStyle.width, flex: 1, flexDirection: containerStyle.flexDirection, alignItems: containerStyle.alignItems, justifyContent: containerStyle.justifyContent, borderTopColor: borderColor, borderTopWidth: containerStyle.borderTopWidth, padding: containerStyle.padding }}>
            <Image source={settingImage} style={styles.icon} />
            <Text style={{ color: textColor }}>Users</Text>
        </View>
    );
}

export function FavTab(props) {
    const settingImageFocused = require("./assets/starFocus.png");
    const settingImageUnfocused = require("./assets/star.png");
    let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
    let textColor = props.focused ? textColorFocus : textColorUnfocus
    let borderColor = props.focused ? borderColorFocus : borderColorUnfocus

    return (
        <View style={{ width: containerStyle.width, flex: 1, flexDirection: containerStyle.flexDirection, alignItems: containerStyle.alignItems, justifyContent: containerStyle.justifyContent, borderTopColor: borderColor, borderTopWidth: containerStyle.borderTopWidth, padding: containerStyle.padding }}>
            <Image source={settingImage} style={styles.icon} />
            <Text style={{ color: textColor }}>Favorites</Text>
        </View>
    );
}

const containerStyle = {
    width: "100%",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    padding: 20
}

const styles = StyleSheet.create({
    icon: {
        width: 35,
        height: 35,
    }
});