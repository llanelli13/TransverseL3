import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminCheck = ({ user }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(user.User_role);
    const isAdmin = user.User_role === "admin";
    if (!isAdmin) {
      // Rediriger vers la page de non autorisation si l'utilisateur n'est pas un admin
      navigation.navigate("NonAdmin");
    }
  }, [user, navigation]);

  return <View>{/* Contenu du composant AdminCheck */}</View>;
};

export default AdminCheck;
