# MoodSleep Tracker - Frontend

Aplicação web para monitoramento de humor e qualidade do sono, desenvolvida com Next.js e React.

## 🚀 Tecnologias

- **Next.js 15** - Framework React para produção
- **React 19** - Biblioteca JavaScript para interfaces
- **CSS Modules** - Estilização com escopo local
- **Fetch API** - Requisições HTTP para o backend

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend rodando em `http://localhost:5000`

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/F3rNnd4/moodsleep-front.git
cd moodsleep-front
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Execute o projeto:
```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 📱 Funcionalidades

### Página Inicial (Landing Page)
- Apresentação do projeto e seus benefícios
- Design acolhedor com elementos visuais (sol e lua)
- Botão para acessar a aplicação
- Links para Login e Sobre Mim

### Login (Sem Autenticação Real)
- Formulário visual de login
- Entrada direta no sistema sem validação
- Design clean e minimalista
- Redirecionamento direto para o Dashboard

### Dashboard (Home do Sistema)
- Formulário para criar novos registros diários
- Seleção visual de humor (5 opções com emojis)
- Registro de horas de sono
- Campo opcional para anotações (até 200 caracteres)
- Data personalizável
- Saudação dinâmica baseada no horário (Bom dia/Boa tarde/Boa noite)

### Meus Registros
- Listagem completa de todos os registros
- Sistema de filtros:
  - Por período (7, 30, 90 dias ou todos)
  - Por humor específico
  - Por quantidade de sono
- Ordenação por data (mais recente/mais antigo)
- Estatísticas visuais:
  - Humor médio da semana
  - Média de horas de sono
  - Total de dias registrados

### Detalhes do Registro
- Visualização completa de um registro específico
- Modo de edição inline
- Exclusão com confirmação
- Navegação facilitada

### Sobre Mim
- Informações sobre a desenvolvedora
- Contexto do projeto
- Links para contato (LinkedIn, GitHub)

## 🗂️ Estrutura do Projeto

```
moodsleep-front/
├── app/
│   ├── dashboard/
│   │   ├── page.jsx              # Tela principal - criar registros
│   │   └── dashboard.module.css
│   ├── login/
│   │   ├── page.jsx              # Tela de Login (sem autenticação real)
│   │   └── login.module.css
│   ├── meus-registros/
│   │   ├── page.jsx              # Listagem de registros
│   │   ├── meus-registros.module.css
│   │   └── [id]/
│   │       ├── page.jsx          # Detalhes/Editar/Deletar
│   │       └── detalhes.module.css
│   ├── sobre-mim/
│   │   ├── page.jsx              # Página sobre a desenvolvedora
│   │   └── sobre-mim.module.css
│   ├── components/
│   │   ├── Header/
│   │   ├── HeaderDashboard/
│   │   └── Footer/
│   ├── layout.jsx                # Layout global
│   ├── page.jsx                  # Página inicial
│   └── globals.css
├── lib/
│   └── api.js                    # Configuração de requisições à API
├── public/
│   ├── icons/                    # Icons do projeto
│   └── images/                   # Imagens do projeto
├── .env.local                    # Variáveis de ambiente (não versionado)
├── next.config.js
├── package.json
└── README.md
```

## 🎨 Paleta de Cores

```css
--roxo-principal: #AEA2FC
--roxo-escuro: #0a0118
--amarelo: #FFD700
--rosa-suave: #E57373
--lilas-claro: #B39DDB
```

## 📊 Fluxo de Navegação

```
Página Inicial
    ↓
Login (sem autenticação real)
    ↓
Dashboard (Criar registro)
    ↓
Meus Registros (Listar)
    ↓
Detalhes do Registro
    ├─→ Editar
    └─→ Deletar
```

## 🔌 Integração com Backend

A comunicação com o backend é feita através do arquivo `lib/api.js`:

```javascript
// Exemplo de uso
import { api } from '../../../lib/api';

// Buscar todos os registros
const response = await api.registers.getAll();
const data = await response.json();

// Criar novo registro
const response = await api.registers.create({
  date: new Date().toISOString(),
  moodLevel: 4,
  sleepHours: 7.5,
  notes: "Dia produtivo"
});
```

## 🎯 Níveis de Humor

| Valor | Emoji | Descrição |
|-------|-------|-----------|
| 1 | 😡 | Irritado |
| 2 | 😔 | Triste |
| 3 | 😐 | Neutro |
| 4 | 😊 | Feliz |
| 5 | 😍 | Muito feliz |

## 🎨 Design

O design foi criado no Figma e segue os princípios de:
- Clean Design
- Minimalismo
- Acessibilidade
- Paleta de cores harmoniosa (tons de roxo e amarelo)

[Link do Figma](https://www.figma.com/design/aALWtNXTPGyOBmbeLuEdM1/Mood-Sleep)

## ⚡ Performance

- Uso de CSS Modules para otimização de estilos
- Imagens otimizadas
- Lazy loading de componentes
- Requisições assíncronas eficientes

## 📝 Notas de Desenvolvimento

- Sistema desenvolvido sem autenticação conforme orientação pedagógica
- Foco em demonstrar operações CRUD completas
- Interface intuitiva e amigável
- Validações de formulário no client-side
- Feedback visual para todas as ações

## 👩‍💻 Autora

**Fernanda Alves Louro**
- Turma: 2TDS2
- Professor: Felipe Santos
- Instituição: SENAI
- GitHub: [@F3rNnd4](https://github.com/F3rNnd4)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com 💜 por Fernanda Alves Louro**
