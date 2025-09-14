import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  getBooks,
  deleteBook,
  toggleFavorite,
  updateStatus,
} from "../firebase/bookService";
import { useAuth } from "../hooks/AuthContext";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";

export default function HomeScreen() {
  const { user } = useAuth();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // <-- adiciona loading
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const navigation: any = useNavigation();

  // Modal de exclusão
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Função para buscar livros (do Firebase)
  const fetchBooks = async () => {
    if (!user) return;
    setLoading(true); // <-- inicia loading
    const data = await getBooks(user.uid);
    setBooks(data);
    setLoading(false); // <-- termina loading
  };

  // Debounce para busca (atualiza searchTerm com atraso)
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearch(text);
    }, 500),
    []
  );

  // Chamado ao digitar na busca
  const onChangeSearch = (text: string) => {
    debouncedSearch(text);
  };

  // Filtragem combinada
  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "Todos" ||
      book.genre?.toLowerCase() === filter.toLowerCase() ||
      book.status?.toLowerCase() === filter.toLowerCase();

    const matchFavorite = showOnlyFavorites ? book.favorite : true;

    return matchSearch && matchFilter && matchFavorite;
  });

  // Funções para modal de exclusão
  const openDeleteModal = (id: string) => {
    setSelectedBookId(id);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedBookId) return;
    await deleteBook(selectedBookId);
    setModalVisible(false);
    setSelectedBookId(null);
    fetchBooks();
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedBookId(null);
  };

  // Função para status cíclico
  const getNextStatus = (
    current: string
  ): "Quero ler" | "Lendo" | "Lido" => {
    const statusList: ("Quero ler" | "Lendo" | "Lido")[] = [
      "Quero ler",
      "Lendo",
      "Lido",
    ];
    const index = statusList.indexOf(current as any);
    return statusList[(index + 1) % statusList.length];
  };

  // Se estiver carregando, mostra o ActivityIndicator centralizado
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Livros</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por título ou autor..."
        onChangeText={onChangeSearch}
        defaultValue={search}
      />

      <TouchableOpacity
        style={[
          styles.favoriteToggle,
          showOnlyFavorites && { backgroundColor: "#f1c40f" },
        ]}
        onPress={() => setShowOnlyFavorites((prev) => !prev)}
      >
        <Text style={styles.favoriteToggleText}>
          {showOnlyFavorites
            ? "★ Mostrando favoritos"
            : "☆ Mostrar apenas favoritos"}
        </Text>
      </TouchableOpacity>

      <View style={styles.filters}>
        {["Todos", "Ficção", "Fantasia", "Quero ler", "Lendo", "Lido"].map(
          (f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={
                  filter === f ? styles.filterTextActive : styles.filterText
                }
              >
                {f}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>
              {item.genre} - {item.status}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  navigation.navigate("EditBook", { book: item })
                }
              >
                <Text style={{ color: "#fff" }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => openDeleteModal(item.id)}
              >
                <Text style={{ color: "#fff" }}>Excluir</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.extraActions}>
              <TouchableOpacity
                style={styles.statusBtn}
                onPress={async () => {
                  const next = getNextStatus(item.status || "Quero ler");
                  await updateStatus(item.id, next);
                  fetchBooks();
                }}
              >
                <Text style={{ color: "#fff" }}>
                  Status: {item.status || "Quero ler"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.favoriteBtn,
                  item.favorite && { backgroundColor: "#f1c40f" },
                ]}
                onPress={async () => {
                  await toggleFavorite(item.id, item.favorite ?? false);
                  fetchBooks();
                }}
              >
                <Text style={{ color: "#fff" }}>
                  {item.favorite ? "★ Favorito" : "☆ Marcar favorito"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de confirmação */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text>Tem certeza que deseja excluir este livro?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={cancelDelete}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={confirmDelete}
              >
                <Text style={[styles.modalBtnText, { color: "#fff" }]}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  favoriteToggle: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ddd",
    marginBottom: 10,
    alignItems: "center",
  },
  favoriteToggleText: { color: "#333", fontWeight: "bold" },
  filters: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    marginRight: 8,
    marginBottom: 8,
  },
  filterActive: { backgroundColor: "#1e90ff", borderColor: "#1e90ff" },
  filterText: { color: "#333" },
  filterTextActive: { color: "#fff" },
  bookCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  actions: { flexDirection: "row", marginTop: 10, gap: 10 },
  editBtn: { backgroundColor: "#1e90ff", padding: 8, borderRadius: 6 },
  deleteBtn: { backgroundColor: "#e74c3c", padding: 8, borderRadius: 6 },
  extraActions: { flexDirection: "row", gap: 10, marginTop: 8 },
  statusBtn: { backgroundColor: "#8e44ad", padding: 8, borderRadius: 6 },
  favoriteBtn: { backgroundColor: "#999", padding: 8, borderRadius: 6 },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 20 },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 6, marginLeft: 10 },
  cancelBtn: { backgroundColor: "#ccc" },
  confirmBtn: { backgroundColor: "#e74c3c" },
  modalBtnText: { fontWeight: "bold", color: "#333" },
});
