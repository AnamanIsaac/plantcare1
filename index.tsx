import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/sign-up" />; // or "/(auth)/sign-up" if that's your path
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2ea44f",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#2ea44f",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
