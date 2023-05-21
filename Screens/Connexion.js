import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

const Connexion = () => {
  const navigation = useNavigation();
  const [numLicence, setNumLicence] = useState("");
  const [password, setPassword] = useState("");

  const db = SQLite.openDatabase("ma_base_de_donnees.db");

  const seConnecter = (numLicence, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM User WHERE num_Licence = ? AND User_passwords = ?",
          [numLicence, password],
          (tx, results) => {
            if (results.rows.length > 0) {
              const user = results.rows.item(0);
              resolve(user);
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

  const handleConnexion = async () => {
    try {
      const user = await seConnecter(numLicence, password);
      if (user) {
        navigation.navigate("Profil", { user });
        navigation.navigate("Ajouter un evenement", { user });
        navigation.navigate("Presence", { user });
        navigation.navigate("Contact", { user });
        navigation.navigate("Home", { user });
      } else {
        // Aucun utilisateur correspondant trouvé, afficher un message d'erreur ou effectuer d'autres actions
      }
    } catch (error) {
      // Erreur lors de l'exécution de la requête SQL, gérer l'erreur appropriée
    }
  };

  return (
    <View style={styles.background}>
      <Image source={require("../Images/Logo.png")} style={styles.logo} />
      <Text style={styles.titre}>EasyOrga</Text>
      <View style={styles.container}>
        <Text style={styles.texte}>Numéro de licence</Text>
        <TextInput
          style={styles.textezone}
          keyboardType="numeric"
          placeholder="..."
          value={numLicence}
          onChangeText={setNumLicence}
        />

        <Text style={styles.texte}>Mot de passe</Text>
        <TextInput
          style={styles.textezone}
          placeholder="..."
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleConnexion}>
          <Text style={{ color: "white" }}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
          <Text style={{ color: "white" }}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: "80%",
  },
  button: {
    backgroundColor: "#556297",
    alignItems: "center",
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
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});

export default Connexion;
