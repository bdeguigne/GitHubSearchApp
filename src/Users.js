import React from 'react';
import { StyleSheet, Text, View } from "react-native";

function Users() {
    return (
        <View  style={styles.container}>
            <Text>Users</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
  });
  

export default Users;