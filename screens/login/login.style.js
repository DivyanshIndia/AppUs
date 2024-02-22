import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
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
    position: "relative",
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
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: "#000", // Inverted to black text
    textDecorationLine: "underline",
  },
  createAccountButton: {
    marginTop: 10,
  },
  createAccountButtonText: {
    color: "#000", // Inverted to black text
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default styles;
