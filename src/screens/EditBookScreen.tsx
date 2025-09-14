import React, { useState } from "react";
import { View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import BookForm from "../screens/BookForm"; 
import { updateBook } from "../firebase/bookService";

export default function EditBookScreen({ route, navigation }: any) {
  const { book } = route.params;
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (data: {
    title: string;
    author: string;
    genre?: string;
    status?: "Quero ler" | "Lendo" | "Lido";
  }) => {
    try {
      setLoading(true);
      await updateBook(book.id, data);
      Alert.alert("Sucesso", "Livro atualizado!");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Erro ao atualizar livro");
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
      <BookForm initialValues={book} onSubmit={handleUpdate} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
