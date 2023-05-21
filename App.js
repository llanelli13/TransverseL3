import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState, useEffect, useDebugValue } from "react";
import { AppRegistry, TextInputBase, alert } from "react-native";
import * as SQLite from "expo-sqlite";
import NavigationDrawer from "./Components/NavigationDrawer";

const db = SQLite.openDatabase("ma_base_de_donnees.db");

export default function App() {
  useEffect(() => {
    // createTables();
    // insertData();
    fetchData();
    // DelData();
    //createTables();
    //insertData();
    //fetchData();
    //DelData();
  }, []);

  const createTables = () => {
    db.transaction((txn) => {
      // Création de la table User
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS User (num_Licence INTEGER PRIMARY KEY, User_prenom TEXT, User_nom TEXT,  User_mail TEXT, User_role TEXT, User_passwords TEXT)",
        [],
        () => {
          console.log("User table created successfully");
        },
        (_, error) => {
          console.log("Error creating user table ", error);
        }
      );

      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS Evenement (ID_Evenement INTEGER PRIMARY KEY AUTOINCREMENT, Type_Evenement TEXT, Nom_evenement TEXT, lieu_evenement TEXT, date_evenement TEXT, heure_debut TEXT, heure_fin TEXT, entraineur TEXT)",
        [],
        () => {
          console.log("Evenement table created successfully");
        },
        (_, error) => {
          console.log("Error creating evenement table ", error);
        }
      );

      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS Participe (ID_Participe INTEGER PRIMARY KEY AUTOINCREMENT, ID_Evenement INTEGER, num_Licence INTEGER, FOREIGN KEY (ID_Evenement) REFERENCES Evenement(ID_Evenement), FOREIGN KEY (num_Licence) REFERENCES User(num_Licence))",
        [],
        () => {
          console.log("Evenement Participe created successfully");
        },
        (_, error) => {
          console.log("Error creating participe table ", error);
        }
      );

      const db = SQLite.openDatabase("ma_base_de_donnees.db");

      // Création de la table LocalData
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS LocalData (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE, value TEXT)",
        [],
        () => {
          console.log("Table LocalData créée avec succès");
        },
        (_, error) => {
          console.error(
            "Erreur lors de la création de la table LocalData",
            error
          );
        }
      );
    });
  };

  const insertData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO User (num_Licence, User_prenom, User_nom, User_mail, User_role, User_passwords) VALUES (?, ?, ?, ?, ?, ?)",
        ["1", "Pierre", "REY", "pierrerey@gmail.com", "admin", "jsp"],
        (_, resultSet) => {
          console.log("Insertion réussie !");
        },
        (_, error) => {
          console.log("Erreur lors de l'insertion User:", error);
        }
      );

      tx.executeSql(
        "INSERT INTO Evenement (Type_Evenement, Nom_evenement, lieu_evenement, date_evenement, heure_debut, heure_fin, entraineur) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Basket",
          "Basket_Entrainement",
          "Montrouge",
          "2023-05-14",
          "18",
          "20",
          "Pierre",
        ],
        (_, resultSet) => {
          console.log("Insertion réussie !");
        },
        (_, error) => {
          console.log("Erreur lors de l'insertion Evenement:", error);
        }
      );
    });
  };

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM User",
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            // console.log("Résultat de la requête :", row);
          }
        },
        (_, error) => {
          console.log("Erreur lors de la requête :", error);
        }
      );

      tx.executeSql(
        "SELECT * FROM Evenement",
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            // console.log("Résultat de la requête :", row);
          }
        },
        (_, error) => {
          console.log("Erreur lors de la requête :", error);
        }
      );
    });
  };

  const DelData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM User",
        [],
        (_, resultSet) => {
          console.log("Suppression réussie pour User !");
        },
        (_, error) => {
          console.log("Erreur lors de la suppression de User :", error);
        }
      );

      tx.executeSql(
        "DELETE FROM Evenement",
        [],
        (_, resultSet) => {
          console.log("Suppression réussie pour Evenement !");
        },
        (_, error) => {
          console.log("Erreur lors de la suppression de Evenement :", error);
        }
      );

      tx.executeSql(
        "DELETE FROM Participe",
        [],
        (_, resultSet) => {
          console.log("Suppression réussie pour Participe !");
        },
        (_, error) => {
          console.log("Erreur lors de la suppression de Participe :", error);
        }
      );
    });
  };
  return <NavigationDrawer />;
}

AppRegistry.registerComponent("App", () => App);
