import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  sendNotification,
  listenNotifications,
} from './src/helper/notificationsHelper';

export default function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = listenNotifications((notification) => {
      Alert.alert(notification.title, notification.body);
      setNotifications((old) => [notification, ...old]);
    });

    return unsubscribe;
  }, []);

  async function handleSend() {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const success = await sendNotification(title, body);

    if (success) {
      setTitle('');
      setBody('');
      Alert.alert('Sucesso', 'Aviso enviado!');
    } else {
      Alert.alert('Erro', 'Não foi possível enviar.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Avisos em Tempo Real</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Mensagem</Text>
      <TextInput
        style={[styles.input, styles.message]}
        placeholder="Digite a mensagem"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <Button title="Enviar aviso" onPress={handleSend} />

      <Text style={styles.subheading}>Avisos recebidos</Text>

      {notifications.map((item) => (
        <View key={item.id} style={styles.notice}>
          <Text style={styles.noticeTitle}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 65,
    backgroundColor: '#f2f4f8',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#243b53',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccd5df',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  message: {
    height: 100,
    textAlignVertical: 'top',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  notice: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  noticeTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
  },
});