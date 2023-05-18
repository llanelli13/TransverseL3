import React from "react";
import { View, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const AdminCheck = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const isAdmin = localStorage.getItem("user_role") === "admin";
    if (!isAdmin) {
      // Rediriger vers la page de non autorisation si l'utilisateur n'est pas un admin
      navigation.navigate("NonAdmin");
    }
  }, []);

  return <View>{/* Contenu du composant AdminCheck */}</View>;
};

export default AdminCheck;
