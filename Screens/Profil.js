
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
const ITEM_WIDTH = 150;
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


export default function Profil({ route }) {
  // const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});
  const { user } = route.params;
  const [numLicence, setNumLicence] = useState(user.num_Licence);
  const [prenom, setPrenom] = useState(user.User_prenom);
  const [nom, setNom] = useState(user.User_nom);
  const [email, setEmail] = useState(user.User_mail);
  const [password, setPassword] = useState(user.User_passwords);
  const db = SQLite.openDatabase("ma_base_de_donnees.db");
  // const MAJ = () => {
  //     db.transaction(txn =>{
  //         txn.executeSQL(
  //             "Update table USER where ID_licence"
  //         )
  //     })
  // }
  const modifierInformations = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE User SET User_prenom = ?, User_nom = ?, User_mail = ?,  User_passwords = ?",
          [prenom, nom, email, password],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };
  const handleEnregistrer = async () => {
    try {
      const success = await modifierInformations();
      if (success) {
        // Les informations ont été modifiées avec succès
        // Vous pouvez afficher un message de succès ou effectuer d'autres actions
        console.log("good");
        navigation.navigate("Connexion");
      } else {
        // La modification des informations a échoué
        // Vous pouvez afficher un message d'erreur ou effectuer d'autres actions
      }
    } catch (error) {
      console.log(error);
      // Erreur lors de l'exécution de la requête SQL, gérer l'erreur appropriée
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Profil de l'utilisateur</Text>
      <View style={styles.formulaire}>
        <Text style={styles.label}>Nouveau prénom:</Text>
        <TextInput
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
          placeholder="Nouveau prénom"
        />
        <Text style={styles.label}>Nouveau nom:</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Nouveau nom"
        />
        <Text style={styles.label}>Nouvelle adresse e-mail:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Nouvelle adresse e-mail"
        />
        <Text style={styles.label}>Nouveau mot de passe:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Nouveau mot de passe"
          secureTextEntry
        />
        <Text style={styles.replyInfo}>
          Après toute tentative de changement d'informations, il vous sera
          demandé de vous reconnecter.{"\n"}
        </Text>
        <Button
          title="Enregistrer"
          onPress={handleEnregistrer}
          color="#232c53"
        />
      </View>
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  replyInfo: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#888",
  },
  titre: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#232c53",
  },
  informations: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
    color: "#232c53",
  },
  formulaire: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 7,
    paddingHorizontal: 10,
  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    width: screenWidth,
    height: 75,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  
});