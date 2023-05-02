import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Home from './Screens/Home';
import Profil from './Screens/Profil';
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import CalendarScreen from "./Screens/Calendar";
import { openDatabase } from "react-native-sqlite-storage";
import { setImmediate } from 'timers';


const Drawer = createDrawerNavigator();

  const db = openDatabase ({
    name: 'db',
  });

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS User (num_Licence INT primary key, User_created DATETIME, User_prenom VARCHAR(20) not null, User_nom VARCHAR(20) not null,  User_mail VARCHAR(50) not null, User_role VARCHAR(20) not null, User_passwords VARCHAR(200) not null),',
        [],
        () => {
          console.log("Table user crée avec succès")
        },
        error => {
          console.log("Echec de la table User")
        })
    })     
  }

export default function App () {


  setImmediate(() => {
    createTables();
  });

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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}