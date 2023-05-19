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
        <View style= {styles.background}>  
            <View style = {styles.container}>
                <TextInput
                    style = {styles.textezone}
                    keyboardType='numeric'
                    placeholder="Numéro de licence"
                    value={numLicence}
                    onChangeText={setnumLicence}
                />
                <TextInput
                    style = {styles.textezone}
                    placeholder="Prénom"
                    value= {Userprenom}
                    onChangeText={setUserprenom}
                />
                <TextInput
                    style = {styles.textezone}
                    placeholder="Nom"
                    value={Usernom}
                    onChangeText={setUsernom}
                />
                <TextInput
                    style = {styles.textezone}
                    placeholder="Email"
                    value={Usermail}
                    onChangeText={setUsermail}
                />
                <TextInput
                    style = {styles.textezone}
                    placeholder="Mot de passe"
                    value={Userpassword}
                    onChangeText={setUserpassword}
                />
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={AddUser}>
                    <Text> S'inscrire </Text>
                </TouchableOpacity>
            </View>              
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor:  '#232c53',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        width: '75%'
      },
      textezone: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
      },
      button: {
        backgroundColor: "#556297",
        alignItems: 'center',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
      },

})