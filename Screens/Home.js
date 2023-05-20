import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useDebugValue } from "react";
import {
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import * as SQLite from "expo-sqlite";
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";
import moment from 'moment';
import 'moment/locale/fr';


moment.locale('fr');


const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 270;

export default function Home({ route}) {
  const { user } = route.params;
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = () => {
    const db = SQLite.openDatabase("ma_base_de_donnees.db");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Evenement",
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
          console.log("Erreur lors de la requête :", error);
        }
      );
    });
  };

  const DelEvent = (ID) => {
    const db = SQLite.openDatabase("ma_base_de_donnees.db");

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Evenement WHERE ID_Evenement = ?",
        [ID],
        (_, resultSet) => {
          console.log("Suppression réussie pour Evenement !");
          fetchDataFromDatabase();
        },
        (_, error) => {
          console.log("Erreur lors de la suppression de Evenement :", error);
        }
      );
    });
  };

  const Participe = (ID_Evenement, num_Licence) => {
    const db = SQLite.openDatabase("ma_base_de_donnees.db");

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Participe (ID_Participe, ID_Evenement, num_Licence) VALUES (?, ?)",
        [`${item.ID_Evenement}`, "1"],
        (_, resultSet) => {
          console.log("Participation réussi !");
        },
        (_, error) => {
          console.log("Erreur lors de la participation à l evenement:", error);
        }
      );
    });
  };

  async function askCalendarPermission() {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status === "granted") {
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
      const db = SQLite.openDatabase("ma_base_de_donnees.db");
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Participe (ID_Evenement, num_Licence) VALUES (?, ?)",
          [eventId, num_Licence],
          (_, resultSet) => {
            console.log("Participation réussie !");
            // Ici, vous pouvez effectuer toute autre logique nécessaire après l'insertion
          },
          (_, error) => {
            console.log(
              "Erreur lors de la participation à l'événement :",
              error
            );
          }
        );
      });
    } catch (error) {
      console.log("Erreur lors de l'ajout de l'événement :", error);
    }
  }


  const getImageSource = (typeEvenement) => {
    let imagePath = '';
    switch (typeEvenement) {
      case 'athletisme':
        imagePath = require(`../Images/sport/athle.png`);
        break;
      case 'Basket':
        imagePath = require(`../Images/sport/Basket.png`);
        break;
      case 'Badminton':
        imagePath = require(`../Images/sport/Badminton.png`);
        break;
      case 'Football':
        imagePath = require(`../Images/sport/Foot.png`);
        break;
      case 'Hike':
        imagePath = require(`../Images/sport/Hike_Efrei.png`);
        break;
      case 'Tennis':
        imagePath = require(`../Images/sport/Tennis.png`);
        break;
      case 'Natation':
        imagePath = require(`../Images/sport/Natation.png`);
        break;
      case 'Rugby':
        imagePath = require(`../Images/sport/Rugby.png`);
        break;
      case 'Volleyball':
        imagePath = require(`../Images/sport/Volley.png`);
        break;
      case 'Ping Pong':
        imagePath = require(`../Images/sport/Logo_tennis_de_table.png`);
        break;
  
      // Ajoute d'autres cas pour les autres types d'événements avec leurs chemins d'image correspondants
      default:
        <Text> Pas d'image </Text>
    }
    return imagePath;
  };
  
  const Separator = () => <View style={{ width: 12 }} />;



  




  const renderItem = ({ item }) => {
    // ...
  
    const formattedDate = moment(item.date_evenement).format('dddd D MMMM').replace(/^(.)(.*)$/, (_, firstChar, restOfString) =>
    firstChar.toUpperCase() + restOfString.toLowerCase()).replace(/\b\w/g, (c) => c.toUpperCase());
    return (  

    <View style={styles.flatlist}>

      <View style={styles.date}>
        <Text style = {{fontSize:25, color:'white', padding:4}}>{formattedDate}</Text>
      </View>

      <View style = {{flexDirection: 'row'}}>
          <View style = {{width: '50%',  justifyContent: 'center', alignItems: 'center', marginTop : 15}}>
            <Text style = {{fontSize: 16}}>{item.Type_Evenement}</Text>
          </View>
          <View style = {{width: '50%',  justifyContent: 'center', alignItems:'center', marginTop : 15,marginBottom : 15}}>
            <Image source={getImageSource(item.Type_Evenement)} 
                style={{ width: 80, height: 80 }} />
          </View>
      </View>


      <View>
        <Text style={styles.info}>Responsable: {item.entraineur}</Text>
        <Text style={styles.info}>Lieu: {item.lieu_evenement}</Text>
      </View>
      <View style={styles.heure}>
        <Text style = {{fontSize:25, color:'white'}}  >{item.heure_debut}h - {item.heure_fin}h</Text>
      </View>

      <TouchableOpacity onPress={() => handleParticipateClick(item.ID_Evenement, user.num_Licence)} style={{ marginTop: 15 }}>
        <Text>Je participe</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => DelEvent(item.ID_Evenement)} style={{ marginTop: 10 }}>
        <Text> Delete Event </Text>
      </TouchableOpacity>
    
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text>Welcome home, {user.User_prenom}! </Text>


      <Text style = {{fontSize:25, color:'white', marginBottom : 20}}> Les évènements à venir </Text>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID_Evenement.toString()}
        ItemSeparatorComponent={Separator}
        horizontal
        style={{ alignSelf: "center" }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

    <Text style = {{fontSize:25, color:'white'}}> Photos </Text>

    <Image source={require("../Images/Footer.png")} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  date : {
    backgroundColor: '#556297',
    alignItems: 'center',
  },
  
  heure: {
    backgroundColor: '#556297',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 60,
  },
  info :{
    marginBottom : 10,
  },
  flatlist: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderWidth: 1,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: "#232c53",
    // alignItems: "center",
    // justifyContent: "center",
  },
  item: {
    marginTop: 15,
    marginBottom: 15,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "lightblue",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  contenu: {
    margin: 10,
  },
  
  logo: {
    alignSelf: "center",
    resizeMode: 'contain',
    flex: 0.25,
  },
});
