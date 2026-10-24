import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Prioridade } from '../types/Tarefa';

type FormularioTarefaProps = {
  onAdicionar: (
    titulo: string,
    descricao: string,
    prioridade: Prioridade
  ) => void;
};

const prioridades: Prioridade[] = ['Baixa', 'Média', 'Alta'];

export function FormularioTarefa({ onAdicionar }: FormularioTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState<Prioridade>('Média');
  const [erro, setErro] = useState('');

  function cadastrarTarefa() {
    if (!titulo.trim() || !descricao.trim()) {
      setErro('Preencha o título e a descrição da tarefa.');
      return;
    }

    onAdicionar(titulo.trim(), descricao.trim(), prioridade);
    setTitulo('');
    setDescricao('');
    setPrioridade('Média');
    setErro('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloSecao}>Nova tarefa</Text>

      <Text style={styles.rotulo}>Título</Text>
      <TextInput
        style={styles.campo}
        placeholder="Ex.: Estudar React Native"
        placeholderTextColor="#94A3B8"
        value={titulo}
        onChangeText={(texto) => {
          setTitulo(texto);
          setErro('');
        }}
      />

      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={[styles.campo, styles.campoDescricao]}
        placeholder="Descreva o que precisa ser feito"
        placeholderTextColor="#94A3B8"
        multiline
        textAlignVertical="top"
        value={descricao}
        onChangeText={(texto) => {
          setDescricao(texto);
          setErro('');
        }}
      />

      <Text style={styles.rotulo}>Prioridade</Text>
      <View style={styles.prioridades}>
        {prioridades.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityState={{ selected: prioridade === item }}
            onPress={() => setPrioridade(item)}
            style={[
              styles.botaoPrioridade,
              prioridade === item && styles.botaoPrioridadeSelecionado,
            ]}
          >
            <Text
              style={[
                styles.textoPrioridade,
                prioridade === item && styles.textoPrioridadeSelecionado,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Pressable
        accessibilityRole="button"
        onPress={cadastrarTarefa}
        style={({ pressed }) => [styles.botaoCadastrar, pressed && styles.pressionado]}
      >
        <Text style={styles.textoCadastrar}>Adicionar tarefa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  tituloSecao: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  rotulo: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  campo: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 10,
    borderWidth: 1,
    color: '#0F172A',
    fontSize: 15,
    marginBottom: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  campoDescricao: {
    minHeight: 76,
  },
  prioridades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  botaoPrioridade: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    borderRadius: 9,
    borderWidth: 1,
    flex: 1,
    minWidth: 78,
    paddingVertical: 10,
  },
  botaoPrioridadeSelecionado: {
    backgroundColor: '#E0E7FF',
    borderColor: '#4F46E5',
  },
  textoPrioridade: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  textoPrioridadeSelecionado: {
    color: '#4338CA',
  },
  erro: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 10,
  },
  botaoCadastrar: {
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 11,
    marginTop: 16,
    paddingVertical: 13,
  },
  textoCadastrar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressionado: {
    opacity: 0.8,
  },
});
