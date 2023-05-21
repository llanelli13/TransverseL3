import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import AdminCheck from "../Components/AdminCheck";

export default function AddEvent({ route }) {
  const [Nom, Setnom] = useState("");
  const [Lieu, SetLieu] = useState("");
  const [Trainer, setTrainer] = useState("");
  const [Jour, SetJour] = useState("");
  const [Mois, SetMois] = useState("");
  const [Annee, SetAnnee] = useState("");
  const [Heure_Debut, SetHeure_Debut] = useState("");
  const [Heure_Fin, SetHeure_Fin] = useState("");
  const user = route.params;

  const fetchData = () => {
    const db = SQLite.openDatabase("ma_base_de_donnees.db");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM User",
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            console.log("Résultat de la requête :", row);
          }
        },
        (_, error) => {
          console.log("Erreur lors de la requête :", error);
        }
      );

      tx.executeSql(
        "SELECT * FROM Evenement",
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            console.log("Résultat de la requête :", row);
          }
        },
        (_, error) => {
          console.log("Erreur lors de la requête :", error);
        }
      );

      tx.executeSql(
        "SELECT * FROM Participe",
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            console.log("Résultat de la requête :", row);
          }
        },
        (_, error) => {
          console.log("Erreur lors de la requête :", error);
        }
      );
    });
  };

  const addEvent = () => {
    const db = SQLite.openDatabase("ma_base_de_donnees.db");

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Evenement (Type_Evenement, Nom_evenement, lieu_evenement, date_evenement, heure_debut, heure_fin, entraineur) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          `${Nom}`,
          `${Nom}`,
          `${Lieu}`,
          `${Annee}` + "-" + `${Mois}` + "-" + `${Jour}`,
          `${Heure_Debut}`,
          `${Heure_Fin}`,
          `${Trainer}`,
        ],
        (_, resultSet) => {
          console.log("Add Event réussi");
          fetchData();
        },
        (_, error) => {
          console.log("Erreur lors de add Event Evenement:", error);
        }
      );
    });
  };

  return (
    <View style={styles.background}>
      {/* <AdminCheck user={user} /> */}

      <Text style={{ fontSize: 25, color: "white", padding: 30 }}>
        {" "}
        Nouvel évènement{" "}
      </Text>

      <View style={{ width: "75%" }}>
        <TextInput
          style={styles.textezone}
          placeholder="Sport :"
          value={Nom}
          onChangeText={Setnom}
        />

        <TextInput
          style={styles.textezone}
          placeholder="Lieu :"
          value={Lieu}
          onChangeText={SetLieu}
        />

        <TextInput
          style={styles.textezone}
          placeholder="Entraineur :"
          value={Trainer}
          onChangeText={setTrainer}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={styles.textezone2}
            keyboardType="numeric"
            placeholder="Jour :"
            value={Jour}
            onChangeText={SetJour}
          />

          <TextInput
            style={styles.textezone2}
            keyboardType="numeric"
            placeholder="Mois :"
            value={Mois}
            onChangeText={SetMois}
          />

          <TextInput
            style={styles.textezone2}
            keyboardType="numeric"
            placeholder="Année :"
            value={Annee}
            onChangeText={SetAnnee}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={styles.textezone2}
            keyboardType="numeric"
            placeholder="Début :"
            value={Heure_Debut}
            onChangeText={SetHeure_Debut}
          />

          <TextInput
            style={styles.textezone2}
            keyboardType="numeric"
            placeholder="Fin :"
            value={Heure_Fin}
            onChangeText={SetHeure_Fin}
          />
        </View>
      </View>

      <TouchableOpacity onPress={addEvent} style={styles.button}>
        <Text> Add Event </Text>
      </TouchableOpacity>
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  textezone: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  textezone2: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "30%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    flex: 0.2,
  },
  background: {
    flex: 1,
    backgroundColor: "#232c53",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#556297",
    alignItems: "center",
    width: "75%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
