import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Home from "../Screens/Home";
import Profil from "../Screens/Profil";
import AboutUs from "../Screens/AboutUs";
import ContactUs from "../Screens/ContactUs";
import CalendarScreen from "../Screens/Calendar";
import AddEvent from "../Screens/AddEvent";
import Connexion from "../Screens/Connexion";
import Inscription from "../Screens/Inscription";
import PresenceComponent from "../Screens/Presence";
import ChoixEvent from "../Screens/Choix_Event";
import NonAdmin from "../Screens/NonAdmin";

const Drawer = createDrawerNavigator();

const NavigationDrawer = () => {
  return (
    <NavigationContainer style={styles.background}>
      <Drawer.Navigator
        initialRouteName="Connexion"
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: "#232c53",
          },
          drawerLabelStyle: {
            color: "white", // Change la couleur du texte dans la sidebar ici
          },
          headerTintColor: "white",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="home" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        <Drawer.Screen
          name="Profil"
          component={Profil}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="user" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        <Drawer.Screen
          name="A propos"
          component={AboutUs}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="info" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactUs}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="mail" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        <Drawer.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="calendar" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        <Drawer.Screen
          name="Ajouter un evenement"
          component={AddEvent}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="plus" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        <Drawer.Screen
          name="ChoixEvent"
          component={ChoixEvent}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="minus" size={16} color={"white"} />
            ),
            headerStyle: {
              backgroundColor: "#232c53", // Set the header background color to white
            },
          }}
        />
        
        <Drawer.Screen
          name="Connexion"
          component={Connexion}
          options={{
            drawerItemStyle: { pointerEvents: 'none' },
            drawerLabel: () => null,
            headerShown: false, // Enleve l'affichage du drawer
            swipeEnabled: false, // Empeche de swipe pour afficher le drawer
          }}
        />       
        <Drawer.Screen
          name="Inscription"
          component={Inscription}
          // options={{
          //   drawerIcon: ({ tintColor }) => (
          //     <Feather name="minus" size={16} color={"white"} />
          //   ),
          //   headerShown: false, // Enleve l'affichage du drawer
          //   swipeEnabled: false, // Empeche de swipe pour afficher le drawer
          // }}
          options={{
            drawerItemStyle: { pointerEvents: 'none' },
            drawerLabel: () => null,
          }}
        />
        <Drawer.Screen
          name="Presence"
          component={PresenceComponent}
          options={{
            drawerItemStyle: { pointerEvents: 'none' },
            drawerLabel: () => null,
          }}
        />
        <Drawer.Screen
          name="NonAdmin"
          component={NonAdmin}
          options={{
            drawerLabel: () => null,
            drawerItemStyle: { pointerEvents: 'none' },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232c53",
  },
});

export default NavigationDrawer;
