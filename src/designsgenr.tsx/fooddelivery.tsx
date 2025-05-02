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

export const Food = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationText}>📍 4517 Washington Ave</Text>
        <TextInput style={styles.searchInput} placeholder="Search your favorite food" placeholderTextColor="#ccc" />
      </View>

      {/* Offer Banner */}
      <View style={styles.banner}>
        <Image
          source={{ uri: "https://www.newsnationnow.com/wp-content/uploads/sites/108/2024/03/GettyImages-694174714-1.jpg" }}
          style={styles.bannerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.offerText}>🔥 Limited Discount!</Text>
          <Text style={styles.offerTitle}>Ramadhan Special Deals</Text>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Food Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Food Categories</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categoryData.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image source={{ uri: item.image }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Popular Food */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Food</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <View style={styles.foodList}>
        {popularFood.map((item, index) => (
          <View key={index} style={styles.foodCard}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View style={styles.foodInfo}>
              <Text style={styles.foodTitle}>{item.name}</Text>
              <Text style={styles.foodCategory}>{item.category}</Text>
              <Text style={styles.foodPrice}>${item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const categoryData = [
  { name: "Drinks", image: "https://cdn.dribbble.com/userupload/4090417/file/original-82a5abebdd3490b8db4b513913900283.jpg?resize=752x&vertical=centerhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodhousekeeping.com%2Fhealth%2Fdiet-nutrition%2Fa33452%2Fdrinks-to-never-drink%2F&psig=AOvVaw24AFmv0jY7Ewqmv8hgv63G&ust=1740686151712000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIij-7CP4osDFQAAAAAdAAAAABAE" },
  { name: "Fast Food", image: "https://static.vecteezy.com/system/resources/previews/000/964/198/non_2x/fast-food-meal-set-vector.jpg" },
  { name: "Sweets", image: "https://png.pngtree.com/png-clipart/20190613/original/pngtree-cartoon-hand-painted-dessert-food-png-image_3593833.jpg" },
  { name: "Bread", image: "https://static.vecteezy.com/system/resources/previews/008/944/305/non_2x/thanksgiving-baked-bread-cartoon-colored-clipart-free-vector.jpg" },
  { name: "More", image: "https://cdn-icons-png.flaticon.com/512/13073/13073207.png" },
];

const popularFood = [
  { name: "Tropical Paradise Fruit Salad", category: "Sweets", price: "32.00", image: "https://media.istockphoto.com/id/511622035/photo/heallthy-organic-fruit-salad.jpg?s=612x612&w=0&k=20&c=Nl3vuD8QLVCWCzFqiHBvRQzeoY2p0chmhzuPsW2hNBA=" },
  { name: "Balsamic Glazed Chicken", category: "Fast Food", price: "22.00", image: "https://www.cookingclassy.com/wp-content/uploads/2021/08/balsamic-chicken-3.jpg" },
  { name: "Deluxe Cheeseburger", category: "Fast Food", price: "15.00", image: "https://www.cookwithcampbells.ca/wp-content/uploads/sites/24/assets/recipes/medium/medium_774.jpg" },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#1f1f1f", padding: 20 },
  locationText: { color: "#FFD700", fontSize: 16, fontWeight: "bold" },
  searchInput: { backgroundColor: "#333", borderRadius: 10, padding: 10, marginTop: 10, color: "#fff" },
  banner: { position: "relative", margin: 15, borderRadius: 20, overflow: "hidden" },
  bannerImage: { width: "100%", height: 200 },
  overlay: { position: "absolute", left: 20, top: 30 },
  offerText: { fontSize: 16, color: "#fff" },
  offerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 5 },
  orderButton: { backgroundColor: "#FF7F50", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, marginTop: 10 },
  orderButtonText: { color: "#fff", fontWeight: "bold" },
  section: { flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  seeAll: { fontSize: 14, color: "#FF7F50", fontWeight: "bold" },
  categoryScroll: { paddingLeft: 15 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryIcon: { width: 60, height: 60, borderRadius: 30 },
  categoryText: { marginTop: 5, fontSize: 14, color: "#333" },
  foodList: { padding: 15 },
  foodCard: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 12, marginBottom: 10, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 },
  foodImage: { width: 80, height: 80, borderRadius: 10 },
  foodInfo: { marginLeft: 10 },
  foodTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  foodCategory: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  foodPrice: { fontSize: 16, fontWeight: "bold", color: "#FF7F50", marginTop: 5 },
});

export default Food;
