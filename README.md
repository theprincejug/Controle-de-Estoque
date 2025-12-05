# Controle de Estoque

Sistema moderno de controle de estoque desenvolvido com React, TypeScript, Tailwind CSS e React Router DOM.

## Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento para aplicações React
- **Context API** - Gerenciamento de estado nativo do React
- **Vite** - Build tool moderna e rápida

## Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── pages/          # Componentes de página
│   ├── DashboardPage.tsx
│   └── InventoryPage.tsx
├── context/        # Gerenciamento de estado
│   └── InventoryContext.tsx
├── types/          # Definições TypeScript
│   └── Product.ts
├── App.tsx         # Componente principal com rotas
├── index.tsx       # Ponto de entrada
└── index.css       # Estilos globais com Tailwind
```

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter

## Funcionalidades

- ✅ Dashboard com estatísticas do estoque
- ✅ Gerenciamento de produtos (adicionar, visualizar)
- ✅ Sidebar de navegação
- ✅ Interface moderna e responsiva
- ✅ Tipagem completa com TypeScript

