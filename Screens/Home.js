import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect, useDebugValue } from 'react';
import { Alert, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import * as SQLite from 'expo-sqlite';


const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 225;


export default function Home() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = () => {
    const db = SQLite.openDatabase('ma_base_de_donnees.db');
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Evenement',
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          const newData = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            newData.push(row); // Add each row to the newData array
          }
          setData(newData); // Update the Data state with the fetched data
        },
        (_, error) => {
          console.log('Erreur lors de la requête :', error);
        }
      );
    });
  };
  

  const DelEvent = (ID) => {
    const db = SQLite.openDatabase('ma_base_de_donnees.db');

    db.transaction(tx =>{
      tx.executeSql(
        'DELETE FROM Evenement WHERE ID_Evenement = ?',
        [ID],
        (_, resultSet) => {
          console.log('Suppression réussie pour Evenement !');
          fetchDataFromDatabase();
        },
        (_, error) => {
          console.log('Erreur lors de la suppression de Evenement :', error);
        }
      );
    })
  }


  const Separator = () => <View style={{ width: 12 }} />;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID : {item.ID_Evenement} </Text>
      <Text>Type d'événement: {item.Type_Evenement}</Text>
      <Text>Nom de l'événement: {item.Nom_evenement}</Text>
      <Text>Lieu: {item.lieu_evenement}</Text>
      <Text>Date: {item.date_evenement}</Text>
      <Text>Heure de début: {item.heure_debut}</Text>
      <Text>Heure de fin: {item.heure_fin}</Text>
      <Text>Entraîneur: {item.entraineur}</Text>


      <TouchableOpacity 
                onPress={() => DelEvent(item.ID_Evenement)}
                style = {{marginTop: 50}}>
            <Text> Delete Event </Text>
        </TouchableOpacity>

    </View>

  );
  

  

  return (
    <View style={styles.container}>
      <Text>Welcome home !</Text>

      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID_Evenement.toString()}
        ItemSeparatorComponent={Separator}
        horizontal
        style={{ alignSelf: 'center' }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      <Text> Rien de spécial ici</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginTop: 15,
    marginBottom: 15,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: 'lightblue',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  contenu: {
    margin: 10,
  }
});
