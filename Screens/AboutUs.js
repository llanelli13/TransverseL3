import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,Image
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function AboutUs() {
  const userRole = localStorage.getItem("user_role");
  console.log(userRole);
  return (
    <View>
      <Text>
        {" "}
        Voici notre projet d'organisation pour association comme le BDS.{" "}
      </Text>
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FFF",
  },
  texte: {
    fontWeight: "bold",
    fontSize: 24,
  },
  test: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    alignSelf: "center",
    resizeMode: 'contain',
    flex: 0.2,
  },
});
