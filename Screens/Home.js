import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';


const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 225;


export default function Home() {

  const data = [ 
    {id: '1', title:'Basket', description:'Tu met un ballon dans un panier', lieu: 'Villejuif'},
    {id: '2', title:'Foot', description:'Tu met un ballon dans des cages', lieu: 'Villejuif'},
    {id: '3', title:'Rugby', description:'Tu applatis le ballon', lieu: 'Villejuif'},
    {id: '4', title:'Handball', description:'Tu met un ballon dans des cages', lieu: 'Villejuif'},
    {id: '5', title:'PingPong', description:'Tu tapes une balle sur une table', lieu: 'Villejuif'},
  ];

  const Item = ({ title, description, lieu }) => (
    <View style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>   
          <View style={styles.contenu}>
            <Text style={styles.description}>Description : {description}</Text>
            <Text style={styles.lieu}>Lieu : {lieu}</Text>
          </View>   
      </View>
    </View>
  );

  const Separator = () => <View style={{ width: 10 }} />;

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      description={item.description}
      lieu={item.lieu}
    />
  );
  

  

  return (
    <View style={styles.container}>
      <Text>Welcome home !</Text>

      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
      horizontal
      style={{ alignSelf: 'center' }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    />

      <Text> Rien de spécial ici</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginTop: 15,
    marginBottom: 15,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: 'lightblue',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  contenu: {
    margin: 10,
  }
});
