import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal, Image, Alert, StyleSheet, ScrollView } from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader.js';
import { ListItem } from "react-native-elements";
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default class ExerciseScreen extends Component {
constructor() {
super();

this.state = {
userId: firebase.auth().currentUser.email,
exerciseList: [],
};

this.requestRef = null;

}

getExerciseList = () => {

this.requestRef = db.collection("all_exercise").onSnapshot((snapshot) => {
var exerciseList = snapshot.docs.map((doc) => doc.data());
    
this.setState({
exerciseList: exerciseList,
});
      
});
};

componentDidMount() {
this.getExerciseList();
}

componentWillUnmount() {
this.requestRef();
}

keyExtractor = (item, index) => index.toString();

renderItem = ({ item, i }) => {
return (

<ListItem key={i}>
        <ListItem.title>{item.pose_name}</ListItem.title>
        <ListItem.subtitle> {"Click on the view button to see the steps and image of this pose ."}</ListItem.subtitle>
        <ListItem.titleStyle>{{ color: "black", fontWeight: "bold" }}</ListItem.titleStyle>
        numberOfLines={1}
        leftElement={
          <Image
            style={{ height: 40, width: 40 }}
            source={require('../assets/image.png')}
          />
        }
        rightElement={
          <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate("DetailScreen", { details: item }); }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
        </ListItem>
);
};

render() {
return (

<SafeAreaProvider style={styles.view}>

<MyHeader title="All Exercise" navigation={this.props.navigation} />

<View style={{ flex: 1 }}>
{this.state.exerciseList.length === 0 ? (

<View style={styles.subContainer}>

<Text style={{ fontSize: 20 }}>List Of All Exercises</Text>

</View>
) : (
<FlatList
keyExtractor={this.keyExtractor}
data={this.state.exerciseList}
renderItem={this.renderItem}
/>

)}

</View>
</SafeAreaProvider>
)
}
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderRadius: 30,
    borderWidth: 2,
    elevation: 160,
  },
  view: {
    flex: 1,
    backgroundColor: "#fff"
    
  }
});