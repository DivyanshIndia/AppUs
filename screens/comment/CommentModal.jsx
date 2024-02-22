import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import Ant Design icons
import Comment from "./Comment";

const CommentModal = ({
  visible,
  onClose,
  comments,
  onCommentSubmit,
  onReplySubmit,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onCommentSubmit(newComment);
      setNewComment("");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      swipeDirection="down" // Enable swipe down
      onSwipeComplete={onClose} // Close the modal on swipe
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.modalView}>
          {/* Close Button */}
          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity> */}

          {/* Comments Header */}
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsHeaderText}>Comments</Text>
          </View>

          {/* Thick Rounded Line */}
          <View style={styles.thickLine}></View>

          {/* Comments List or Encouraging Content */}
          {comments.length > 0 ? (
            <FlatList
              data={comments}
              keyExtractor={(item, index) => item._id || index}
              renderItem={({ item }) => (
                <Comment comment={item} onReplySubmit={onReplySubmit} />
              )}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            <View style={styles.encouragingContentContainer}>
              <Text style={styles.encouragingText}>
                Be the first one to add a comment! 🚀
              </Text>
            </View>
          )}

          {/* Comment Input Section */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Write a comment..."
              placeholderTextColor="#666"
              multiline
            />
            <TouchableOpacity
              onPress={handleSubmitComment}
              style={styles.sendButton}
            >
              <AntDesign name="rightcircle" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    marginTop: 10, // Adjust this value as needed
    padding: 20,
    backgroundColor: "white",
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 3,
    elevation: 1,
  },
  commentsHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  commentsHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  thickLine: {
    height: 3,
    borderRadius: 5,
    backgroundColor: "#007bff",
    marginBottom: 10,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  encouragingContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  encouragingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  inputSection: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 5,
    elevation: 2,
  },
});

export default CommentModal;
