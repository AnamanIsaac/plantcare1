import { useState } from "react"
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

type Disease = {
  id: string
  name: string
  symptoms: string[]
  causes: string[]
  prevention: string[]
  notes: string
  severity: "High" | "Medium" | "Low"
  icon: keyof typeof Ionicons.glyphMap
}

const potatoDiseases: Disease[] = [
  {
    id: "1",
    name: "Late Blight",
    severity: "High",
    icon: "thunderstorm",
    symptoms: [
      "Dark brown or black lesions on leaves and stems",
      "White mold under leaves in humid conditions",
      "Rapid wilting and death of plant",
    ],
    causes: [
      "Caused by the fungus Phytophthora infestans",
      "Thrives in cool, moist environments especially during rainy seasons in Ghana's middle and southern zones",
    ],
    prevention: [
      "Use certified disease-free seed tubers",
      "Apply fungicides early during wet seasons",
      "Practice crop rotation and remove infected plants",
    ],
    notes: "This is the most destructive disease for potato and can cause entire crop failure if unmanaged.",
  },
  {
    id: "2",
    name: "Early Blight",
    severity: "Medium",
    icon: "radio-button-on",
    symptoms: ["Small brown spots with concentric rings on older leaves", "Premature leaf drop"],
    causes: ["Caused by the fungus Alternaria solani", "More common in dry and warm areas like northern Ghana"],
    prevention: [
      "Ensure adequate spacing for air flow",
      "Use resistant varieties where available",
      "Remove and burn infected foliage",
    ],
    notes: "Manage using protective fungicides and ensure good field hygiene.",
  },
  {
    id: "3",
    name: "Bacterial Wilt",
    severity: "High",
    icon: "skull",
    symptoms: [
      "Sudden wilting of the entire plant with no yellowing",
      "Brown discoloration of vascular tissue in stems",
    ],
    causes: ["Caused by the bacterium Ralstonia solanacearum", "Spreads through infected soil or contaminated tools"],
    prevention: [
      "Avoid planting in fields with a history of bacterial wilt",
      "Rotate with non-solanaceous crops like maize or beans",
      "Disinfect tools and practice good sanitation",
    ],
    notes: "This disease is hard to control once established, so prevention is key.",
  },
]

export default function PotatoArticle() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const router = useRouter()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "#ef4444"
      case "Medium":
        return "#f59e0b"
      case "Low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "#fef2f2"
      case "Medium":
        return "#fffbeb"
      case "Low":
        return "#f0fdf4"
      default:
        return "#f9fafb"
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <ImageBackground  source={{
                uri: "https://media.istockphoto.com/id/1220924272/photo/potatoes-in-the-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=qCkgW9wTQVoSHW5jvj5GZeq-bW6GEaqTGj9wD9cswRg=",
              }} style={styles.headerImage} resizeMode="cover">
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]} style={styles.gradient}>
          <View style={styles.headerContent}>
            <View style={styles.cropBadge}>
              <Ionicons name="earth" size={16} color="#92400e" />
              <Text style={styles.cropBadgeText}>Tuber Crop</Text>
            </View>
            <Text style={styles.cropTitle}>Potato</Text>
            <Text style={styles.cropSubtitle}>Solanum tuberosum</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* About Section */}
      <View style={styles.contentContainer}>
        <View style={styles.aboutCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#92400e" />
            <Text style={styles.sectionTitle}>About Potato</Text>
          </View>
          <Text style={styles.aboutText}>
            Potato is a valuable root crop grown in parts of Ghana with cooler temperatures, especially in the highlands
            and parts of the Ashanti and Eastern regions. It is sensitive to moisture and requires well-drained soils
            for healthy growth.
          </Text>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="location" size={20} color="#6b7280" />
              <Text style={styles.statLabel}>Growing Regions</Text>
              <Text style={styles.statValue}>Ashanti, Eastern Highlands</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="thermometer" size={20} color="#6b7280" />
              <Text style={styles.statLabel}>Climate Needs</Text>
              <Text style={styles.statValue}>Cool Temperatures</Text>
            </View>
          </View>
        </View>

        {/* Diseases Section */}
        <View style={styles.diseasesSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={24} color="#dc2626" />
            <Text style={styles.sectionTitle}>Common Diseases</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Tap on any disease below to learn about symptoms, causes, and prevention methods
          </Text>

          <View style={styles.diseaseGrid}>
            {potatoDiseases.map((disease) => (
              <TouchableOpacity
                key={disease.id}
                style={[styles.diseaseCard, selectedDisease?.id === disease.id && styles.selectedDiseaseCard]}
                onPress={() => setSelectedDisease(disease)}
                activeOpacity={0.7}
              >
                <View style={styles.diseaseCardHeader}>
                  <View style={styles.diseaseIconContainer}>
                    <Ionicons name={disease.icon} size={24} color="#374151" />
                  </View>
                  <View style={[styles.severityBadge, { backgroundColor: getSeverityBgColor(disease.severity) }]}>
                    <Text style={[styles.severityText, { color: getSeverityColor(disease.severity) }]}>
                      {disease.severity}
                    </Text>
                  </View>
                </View>
                <Text style={styles.diseaseCardTitle}>{disease.name}</Text>
                <Text style={styles.diseaseCardPreview}>
                  {disease.symptoms[0]} and {disease.symptoms.length - 1} more symptoms
                </Text>
                <View style={styles.diseaseCardFooter}>
                  <Text style={styles.learnMoreText}>
                    {selectedDisease?.id === disease.id ? "Selected" : "Tap to learn more"}
                  </Text>
                  <Ionicons
                    name={selectedDisease?.id === disease.id ? "checkmark-circle" : "chevron-forward"}
                    size={16}
                    color={selectedDisease?.id === disease.id ? "#92400e" : "#9ca3af"}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Disease Details */}
        {selectedDisease && (
          <View style={styles.diseaseDetailsCard}>
            <View style={styles.diseaseDetailsHeader}>
              <View style={styles.diseaseDetailsTitle}>
                <Ionicons name={selectedDisease.icon} size={28} color="#374151" />
                <View style={styles.diseaseDetailsText}>
                  <Text style={styles.diseaseDetailsName}>{selectedDisease.name}</Text>
                  <View
                    style={[styles.severityBadge, { backgroundColor: getSeverityBgColor(selectedDisease.severity) }]}
                  >
                    <Text style={[styles.severityText, { color: getSeverityColor(selectedDisease.severity) }]}>
                      {selectedDisease.severity} Risk
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Symptoms */}
            <View style={styles.detailSection}>
              <View style={styles.detailSectionHeader}>
                <Ionicons name="eye" size={20} color="#dc2626" />
                <Text style={styles.detailSectionTitle}>Symptoms</Text>
              </View>
              <View style={styles.detailList}>
                {selectedDisease.symptoms.map((symptom, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.detailText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Causes */}
            <View style={styles.detailSection}>
              <View style={styles.detailSectionHeader}>
                <Ionicons name="search" size={20} color="#f59e0b" />
                <Text style={styles.detailSectionTitle}>Causes</Text>
              </View>
              <View style={styles.detailList}>
                {selectedDisease.causes.map((cause, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.detailText}>{cause}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Prevention */}
            <View style={styles.detailSection}>
              <View style={styles.detailSectionHeader}>
                <Ionicons name="shield-checkmark" size={20} color="#10b981" />
                <Text style={styles.detailSectionTitle}>Prevention & Treatment</Text>
              </View>
              <View style={styles.detailList}>
                {selectedDisease.prevention.map((prevention, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <View style={[styles.bulletPoint, { backgroundColor: "#10b981" }]} />
                    <Text style={styles.detailText}>{prevention}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Notes */}
            <View style={styles.notesSection}>
              <View style={styles.notesHeader}>
                <Ionicons name="bulb" size={20} color="#8b5cf6" />
                <Text style={styles.notesSectionTitle}>Expert Notes</Text>
              </View>
              <Text style={styles.notesText}>{selectedDisease.notes}</Text>
            </View>
          </View>
        )}

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerImage: {
    height: 280,
    justifyContent: "flex-end",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    height: 140,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: "flex-start",
  },
  cropBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  cropBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400e",
    marginLeft: 4,
    textTransform: "uppercase",
  },
  cropTitle: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  cropSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontStyle: "italic",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  aboutCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  aboutText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },
  diseasesSection: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  diseaseGrid: {
    gap: 12,
  },
  diseaseCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedDiseaseCard: {
    borderColor: "#92400e",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  diseaseCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  diseaseIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  diseaseCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  diseaseCardPreview: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  diseaseCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  diseaseDetailsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  diseaseDetailsHeader: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  diseaseDetailsTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  diseaseDetailsText: {
    marginLeft: 12,
    flex: 1,
  },
  diseaseDetailsName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  detailList: {
    gap: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    backgroundColor: "#6b7280",
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    flex: 1,
  },
  notesSection: {
    backgroundColor: "#faf5ff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5cf6",
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  notesSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
    marginLeft: 8,
  },
  notesText: {
    fontSize: 14,
    color: "#6b46c1",
    lineHeight: 20,
    fontStyle: "italic",
  },
  bottomSpacer: {
    height: 40,
  },
})
