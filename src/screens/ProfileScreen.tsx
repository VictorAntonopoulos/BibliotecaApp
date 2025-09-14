import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/AuthContext";
import { getBooks } from "../firebase/bookService";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [total, setTotal] = useState(0);
  const [lidos, setLidos] = useState(0);
  const [favoritos, setFavoritos] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    if (!user) return;
    setLoading(true);
    const livros = await getBooks(user.uid);
    setTotal(livros.length);
    setLidos(livros.filter((l) => l.status === "Lido").length);
    setFavoritos(livros.filter((l) => l.favorite).length);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, [user]);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.info}>📧 Email: {user.email}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" style={{ marginTop: 20 }} />
      ) : (
        <>
          <Text style={styles.stat}>📚 Total de livros: {total}</Text>
          <Text style={styles.stat}>⭐ Favoritos: {favoritos}</Text>
          <Text style={styles.stat}>✅ Lidos: {lidos}</Text>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
  stat: { fontSize: 16, marginTop: 6 },
  button: {
    backgroundColor: "#E74C3C",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
