export type Prioridade = 'Baixa' | 'Média' | 'Alta';

export type Tarefa = {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  concluida: boolean;
};
