import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
// Firestore imports
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getApp, initializeApp } from "firebase/app";

// --- Your Firebase config here ---
const firebaseConfig = {
  apiKey: "AIzaSyBM0pSrRvAPxqcfR1dk8xk8YVqVjNpIReE",
  authDomain: "plantcare1-491fa.firebaseapp.com",
  projectId: "plantcare1-491fa",
  // ...other config
};

// Initialize Firebase app if not already initialized
let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore(app);

interface ScanHistoryItem {
  id: string;
  imageUri?: string;
  plantName?: string;
  diseaseName?: string;
  scannedAt?: string | number | Date;
  confidence?: number;
}

export default function ScanHistory() {
  const { user } = useUser();
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Fetch diagnoses for the current user
        const q = query(
          collection(db, "diagnoses"),
          where("userId", "==", user.id)
        );
        const querySnapshot = await getDocs(q);
        const data: ScanHistoryItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (!history.length) {
    return (
      <View style={styles.centered}>
        <Ionicons name="time-outline" size={48} color="#16a34a" />
        <Text style={styles.emptyText}>No scan history yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            ) : (
              <Ionicons name="leaf-outline" size={48} color="#16a34a" style={styles.image} />
            )}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.plantName}>{item.plantName}</Text>
              <Text style={styles.diseaseName}>{item.diseaseName}</Text>
              <Text style={styles.dateText}>
                {item.scannedAt
                  ? new Date(item.scannedAt).toLocaleString()
                  : "Date not available"}
              </Text>
              <Text style={styles.confidenceText}>
                Confidence: {item.confidence ? `${(item.confidence * 100).toFixed(1)}%` : "N/A"}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#dcfce7",
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  diseaseName: {
    fontSize: 15,
    color: "#dc2626",
    marginTop: 2,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: "#6b7280",
  },
  confidenceText: {
    fontSize: 12,
    color: "#2563eb",
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  emptyText: {
    fontSize: 18,
    color: "#6b7280",
    marginTop: 16,
  },
});
