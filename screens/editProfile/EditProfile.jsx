import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useApiPut from "../../hooks/useApiPut";
import apiUrls from "../../api/apiUrls";
import getToken from "../../utils/getToken";

const EditProfileScreen = ({ data }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const router = useRouter();
  const { loading, error, putData } = useApiPut();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      fullName: data?.fullName || "",
      biography: data?.biography || "",
      location: data?.location || "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        username: data.username || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        fullName: data.fullName || "",
        biography: data.biography || "",
        location: data.location || "",
      });
      setProfileImage(data?.profilePicture || null);
    }
  }, [data, reset]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          libraryStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          Alert.alert(
            "Permission Required",
            "Sorry, we need camera and library permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Take Photo",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              base64: true,
            });
            handleImageResult(result);
          },
        },
        {
          text: "Choose from Library",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              base64: true,
            });
            handleImageResult(result);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleImageResult = (result) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setProfileImage(selectedAsset.base64);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateOfBirth(date);
    hideDatePicker();
  };

  const onSubmit = async (data) => {
    // Add the profile image base64 string to the data object
    data.profilePicture = profileImage;


    // Get the user ID from the token
    const userId = await getToken("userId");

    if (userId) {
      // Use putData to make the PUT request
      await putData(apiUrls.updateUser(userId), data);
    }

    if (error) {
      Alert.alert("Error", error);
    } else {
      Alert.alert("Success", "Profile updated successfully");
      router.push("/profile");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profileImage ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
            style={styles.image}
          />
        ) : (
          <Ionicons name="camera" size={50} color="gray" />
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && <Text style={styles.error}>This is required.</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          )}
          name="phoneNumber"
          rules={{
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          }}
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>{errors.phoneNumber.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="fullName"
          rules={{ required: true }}
        />
        {errors.fullName && <Text style={styles.error}>This is required.</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Biography</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
            />
          )}
          name="biography"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="location"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text>{dateOfBirth.toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={dateOfBirth}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  textArea: {
    height: 100,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "#ffffff",
  },
  error: {
    color: "green",
    fontSize: 14,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
