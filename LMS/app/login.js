// File: app/login.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const toastTimer = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message, type = "error", duration = 3000) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, message, type });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, duration);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      if (!email.trim()) return showToast("Email is required", "error");
      if (!password.trim()) return showToast("Password is required", "error");
    }

    setLoading(true);
    try {
      showToast("Logging in...", "info", 1500);

      const response = await fetch("https://lms-ozcq.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok && data.token) {
        await AsyncStorage.setItem("token", data.token);

        // Extract role safely
        const role = data.role || data.user?.role || ""; 

        if (role.toLowerCase() === "librarian") {
          showToast("Login successful!", "success", 800);
          setTimeout(() => {
            router.replace("/dashboard"); 
          }, 800);
        } else {
          showToast("Access Denied: Sorry no dashboard for borrower is available currently", "error");
        }
      } else {
        const message = (data.message || "").toLowerCase();
        if (message.includes("email")) showToast("Invalid email", "error");
        else if (message.includes("password") || message.includes("pass")) showToast("Invalid password", "error");
        else showToast("Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Network/server error. Check console.", "error", 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-8 py-12">
        {toast.visible && (
          <View
            className={`mb-4 px-4 py-3 rounded-lg ${
              toast.type === "success" ? "bg-green-100" : toast.type === "info" ? "bg-blue-100" : "bg-red-100"
            }`}
          >
            <Text
              className={`text-sm ${
                toast.type === "success" ? "text-green-800" : toast.type === "info" ? "text-blue-800" : "text-red-800"
              }`}
            >
              {toast.message}
            </Text>
          </View>
        )}

        <View className="bg-white rounded-2xl p-8 shadow-lg">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            Welcome to Library Management System
          </Text>
          <Text className="text-gray-600 text-center mb-8">Sign in to manage the library</Text>

          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-50"
            />
          </View>

          <View className="mb-8">
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-50"
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-600 py-4 rounded-lg shadow-md mb-4 flex-row justify-center items-center"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-lg font-semibold text-center">Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="py-2"
            activeOpacity={0.7}
          >
            <Text className="text-blue-600 text-center">Back to Welcome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
