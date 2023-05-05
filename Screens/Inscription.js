import { StyleSheet, View, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import { useLayoutEffect } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
import 'setimmediate'; // or import 'next-tick';


export default function Inscription () {  
    return (
        <View style = {styles.container}>           
            
            <TextInput style={styles.input}
                placeholder="Numéro de licence"
                // value={numLicence}
                // onChangeText={setnumLicence}
            />
            <TextInput style={styles.input}
                placeholder="Prénom"
                // value= {Userprenom}
                // onChangeText={setUserprenom}
            />
            <TextInput style={styles.input}
                placeholder="Nom"
                // value={Usernom}
                // onChangeText={setUsernom}
            />
            <TextInput style={styles.input}
                placeholder="Email"
                // value={Usermail}
                // onChangeText={setUsermail}
            />
            <TextInput style={styles.input}
                placeholder="Mot de passe"
                // value={Userpassword}
                // onChangeText={setUserpassword}
            />
 

            {/* <Button title="Créer mon compte"  onPress={}/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        padding: 5,
        margin:5,
        borderWidth: 0.2,

    },
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#FFF",
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
    }
})