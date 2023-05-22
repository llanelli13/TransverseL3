
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

  
  export default function ModifScreen({ route }) {
    // const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});
    const { item } = route.params;

    const [type, setType] = useState(item.Type_Evenement);
    const [nom, setNom] = useState(item.Nom_evenement);
    const [lieu, setLieu] = useState(item.lieu_evenement);
    const [date, setDate] = useState(item.date_evenement);
    const [heure_deb, setheuredeb] = useState(item.heure_debut);
    const [heure_fin, setheurefin] = useState(item.heure_fin);
    const [trainer, settrainer] = useState(item.entraineur);

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
            "UPDATE Evenement SET Type_Evenement = ?, Nom_evenement = ?, lieu_evenement = ?,  date_evenement = ?, heure_debut = ?, heure_fin = ?, entraineur = ? ",
            [type, nom, lieu, date, heure_deb, heure_fin, trainer],
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
        <Text style={styles.titre}> {item.Nom_evenement}</Text>
        <View style={styles.formulaire}>
          <Text style={styles.label}>Nouveau type :</Text>
          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            placeholder="Nouveau type"
          />
          <Text style={styles.label}>Nouveau nom :</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Nouveau nom"
          />
          <Text style={styles.label}>Nouveau lieu :</Text>
          <TextInput
            style={styles.input}
            value={lieu}
            onChangeText={setLieu}
            placeholder="Nouveau lieu"
          />
          <Text style={styles.label}>Nouvelle date :</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="Nouvel date"
          />


        <Text style={styles.label}>Nouvelle heure de début :</Text>
          <TextInput
            style={styles.input}
            value={heure_deb}
            onChangeText={setheuredeb}
            placeholder="Nouvelle heure de début"
          />

        <Text style={styles.label}>Nouvelle heure de fin :</Text>
          <TextInput
            style={styles.input}
            value={heure_fin}
            onChangeText={setheurefin}
            placeholder="Nouvelle heure de fin"
          />

        <Text style={styles.label}>Nouvel entraineur :</Text>
          <TextInput
            style={styles.input}
            value={trainer}
            onChangeText={settrainer}
            placeholder="Nouvel entraineur"
          />
          <Button
            title="Enregistrer"
            onPress={handleEnregistrer}
            color="#232c53"
          />
        </View>
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
  });