import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const LoginSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
  age: yup.number().required().integer().min(1),
  height: yup.number().required(),
  weight: yup.number().required(),
  gender: yup
    .string()
    .required()
    .test("genderCheck", "not male or female", (gender) => {
      if (gender.toLowerCase() === "male" || gender.toLowerCase === "female") {
        return true;
      } else {
        return false;
      }
    }),
  activitylevel: yup.string().required(),
});

function SignupForm(props) {
  function poundsToKG(pounds) {
    let kg = pounds / 2.205;
    return kg;
  }
  function feetToCM(feet) {
    let cm = feet * 30.48;
    return cm;
  }
  function inchToCM(inch) {
    let cm = inch * 2.54;
    return cm;
  }
  function calorieBudget(
    age,
    height_ft,
    height_inch,
    weight,
    gender,
    activitylevel,
    goal
  ) {
    weight = poundsToKG(weight);
    height_ft = feetToCM(height_ft);
    height_inch = inchToCM(height_inch);
    let total_height_cm = height_ft + height_inch;
    let BMR = 0;
    if (gender.toLowerCase() === "male") {
      BMR = 10 * weight + 6.25 * total_height_cm - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * total_height_cm - 5 * age - 161;
    }

    if (activitylevel.toLowerCase() === "high") {
      BMR = BMR * 1.75;
    } else if (activitylevel.toLowerCase() == "medium") {
      BMR = BMR * 1.5;
    } else {
      BMR = BMR * 1.25;
    }

    if (goal.toLowerCase() === "lose") {
      BMR = BMR - 500;
    } else if (goal.toLowerCase() === "gain") {
      BMR = BMR + 500;
    }

    return Math.round(BMR);
  }
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        age: 0,
        height_ft: 0,
        height_inch: 0,
        calories: 0,
        weight: 0,
        gender: "",
        activitylevel: "",
        goal: "",
      }}
      onSubmit={(values, actions) => {
        values.age = parseInt(values.age, 10);
        values.height_ft = parseInt(values.height_ft, 10);
        values.height_inch = parseInt(values.height_inch, 10);
        values.weight = parseInt(values.weight, 10);
        values.calories = calorieBudget(
          values.age,
          values.height_ft,
          values.height_inch,
          values.weight,
          values.gender,
          values.activitylevel,
          values.goal
        );
        console.log(values);
        props.onSignup(values);
        actions.resetForm();
      }}
    >
      {(formProps) => (
        <View style={styles.editSignupFormContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("name")}
            value={formProps.values.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("email")}
            value={formProps.values.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("password")}
            value={formProps.values.password}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Age"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("age")}
            value={formProps.values.age}
            keyboardType="numeric"
          />
          <View style={styles.heightContainer}>
            <TextInput
              style={styles.feetInput}
              placeholder="feet"
              placeholderTextColor={"white"}
              onChangeText={formProps.handleChange("height_ft")}
              value={formProps.values.height_ft}
              keyboardType="numeric"
            />
            <Text style={styles.text}>feet</Text>
            <TextInput
              style={styles.inchInput}
              placeholder="inch"
              placeholderTextColor={"white"}
              onChangeText={formProps.handleChange("height_inch")}
              value={formProps.values.height_inch}
              keyboardType="numeric"
            />
            <Text style={styles.text}>inches</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter body weight in lbs"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("weight")}
            value={formProps.values.weight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Gender (Male/Female)"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("gender")}
            value={formProps.values.gender}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Activity Level (Low/Medium/High)"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("activitylevel")}
            value={formProps.values.activitylevel}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Goal (Lose/Gain/Maintain)"
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("goal")}
            value={formProps.values.goal}
          />
          <View style={styles.bttnContainer}>
            <TouchableOpacity
              style={styles.submitBttn}
              onPress={formProps.handleSubmit}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBttn} onPress={props.onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  editSignupFormContainer: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 2,
    //borderColor: "red",
    width: "95%",
    paddingTop: 30,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  submitBttn: {
    backgroundColor: "#fb5b5a",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  heightContainer: {
    flexDirection: "row",
    //borderWidth: 2,
    //borderColor: "red",
    width: "79%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  bttnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    //borderWidth: 2,
    //borderColor: "red",
    width: "95%",
  },
  inchInput: {
    borderWidth: 2,
    padding: 10,
    width: "35%",
    fontSize: 15,
    color: "white",
  },
  feetInput: {
    borderWidth: 2,
    padding: 10,
    width: "35%",
    fontSize: 15,
    color: "white",
  },
  input: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "79%",
    fontSize: 15,
    color: "white",
    marginBottom: 30,
  },
  closeBttn: {
    backgroundColor: "#fb5b5a",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
  },
});

export default SignupForm;

// function onSignUp() {
//     navigation.navigate("BottomTab", { screen: "Home" });
//   }
//   function onCancel() {
//     navigation.navigate("Login");
//   }