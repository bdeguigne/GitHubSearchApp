import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
const searchIcon = require("./assets/search-icon.png");

function SearchInput({ placeholder, onSubmit, rightButtonText }) {
    const [textEntry, setTextEntry] = useState("");

    return (
        <View style={styles.searchContainer} >
            <View style={styles.textInputContainer}>
                <Image style={styles.searchIcon} source={searchIcon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    onChange={({ nativeEvent }) => setTextEntry(nativeEvent.text)}
                    onSubmitEditing={() => onSubmit(textEntry)}
                />
            </View>
            { rightButtonText && (
                <TouchableOpacity onPress={() => onSubmit(textEntry)}>
                    <Text style={styles.searchButtonText} >
                        {rightButtonText}
                    </Text>
                </TouchableOpacity>
            )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
        marginTop:StatusBar.currentHeight,
    },
    textInputContainer: {
        height: 45,
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#D1D1D1",
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginRight: 6
    },
    textInput: {
        flex: 1,
        height: "100%",
    },
    searchButtonText: {
        padding: 10,
        color: "#419EEB"
    }
});

export default SearchInput;