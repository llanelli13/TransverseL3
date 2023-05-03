import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Home from './Screens/Home';
import Profil from './Screens/Profil';
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import CalendarScreen from "./Screens/Calendar";  
import Exit from "./Screens/Exit";
import 'setimmediate'; // or import 'next-tick';
import React, { useState, useEffect, useDebugValue } from 'react';
import { AppRegistry } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const Drawer = createDrawerNavigator();
// Si tu met la ligne de dessous sans le commentaire, l'appli ne marche plus
// const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});

export default function App () {

  const createTables = () => {
    db.transaction(txn => {
      // Création de la table User
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS User (num_Licence INT primary key, User_created DATETIME, User_prenom VARCHAR(20) not null, User_nom VARCHAR(20) not null,  User_mail VARCHAR(50) not null, User_role VARCHAR(20) not null, User_passwords VARCHAR(200) not null)',
        [],
        () => {
          console.log("User table created successfully")
        },
        error => {
          console.log("Error creating user table " + error.message)
        })
  
      // Création de la table Evenement
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Evenement (ID_Evenement INTEGER PRIMARY KEY AUTOINCREMENT, Type_Evenement text not null, Nom_evenement text not null, lieu_evenement text not null, date_evenement VARCHAR(20) not null, heure_debut VARCHAR(20) not null, heure_fin VARCHAR(20) not null, entraineur text)',
        [],
        () => {
          console.log("Event table created successfully")
        },
        error => {
          console.log("Error creating Event table " + error.message)
      })
  
      // Création de la table Participe
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Participe (ID_Participe INTEGER PRIMARY KEY AUTOINCREMENT, ID_Evenement INTEGER, num_Licence INTEGER, FOREIGN KEY (ID_Evenement) REFERENCES Evenement(ID_Evenement), FOREIGN KEY (num_Licence) REFERENCES User(num_Licence))',
        [], 
        () => {
          console.log("Participant table created successfully")
        },
        error => {
          console.log("Error creating Participant table " + error.message)
      })      
     })     
  }



  // useEffect( () => {
  //   createTables();
  // })




  return(
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShown : true}}>
          <Drawer.Screen 
              name="Home" 
              component={Home}
              options = {{ drawerIcon: ({tintColor}) => <Feather name="home" size={16} color={tintColor} /> }} />
          <Drawer.Screen 
              name="Profil" 
              component={Profil}
              options = {{ drawerIcon: ({tintColor}) => <Feather name="user" size={16} color={tintColor} /> }} />
          <Drawer.Screen
              name="A propos"
              component={AboutUs}
              options = {{drawerIcon: ({tintColor}) => <Feather name="info" size={16} color={tintColor} />}} />
          <Drawer.Screen
              name="Contact"
              component={ContactUs}
              options = {{drawerIcon: ({tintColor}) => <Feather name="mail" size={16} color={tintColor} />}} />
          <Drawer.Screen 
              name="Calendar"
              component={CalendarScreen}
              options = {{drawerIcon: ({tintColor}) => <Feather name="calendar" size={16} color={tintColor} />}}/>
          <Drawer.Screen 
              name="Exit"
              component={Exit}
              options = {{drawerIcon: ({tintColor}) => <Feather name="log-out" size={16} color={tintColor} />}}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

AppRegistry.registerComponent('App', () => App);
