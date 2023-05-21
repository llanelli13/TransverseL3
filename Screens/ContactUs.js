import React from "react";
import { View, Text,StyleSheet } from "react-native";
import AdminCheck from "../Components/AdminCheck";

const ContactUs = () => {
  return (
    <View style = {styles.background}>
      <View style = {styles.container}>
        <Text>L'équipe BDS</Text>
        <Image source={require("../Images/Logo.png")} style={styles.logo} />
        <Text>L'équipe BDS</Text>
        <Text>L'équipe BDS</Text>
        <Text>L'équipe BDS</Text>
        <Text>L'équipe BDS</Text>
        <Image source={require("../Images/Logo.png")} style={styles.logo} />
        <Image source={require("../Images/Logo.png")} style={styles.logo} />
        <Image source={require("../Images/Logo.png")} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232c53",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: '80%'
  },
  logo:{
    alignSelf :"center",
  }, 
});


export default ContactUs;
