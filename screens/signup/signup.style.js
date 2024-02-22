// components/styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Inverted to white background
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000", // Inverted to black text
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#000", // Inverted to black border
    borderBottomWidth: 1,
    marginBottom: 20,
    color: "#000", // Inverted to black text
  },
  passwordContainer: {
    width: "80%",
    marginBottom: 20,
  },
  passwordInput: {
    height: 40,
    width: "100%",
    borderColor: "#000", // Inverted to black border
    borderBottomWidth: 1,
    color: "#000", // Inverted to black text
  },
  ConfirmPasswordInput: {
    height: 40,
    width: "80%",
    borderColor: "#000",
    borderBottomWidth: 1,
    color: "#000",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: "#000", // Inverted to black background
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff", // Inverted to white text
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  successText: {
    color: "green", // Change the color to your preferred color for success messages
    fontSize: 16,
    marginTop: 10, // Adjust this value based on your design
    textAlign: "center",
  },
});

export default styles;
