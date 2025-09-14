# 📌 BibliotecaApp - CP 01 Mobile

![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)

## 📖 Descrição do Projeto

Aplicativo mobile desenvolvido em **React Native CLI** com **TypeScript**, que permite gerenciar uma biblioteca pessoal de livros.  
Permite cadastrar, editar, excluir livros, aplicar filtros, marcar favoritos e acompanhar estatísticas do usuário.

---

## 🌐 Funcionalidades

### 🔑 Autenticação Firebase
- Login  
- Registro  
- Logout  
- Recuperar senha  

### 📚 CRUD de Livros
- Adicionar  
- Listar  
- Editar  
- Excluir  

### 🔎 Busca e Filtros
- Busca por título ou autor (com debounce)  
- Filtros por gênero/status: **Quero ler**, **Lendo**, **Lido**  
- Exibir apenas favoritos  

### ⭐ Recursos Extras
- Marcar/desmarcar livros como favoritos  
- Alterar status de leitura de forma cíclica: **Quero ler → Lendo → Lido**  
- Estatísticas no perfil do usuário:
  - Total de livros  
  - Favoritos  
  - Lidos  

---

## 👨‍💻 Participantes

- Victor Antonopoulos - RM 556313  
- Leandro Correia - RM 556203  

---

## 🛠️ Tecnologias Utilizadas

- React Native CLI + TypeScript  
- Firebase Authentication & Firestore  
- React Navigation (Stack + Bottom Tabs)  
- Context API (AuthContext)  
- Lodash.debounce  
- React Native Vector Icons  

---

## 📂 Estrutura de Pastas

```text
src
 ┣ firebase       # Configuração e serviços Firebase (Auth + Firestore)
 ┣ hooks          # Contextos globais (ex: AuthContext)
 ┣ navigation     # Rotas (Stack + Tabs)
 ┣ screens        # Telas do app (Login, Register, ForgotPassword, Home, AddBook, EditBook, Profile)
 ┣ components     # Componentes reutilizáveis (ex: formulários)
 ┗ utils          # Funções auxiliares
```
## ⚙️ Como Rodar o Projeto (Android)

### ✅ Pré-requisitos
- **Node.js** instalado  
- **JDK + Android Studio** (ou apenas SDK e emulador configurado)  
- Configurar variáveis de ambiente `JAVA_HOME` e `ANDROID_HOME`  

### Passos de Instalação

1. **🔽 Clonar o Repositório**
```bash
git clone https://github.com/usuario/BibliotecaApp.git
cd BibliotecaApp
npm install

