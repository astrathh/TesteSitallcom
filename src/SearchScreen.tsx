import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

// URLs da API
const API_BASE_URL = 'https://openlibrary.org';
const SEARCH_URL = `${API_BASE_URL}/search.json`;
const SUBJECTS_URL = `${API_BASE_URL}/subjects`;

const BookSearchScreen: React.FC = () => {
  const [searchType, setSearchType] = useState<string>(''); // Tipo de busca
  const [searchTerm, setSearchTerm] = useState<string>(''); // Termo de busca
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carregamento
  const [books, setBooks] = useState<any[]>([]); // Lista de livros
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Visibilidade do modal

  // Função para realizar a busca
  const handleSearch = async () => {
    if (!searchType) {
      Alert.alert('Selecione um tipo de busca.');
      return;
    }
    if (!searchTerm) {
      Alert.alert('Digite um termo para busca.');
      return;
    }
    setLoading(true); // Inicia o carregamento
    let url = ''; // URL da requisição
    switch (searchType) {
      case 'author':
        url = `${SEARCH_URL}?author=${searchTerm}`; // Busca por autor
        break;
      case 'genre':
        url = `${SUBJECTS_URL}/${searchTerm.toLowerCase()}.json`; // Busca por gênero
        break;
      case 'title':
        url = `${SEARCH_URL}?title=${searchTerm}`; // Busca por título
        break;
      default:
        setLoading(false);
        Alert.alert('Selecione um tipo de busca.');
        return;
    }

    try {
      const response = await fetch(url); // Faz a requisição
      const data = await response.json(); // Converte para JSON
      const booksData = searchType === 'genre' ? data.works : data.docs; // Seleciona os dados de livros
      setBooks(booksData); // Atualiza o estado dos livros
    } catch (error) {
      Alert.alert('Erro ao buscar livros. Tente novamente.');
    }
    setLoading(false); // Finaliza o carregamento
  };

  // Função para renderizar cada item da lista de livros
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      {item.author_name && <Text style={styles.bookAuthor}>Autor: {item.author_name.join(', ')}</Text>}
      {item.subject && <Text style={styles.bookSubject}>Gênero: {item.subject.join(', ')}</Text>}
      {item.first_publish_year && <Text style={styles.bookYear}>Ano de publicação: {item.first_publish_year}</Text>}
    </View>
  );

  // Função para abrir o modal de seleção de tipo de busca
  const openModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal de seleção de tipo de busca
  const closeModal = () => {
    setModalVisible(false);
  };

  // Função para selecionar o tipo de busca
  const selectSearchType = (type: string) => {
    setSearchType(type);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Buscar Livros</Text>
      
      <TouchableOpacity style={styles.dropdownButton} onPress={openModal}>
        <Text style={styles.dropdownButtonText}>
          {searchType ? `Buscar por: ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}` : 'Selecione o tipo de busca'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Digite o termo de busca..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#FF4081" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.key || index.toString()}
          style={styles.resultList}
        />
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione o tipo de busca</Text>
              <TouchableOpacity style={styles.modalOption} onPress={() => selectSearchType('author')}>
                <Text style={styles.modalOptionText}>Autor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => selectSearchType('genre')}>
                <Text style={styles.modalOptionText}>Gênero</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => selectSearchType('title')}>
                <Text style={styles.modalOptionText}>Título</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FF4081',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdownButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '50%',
    alignSelf: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  resultList: {
    marginTop: 16,
  },
  bookItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    marginTop: 4,
    fontSize: 16,
    color: '#555',
  },
  bookSubject: {
    marginTop: 4,
    fontSize: 16,
    color: '#555',
  },
  bookYear: {
    marginTop: 4,
    fontSize: 16,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    width: '100%',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#FF4081',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BookSearchScreen;
