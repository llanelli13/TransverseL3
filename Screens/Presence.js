import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { CheckBox } from 'react-native-elements';

export default function PresenceComponent() {
  // const [items, setItems] = useState([
  //   { id: 1, name: "REY", firstName: "Pierre", isSelected: false },
  //   { id: 2, name: "BELMADANI", firstName: "Remi", isSelected: false },
  //   { id: 3, name: "NEUBERTH", firstName: "Ludwig", isSelected: false },
  //   { id: 4, name: "VIGOT", firstName: "Marin", isSelected: false },
  //   { id: 5, name: "ITTE", firstName: "Steve", isSelected: false },
  // ]);

  // const toggleCheckbox = (id) => {
  //   const newItems = items.map((item) =>
  //     item.id === id ? { ...item, isSelected: !item.isSelected } : item
  //   );
  //   setItems(newItems);
  // };

  const [Data, setData] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);


  const handleCheck = (ID) => {
    setChecked(!checked);
  };


  const fetchDataFromDatabase = () => {
    const db = SQLite.openDatabase('ma_base_de_donnees.db');
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM User',
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
  
  const Separator = () => <View style={{ width: 12 }} />;

  const renderItem = ({ item }) => (
    <View style={styles.item} key={item.num_Licence}>
      <Text>{item.num_Licence}</Text>
      <Text>{item.User_nom}</Text>
      <Text>{item.User_prenom}</Text>
      <CheckBox
        checked={checked}
        onPress={() => handleCheck(item.num_Licence)}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Num_Licence}
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
