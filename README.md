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
5.  **🗄️Configure a Conexão com o Banco de Dados**

    -   Certifique-se de que o container do SQL Server está rodando:

        ```bash
        docker ps
        ```

    -   Você deve ver o container `sqlserver-trackin` na lista com status "Up".

6.  **🏗️Aplique as Migrations**
    
    -   Entre na pasta raíz src:
        ```bash
        cd src
        ```
    -   Aplique as migrations para criar as tabelas no banco de dados SQL Server:
      
        ```bash
        dotnet ef database update --project Trackin.Infrastructure --startup-project Trackin.Api
        ```

    -   Se houver erros, verifique se o container está rodando e se as configurações no `.env` estão corretas.

8.  **▶️Execute a Aplicação**

    -   Inicie o projeto: (ainda dentro de src):

        ```bash
        dotnet run --project Trackin.Api
        ```
        - Se preferir, rode com F5 no vscode.

    -   A API estará disponível em `https://localhost:5007` (ou a porta configurada).

9.  **Acesse a Documentação Swagger**

    -   Acesse `https://localhost:5007/swagger` para explorar e testar os endpoints.

### 🐳Comandos Úteis do Docker

-   **Parar o container:**
    ```bash
    docker stop sqlserver-trackin
    ```

-   **Iniciar o container novamente:**
    ```bash
    docker start sqlserver-trackin
    ```

-   **Remover o container:**
    ```bash
    docker rm sqlserver-trackin
    ```

-   **Ver logs do container:**
    ```bash
    docker logs sqlserver-trackin
    ```

### 📌Observações

-   O SQL Server precisa de pelo menos 2GB de RAM para funcionar adequadamente.
-   A senha do SQL Server deve atender aos requisitos de complexidade (pelo menos 8 caracteres, maiúsculas, minúsculas, números e símbolos).
-   Verifique se a porta 1433 não está sendo usada por outra aplicação.
-   O Dockerfile da aplicação está localizado dentro da pasta `Trackin.API`.

Notas Adicionais
----------------

-   Esta é a implementação da primeira sprint, atendendo aos requisitos mínimos de CRUD, integração com SQL Server via EF Core, e documentação Swagger.
-   Nem todas as rotas previstas na arquitetura estão implementadas; o foco foi nos controllers listados acima.
-   O banco de dados `TrackinDb` será criado automaticamente ao executar as migrations.

## Documentação Complementar

📄 [Baixar Documento Complementar (PDF)](doc_challenge_dotnet.pdf)

☁️Scripts Azure CLI (Devops)
----------------
Criação Resource Group e VM:
```bash
az group create --name RG-ChallengeNET --location eastus

az vm create \
  --resource-group RG-ChallengeNET \
  --name VM-ChallengeNET \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard
```

Abertura de Portas:
```bash
az vm open-port --resource-group RG-ChallengeNET --name VM-ChallengeNET --port 80 --priority 1001
az vm open-port --resource-group RG-ChallengeNET --name VM-ChallengeNET --port 443 --priority 1002
az vm open-port --resource-group RG-ChallengeNET --name VM-ChallengeNET --port 5000 --priority 1003
az vm open-port --resource-group RG-ChallengeNET --name VM-ChallengeNET --port 8080 --priority 1010
az vm open-port --resource-group RG-ChallengeNET --name VM-ChallengeNET --port 8081 --priority 1011
```

