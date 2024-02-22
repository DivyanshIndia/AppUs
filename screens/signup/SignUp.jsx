// Signup.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import styles from "./signup.style";
import useApiPost from "../../hooks/useApiPost";
import apiUrls from "../../api/apiUrls";

const Signup = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [showPassword, setShowPassword] = React.useState(false);
  const { response, error, loading, postData } = useApiPost();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let delay;
    if (response) {
      console.log("Registration Success:", response);
      setSuccessMessage("Account created successfully");
      delay = setTimeout(() => {
        router.push("/logIn");
      }, 1000);
    }
    if (error) {
      console.error("Registration Failed:", error);
    }
    return () => {
      clearTimeout(delay);
    };
  }, [response, error]);

  const onSubmit = async (data) => {
    const { username, email, password, fullName } = data;
    const formData = { username, email, password, fullName };
    await postData(apiUrls.register, formData);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    router.push("/logIn");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
      <Text style={styles.formTitle}>Sign Up</Text>

      {/* Success Message */}
      {successMessage !== "" && (
        <Text style={styles.successText}>{successMessage}</Text>
      )}

      {/* Username Field */}
      <Controller
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            placeholderTextColor="#000"
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}

      {/* Full Name Field */}
      <Controller
        control={control}
        rules={{ required: "Full Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full Name"
            placeholderTextColor="#000"
          />
        )}
        name="fullName"
      />
      {errors.fullName && (
        <Text style={styles.errorText}>{errors.fullName.message}</Text>
      )}

      {/* Email Field */}
      <Controller
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            placeholderTextColor="#000"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Password Field */}
      <Controller
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={handleTogglePassword}
            >
              <FontAwesome
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      {/* Confirm Password Field */}
      <Controller
        control={control}
        rules={{
          validate: (value) =>
            value === password || "The passwords do not match",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input} // Ensure this style is correct for your confirm password input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Confirm Password"
            placeholderTextColor="#000"
            secureTextEntry={!showPassword}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
