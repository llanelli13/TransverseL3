import React from "react";
import { StyleSheet, View, Text } from "react-native";

function NonAdmin() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Espace réservé aux administrateurs !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232c53",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "white",
    padding: 30,
  },
});

export default NonAdmin;
