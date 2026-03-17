# 🥕 Valy – Gestor de Validade de Alimentos

> Aplicação web desenvolvida com **Vite + React** para gerenciar a validade de alimentos.

---

## 👥 Membros do Grupo

| Nome Completo  
| --------------------------
| Derick Mario de Sousa Dias
| Leonardo Oliveira  
| Carolina Carvalho  
| Josimara

---

## 🎯 Tema do Projeto

**Gestor de Validade de Alimentos** – permite cadastrar alimentos com suas respectivas datas de vencimento, visualizar o status de cada item (Ok, Perto de Vencer, Vencido) e editar ou remover itens.

---

## 🔗 Links

- 📦 **Repositório GitHub:** `https://github.com/DerickDiasDev/Trabalho-Final-React-CEPED`
- 📋 **Quadro Trello / GitHub Projects:** https://trello.com/b/5OBLYqnB/valy-projeto-final-gestao-de-validade-de-alimentos
- 🎨 **Design Figma:** https://www.figma.com/design/C8G0SEBBA4vhpsM2lR8yBw/Valy?node-id=0-1&t=ATGvCdRWNYYTo0Ma-1

---

## 🚀 Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

---

## 🔑 Credenciais de Teste (FakeStore API)

A autenticação é feita via [FakeStore API](https://fakestoreapi.com/docs).  
Use uma das contas abaixo para fazer login:

| Usuário     | Senha       |
| ----------- | ----------- |
| `mor_2314`  | `83r5^_`    |
| `johnd`     | `m38rmF$`   |
| `kevinryan` | `kev02937@` |

---

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis (Navbar, Layout, ConfirmModal, Toast, StatusBadge)
├── context/          # Context API (AuthContext, FoodContext)
├── hooks/            # Custom hooks (useToast)
├── pages/            # Páginas (LoginPage, DashboardPage, CadastroPage, DetalhesPage)
├── routes/           # Rotas privadas (PrivateRoute)
├── styles/           # CSS global
├── App.jsx           # Configuração de rotas
└── main.jsx          # Entry point
```

---

## ✅ Critérios Técnicos Implementados

### Componentização

- [x] Uso de **Props** e **desestruturação de props** em todos os componentes
- [x] Passagem de funções via props (`onConfirm`, `onCancel`, `onRemove`)

### Renderização e Estilização

- [x] **Renderização condicional** (estado vazio, modo edição/visualização, modal)
- [x] **Estilos dinâmicos/condicionais** (badges de status, linhas coloridas na tabela)
- [x] Recursos estáticos via `assets` e fontes externas

### Gerenciamento de Estado e Hooks

- [x] **`useState`** em múltiplos componentes
- [x] **`react-hook-form`** em formulários (LoginPage, CadastroPage, DetalhesPage)
- [x] **Context API** – `AuthContext` (autenticação) + `FoodContext` (dados globais)

### Navegação

- [x] **Rotas estáticas**: `/dashboard`, `/cadastro`
- [x] **Rota dinâmica**: `/detalhes/:id`
- [x] **Rotas privadas**: `PrivateRoute` redireciona para `/login` se não autenticado

### Comunicação com API

- [x] **FakeStore API** – `POST /auth/login` para autenticação
- [x] **FakeStore API** – `GET /users` para dados do usuário

---

## 🛠️ Tecnologias

- **Vite** + **React 18**
- **React Router DOM v6**
- **React Hook Form**
- **FakeStore API**
- CSS puro com variáveis CSS (sem biblioteca de UI externa)
