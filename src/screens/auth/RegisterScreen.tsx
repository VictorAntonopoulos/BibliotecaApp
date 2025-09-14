import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    // Resetar erros
    setEmailError("");
    setPasswordError("");
    setFirebaseError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("O email é obrigatório.");
      valid = false;
    } else if (!validateEmail(email.trim())) {
      setEmailError("Email inválido.");
      valid = false;
    }

    if (!password) {
      setPasswordError("A senha é obrigatória.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigation.navigate("Login");
    } catch (error: any) {
      let message = "Erro ao cadastrar usuário.";
      if (error.code === "auth/email-already-in-use") {
        message = "Este email já está em uso.";
      } else if (error.code === "auth/invalid-email") {
        message = "Email inválido.";
      } else if (error.code === "auth/weak-password") {
        message = "Senha muito fraca.";
      }
      setFirebaseError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {firebaseError ? (
        <Text style={[styles.errorText, { marginBottom: 10 }]}>{firebaseError}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#aaa" }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tem conta? Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    width: "100%",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#27AE60",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, color: "#27AE60" },
});
