import React, { useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as SQLite from 'expo-sqlite';

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

  const renderEventItem = event => (

        <View key={event.id}>
          <Text>{event.title}</Text>
          <Text>Date: {event.date}</Text>
          <Text>Heure de début: {event.startTime}</Text>
          <Text>Heure de fin: {event.endTime}</Text>
          <Text>Lieu: {event.location}</Text>
        </View>
);

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
          
        });

    return (
      
        <View style={styles.background}>
          <View style={styles.container}>
            <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
        {selectedEvent && (
            <View>
                {renderEventItem(selectedEvent)}
                <Button title="Fermer" onPress={() => setSelectedEvent(null)} />
            </View>
        )}
        </View>
    </View>
    );

    
}