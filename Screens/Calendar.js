import React, { useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,Image,  TouchableOpacity, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from "expo-status-bar";

import moment from "moment";
import { Dimensions } from "react-native";


import "moment/locale/fr";

moment.locale("fr");

const screenWidth = Dimensions.get("window").width;


export default function CalendarScreen() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEventsFromDatabase();
  }, []);

  const fetchEventsFromDatabase = () => {
    const db = SQLite.openDatabase('ma_base_de_donnees.db');

    db.transaction(tx => {
      tx.executeSql(
        'SELECT Evenement.*, Participe.num_Licence FROM Evenement INNER JOIN Participe ON Evenement.ID_Evenement = Participe.ID_Evenement',
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          const eventList = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            eventList.push({
              id: row.ID_Evenement.toString(),
              title: row.Nom_evenement,
              date: row.date_evenement,
              startTime: row.heure_debut,
              endTime: row.heure_fin,
              location: row.lieu_evenement,
              participantLicense: row.num_Licence,
            });
          }
          setEvents(eventList);
        },
        (_, error) => {
          console.log('Erreur lors de la requête :', error);
        }
      );
    });
  };


    const renderEventItem = ( event ) => {
      // ...

  
  
      const formattedDate = moment(event.date)
        .format("dddd D MMMM")
        .replace(
          /^(.)(.*)$/,
          (_, firstChar, restOfString) =>
            firstChar.toUpperCase() + restOfString.toLowerCase()
        )
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return (
        <View style={styles.flatlist}>
          <View style={styles.date}>
            <Text style={{ fontSize: 25, color: "white", padding: 4 }}>
              {formattedDate}
            </Text>
          </View>
  
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Entrainement de {event.title}
              </Text>
            </View>
            
          </View>
  
          <View>
            <Text style={styles.info}>Lieu: {event.location}</Text>
          </View>
  
          <View style={{ justifyContent : "center" }}>
          
              
  
            <View style={styles.heure}>
              <Text style={{ fontSize: 13, color: "white", margin: 15 }}>
                {event.startTime}h - {event.endTime}h
              </Text>
            </View>
          </View>
        </View>
      );
    };

/*


  const renderEventItem = event => (

        <View key={event.id}>
          <Text>{event.title}</Text>
          <Text>Date: {event.date}</Text>
          <Text>Heure de début: {event.startTime}</Text>
          <Text>Heure de fin: {event.endTime}</Text>
          <Text>Lieu: {event.location}</Text>
        </View>
);

*/

    const markedDates = {};

    events.forEach(event => {
    markedDates[event.date] = { marked: true };
    });

    const handleDayPress = day => {
        const selectedDate = day.dateString;
        const event = events.find(event => event.date === selectedDate);
        setSelectedEvent(event);
        };

        const styles = StyleSheet.create({
          
          background: {
            flex: 1,
            backgroundColor:  '#232c53',
            alignItems: 'center',
            
          },
          container: {
            width: '80%',
            marginTop :30,
          },
          logo: {
            alignSelf: "center",
            resizeMode: 'contain',
            flex: 0.2,
          },
          flatlist: {
            marginTop : 30,
            marginBottom : 30,
            borderWidth: 1,
            backgroundColor: "white",
          },
          date: {
            backgroundColor: "#556297",
            alignItems: "center",
          },
        
          heure: {
            backgroundColor: "#556297",
            alignItems: "center",
            alignSelf : "center",
            width: 100,
          },
          info: {
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 5,
          },
        
          logo: {
            alignSelf: "center",
            resizeMode: "contain",
            width: screenWidth,
            height: 75,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          },
          button : {
            backgroundColor : "#556297",
            color : "white",
            fontSize : 20,
            alignContent : "center",
            justifyContent : "center"
            

          },
          buttonText :{
            fontSize : 25,
            padding :5,
            color : "white",
            textAlign : "center",
          }
          
        });

    return (
      
    <View style={styles.background}>
      <View style={styles.container}>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
        {selectedEvent && (
          <View >
                {renderEventItem(selectedEvent)}
                <TouchableOpacity
  style={styles.button}
  onPress={() => setSelectedEvent(null)}
>
  <Text style={styles.buttonText}>Fermer</Text>
</TouchableOpacity>
          </View>
        )}
      </View>
      <Image source={require("../Images/Footer.png")} style={styles.logo} />
      <StatusBar style="auto" />

    </View>
    );

    
}