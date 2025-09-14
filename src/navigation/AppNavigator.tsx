import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";

// Import screens de autenticação
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen"; // nova tela

// Import screens principais
import HomeScreen from "../screens/HomeScreen";
import AddBookScreen from "../screens/AddBookScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditBookScreen from "../screens/EditBookScreen"; // nova tela

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1e90ff",
        tabBarInactiveTintColor: "#808080",
        tabBarStyle: {
          backgroundColor: "#f9f9f9",
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "AddBook") {
            iconName = "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="AddBook"
        component={AddBookScreen}
        options={{ title: "Adicionar" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          {/* Tabs principais */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          {/* Tela extra para edição de livro */}
          <Stack.Screen
            name="EditBook"
            component={EditBookScreen}
            options={{
              title: "Editar Livro",
              headerStyle: { backgroundColor: "#1e90ff" },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#1e90ff" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Entrar" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Criar Conta" }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ title: "Recuperar Senha" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
