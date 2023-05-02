import { StyleSheet, View, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import { useLayoutEffect } from 'react';


export default function Profil () {    

    
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

    const Rien = () => {
        console.log("Je fais rien atm");
    }

    return (
        <View style = {styles.container}>
            <TextInput style={styles.input}
                placeholder="Prénom"
            />
            <TextInput style={styles.input}
                placeholder="Nom"
            />
            <TextInput style={styles.input}
                placeholder="Email"
            />
            <TextInput style={styles.input}
                placeholder="Mot de passe"
            />

            <Button title="Créer mon compte"  onPress={Rien}/>
        </View>
    );
}