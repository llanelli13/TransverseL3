import { StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';



export default function AddEvent () {

    const [Nom, Setnom] = useState("");
    const [Lieu, SetLieu] = useState("");
    const [Trainer, setTrainer] = useState("");
    const [Jour, SetJour] = useState("");
    const [Mois, SetMois] = useState("");
    const [Annee, SetAnnee] = useState("");
    const [Heure_Debut, SetHeure_Debut] = useState("");
    const [Heure_Fin, SetHeure_Fin] = useState("");

    const addEvent = () => {
        const db = SQLite.openDatabase('ma_base_de_donnees.db');

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Evenement (Type_Evenement, Nom_evenement, lieu_evenement, date_evenement, heure_debut, heure_fin, entraineur) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [`${Nom}`, `${Nom}`, `${Lieu}`, `${Jour}`+'-'+`${Mois}`+'-'+`${Annee}`, `${Heure_Debut}`, `${Heure_Fin}`, `${Trainer}`],
                (_, resultSet) => {
                  console.log('Add Event réussi');
                },
                (_, error) => {
                  console.log('Erreur lors de add Event Evenement:', error);
                });
        })
    }

    return (
      <View>

        <TextInput 
            placeholder="Nom :" 
            value = {Nom}
            onChangeText={Setnom}/>

        <TextInput 
            placeholder="Lieu :"
            value = {Lieu}
            onChangeText={SetLieu} />
            

        <TextInput 
            placeholder="Entraineur :"
            value = {Trainer}
            onChangeText={setTrainer} />

        <TextInput
            keyboardType='numeric' 
            placeholder="Jour :"
            value = {Jour}
            onChangeText={SetJour}/>

        <TextInput
            keyboardType='numeric' 
            placeholder="Mois :"
            value = {Mois}
            onChangeText={SetMois}/>   
         
        <TextInput
            keyboardType='numeric' 
            placeholder="Année :"
            value = {Annee}
            onChangeText={SetAnnee}/>
        
        <TextInput
            keyboardType='numeric' 
            placeholder="Heure de début :"
            value = {Heure_Debut}
            onChangeText={SetHeure_Debut}/>   

        <TextInput
            keyboardType='numeric' 
            placeholder="Heure de fin :"
            value = {Heure_Fin}
            onChangeText={SetHeure_Fin}/>    

        <TouchableOpacity 
                onPress={addEvent}
                style = {{marginTop: 50}}>
            <Text> Add Event </Text>
        </TouchableOpacity>

      </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',

    }
})