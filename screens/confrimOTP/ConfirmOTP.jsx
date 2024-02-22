import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import apiUrls from "../../api/apiUrls";
import useApiPost from "../../hooks/useApiPost";
import { useRouter } from "expo-router";

const ConfirmOTP = () => {
  const router = useRouter();
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { postData, loading, error: apiError } = useApiPost();

  const handleConfirmOTP = async () => {
    setError("");
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    router.push("/reset-password");

    // Code for verifying OTP
  };

  return (
    <View style={styles.container}>
      <Feather name="lock" size={50} color="#0095f6" style={styles.icon} />
      <Text style={styles.title}>Confirm OTP</Text>
      <Text style={styles.subtitle}>
        Enter the OTP sent to your email to reset your password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOTP}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {apiError ? (
        <Text style={styles.error}>
          Failed to verify OTP. Please try again later.
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirmOTP}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    width: "40%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default ConfirmOTP;
