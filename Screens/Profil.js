import { StyleSheet, View, TextInput, Button, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import { useLayoutEffect } from 'react';
import React, { useState, useEffect, useContext } from 'react';


const ITEM_WIDTH = 150;


export default function Profil () {  

    // const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});

    const [Licence, SetLicence] = useState("");
    const [Mail, SetMail] = useState("");

    // const MAJ = () => {
    //     db.transaction(txn =>{
    //         txn.executeSQL(
    //             "Update table USER where ID_licence"
    //         )
    //     })

    // }
    return (
        <View>
            <View style={{alignContent: 'center', alignItems: 'center', marginTop: 25}}>
               <Image 
                style={styles.image}
                source={require('../assets/profil.png')}/> 
            </View>
            <View style={{margin: 25}}>
                <TextInput 
                    placeholder="Identifiant : "
                    value={Licence}
                    onChangeText={SetLicence}/>
                <TextInput
                    placeholder="mail : "
                    value={Mail}
                    onChangeText={SetMail} />
                <TextInput
                    placeholder="Licence : "
                    value={Licence}
                    onChangeText={SetLicence} /> 
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
    },
    logo: {
      alignSelf: "center",
      resizeMode: 'contain',
      flex: 0.2,
    },
})
