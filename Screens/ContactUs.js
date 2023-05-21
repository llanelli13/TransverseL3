import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { Dimensions } from "react-native";
import { Image } from "react-native-elements";

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
    <View style={styles.container}>
      <Text style={styles.title}>Nous contacter</Text>
      <TextInput
        style={styles.input}
        placeholder="Objet"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Message"
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={setMessage}
      />
      <Text style={styles.replyInfo}>
        En cas de réponse nécessaire, un mail sera envoyé à l'adresse
        {user.User_mail}.
      </Text>
      {showErrorMessage && (
        <Text style={styles.errorMessage}>
          Veuillez remplir tous les champs.
        </Text>
      )}
      {showSuccessMessage && (
        <Text style={styles.successMessage}>Message envoyé avec succès!</Text>
      )}
      <Button title="Envoyer" onPress={handleSendMessage} color="#232c53" />
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#232c53",
    borderRadius: 5,
  },
  textArea: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#232c53",
    borderRadius: 5,
    height: 120,
    textAlignVertical: "top",
  },
  replyInfo: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#888",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  successMessage: {
    color: "green",
    marginTop: 10,
  },
  logo: {
    width: 100,
  },
});
