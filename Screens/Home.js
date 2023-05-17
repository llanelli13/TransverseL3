import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect, useDebugValue } from 'react';
import { Alert, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';


const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 225;


export default function Home({ route }) {

  const { user } = route.params;
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
    });

  }

  const Participe = (ID_Evenement, num_Licence) => {
    const db = SQLite.openDatabase('ma_base_de_donnees.db');

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Participe (ID_Participe, ID_Evenement, num_Licence) VALUES (?, ?)',
        [`${item.ID_Evenement}`, '1'],
        (_, resultSet) => {
          console.log('Participation réussi !');
        },
        (_, error) => {
          console.log('Erreur lors de la participation à l evenement:', error);
        });
    });

  }

  async function askCalendarPermission() {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status === 'granted') {
      // L'utilisateur a donné la permission
      return true;
    } else {
      // L'utilisateur n'a pas donné la permission
      return false;
    }
  }
  
  async function handleParticipateClick(eventId, num_Licence) {
    // ...
    try {
      const db = SQLite.openDatabase('ma_base_de_donnees.db');
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Participe (ID_Evenement, num_Licence) VALUES (?, ?)',
          [eventId, num_Licence],
          (_, resultSet) => {
            console.log('Participation réussie !');
            // Ici, vous pouvez effectuer toute autre logique nécessaire après l'insertion
          },
          (_, error) => {
            console.log('Erreur lors de la participation à l\'événement :', error);
          }
        );
      });
    } catch (error) {
      console.log('Erreur lors de l\'ajout de l\'événement :', error);
    };


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
                onPress={() => handleParticipateClick(item.ID_Evenement, user.num_Licence)} style={{ marginTop: 15 }}>
            <Text>Je participe</Text>
      </TouchableOpacity>


      <TouchableOpacity 
                onPress={() => DelEvent(item.ID_Evenement)}
                style = {{marginTop: 10}}>
            <Text> Delete Event </Text>
        </TouchableOpacity>

    </View>

  );
  

  

  return (
    <View style={styles.container}>
      <Text>Welcome home, {user.User_prenom}! </Text>

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
