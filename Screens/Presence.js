import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function PresenceComponent() {
  const [items, setItems] = useState([
    { id: 1, name: "REY", firstName: "Pierre", isSelected: false },
    { id: 2, name: "BELMADANI", firstName: "Remi", isSelected: false },
    { id: 3, name: "NEUBERTH", firstName: "Ludwig", isSelected: false },
    { id: 4, name: "VIGOT", firstName: "Marin", isSelected: false },
    { id: 5, name: "ITTE", firstName: "Steve", isSelected: false },
  ]);

  const toggleCheckbox = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setItems(newItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.firstName}</Text>
      <Text> N/o </Text>
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}> 05/05/2023 </Text>
        <Text style={styles.label}> Basket </Text>
        <Text style={styles.label}> Villejuif </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}> Nom </Text>
        <Text style={styles.label}> Prénom </Text>
        <Text style={styles.label}>Case à cocher</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
});
