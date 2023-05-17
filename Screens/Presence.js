import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { CheckBox } from 'react-native-elements';

export default function PresenceComponent({ route }) { // route est la prop utilisée pour passer les paramètres à ce composant

  const { item } = route.params;



  const [Data, setData] = useState([]);
  const [checked, setChecked] = useState([]);


  useEffect(() => {
    fetchDataFromDatabase(item);
  }, []);


  const handleCheck = (numLicence) => {
    setChecked((prevState) => {
      const updatedChecked = [...prevState];
      const index = updatedChecked.indexOf(numLicence);
      if (index > -1) {
        updatedChecked.splice(index, 1); // Décocher l'élément
      } else {
        updatedChecked.push(numLicence); // Cocher l'élément
      }
      return updatedChecked;
    });
  };


  const fetchDataFromDatabase = (item) => {
    const db = SQLite.openDatabase('ma_base_de_donnees.db');

    db.transaction(tx => {
      console.log(item)
      tx.executeSql(
        'SELECT Participe.*, User.* FROM Participe INNER JOIN Evenement ON Participe.ID_Evenement = Evenement.ID_Evenement INNER JOIN User on Participe.num_Licence = User.num_Licence  WHERE Participe.ID_Evenement = ?',
        [item.ID_Evenement],
        (_, resultSet) => {
          console.log(resultSet);
          const rows = resultSet.rows;
          const newData = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            newData.push(row); // Ajouter chaque ligne à l'array newData
            
          }
          setData(newData); // Mettre à jour le state Data avec les données récupérées
        },
        (_, error) => {
          console.log('Erreur lors de la requête :', error);
        }
      );
    });

  };
  
  const Separator = () => <View style={{ width: 12 }} />;

  const renderItem = ({ item }) => (
    <View style={styles.item} key={item.num_Licence.toString()}>
      <Text>{item.num_Licence}</Text>
      <Text>{item.User_nom}</Text>
      <Text>{item.User_prenom}</Text>
      <CheckBox
        checked={checked.includes(item.num_Licence)}
        onPress={() => handleCheck(item.num_Licence)}
      />
    </View>
  );
  
  

  return (
    <View>

      <Text> Evenement choisi : {item.Nom_evenement}</Text>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.num_Licence}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
});
