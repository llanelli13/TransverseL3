import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
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
import moment from "moment";
import { Dimensions } from "react-native";

import "moment/locale/fr";

moment.locale("fr");

const ITEM_WIDTH = 300;

const screenWidth = Dimensions.get("window").width;

export default function Home({ route }) {
  const { user } = route.params;
  const [Data, setData] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Ajout de la variable selectedImageIndex
  const handlePhotoPress = (index) => {
    setSelectedImageIndex(index);
  };
  const images = [
    require("../Images/galerie/1.jpg"),
    require("../Images/galerie/2.jpg"),
    require("../Images/galerie/3.jpg"),
    require("../Images/galerie/4.jpg"),
    require("../Images/galerie/5.jpg"),
    require("../Images/galerie/6.jpg"),
    require("../Images/galerie/7.jpg"),
    require("../Images/galerie/8.jpg"),
    require("../Images/galerie/9.jpg"),
    require("../Images/galerie/10.jpg"),
    require("../Images/galerie/11.jpg"),
    require("../Images/galerie/12.jpg"),
    require("../Images/galerie/13.jpg"),
    require("../Images/galerie/14.jpg"),
    require("../Images/galerie/15.jpg"),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
  };

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
    let imagePath = "";
    switch (typeEvenement) {
      case "athletisme":
        imagePath = require(`../Images/sport/athle.png`);
        break;
      case "Basket":
        imagePath = require(`../Images/sport/Basket.png`);
        break;
      case "Badminton":
        imagePath = require(`../Images/sport/Badminton.png`);
        break;
      case "Football":
        imagePath = require(`../Images/sport/Foot.png`);
        break;
      case "Hike":
        imagePath = require(`../Images/sport/Hike_Efrei.png`);
        break;
      case "Tennis":
        imagePath = require(`../Images/sport/Tennis.png`);
        break;
      case "Natation":
        imagePath = require(`../Images/sport/Natation.png`);
        break;
      case "Rugby":
        imagePath = require(`../Images/sport/Rugby.png`);
        break;
      case "Volleyball":
        imagePath = require(`../Images/sport/Volley.png`);
        break;
      case "Ping Pong":
        imagePath = require(`../Images/sport/Logo_tennis_de_table.png`);
        break;

      // Ajoute d'autres cas pour les autres types d'événements avec leurs chemins d'image correspondants
      default:
        <Text> Pas d'image </Text>;
    }
    return imagePath;
  };

  const Separator = () => <View style={{ width: 12 }} />;

  const renderImages = () => {
    const rows = [];
    const itemsPerRow = 3;
    const rowsCount = Math.ceil(images.length / itemsPerRow);

    for (let i = 0; i < rowsCount; i++) {
      const rowItems = [];
      const startIndex = i * itemsPerRow;
      const endIndex = Math.min(startIndex + itemsPerRow, images.length);
      for (let j = startIndex; j < endIndex; j++) {
        rowItems.push(
          <TouchableOpacity
            key={j}
            onPress={() => handleImagePress(j)}
            style={{ margin: 5 }}
          >
            <Image source={images[j]} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
        );
      }
      rows.push(
        <View
          key={i}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  const renderItem = ({ item }) => {
    // ...

    const formattedDate = moment(item.date_evenement)
      .format("dddd D MMMM")
      .replace(
        /^(.)(.*)$/,
        (_, firstChar, restOfString) =>
          firstChar.toUpperCase() + restOfString.toLowerCase()
      )
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <View style={styles.flatlist}>
        <View style={styles.date}>
          <Text style={{ fontSize: 25, color: "white", padding: 4 }}>
            {formattedDate}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Entrainement de {item.Type_Evenement}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Image
              source={getImageSource(item.Type_Evenement)}
              style={{ width: 80, height: 80 }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.info}>Responsable: {item.entraineur}</Text>
          <Text style={styles.info}>Lieu: {item.lieu_evenement}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.heure}>
            <TouchableOpacity
              onPress={() =>
                handleParticipateClick(item.ID_Evenement, user.num_Licence)
              }
              style={{ margin: 15 }}
            >
              <Text style={{ fontSize: 13, color: "white" }}>Je participe</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heure}>
            <Text style={{ fontSize: 13, color: "white", margin: 15 }}>
              {item.heure_debut}h - {item.heure_fin}h
            </Text>
          </View>

          <View style={styles.heure}>
            <TouchableOpacity
              onPress={() => DelEvent(item.ID_Evenement)}
              style={{ margin: 15 }}
            >
              <Text style={{ fontSize: 13, color: "white" }}> Supprimer </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={{ fontSize: 25, color: "white", marginBottom: 10 }}>
            {" "}
            Les évènements à venir{" "}
          </Text>
          <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID_Evenement.toString()}
            ItemSeparatorComponent={Separator}
            horizontal
            style={{ alignSelf: "center" }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 25, color: "white", margin: 10 }}>
              Galerie de photos
            </Text>
            <ScrollView>{renderImages()}</ScrollView>
          </View>
          <Image source={require("../Images/Footer.png")} style={styles.logo} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    backgroundColor: "#556297",
    alignItems: "center",
  },

  heure: {
    backgroundColor: "#556297",
    alignItems: "center",
    width: 100,
  },
  info: {
    marginBottom: 10,
  },
  flatlist: {
    width: ITEM_WIDTH,

    borderWidth: 1,
    backgroundColor: "white",
  },

  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "#232c53",
    // alignItems: "center",
    // justifyContent: "center",
  },
  item: {
    marginTop: 15,
    marginBottom: 15,
    width: ITEM_WIDTH,
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
    resizeMode: "contain",
    width: screenWidth,
    height: 75,
  },
});
