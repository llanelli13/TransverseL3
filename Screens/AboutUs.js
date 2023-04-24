import { StyleSheet, View, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

export default function AboutUs (){

    return(
        <View>
            {/* Header de la page */}
                <SafeAreaView style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', margin: 16}}>

            {/* Icone sidebar */}
                <TouchableOpacity 
                    style={{width: '25%'}}
                    onPress={() => console.log("Drawer")}>
                    <FontAwesome5 name="bars" size ={24} color="#161924" /> {/* Icone de la sidebar */}
                </TouchableOpacity>

            {/* Nom de l'appli, cliquable pour revenir à la page principale */}
                <TouchableOpacity 
                    style = {{width: '50%', textAlign: 'center'}}
                    onPress={() => console.log("EasyOrga")}>
                    <Text style={[styles.texte]}> EasyOrga </Text>
                </TouchableOpacity>

            {/* Icone alarme */}
                <TouchableOpacity
                    style = {{width: '25%', alignItems: 'flex-end'}}
                    onPress={() => console.log("Calendrier")}>
                    <Ionicons name= 'md-notifications' size={24} />  {/* Icone alarme */}
                </TouchableOpacity>
            </SafeAreaView>


            <Text> Voici notre projet d'organisation pour association comme le BDS. </Text>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#FFF",
    },
    texte:{
        fontWeight: 'bold',
        fontSize: 24,
    },
    test: {
        display: 'flex',
        flexDirection: 'row',
    },
})