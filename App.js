import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Home from './Screens/Home';
import Profil from './Screens/Profil';
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";

const Drawer = createDrawerNavigator();


export default function App () {
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}