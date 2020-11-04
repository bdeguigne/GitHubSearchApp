import React from 'react';
import { StyleSheet, Text, View } from "react-native";

function Favorites() {
    return (
        <View style={styles.container}>
            <Text>Fav</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
  });
  

export default Favorites;