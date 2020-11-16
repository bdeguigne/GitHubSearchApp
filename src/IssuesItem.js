import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from "react-native"

const IssueItem = ({ title, body, user }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {body != "" && (
                <Text style={styles.body}>{body}</Text>
            )}
             <Text style={styles.user}>by {user}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: "#d6d6d6",
        justifyContent: "space-between"
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#037EE2"
    },
    body: {
        marginTop: 16
    },
    user: {
        marginTop: 10,
        textAlign: "right",
        color:  "#636363",
        fontStyle: "italic"
    }
})

export default IssueItem;