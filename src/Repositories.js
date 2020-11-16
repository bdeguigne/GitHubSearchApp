import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

function Repositories() {
  return (
    <View style={styles.container}>
      <Text>Repositories</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Actions.issues({ issues: "https://api.github.com/repos/ParadoxZero/sfml-snake/issues" })}
      >
        <Text>Go to Issues</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 5
  },
});


export default Repositories;