import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.logo}>PlantCare</Text>
          <View style={styles.headerIcons}>
            <Ionicons
              name="search-outline"
              size={28}
              color="#355A4E"
              style={{ marginRight: 12 }}
            />
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.signOutIcon}
            >
              <Ionicons name="log-out-outline" size={28} color="#e53935" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main plant image */}
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1501984364/photo/farmer-examining-sunflower-seedlings-at-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=JKoNgQZ6NBx3RjvzhSgQ2ejZwOtKYIqeb4pxtyHsE3g=",
          }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {/* Diagnose Button */}
        <TouchableOpacity
          style={styles.diagnoseButton}
          onPress={() => router.push("/diagnose")}
        >
          <Ionicons
            name="scan-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.diagnoseButtonText}>Diagnose Your Plant</Text>
        </TouchableOpacity>

        {/* Popular Articles */}
        <View style={styles.articlesHeader}>
          <Text style={styles.articlesTitle}>Popular articles</Text>
          <Text style={styles.seeAll}>see all</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.articlesRow}>
            <View style={styles.articleCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvbWF0b3xlbnwwfHwwfHx8MA%3D%3D",
                }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              <Text style={styles.articleText}>
                Unlock the secrets of healthy plants: Care Tips
              </Text>
            </View>
            <View style={styles.articleCard}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=x6B7hNUJIyBG5tmqh8FPmhRaKIUABlFjpL6dmyZFUtA=",
                }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              <Text style={styles.articleText}>
                What you need to know about maize
              </Text>
            </View>
            <View style={styles.articleCard}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=x6B7hNUJIyBG5tmqh8FPmhRaKIUABlFjpL6dmyZFUtA=",
                }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              <Text style={styles.articleText}>
                What you need to know about maize
              </Text>
            </View>
            <View style={styles.articleCard}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=x6B7hNUJIyBG5tmqh8FPmhRaKIUABlFjpL6dmyZFUtA=",
                }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              <Text style={styles.articleText}>
                What you need to know about maize
              </Text>
            </View>
            <View style={styles.articleCard}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=x6B7hNUJIyBG5tmqh8FPmhRaKIUABlFjpL6dmyZFUtA=",
                }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              <Text style={styles.articleText}>
                What you need to know about maize
              </Text>
            </View>
            <View style={styles.articleCard}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=x6B7hNUJIyBG5tmqh8FPmhRaKIUABlFjpL6dmyZFUtA=",
                }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              <Text style={styles.articleText}>
                What you need to know about maize
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Static Bottom Navigation Tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="home" size={28} color="#16a34a" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("/diagnose")}
        >
          <Ionicons name="scan-outline" size={28} color="#355A4E" />
          <Text style={styles.tabLabel}>Diagnose</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("/chatbot")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={28}
            color="#355A4E"
          />
          <Text style={styles.tabLabel}>Chatbot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    fontFamily: "sans-serif-medium",
  },
  mainImage: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    marginBottom: 18,
  },
  diagnoseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16a34a",
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: "center",
    marginBottom: 28,
    shadowColor: "#16a34a",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  diagnoseButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  articlesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  articlesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  seeAll: {
    color: "#aaa",
    fontWeight: "bold",
    fontSize: 14,
  },
  articlesRow: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping to next line
    justifyContent: "space-between",
    marginBottom: 16,
  },
  articleCard: {
    width: "48%", // Slightly less than 50% for spacing
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    padding: 8,
    marginBottom: 12, // Add vertical spacing between rows
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: 100,
    borderRadius: 14,
    marginBottom: 8,
  },
  articleText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
    textAlign: "left",
  },
  signOutIcon: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f6f6f6",
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabButton: {
    alignItems: "center",
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#355A4E",
  },
});
