import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function AboutUs() {
  const userRole = localStorage.getItem("user_role");
  console.log(userRole);
  return (
    <View>
      <Text>
        {" "}
        Voici notre projet d'organisation pour association comme le BDS.{" "}
      </Text>
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
});
