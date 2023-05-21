
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import { useLayoutEffect } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList,ScrollView } from "react-native";
import {
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import * as SQLite from "expo-sqlite";

const ITEM_WIDTH = 150;


export default function Profil () {  

    const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});

    const [Licence, SetLicence] = useState("");
    const [Mail, SetMail] = useState("");
    const [UserPrenom, setUserPrenom] = useState("");
    const [UserNom, setUserNom] = useState("");

     const MAJ = () => {
         db.transaction(txn =>{
            txn.executeSQL(
                 "Update table USER where ID_licence"
             )
         })

     }
     const fetchData = (db, setUserPrenom, setUserNom) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM User WHERE num_Licence = ?",
                ["1"], // Remplace "1" par la licence de l'utilisateur que tu souhaites afficher
                (_, resultSet) => {
                const rows = resultSet.rows;
                if (rows.length > 0) {
                    const user = rows.item(0);
                    setUserPrenom(user.User_prenom);
                    setUserNom(user.User_nom);
                }
                },
                (_, error) => {
                console.log("Erreur lors de la requête User :", error);
                }
            );
        });
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{alignContent: 'center', alignItems: 'center', marginTop: 25}}>
               <Image 
                style={styles.image}
                source={require('../assets/profil.png')}/> 
            </View>
            <View style={{margin: 25}}>
                <Text style={styles.text}>Identifiant: {UserPrenom}</Text>
                <Text style={styles.text}>Mail: {UserNom}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ITEM_WIDTH / 2,

    },
    input:{
        padding: 5,
        margin:5,
        borderWidth: 0.2,

    },
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#232c53",
    },
    text: {
        color:"#161924",
        fontSize: 20,
        fontWeight: "500",
    },
    texte:{
        fontWeight: 'bold',
        fontSize: 24,
    },
    test: {
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {
      alignSelf: "center",
      resizeMode: 'contain',
      flex: 0.2,
    },
})
