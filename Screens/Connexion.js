import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  alert,Image
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

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
            // console.log(userRole);
            console.log("Connexion réussie, redirection ... ")
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
    <View style={styles.background}>
      <Image source={require("../Images/Logo.png")} style={styles.logo} />
      <Text style = {styles.titre}> EasyOrga </Text>
      <View style = {styles.container}>
        <Text style={styles.texte}>Numéro de licence</Text>
        <TextInput
          style = {styles.textezone}
          placeholder="..."
          value={numLicence}
          onChangeText={SetnumLicence}
        />
        
        <Text style={styles.texte}>Mot de passe</Text>
        <TextInput
          style = {styles.textezone}
          placeholder="..."
          secureTextEntry
          value={Password}
          onChangeText={SetPassword}
        />      
      <TouchableOpacity
        style = {styles.button}
        onPress={() => handleLogin(numLicence, Password)}>
        <Text style= {{color: 'white'}}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Inscription")}>
        <Text style= {{color: 'white'}}>S'inscrire</Text>
      </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  titre: {
    fontSize: 25,
    color: "white",
    fontWeight: 'bold',
    padding: 30,
    },
  background: {
    flex: 1,
    backgroundColor:  '#232c53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%'
  },
  button: {
    backgroundColor: "#556297",
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  texte: {
    color: 'white',
  },
  textezone: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  logo:{
    alignSelf :"center",
    width: 200,
    height: 200,
  }, 
  
});
