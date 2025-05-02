import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native-web";

export const CharityLandingPage = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i0.wp.com/lapope.com/wp-content/uploads/2022/08/Scope-homepage.png?fit=1024%2C525&ssl=1",
          }}
          style={styles.heroImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Lend a Helping Hand</Text>
          <Text style={styles.subtitle}>
            Make a difference in someone's life today
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Donation Section */}
      <View style={styles.donationSection}>
        <Text style={styles.sectionTitle}>Your Support Matters</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter donation amount"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Proceed to Donate</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Campaigns */}
      <View style={styles.campaigns}>
        <Text style={styles.sectionTitle}>Ongoing Campaigns</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.horizontalScroll}
        >
          <View style={styles.campaignCard}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmY4A86oq9Te2OL4TsfuwUyZYr85svhWpwMA&s",
              }}
              style={styles.campaignImage}
            />
            <Text style={styles.campaignTitle}>Help Educate Children</Text>
            <Text style={styles.campaignDetails}>Goal: $10,000</Text>
          </View>
          <View style={styles.campaignCard}>
            <Image
              source={{
                uri: "https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:a78537b9-5dcd-5069-bef3-26307ae3b275/component?assetType=TEMPLATE&etag=81c1e1adfb53439182f7fff3444d5e6c&revision=19a3c6d3-2589-49d8-baab-3b4f0c3782e0&component_id=18a22bf0-998f-4b31-b678-e8f0850cf8d7",
              }}
              style={styles.campaignImage}
            />
            <Text style={styles.campaignTitle}>Support Flood Victims</Text>
            <Text style={styles.campaignDetails}>Goal: $5,000</Text>
          </View>
          <View style={styles.campaignCard}>
            <Image
              source={{
                uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Flapope.com%2F2022%2F09%2F16%2Fwhat-makes-a-good-charity-website-homepage%2F&psig=AOvVaw1gEupr2avZlpqbMMMhlllo&ust=1741758354380000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjGxsuqgYwDFQAAAAAdAAAAABAJ",
              }}
              style={styles.campaignImage}
            />
            <Text style={styles.campaignTitle}>Feed the Hungry</Text>
            <Text style={styles.campaignDetails}>Goal: $8,000</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { position: "relative" },
  heroImage: { width: "100%", height: 300, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { fontSize: 30, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 18, color: "#f3f3f3", textAlign: "center", marginTop: 8 },
  button: {
    backgroundColor: "rgba(98, 13, 216, 0.4)",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  donationSection: { padding: 20, alignItems: "center" },
  sectionTitle: { fontSize: 24, fontWeight: "600", marginBottom: 10, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    width: "80%",
    textAlign: "center",
    backgroundColor: "#F9FAFB",
    marginBottom: 15,
  },
  campaigns: { padding: 20 },
  horizontalScroll: { paddingVertical: 10 },
  campaignCard: {
    width: 200,
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginRight: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  campaignImage: { width: "100%", height: 120, borderRadius: 10 },
  campaignTitle: { fontSize: 18, fontWeight: "bold", color: "#1F2937", marginTop: 10, textAlign: "center" },
  campaignDetails: { fontSize: 14, color: "#6B7280", marginTop: 5 },
});

export default CharityLandingPage;
