import { Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import Home from './Home';



export default function AddEvent () {

    // const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});

    const [Nom, Setnom] = useState("");
    const [Lieu, SetLieu] = useState("");
    const [Trainer, setTrainer] = useState("");
    const [Jour, SetJour] = useState("");
    const [Mois, SetMois] = useState("");
    const [Annee, SetAnnee] = useState("");

    const addEvent = () => {

        // db.transaction(txn => {
        //     txn.executeSQL(
        //         'INSERT INTO Evenement (ID_Evenementn, Type_Evenement, Nom_evenement, lieu_evenement, date_evenement, heure_debut, heure_fin, entraineur)' + 
        //         'VALUES (?,?,?,?,?,?,?,?)',
        //         [ ? , Nom, Lieu, ? , ? , ? , ? , ? , Trainer],
        //         )

        // })


        alert (`Nom : ${Nom} \n` + 
                `Lieu : ${Lieu} \n` +
                `Entraineur : ${Trainer} \n` + 
                `Jour : ${Jour} \n` +
                `Mois : ${Mois} \n` +
                `Annee : ${Annee} \n` +
                `L'evenement a été ajouté avec succès !`
        )
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

        <View style = {styles.container}>
            <TextInput
                keyboardType='numeric' 
                placeholder="Jour"
                value = {Jour}
                onChangeText={SetJour}/>

            <TextInput
                keyboardType='numeric' 
                placeholder="Mois"
                value = {Mois}
                onChangeText={SetMois}/>   
            
            <TextInput
                keyboardType='numeric' 
                placeholder="Année"
                value = {Annee}
                onChangeText={SetAnnee}/>     
            
        </View>

        <TouchableOpacity onPress={addEvent}>
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