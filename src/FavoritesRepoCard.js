import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { removeItem } from "./storeData";
const lockIcon = require("./assets/lock.png");
const unlockIcon = require("./assets/unlock.png");
const forkIcon = require("./assets/fork.png");
const removeIcon = require("./assets/dustbin.png");

const RepoCard = ({ name, isPrivate, isFork, description, size, branch, id, getAllData }) => {
    const removeFav = async () => {
        removeItem(id);
        getAllData();
    }

    return (
        <View style={styles.cardContainer}>
            <View style={{flex: 1}}>
                <Text style={styles.repoName}>{name}</Text>
                <Text>{description}</Text>
                <View style={styles.bottomIconContainer}>
                    <View style={styles.iconContainer}>
                        {isPrivate ? (
                            <Image
                                style={styles.icons}
                                source={lockIcon}
                            />
                        ) : (
                                <Image
                                    style={styles.icons}
                                    source={unlockIcon}
                                />
                            )}
                        {isFork && (
                            <Image
                                style={styles.icons}
                                source={forkIcon}
                            />
                        )}
                        <View style={styles.sizeContainer}>
                            <Text>{size}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.rightCardContainer}>
                <TouchableOpacity
                    onPress={removeFav}
                >
                    <Image
                        style={styles.removeIcon}
                        source={removeIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.branchName}>{branch}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#d6d6d6",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    repoName: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#037EE2"
    },
    iconContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    icons: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    sizeContainer: {
        borderLeftWidth: 1,
        paddingLeft: 8,
        borderColor: "#d6d6d6",
    },
    bottomIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rightCardContainer: {
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    branchName: {
        color: "#787878"
    },
    removeIcon: {
        width: 30,
        height: 30
    }
});

export default RepoCard;
