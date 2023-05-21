import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

export default function ContactUs({ route }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { user } = route.params;

  const handleSendMessage = () => {
    if (subject !== "" && message !== "") {
      // Logique pour envoyer le message
      // Peut être implémentée ici ou appelée à partir d'une fonction séparée

      // Exemple de log pour afficher les valeurs saisies
      console.log("Objet :", subject);
      console.log("Message :", message);

      setShowErrorMessage(false); // Réinitialiser le message d'erreur
      setShowSuccessMessage(true); // Afficher le message de succès

      // Réinitialiser les champs après l'envoi du message
      setSubject("");
      setMessage("");
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <View>
      <Text>Olala contactez nous ....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232c53",
    alignItems: "center",
    justifyContent: "center",
  },
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
