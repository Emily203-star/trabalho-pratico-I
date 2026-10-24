# OrganizaAí - Trabalho Prático I

Aplicativo móvel de gerenciamento de tarefas desenvolvido com React Native, Expo e TypeScript.

## Funcionalidades

- Cadastro de tarefas com título, descrição e prioridade;
- validação dos campos obrigatórios;
- listagem dinâmica com `FlatList`;
- marcação de tarefas como concluídas ou pendentes;
- exclusão de tarefas;
- contador de tarefas totais e concluídas;
- resumo com quantidades totais, em aberto e concluídas;
- filtros para visualizar todas, somente em aberto ou somente concluídas;
- layout responsivo para celulares, tablets e navegador;
- atualização automática da interface com `useState`.

Os dados ficam apenas na memória e são apagados quando o aplicativo é encerrado, conforme permitido no enunciado.

## Como executar

É necessário ter o Node.js instalado. No terminal, dentro da pasta do projeto, execute:

```bash
npm install
npm start
```

Depois, abra o projeto no Expo Go pelo QR Code ou pressione `w` para usar a versão web.

## Organização

```text
trabalho-pratico-i/
├── components/
│   ├── FormularioTarefa.tsx
│   └── ItemTarefa.tsx
├── types/
│   └── Tarefa.ts
├── App.tsx
├── app.json
├── index.ts
├── package.json
└── tsconfig.json
```

## Requisitos atendidos

| Requisito | Implementação |
| --- | --- |
| Título e identificação | Cabeçalho “OrganizaAí - Gerenciador pessoal de tarefas” |
| Três campos | Título, descrição e prioridade |
| Validação | Mensagem quando título ou descrição não são preenchidos |
| Estado local | Lista armazenada com `useState<Tarefa[]>` |
| Lista dinâmica | Componente `FlatList` |
| Alterar estado | Botões “Concluir” e “Reabrir” |
| Excluir registro | Botão “Excluir” |
| TypeScript | Tipos `Tarefa` e `Prioridade` |
| Dois componentes | `FormularioTarefa` e `ItemTarefa` |
| Props | Funções e dados enviados aos componentes filhos |
