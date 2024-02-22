import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./login.style";
import apiUrls from "../../api/apiUrls";
import useApiPost from "../../hooks/useApiPost";
import saveToken from "../../utils/saveToken";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { postData, response, error: apiError } = useApiPost();

  useEffect(() => {
    if (response && response.token) {
      console.log(response);
      saveToken("authToken", response.token);
      const userId = response.user.id;
      saveToken("userId", userId);
      router.push("/home");
    } else if (apiError) {
      setError("Login failed. Please check your credentials.");
    }
  }, [response, apiError]);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    await postData(apiUrls.login, { email, password });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCreateAccount = () => {
    router.push("/signUp");
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password pressed");
    router.push("/forget-password");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.formTitle}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#000"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={handleTogglePassword}>
          <FontAwesome
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
      >
        <Text style={styles.createAccountButtonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
