import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter(); 

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Navbar */}
      <View className="w-full flex-row justify-between items-center px-6 py-4 border-b bg-white">
        <View className="flex-row items-center space-x-3">
          <Icon name="local-library" size={40} color="#4AB5BB" />
          <View>
            <Text className="text-xl font-bold text-gray-800">Library System</Text>
            <Text className="text-sm text-gray-500">Empowering Knowledge Access</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-[#4AB5BB] px-5 py-2 rounded-lg"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white font-medium">Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View className="h-[500px] justify-center items-center text-center bg-gray-50 px-6">
        <Text className="text-5xl font-bold tracking-tight text-gray-900">JK Library</Text>
        <Text className="text-4xl font-semibold text-[#4AB5BB] mt-2">Management System</Text>
        <Text className="text-lg mt-4 max-w-md text-gray-600 text-center">
          Manage your library smarter, faster, and easier with our modern and user-friendly platform.
        </Text>
        <View className="flex-row mt-8 space-x-4">
          <TouchableOpacity
            className="bg-green-600 px-6 py-3 rounded-lg"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white text-lg font-medium">Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black px-6 py-3 rounded-lg">
            <Text className="text-white text-lg font-medium">Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mx-6 mb-6 rounded-lg">
        <Text className="text-yellow-800 font-medium">
          ⚠️ Note: The borrower dashboard is currently not available. Only librarians can access the dashboard.
        </Text>
      </View>

      <View className="relative h-80 w-full">
        <Image
          source={require("../assets/image.png")}
          className="w-full h-full"
          resizeMode="fit"
        />
        <View className="absolute inset-0 bg-black/50 justify-center items-center px-6">
          <Text className="text-3xl md:text-4xl font-bold text-white text-center">
            Welcome to JK Library
          </Text>
          <Text className="text-lg text-gray-200 mt-4 max-w-md text-center">
            Explore books, manage your library efficiently, and empower knowledge access for everyone.
          </Text>
          <TouchableOpacity
            className="mt-6 bg-green-600 px-6 py-3 rounded-lg"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white text-lg font-medium">Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="py-20 bg-white items-center px-6">
        <Text className="text-3xl font-bold text-green-600 text-center">
          Everything You Need for Your Library
        </Text>
        <Text className="text-gray-600 mt-2 max-w-md text-center">
          Powerful tools designed for efficiency and simplicity.
        </Text>

        <View className="flex-col space-y-8 mt-12">
          <Card
            icon="local-library"
            title="Complete Book Management"
            subtitle="Easily organize, categorize, and track your book collections."
          />
          <Card
            icon="group"
            title="Member Management"
            subtitle="Handle member registrations, profiles, and notifications seamlessly."
          />
          <Card
            icon="book"
            title="Borrow Management"
            subtitle="Track borrowings, due dates, and returns with automated alerts."
          />
        </View>
      </View>

      <View className="flex-col lg:flex-row px-6 py-16 bg-gray-50 space-y-8">
        <View className="flex-1">
          <Text className="text-3xl font-bold text-[#4AB5BB]">
            Why Choose Our Library Management System?
          </Text>
          <Text className="mt-4 text-gray-700 text-lg">
            Designed for simplicity and efficiency, our LMS helps institutions and individuals manage resources smarter and faster.
          </Text>
          <View className="mt-6 space-y-2">
            <Text>✅ Real-time inventory tracking</Text>
            <Text>✅ Automated due-date notifications</Text>
            <Text>✅ Comprehensive analytics & reports</Text>
            <Text>✅ Advanced search capabilities</Text>
            <Text>✅ Customizable roles & permissions</Text>
          </View>
        </View>

        <View className="bg-white p-8 text-center rounded-xl shadow-md items-center">
          <Text className="text-3xl font-bold text-[#4AB5BB]">500k+</Text>
          <Text className="text-gray-600">Libraries Trust Us</Text>
          <Text className="text-3xl font-bold mt-4 text-green-600">99.9%</Text>
          <Text className="text-gray-600 mt-1">Uptime Guaranteed</Text>
          <TouchableOpacity
            className="bg-[#4AB5BB] px-5 py-2 rounded-lg mt-5"
            onPress={() => router.push("/login")}
          >
            <Text className="text-white font-medium">Start Free Trial</Text>
          </TouchableOpacity>
        </View>
      </View>

      

      <View className="items-center text-center py-20 bg-gray-100 px-6">
        <Text className="text-3xl font-bold text-[#4AB5BB] text-center">
          Ready To Transform Your Library?
        </Text>
        <Text className="mt-3 text-gray-600 text-lg text-center">
          Join hundreds of libraries that already made the switch.
        </Text>
        <TouchableOpacity
          className="bg-green-600 px-6 py-3 rounded-lg mt-6"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-lg font-medium">
            Sign in to Continue
          </Text>
        </TouchableOpacity>
        <Text className="mt-6 text-gray-500 font-semibold">JK LMS</Text>
        <Text className="text-gray-400 font-medium">kushaladmin@library.com</Text>
      </View>

      {/* Footer */}
      <View className="bg-white py-4 border-t items-center">
        <Text className="text-gray-500">© 2025 JK LMS. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

function Card({ icon, title, subtitle }) {
  return (
    <View className="bg-white rounded-lg p-6 shadow-md border w-80">
      <View className="items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
        <Icon name={icon} size={24} color="#4AB5BB" />
      </View>
      <Text className="text-lg font-semibold text-gray-800">{title}</Text>
      <Text className="text-sm text-gray-600 mt-2">{subtitle}</Text>
    </View>
  );
}
