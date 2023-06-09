import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Alert, TextInput, Button, TouchableOpacity, Image, FlatList, View, Text,StyleSheet} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";


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



      const navigateToEventDetails = (item) => {
        navigation.navigate('Presence', { item });
      };

      const navigateToUpdateEvent = (item) => {
        navigation.navigate('ModifEvenet', { item });
      }
    
      const renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => navigateToEventDetails(item)}>
                          <Text style = {{fontSize: 20, padding: 5, color:'white'}}> {item.Nom_evenement} </Text>
                </TouchableOpacity>

            </View>
        );

      };

      const renderItem2 = ({ item }) => {
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => navigateToUpdateEvent(item)}>
                          <Text style = {{fontSize: 20, padding: 5, color:'white'}}> {item.Nom_evenement} </Text>
                </TouchableOpacity>

            </View>
        );

      };
      

    const Separator = () => <View style={{ width: 25 }} />;

    const styles = StyleSheet.create({
      container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      logo: {
        alignSelf: "center",
        resizeMode: 'contain',
        flex: 0.2,
      },
      background : {
        flex: 1,
        backgroundColor: '#556297',
        alignItems: 'center',
      },
    });
    


    return (
        <View style= {styles.background}>
          {/* <AdminCheck user={user} /> */}


            <Text style = {{fontSize: 20,  padding: 20, color:'white'}}> Voici la liste des évènements : </Text>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID_Evenement.toString()}
                ItemSeparatorComponent={Separator}
                style={{ alignSelf: 'center'}}
                contentContainerStyle={{ paddingHorizontal: 25 }}
            />


            <Text style = {{fontSize: 20,  padding: 20, color:'white'}}> Modifier les évènements : </Text>
            <FlatList
                data={Data}
                renderItem={renderItem2}
                keyExtractor={(item) => item.ID_Evenement.toString()}
                ItemSeparatorComponent={Separator}
                style={{ alignSelf: 'center'}}
                contentContainerStyle={{ paddingHorizontal: 25 }}
            />
        </View>

    )

}
