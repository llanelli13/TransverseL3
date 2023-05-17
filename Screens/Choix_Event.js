import React, { useEffect, useState } from 'react';
import { Alert, TextInput, Button, TouchableOpacity, Image, FlatList, View, Text} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';


export default function ChoixEvent () {

    const navigation = useNavigation();

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


      const goToNextScreen = (item) => {
        navigation.dispatch(DrawerActions.jumpTo('Presence', {item}));
      }

      const navigateToEventDetails = (item) => {
        navigation.navigate('Presence', { item });
      };
    
      const renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => goToNextScreen(item)}>
                    <Text>Evenement : {item.Nom_evenement}</Text>
                </TouchableOpacity>

            </View>
        );

      };
      

    const Separator = () => <View style={{ width: 25 }} />;


    return (
        <View>

            <Text> Voici la liste des évènements : </Text>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID_Evenement.toString()}
                ItemSeparatorComponent={Separator}
                style={{ alignSelf: 'center'}}
                contentContainerStyle={{ paddingHorizontal: 25 }}
            />
        </View>

    )

}