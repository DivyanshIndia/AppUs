// Import necessary libraries
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const CreatePostComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [media, setMedia] = useState(null);

  const pickMedia = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    let pickerResult;
    if (type === "image") {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    } else if (type === "video") {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
    }

    if (!pickerResult.cancelled) {
      setMedia(pickerResult.uri);
    }
  };

  const handleSubmit = () => {
    // Implement submit functionality here
    console.log({ title, body, media });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
        required
      />
         {media && <Image source={{ uri: media }} style={styles.previewImage} />}
      <TextInput
        style={styles.bodyInput}
        placeholder="What's on your mind?"
        placeholderTextColor="#666"
        multiline
        value={body}
        onChangeText={setBody}
      />
      <View style={styles.mediaIcons}>
        <TouchableOpacity onPress={() => pickMedia("image")}>
          <Ionicons name="image-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickMedia("video")}>
          <Ionicons name="videocam-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
   
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titleInput: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
  },
  bodyInput: {
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  mediaIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreatePostComponent;
