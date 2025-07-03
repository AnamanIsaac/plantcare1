import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DiagnoseScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
        onPress={() => router.replace("/home")}
      >
        <Ionicons name="arrow-back" size={28} color="#16a34a" />
      </TouchableOpacity>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1haXplfGVufDB8fDB8fHww",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>Diagnose your plant here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 24,
    marginBottom: 32,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16a34a",
    textAlign: "center",
  },
});
