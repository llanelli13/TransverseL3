import React from "react";
import { View, Text,StyleSheet } from "react-native";
import AdminCheck from "../Components/AdminCheck";

const ContactUs = () => {
  return (
    <View>
      <Text>Olala contactez nous ....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  logo: {
    alignSelf: "center",
    resizeMode: 'contain',
    flex: 0.2,
  },
});


export default ContactUs;
