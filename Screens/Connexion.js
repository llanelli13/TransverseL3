import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert
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

  const seConnecter = (numLicence, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM User WHERE num_Licence = ? AND User_passwords = ?',
          [numLicence, password],
          (tx, results) => {
            if (results.rows.length > 0) {
              // Utilisateur trouvé, connexion réussie
              const user = results.rows.item(0);
              navigation.navigate("Home", {user});
              resolve(true);
            } else {
              // Aucun utilisateur correspondant trouvé, connexion échouée
              resolve(false);
            }
          },
          (error) => {
            // Erreur lors de l'exécution de la requête SQL
            reject(error);
          }
        );
      });
    });
  };

  const handleLogin = () => {
    seConnecter(numLicence, Password)
      .then((connexionReussie) => {
        if (connexionReussie) {
          console.log('Connexion réussie');
          // Effectuez les actions nécessaires après une connexion réussie
          navigation.navigate("Home");
        } else {
          console.log('Échec de la connexion');
          // Effectuez les actions nécessaires après une connexion échouée
          Alert.alert('Identifiants invalides');
        }
      })
      .catch((error) => {
        console.log('Erreur:', error);
        // Gérez les erreurs
        Alert.alert('Une erreur s\'est produite' + error );
      });
  };
  

  return (
    <View style={styles.background}>
      <Text style={styles.titre}>EasyOrga</Text>
      <View style={styles.container}>
        <Text style={styles.texte}>Numéro de licence</Text>
        <TextInput
          style={styles.textezone}
          keyboardType="numeric"
          placeholder="..."
          value={numLicence}
          onChangeText={SetnumLicence}
        />

        <Text style={styles.texte}>Mot de passe</Text>
        <TextInput
          style={styles.textezone}
          placeholder="..."
          secureTextEntry
          value={Password}
          onChangeText={SetPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => seConnecter(numLicence, Password)}>
          <Text style={{ color: "white" }}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={{ color: "white" }}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titre: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    padding: 30,
  },
  background: {
    flex: 1,
    backgroundColor: "#232c53",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "75%",
  },
  button: {
    backgroundColor: "#556297",
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  texte: {
    color: "white",
  },
  textezone: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
