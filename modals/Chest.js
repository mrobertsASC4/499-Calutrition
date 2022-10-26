import axios from "axios";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { useEffect, useState } from "react";

function Chest(props) {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio",
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  function getExercises() {
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const data = [
    {
      id: "3145",
      name: "push-up plus",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/3145.gif",
    },
    {
      id: "0666",
      name: "raise single arm push-up",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/0666.gif",
    },
    {
      id: "3124",
      name: "resistance band seated chest press",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/3124.gif",
    },
    {
      id: "2203",
      name: "roller seated shoulder flexor depresor retractor",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/2203.gif",
    },
    {
      id: "2209",
      name: "roller seated single leg shoulder flexor depresor retractor",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/2209.gif",
    },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.pageText}>Name: {item.name}</Text>
      <Image source={{ uri: item.gif }} style={{ width: 200, height: 200 }} />
    </View>
  );
  return (
    <SafeAreaView style={styles.pageContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={props.closeChest}>
        <Text style={styles.pageText}>CLOSE</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.exerciseFlatList}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  pageText: {
    fontSize: 20,
    color: "white",
  },
  closeButton: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseFlatList: {
    width: "90%",
  },
});
export default Chest;
