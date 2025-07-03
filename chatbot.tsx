import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ChatbotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you?", fromBot: true },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, fromBot: false };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Build the conversation history for the API using updatedMessages
    const apiMessages = updatedMessages.map((msg) => ({
      role: msg.fromBot ? "assistant" : "user",
      content: msg.text,
    }));

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: apiMessages,
          }),
        }
      );
      const data = await response.json();
      const botReply =
        data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";
      // Use a callback to ensure you append to the latest state
      setMessages((prev) => [...prev, { text: botReply, fromBot: true }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { text: "Error contacting chatbot.", fromBot: true },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>
        {/* Back Arrow */}
        <TouchableOpacity
          style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
          onPress={() => router.replace("/home")}
        >
          <Ionicons name="arrow-back" size={28} color="#16a34a" />
        </TouchableOpacity>
        {/* ...existing chat UI... */}
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Text style={item.fromBot ? styles.bot : styles.user}>
              {item.text}
            </Text>
          )}
          keyExtractor={(_, i) => i.toString()}
          style={{ flex: 1, width: "100%" }}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: "#fff" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#e0efe2",
    margin: 4,
    padding: 8,
    borderRadius: 8,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#16a34a",
    color: "#fff",
    margin: 4,
    padding: 8,
    borderRadius: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12, // Add margin to sit above nav tab
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  sendButton: { backgroundColor: "#16a34a", padding: 10, borderRadius: 8 },
});
