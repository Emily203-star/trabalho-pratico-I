import { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { FormularioTarefa } from './components/FormularioTarefa';
import { ItemTarefa } from './components/ItemTarefa';
import { Prioridade, Tarefa } from './types/Tarefa';

type Filtro = 'Todas' | 'Em aberto' | 'Concluídas';

const filtros: Filtro[] = ['Todas', 'Em aberto', 'Concluídas'];

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<Filtro>('Todas');
  const { width } = useWindowDimensions();
  const telaPequena = width < 420;

  function adicionarTarefa(
    titulo: string,
    descricao: string,
    prioridade: Prioridade
  ) {
    const novaTarefa: Tarefa = {
      id: `${Date.now()}-${Math.random()}`,
      titulo,
      descricao,
      prioridade,
      concluida: false,
    };

    setTarefas((listaAtual) => [novaTarefa, ...listaAtual]);
  }

  function alternarSituacao(id: string) {
    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function excluirTarefa(id: string) {
    setTarefas((listaAtual) =>
      listaAtual.filter((tarefa) => tarefa.id !== id)
    );
  }

  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const emAberto = tarefas.length - concluidas;
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === 'Em aberto') return !tarefa.concluida;
    if (filtro === 'Concluídas') return tarefa.concluida;
    return true;
  });

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor="#312E81" />
      <View style={styles.cabecalho}>
        <View style={styles.larguraConteudo}>
          <Text
            style={[
              styles.nomeAplicativo,
              telaPequena && styles.nomeAplicativoPequeno,
            ]}
          >
            OrganizaAí
          </Text>
          <Text style={styles.subtitulo}>Gerenciador pessoal de tarefas</Text>
        </View>
      </View>

      <FlatList
        style={styles.lista}
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemTarefa
            tarefa={item}
            onAlternar={alternarSituacao}
            onExcluir={excluirTarefa}
          />
        )}
        contentContainerStyle={[
          styles.conteudo,
          telaPequena && styles.conteudoPequeno,
        ]}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <FormularioTarefa onAdicionar={adicionarTarefa} />
            <View style={styles.resumo}>
              <Text style={styles.tituloLista}>Resumo</Text>
              <View style={styles.contadores}>
                <View style={styles.cartaoContador}>
                  <Text style={styles.numeroTotal}>{tarefas.length}</Text>
                  <Text style={styles.rotuloContador}>Total</Text>
                </View>
                <View style={styles.cartaoContador}>
                  <Text style={styles.numeroAberto}>{emAberto}</Text>
                  <Text style={styles.rotuloContador}>Em aberto</Text>
                </View>
                <View style={styles.cartaoContador}>
                  <Text style={styles.numeroConcluido}>{concluidas}</Text>
                  <Text style={styles.rotuloContador}>Concluídas</Text>
                </View>
              </View>
            </View>

            <Text style={styles.tituloLista}>Minhas tarefas</Text>
            <Text style={styles.rotuloFiltro}>Filtrar por</Text>
            <View style={styles.filtros}>
              {filtros.map((item) => (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityState={{ selected: filtro === item }}
                  onPress={() => setFiltro(item)}
                  style={[
                    styles.botaoFiltro,
                    filtro === item && styles.botaoFiltroAtivo,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoFiltro,
                      filtro === item && styles.textoFiltroAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.iconeVazio}>✓</Text>
            <Text style={styles.tituloVazio}>
              {tarefas.length === 0
                ? 'Nenhuma tarefa cadastrada'
                : 'Nenhuma tarefa neste filtro'}
            </Text>
            <Text style={styles.textoVazio}>
              {tarefas.length === 0
                ? 'Use o formulário acima para adicionar a primeira.'
                : 'Escolha outro filtro para visualizar suas tarefas.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    backgroundColor: '#EEF2FF',
    flex: 1,
  },
  cabecalho: {
    backgroundColor: '#312E81',
  },
  larguraConteudo: {
    alignSelf: 'center',
    maxWidth: 640,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 18,
    width: '100%',
  },
  nomeAplicativo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  nomeAplicativoPequeno: {
    fontSize: 25,
  },
  subtitulo: {
    color: '#C7D2FE',
    fontSize: 14,
    marginTop: 3,
  },
  conteudo: {
    padding: 18,
    paddingBottom: 36,
  },
  conteudoPequeno: {
    paddingHorizontal: 12,
    paddingTop: 14,
  },
  lista: {
    alignSelf: 'center',
    maxWidth: 640,
    width: '100%',
  },
  resumo: {
    marginBottom: 20,
  },
  tituloLista: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
  },
  contadores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  cartaoContador: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    minWidth: 82,
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  numeroTotal: {
    color: '#4338CA',
    fontSize: 22,
    fontWeight: '800',
  },
  numeroAberto: {
    color: '#D97706',
    fontSize: 22,
    fontWeight: '800',
  },
  numeroConcluido: {
    color: '#15803D',
    fontSize: 22,
    fontWeight: '800',
  },
  rotuloContador: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  rotuloFiltro: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 10,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  botaoFiltro: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    minWidth: 82,
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  textoFiltro: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
  },
  textoFiltroAtivo: {
    color: '#FFFFFF',
  },
  listaVazia: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: 28,
  },
  iconeVazio: {
    color: '#4F46E5',
    fontSize: 28,
    fontWeight: '800',
  },
  tituloVazio: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  textoVazio: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});
