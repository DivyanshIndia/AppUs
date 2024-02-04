import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Video } from "expo-av";
import useApiPost from "../../hooks/useApiPost";
import apiUrls from "../../api/apiUrls";

const CreatePostComponent = () => {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const { response, error, loading, postData } = useApiPost();

  const handleMediaSelection = async (type, source) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    let options = {
      mediaTypes:
        type === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
    };

    let pickerResult =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({ ...options, base64: true })
        : await ImagePicker.launchImageLibraryAsync({
            ...options,
            base64: true,
            allowsEditing: true,
          });

    handlePickerResult(pickerResult, type);
  };

  const handlePickerResult = (pickerResult, type) => {
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      pickerResult.assets.forEach((asset) => {
        if (type === "image") {
          setImages([...images, asset.base64]);
        } else {
          setVideos([...videos, asset.base64]);
        }
        console.log("images: ", images);
        console.log("videos: ", videos);
      });
    }
  };

  const handleSubmit = async () => {
    // Prevent multiple clicks while API call is in progress
    if (loading) {
      return;
    }

    try {
      if (!body || !images) {
        Alert.alert("Empty, Please add some text and/or upload an image");
      }
      const postDataObj = {
        content: body,
        images: images,
      };

      // Call the API
      await postData(apiUrls.addPost, postDataObj);

      // Navigate after post is successful or handle errors
      if (!loading) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Error posting:", error);
      Alert.alert("Error", "Failed to post. Please try again later.");
    }
  };

  const handleCancel = () => {
    // Logic for cancel action
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      { text: "No" },
      { text: "Yes", onPress: () => router.push("/home") },
    ]);
  };

  const removeMedia = (index, type) => {
    setImages(images.filter((image, i) => i !== index));
  };

  const renderMedia = ({ item, index }) => {
    return (
      <View style={styles.mediaWrapper}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item}` }}
          style={styles.previewMedia}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => removeMedia(index, item)}
        >
          <Ionicons name="close-circle" size={30} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Post</Text>
      </View>
      <View style={styles.inputContainer}>
        <FlatList
          data={[...images]}
          renderItem={renderMedia}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.mediaList}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="What's on your mind?"
          placeholderTextColor="#666"
          multiline
          value={body}
          onChangeText={setBody}
        />
        <View style={styles.mediaIcons}>
          <TouchableOpacity
            onPress={() => handleMediaSelection("image", "camera")}
          >
            <Ionicons name="camera-outline" size={30} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMediaSelection("image", "library")}
          >
            <Ionicons name="image-outline" size={30} color="#3498db" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.submitButton, { opacity: loading ? 0.7 : 1 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Post</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreatePostComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#3498db",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  bodyInput: {
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    padding: 10,
    borderRadius: 5,
    minHeight: 400,
    textAlignVertical: "top",
  },
  mediaIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  mediaList: {
    marginBottom: 20,
  },
  previewMedia: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  mediaWrapper: {
    position: "relative",
    marginRight: 10,
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
