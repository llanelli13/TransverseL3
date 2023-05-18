import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import * as SecureStore from "expo-secure-store";

export default function Connexion() {
  const navigation = useNavigation();

  const [numLicence, SetnumLicence] = useState("");
  const [Password, SetPassword] = useState("");

  const db = SQLite.openDatabase("ma_base_de_donnees.db");

  const handleLogin = (numLicence, Password) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM User WHERE num_Licence = ? AND User_passwords = ?",
        [numLicence, Password],
        (_, { rows }) => {
          if (rows.length > 0) {
            const user = rows.item(0);
            const user_role = user.User_role;
            // Utilisateur connecté avec succès
            // Naviguez vers l'écran suivant en passant les données de l'utilisateur
            console.log({ user_role });
            // Après la vérification réussie du login
            localStorage.setItem("user_role", user_role);
            const userRole = localStorage.getItem("user_role");
            console.log(userRole);
            navigation.navigate("Home", { user });
          } else {
            // Échec de la connexion
            console.log("Identifiants invalides");
          }
        },
        (_, error) => {
          console.error("Error executing SQL query", error);
        }
      );
    });
  };

  return (
    <View>
      <View style={{ margin: 20 }}>
        <TextInput
          placeholder="Numéro de licence : "
          value={numLicence}
          onChangeText={SetnumLicence}
        />

        <TextInput
          style={{ marginTop: 15 }}
          placeholder="Mot de passe : "
          secureTextEntry
          value={Password}
          onChangeText={SetPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin(numLicence, Password)}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Inscription")}
      >
        <Text style={styles.buttonText}>Pas de compte ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
