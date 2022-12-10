import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import UploadImage from "../components/UploadImage";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user";
import { setCalories } from "../redux/calories";
import { setGlobalFoods } from "../redux/foods";
import { setFat } from "../redux/fat";
import { setProtein } from "../redux/protein";
import { setCarbs } from "../redux/carbs";
import { setStars } from "../redux/stars";
import { setRating } from "../redux/rating";

function HomeProfile({ navigation }) {
  const [testObject, setTestObject] = useState({});
  const dispatch = useDispatch();
  const [state, setState] = useContext(AuthContext);

  function openProfile() {
    navigation.navigate("EditProfile");
  }
  function openHistory() {
    navigation.navigate("History");
  }
  function closeHistory() {
    setHistoryVisible(false);
  }
  function updateTestObject(inputObject) {
    setTestObject(inputObject);
    console.log(setTestObject);
  }

  const onLogOut = async () => {
    dispatch(setGlobalFoods([]));
    dispatch(setUser({}));
    dispatch(setStars(0));
    dispatch(setRating(0));
    dispatch(setCalories(0));
    dispatch(setFat(0));
    dispatch(setProtein(0));
    dispatch(setCarbs(0));
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("auth-rn");
    console.log(state);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      <UploadImage />
      <View style={styles.bttnsContainer}>
        <TouchableOpacity style={styles.historyBttn} onPress={openHistory}>
          <Text style={styles.text}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBttn} onPress={openProfile}>
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={onLogOut} style={styles.logoutBttn}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  profileBttn: {
    backgroundColor: "crimson",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  historyBttn: {
    backgroundColor: "crimson",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginRight: 20,
  },
  bttnsContainer: {
    marginTop: 30,
    flexDirection: "row",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  logoutBttn: {
    backgroundColor: "crimson",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    width: "40%",
  },
});

export default HomeProfile;
