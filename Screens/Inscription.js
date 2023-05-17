import { StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';



export default function Inscription () {  

    const navigation = useNavigation();

    const [numLicence, setnumLicence] = useState("");
    const [Userprenom, setUserprenom] = useState("");
    const [Usernom, setUsernom] = useState("");
    const [Usermail, setUsermail] = useState("");
    const [Userpassword, setUserpassword] = useState("");




    const AddUser = () => {
        const db = SQLite.openDatabase('ma_base_de_donnees.db');

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO User (num_Licence, User_prenom, User_nom, User_mail, User_role, User_passwords) VALUES (?, ?, ?, ?, ?, ?)',
                [`${numLicence}`, `${Userprenom}`, `${Usernom}`, `${Usermail}`, 'user', `${Userpassword}`],
                (_, resultSet) => {
                  console.log('Insertion réussie !');
                },
                (_, error) => {
                  console.log('Erreur lors de l\'insertion User:', error);
                });
        })

        navigation.navigate('Connexion');


    }


    return (
        <View>           
            
            <TextInput
            keyboardType='numeric'
                placeholder="Numéro de licence"
                value={numLicence}
                onChangeText={setnumLicence}
            />
            <TextInput
                placeholder="Prénom"
                value= {Userprenom}
                onChangeText={setUserprenom}
            />
            <TextInput
                placeholder="Nom"
                value={Usernom}
                onChangeText={setUsernom}
            />
            <TextInput
                placeholder="Email"
                value={Usermail}
                onChangeText={setUsermail}
            />
            <TextInput
                placeholder="Mot de passe"
                value={Userpassword}
                onChangeText={setUserpassword}
            />
 
        <TouchableOpacity 
                onPress={AddUser}>
            <Text> S'inscrire </Text>
        </TouchableOpacity>
        
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