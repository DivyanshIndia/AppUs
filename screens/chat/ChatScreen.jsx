import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", content: "Hello!", sender: "me" },
    { id: "2", content: "Hi there!", sender: "other" },
    { id: "3", content: "How are you?", sender: "me" },
    { id: "4", content: "I'm good, thanks!", sender: "other" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const flatListRef = useRef(null);

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();

    if (trimmedMessage === "") return;

    const newMessage = {
      id: (messages.length + 1).toString(),
      content: trimmedMessage,
      sender: "me",
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages.slice().reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted // Scroll to bottom by default
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message here..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#5E5368", // Dark gray background for chat
  },
  messageContainer: {
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: "70%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#e5e4e2", // Light gray background for sent messages
    marginRight: 10,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fffafa", // White background for received messages
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#000000", // Black text color for messages
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: "#000000", // Black text color for input
    backgroundColor: "#f2f2f2", // Light gray background for input
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000000", // Black background for send button
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: 16,
    color: "#ffffff", // White text color for send button text
    fontWeight: "bold",
  },
});

export default ChatScreen;
