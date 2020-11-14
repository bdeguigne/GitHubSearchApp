import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { removeItem, getFavUser } from "./storeData";

const removeIcon = require("./assets/dustbin.png");

const UserCard = ({ avatar, login, type, id, getAllData }) => {
    const removeFav = async () => {
        removeItem(id);
        getAllData();
    }

    return (
        <View style={styles.cardContainer}>
            <Image
                style={styles.avatar}
                source={{
                    uri: avatar
                }}
            />
            <View style={styles.userData}>
                <View>
                    <Text style={styles.login}>{login}</Text>
                    <Text style={styles.type}>{type}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={removeFav}
                    >
                        <Image
                            style={styles.icon}
                            source={removeIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#d6d6d6"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 8
    },
    userData: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    login: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#037EE2"
    },
    type: {
        color: "#787878"
    },
    icon: {
        width: 35,
        height: 35
    }
})

export default UserCard;