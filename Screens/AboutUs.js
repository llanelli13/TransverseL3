import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AboutUs() {
  return (
    <View style={styles.container}>
      <Text style={styles.texte}>
        Voici notre projet d'organisation pour association comme le BDS.
      </Text>
      <Text style={styles.texte}>
        Notre équipe a entièrement designé et codé cette application dans le but
        d'aider les associations de créer, modifier, générer et organiser leurs
        événements, gérer les présences, et faciliter la communication entre les
        membres.
      </Text>
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  texte: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    width: "80%",
    marginTop: 20,
  },
});
