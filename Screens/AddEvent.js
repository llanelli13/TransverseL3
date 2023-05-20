import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,Image
} from "react-native";
import { useState } from "react";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
// import AdminCheck from "../Components/AdminCheck";

export default function AddEvent() {
  const [Nom, Setnom] = useState("");
  const [Lieu, SetLieu] = useState("");
  const [Trainer, setTrainer] = useState("");
  const [Jour, SetJour] = useState("");
  const [Mois, SetMois] = useState("");
  const [Annee, SetAnnee] = useState("");
  const [Heure_Debut, SetHeure_Debut] = useState("");
  const [Heure_Fin, SetHeure_Fin] = useState("");

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
    <View>
      {/* <AdminCheck /> */}
      <TextInput placeholder="Nom :" value={Nom} onChangeText={Setnom} />

      <TextInput placeholder="Lieu :" value={Lieu} onChangeText={SetLieu} />

      <TextInput
        placeholder="Entraineur :"
        value={Trainer}
        onChangeText={setTrainer}
      />

      <TextInput
        keyboardType="numeric"
        placeholder="Jour :"
        value={Jour}
        onChangeText={SetJour}
      />

      <TextInput
        keyboardType="numeric"
        placeholder="Mois :"
        value={Mois}
        onChangeText={SetMois}
      />

      <TextInput
        keyboardType="numeric"
        placeholder="Année :"
        value={Annee}
        onChangeText={SetAnnee}
      />

      <TextInput
        keyboardType="numeric"
        placeholder="Heure de début :"
        value={Heure_Debut}
        onChangeText={SetHeure_Debut}
      />

      <TextInput
        keyboardType="numeric"
        placeholder="Heure de fin :"
        value={Heure_Fin}
        onChangeText={SetHeure_Fin}
      />

      <TouchableOpacity onPress={addEvent} style={{ marginTop: 50 }}>
        <Text> Add Event </Text>
      </TouchableOpacity>
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
}

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
