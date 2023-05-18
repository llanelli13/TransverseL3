import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Home from "../Screens/Home";
import Profil from "../Screens/Profil";
import AboutUs from "../Screens/AboutUs";
import ContactUs from "../Screens/ContactUs";
import CalendarScreen from "../Screens/Calendar";
import Exit from "../Screens/Exit";
import AddEvent from "../Screens/AddEvent";
import Connexion from "../Screens/Connexion";
import Inscription from "../Screens/Inscription";
import PresenceComponent from "../Screens/Presence";
import ChoixEvent from "../Screens/Choix_Event";
import NonAdmin from "../Screens/NonAdmin";

const Drawer = createDrawerNavigator();

const NavigationDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Connexion"
        screenOptions={{ headerShown: true }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="home" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profil"
          component={Profil}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="user" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="A propos"
          component={AboutUs}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="info" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactUs}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="mail" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="calendar" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Exit"
          component={Exit}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="log-out" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Add"
          component={AddEvent}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="plus" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Connexion"
          component={Connexion}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="minus" size={16} color={tintColor} />
            ),
            headerShown: false, // Enleve l'affichage du drawer
            swipeEnabled: false, // Empeche de swipe pour afficher le drawer
          }}
        />
        <Drawer.Screen
          name="Inscription"
          component={Inscription}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="minus" size={16} color={tintColor} />
            ),
            headerShown: false, // Enleve l'affichage du drawer
            swipeEnabled: false, // Empeche de swipe pour afficher le drawer
          }}
        />
        <Drawer.Screen
          name="Presence"
          component={PresenceComponent}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="minus" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="ChoixEvent"
          component={ChoixEvent}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Feather name="minus" size={16} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="NonAdmin"
          component={NonAdmin}
          options={{
            drawerLabel: () => null,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationDrawer;
