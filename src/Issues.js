import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Image } from "react-native";
import IssueItem from "./IssuesItem";

const openIcon = require("./assets/exclamation.png");
const closeIcon = require("./assets/check.png");

const renderItem = ({ item }) => {
    return (
        <IssueItem title={item.title} body={item.body} user={item.user.login}/>
    )
}

const Issues = (props) => {
    const [issuesDataOpen, setIssuesDataOpen] = useState([]);
    const [issuesDataClose, setIssuesDataClose] = useState([]);
    const [navBarStatus, setNavBarStatus] = useState("open");

    useEffect(() => {
        fetch(props.issues + "?state=all", {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                var openItem = [];
                var closeItem = [];
                data.forEach(element => {
                    if (element.state === "open") {
                        openItem.push(element);
                    } else if(element.state === "closed") {
                        closeItem.push(element);
                    }
                });
                setIssuesDataOpen(openItem);
                setIssuesDataClose(closeItem);
            })
    }, [])

    const changeNavBarStatus = (status) => {
        setNavBarStatus(status);
    }

    useEffect(() => {
        console.log("ISSUES DATA", issuesDataOpen);
    }, [issuesDataOpen])

    return (
        <View style={styles.container}>
            <View style={styles.navBarContainer}>
                {navBarStatus === "open" ? (
                    <TouchableOpacity style={styles.navBarButtonFocus}>
                        <Image source={openIcon} style={styles.navBarIconFocus} />
                        <Text style={styles.focusText}>Open</Text>
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        onPress={() => changeNavBarStatus("open")}
                        style={styles.navBarButtonUnFocus}>
                        <Image source={openIcon} style={styles.navBarIconUnFocus} />
                        <Text style={styles.unFocustext}>Open</Text>
                    </TouchableOpacity>
                }
                {navBarStatus === "close" ? (
                    <TouchableOpacity style={styles.navBarButtonFocus}>
                        <Image source={closeIcon} style={styles.navBarIconFocus} />
                        <Text style={styles.focusText}>Close</Text>
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        onPress={() => changeNavBarStatus("close")}
                        style={styles.navBarButtonUnFocus}>
                        <Image source={closeIcon} style={styles.navBarIconUnFocus} />
                        <Text style={styles.unFocustext}>Close</Text>
                    </TouchableOpacity>
                }
            </View>
            <FlatList
                data={navBarStatus === "open" ? issuesDataOpen : issuesDataClose}
                extraData={navBarStatus === "open" ? issuesDataOpen : issuesDataClose}
                renderItem={renderItem}
                key={item => item.title}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
    },
    navBarContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 25,
        borderBottomWidth: 1,
        borderColor: "#d6d6d6"
    },
    unFocustext: {
        color: "#000000",
        opacity: 0.6,
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16
    },
    focusText: {
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#037EE2"
    },
    navBarButtonFocus: {
        flex: 0.4,
        textAlign: "center",
        borderBottomWidth: 3,
        borderBottomColor: "#037EE2",
        flexDirection: "row",
        justifyContent: "center"
    },
    navBarButtonUnFocus: {
        flex: 0.4,
        textAlign: "center",
        alignContent: "center",
    },
    navBarIconFocus: {
        position: "absolute",
        left: 20,
        width: 20,
        height: 20
    },
    navBarIconUnFocus: {
        opacity: 0.5,
        position: "absolute",
        left: 20,
        width: 20,
        height: 20,
    },
})

export default Issues;