import { StyleSheet, View, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import { useLayoutEffect } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Connexion () {

    const navigation = useNavigation();

    return (
        <View>
            <View style={{margin: 20}}>
                <TextInput
                    placeholder="Identifiant : "/>

                <TextInput 
                    style={{marginTop: 15}}
                    placeholder="Mot de passe : "/>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inscription')}>
                <Text style={styles.buttonText}>Pas de compte ?</Text>
            </TouchableOpacity>
            
        </View>

    );

}  


const styles = StyleSheet.create({
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });