// app/dashboard.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setError("");

      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await fetch("https://lms-ozcq.onrender.com/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          setError("Unauthorized: Please login.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data && data.stats) {
          setStats(data.stats);
          setRecentIssues(data.recentIssues || []);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError(`Failed to load dashboard: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  };

  const navigateTo = (screen) => {
    setMenuOpen(false);
    alert(`Navigate to ${screen}`);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Topbar */}
      <View className="h-16 bg-blue-600 flex-row items-center justify-between px-4">
        <View className="flex-row items-center">
          <View className="bg-white rounded p-1">
            <MaterialIcons name="local-library" size={28} color="#2563EB" />
          </View>
          <Text className="text-white text-xl font-bold ml-2">Jk Library</Text>
        </View>

        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} className="p-2">
          <FontAwesome name="bars" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Hamburger Menu Modal */}
      <Modal visible={menuOpen} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/30 justify-start"
          onPress={() => setMenuOpen(false)}
          activeOpacity={1}
        >
          <View className="bg-white mt-16 mx-4 p-4 rounded-lg shadow-lg">
            <MenuItem icon="dashboard" label="Dashboard" onPress={() => navigateTo("Dashboard")} />
            <MenuItem icon="users" label="Borrowers" onPress={() => navigateTo("Borrowers")} />
            <MenuItem icon="sign-out" label="Logout" onPress={handleLogout} color="red" />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Main content */}
      <View className="flex-1 flex-col justify-between">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#2563EB" className="mt-5" />
          ) : error ? (
            <Text className="text-red-500 text-center mt-5">{error}</Text>
          ) : stats ? (
            <>
              <Text className="text-2xl font-bold text-blue-600 mb-2">Dashboard</Text>
              <Text className="text-gray-600 mb-4">Welcome to the Library Management System</Text>

              {/* Stats Cards */}
              <View className="flex-row justify-between mb-4">
                <Card
                  title="Total Books"
                  value={stats.books || 0}
                  subtitle={`${stats.availableBooks || 0} available`}
                  icon="book"
                />
                <Card
                  title="Total Members"
                  value={stats.members || 0}
                  subtitle={`${stats.activeMembers || 0} active`}
                  icon="users"
                />
              </View>

              <View className="flex-row justify-between mb-4">
                <Card title="Books Issued Today" value={stats.issuedToday || 0} subtitle="New issues" icon="calendar" />
                <Card title="Overdue Books" value={stats.overdueBooks || 0} subtitle="Need attention" icon="exclamation-triangle" />
              </View>

              {/* Recent Issues */}
              <View className="bg-white p-4 rounded-lg mb-4">
                <Text className="text-lg font-bold text-gray-900 mb-2">Recent Book Issues</Text>
                {recentIssues.length === 0 ? (
                  <Text className="text-gray-400">No recent issues.</Text>
                ) : (
                  recentIssues.map((issue, idx) => (
                    <View
                      key={idx}
                      className={`flex-row justify-between py-2 ${idx !== 0 ? "border-t border-gray-200" : ""}`}
                    >
                      <View>
                        <Text className="font-medium text-gray-900">{issue.bookTitle}</Text>
                        <Text className="text-sm text-gray-500">Issued to {issue.memberName}</Text>
                      </View>
                      <Text className="text-sm text-gray-500">{issue.date}</Text>
                    </View>
                  ))
                )}
              </View>

              {/* FAQs */}
              <View className="bg-white p-4 rounded-lg mb-4">
                <Text className="text-lg font-bold text-gray-900 mb-2">FAQs</Text>
                <FAQItem question="How to borrow a book?" answer="Go to the Borrowers section and select a book to issue." />
                <FAQItem question="How many books can I borrow?" answer="You can borrow up to unlimited books at a time." />
                <FAQItem question="How to return a book?" answer="Visit the library or mark as returned in the system." />
              </View>
            </>
          ) : (
            <Text className="text-gray-400 text-center mt-4">No data available</Text>
          )}
        </ScrollView>

        {/* Footer */}
        <View className="bg-gray-200 py-3 items-center">
          <Text className="text-gray-500">© 2025 Jk Library. All rights reserved.</Text>
        </View>
      </View>
    </View>
  );
}

// Card Component
const Card = ({ title, value, subtitle, icon }) => (
  <View className="flex-1 bg-white p-4 rounded-lg mr-2">
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-gray-500 text-sm">{title}</Text>
      <FontAwesome name={icon} size={20} color="#2563EB" />
    </View>
    <Text className="text-gray-900 text-xl font-bold">{value}</Text>
    <Text className="text-gray-500 text-sm">{subtitle}</Text>
  </View>
);

// Menu Item Component
const MenuItem = ({ icon, label, onPress, color = "#2563EB" }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center mb-3">
    <FontAwesome name={icon} size={24} color={color} className="mr-2" />
    <Text className="font-medium" style={{ color: color }}>
      {label}
    </Text>
  </TouchableOpacity>
);

// FAQ Item Component
const FAQItem = ({ question, answer }) => (
  <View className="mb-2">
    <Text className="font-bold text-gray-900">{question}</Text>
    <Text className="text-gray-500">{answer}</Text>
  </View>
);
