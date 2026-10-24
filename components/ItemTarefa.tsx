import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Prioridade, Tarefa } from '../types/Tarefa';

type ItemTarefaProps = {
  tarefa: Tarefa;
  onAlternar: (id: string) => void;
  onExcluir: (id: string) => void;
};

const corPrioridade: Record<Prioridade, string> = {
  Baixa: '#16A34A',
  Média: '#D97706',
  Alta: '#DC2626',
};

export function ItemTarefa({ tarefa, onAlternar, onExcluir }: ItemTarefaProps) {
  return (
    <View style={[styles.container, tarefa.concluida && styles.concluida]}>
      <View style={styles.cabecalho}>
        <Text style={[styles.titulo, tarefa.concluida && styles.textoConcluido]}>
          {tarefa.titulo}
        </Text>
        <View
          style={[
            styles.selo,
            { backgroundColor: `${corPrioridade[tarefa.prioridade]}18` },
          ]}
        >
          <Text style={[styles.textoSelo, { color: corPrioridade[tarefa.prioridade] }]}>
            {tarefa.prioridade}
          </Text>
        </View>
      </View>

      <Text style={[styles.descricao, tarefa.concluida && styles.textoConcluido]}>
        {tarefa.descricao}
      </Text>

      <View style={styles.acoes}>
        <Pressable
          accessibilityRole="button"
          onPress={() => onAlternar(tarefa.id)}
          style={[
            styles.botao,
            tarefa.concluida ? styles.botaoReabrir : styles.botaoConcluir,
          ]}
        >
          <Text style={tarefa.concluida ? styles.textoReabrir : styles.textoConcluir}>
            {tarefa.concluida ? 'Reabrir' : 'Concluir'}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => onExcluir(tarefa.id)}
          style={[styles.botao, styles.botaoExcluir]}
        >
          <Text style={styles.textoExcluir}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  concluida: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  cabecalho: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  titulo: {
    color: '#0F172A',
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    minWidth: 170,
  },
  selo: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textoSelo: {
    fontSize: 12,
    fontWeight: '700',
  },
  descricao: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  textoConcluido: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  acoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  botao: {
    alignItems: 'center',
    borderRadius: 9,
    flex: 1,
    minWidth: 110,
    paddingVertical: 9,
  },
  botaoConcluir: {
    backgroundColor: '#DCFCE7',
  },
  botaoReabrir: {
    backgroundColor: '#E0E7FF',
  },
  botaoExcluir: {
    backgroundColor: '#FEE2E2',
  },
  textoConcluir: {
    color: '#15803D',
    fontWeight: '700',
  },
  textoReabrir: {
    color: '#4338CA',
    fontWeight: '700',
  },
  textoExcluir: {
    color: '#B91C1C',
    fontWeight: '700',
  },
});
