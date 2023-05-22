import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "react-native-elements";

export default function AboutUs() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.texte}>
          Voici notre projet d'organisation pour association comme le BDS.
        </Text>
        <Text style={styles.texte}>
          Notre équipe a entièrement designé et codé cette application dans le
          but d'aider les associations à créer, modifier, générer et organiser
          leurs événements, gérer les présences, et faciliter la communication
          entre les membres.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232c53",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    width: "80%",
  },
  texte: {
    fontWeight: "bold",
    textAlign : "center",
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  
});