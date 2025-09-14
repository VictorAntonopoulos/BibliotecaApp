📌BibliotecaApp -  CP 01 Mobile
======================

📖Descrição do Projeto
--------------------

Aplicativo mobile desenvolvido em React Native (TypeScript + React Native CLI) para gerenciamento de uma biblioteca pessoal de livros.

##🌐Funcionalidades

🔑Autenticação Firebase

Login
Registro
Logout
Recuperar Senha

📚CRUD de Livros
Adicionar
Listar
Editar
Excluir

🔎Busca e Filtros
Busca por título/autor (com debounce).
Filtros por gênero/status (Quero ler, Lendo, Lido).
Exibir apenas favoritos.

⭐Recursos extras
Marcar/desmarcar livros como favoritos.
Alterar status de leitura de forma cíclica (Quero ler → Lendo → Lido).
Estatísticas no perfil do usuário (total, favoritos, lidos).

👨‍💻Participantes
------------------------------------
- Victor Antonopoulos - RM 556313
- Leandro Correia - RM 556203
------------------------------------

🛠️Tecnologias Utilizadas
-------------------
React Native CLI + TypeScript
Firebase Authentication
Firebase Firestore
React Navigation (Stack + Bottom Tabs)
Context API (AuthContext)
Lodash.debounce
React Native Vector Icons

### 📂Estrutura de Pastas

```json
{
src
 ┣ firebase       # Configuração e serviços Firebase (Auth + Firestore)
 ┣ hooks          # Contextos globais (ex: AuthContext)
 ┣ navigation     # Rotas (Stack + Tabs)
 ┣ screens        # Telas do app (Login, Register, ForgotPassword, Home, AddBook, EditBook, Profile)
 ┣ components     # Componentes reutilizáveis (ex: formulários)
 ┗ utils          # Funções auxiliares

}
```

### ⚙️ Como rodar o projeto (Android)

----------

Siga os passos abaixo para configurar e executar o projeto

### ✅Pré-requisitos

-   **Node.js instalado
-   **JDK + Android Studio (ou apenas SDK e emulador configurado)
-   **Configurar as variáveis de ambiente JAVA_HOME e ANDROID_HOME

### Passos de Instalação

1.  **🔽Clone o Repositório**
    -   Github:

        ```bash
        git clone https://github.com/usuario/BibliotecaApp.git
        cd BibliotecaApp
        ```
    -   Instalar dependências:
    
        ```bash
        npm install

        ```

2.  **🗄️Iniciar o Metro Bundler**

    -
        ```bash
         npx react-native start
        ```

3.  **⚠️Rodar no emulador/dispositivo Android**

    -
        ```bash
        npx react-native run-android

        ```

4.  **🔑 Configuração do Firebase**

    -
        ```bash
        Crie um projeto no Firebase Console.
        Ative o Authentication → E-mail/Senha.
        Crie o Firestore Database em modo de teste (ou configure regras).
        Copie as credenciais do projeto e substitua em src/firebase/config.ts.
        ```
```json
{
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "NUMERO",
  appId: "APP_ID"
};


}
```
5.  **📲 Fluxo de uso**
Criar conta ou fazer login.
Adicionar livro (título, autor, gênero, status).
Gerenciar livros na Home:
Editar
Excluir
Marcar como favorito
Alterar status de leitura
Visualizar estatísticas no perfil:
Total de livros
Favoritos
Lidos

6.  📌 Destaques do código**

bookService.ts → CRUD no Firestore + funções de favoritos/status.
AuthContext.tsx → gerenciamento global de autenticação.
AppNavigator.tsx → navegação condicional (usuário logado / não logado).
HomeScreen.tsx → busca, filtros, favoritos, status, exclusão com modal.
ProfileScreen.tsx → estatísticas do usuário + logout.
