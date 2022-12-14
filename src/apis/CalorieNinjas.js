import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import client from "../api/client";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c6fdd0dd35msh8e2a7fa3cc90a5dp19f305jsnad757856109b",
    "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
  },
};

function CalorieNinjas(props) {
  const [state, setState] = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  //const [foodName, setFoodName] = useState("");
  //const [totalCalories, setTotalCalories] = useState(0);
  //const [carbohydrates, setCarbohydrates] = useState("");
  //const [protein, setProtein] = useState("");
  //const [fat, setFat] = useState("");
  //const [servingSize, setServingSize] = useState("");
  const [foodItem, setFoodItem] = useState({
    user_id: "",
    name: "",
    calories: "",
    carbohydrates: "",
    protein: "",
    fat: "",
    serving_size: "",
    key: "",
  });

  function getFoodDetails() {
    fetch(
      "https://calorieninjas.p.rapidapi.com/v1/nutrition?query=" + inputName,
      options
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.items[0] != undefined) {
          console.log("success");
          setFoodItem({
            user_id: state.user._id,
            name: json.items[0].name,
            calories: json.items[0].calories,
            carbohydrates: json.items[0].carbohydrates_total_g,
            protein: json.items[0].protein_g,
            fat: json.items[0].fat_total_g,
            serving_size: json.items[0].serving_size_g,
            key: Math.random().toString(),
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  const onAddFood = async (values, actions) => {

    //console.log(values);

    const config = {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "Access-Control-Allow-Origin": "*"
      }
    };

    try {
        const res = await client.post('/api/add-food', foodItem , config);
        console.log(res.data);
        
        if (res.data.error) {
          alert(res.data.error)
        }
        else {
          //setState(res.data);
          //await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data))
          alert("Adding Food Successful")
        } 

    } catch (error) {
        console.log(error.message);
    }
    props.addFoodItem(foodItem);
    props.onCancel();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter Food"
          placeholderTextColor={"white"}
          onChangeText={(text) => setInputName(text)}
        />

        <TouchableOpacity style={styles.searchBttn} onPress={getFoodDetails}>
          <Text style={styles.searchText}> SEARCH</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.text}>Food Name: {foodItem.name}</Text>
        <Text style={styles.text}>Serving Size: {foodItem.serving_size}g</Text>
        <Text style={styles.text}>Calories: {foodItem.calories}</Text>
        <Text style={styles.text}>Carobhydrate: {foodItem.carbohydrates}g</Text>
        <Text style={styles.text}>Protein: {foodItem.protein}g</Text>
        <Text style={styles.text}>Fat: {foodItem.fat}g</Text>
        <TouchableOpacity style={styles.addBttn} onPress={onAddFood}>
          <Text style={styles.searchText}>Add Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeBttn} onPress={props.onCancel}>
          <Text style={styles.searchText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003f5c",
    paddingTop: 50,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  informationContainer: {
    flex: 4,
    width: "90%",
    alignItems: "center",
  },
  searchBttn: {
    backgroundColor: "#fb5b5a",
    width: "30%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  searchText: {
    color: "white",
    fontSize: 15,
  },
  searchBar: {
    borderBottomWidth: 2,
    borderColor: "white",
    marginRight: 10,
    width: "60%",
    alignItems: "center",
    padding: 10,
    fontSize: 20,
    justifyContent: "center",
  },
  addBttn: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  closeBttn: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    alignItems: "center",
    padding: 10,
  },
});

export default CalorieNinjas;
