import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

interface BookFormProps {
  initialValues?: {
    title?: string;
    author?: string;
    genre?: string;
    status?: "Quero ler" | "Lendo" | "Lido";
  };
  onSubmit: (data: {
    title: string;
    author: string;
    genre?: string;
    status?: "Quero ler" | "Lendo" | "Lido";
  }) => void;
  loading?: boolean;
}

export default function BookForm({ initialValues = {}, onSubmit, loading }: BookFormProps) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [author, setAuthor] = useState(initialValues.author || "");
  const [genre, setGenre] = useState(initialValues.genre || "");
  const [status, setStatus] = useState<
    "Quero ler" | "Lendo" | "Lido" | undefined
  >(initialValues.status);

  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

  const validate = () => {
    const newErrors: { title?: string; author?: string } = {};
    if (!title.trim()) newErrors.title = "Título é obrigatório.";
    if (!author.trim()) newErrors.author = "Autor é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePress = () => {
    if (validate()) {
      onSubmit({ title: title.trim(), author: author.trim(), genre, status });
      // Opcional: limpar campos após submit
      // setTitle(""); setAuthor(""); setGenre(""); setStatus(undefined);
    } else {
      Alert.alert("Erro", "Preencha os campos obrigatórios.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={[styles.input, errors.title && styles.inputError]}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do livro"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <Text style={styles.label}>Autor *</Text>
      <TextInput
        style={[styles.input, errors.author && styles.inputError]}
        value={author}
        onChangeText={setAuthor}
        placeholder="Digite o autor do livro"
      />
      {errors.author && <Text style={styles.errorText}>{errors.author}</Text>}

      <Text style={styles.label}>Gênero</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="Digite o gênero (opcional)"
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={(text) =>
          setStatus(
            text === "Quero ler" || text === "Lendo" || text === "Lido"
              ? text
              : undefined
          )
        }
        placeholder="Quero ler, Lendo, Lido"
      />

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#aaa" }]}
        onPress={handlePress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Salvando..." : "Salvar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
