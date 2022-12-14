import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Calendar from "../components/Calendar";
import { useNavigation } from "@react-navigation/native";

function History(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.editProfileContainer}>
      <Calendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  closeBttn: {
    backgroundColor: "#fb5b5a",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
});

export default History;
