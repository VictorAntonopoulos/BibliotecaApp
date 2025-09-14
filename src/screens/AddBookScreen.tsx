import React, { useState } from "react";
import { View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import BookForm from "../screens/BookForm"; 
import { addBook } from "../firebase/bookService";
import { useAuth } from "../hooks/AuthContext";

export default function AddBookScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (bookData: {
    title: string;
    author: string;
    genre?: string;
    status?: "Quero ler" | "Lendo" | "Lido";
  }) => {
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }
    try {
      setLoading(true);
      await addBook(
        { ...bookData, status: bookData.status || "Quero ler" },
        user.uid
      );
      Alert.alert("Sucesso", "Livro adicionado!");
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Erro ao adicionar livro");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BookForm onSubmit={handleAdd} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
