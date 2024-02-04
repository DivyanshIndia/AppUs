import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Comment = ({ comment, onReplySubmit }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      onReplySubmit(comment._id, replyText); // Handle reply submission
      setReplyText("");
    }
    setShowReplyInput(false);
  };

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000; // 365 * 24 * 60 * 60
    if (interval > 1) return Math.floor(interval) + " years";

    interval = seconds / 2592000; // 30 * 24 * 60 * 60
    if (interval > 1) return Math.floor(interval) + " months";

    interval = seconds / 604800; // 7 * 24 * 60 * 60
    if (interval > 1) return Math.floor(interval) + " weeks";

    interval = seconds / 86400; // 24 * 60 * 60
    if (interval > 1) return Math.floor(interval) + " days";

    interval = seconds / 3600; // 60 * 60
    if (interval > 1) return Math.floor(interval) + " hours";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes";

    return Math.floor(seconds) + " seconds";
  };

  const placeholderImage = "https://via.placeholder.com/50";

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Image
          source={{
            uri:
              `data:image/jpeg;base64,${comment?.author?.profilePicture}` ||
              placeholderImage,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.commentAuthor}>{comment?.author?.fullName}</Text>
        <Text style={styles.commentAge}>{timeSince(comment?.createdAt)}</Text>
      </View>
      <Text style={styles.commentContent}>{comment?.content}</Text>
      <TouchableOpacity onPress={() => setShowReplyInput(!showReplyInput)}>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>
      {showReplyInput && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.replyInput}
            value={replyText}
            onChangeText={setReplyText}
            placeholder="Write a reply..."
          />
          <TouchableOpacity onPress={handleReply}>
            {/* <Text style={styles.postReplyButton}>Post Reply</Text> */}
            <AntDesign name="rightcircle" size={30} color="#007bff" />
          </TouchableOpacity>
        </View>
      )}
      {/* Replies and Toggle Replies Button */}
      {comment.replies && comment.replies.length > 0 && (
        <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
          <Text style={styles.viewRepliesButton}>
            {showReplies ? "Hide Replies" : "View Replies"}
          </Text>
        </TouchableOpacity>
      )}
      {showReplies && (
        <View style={styles.repliesContainer}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              onReplySubmit={onReplySubmit}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginVertical: 4,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginRight: 8,
  },
  commentAge: {
    color: "grey",
  },
  commentContent: {
    marginTop: 2,
  },
  repliesContainer: {
    marginTop: 4,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#d0d0d0",
  },
  replyButton: {
    color: "blue",
    marginTop: 4,
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    padding: 8,
  },
  postReplyButton: {
    color: "blue",
  },
  viewRepliesButton: {
    color: "blue",
    marginTop: 4,
  },
  // ... more styles as needed ...
});

export default Comment;
