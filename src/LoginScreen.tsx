import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usuarioError, setUsuarioError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateLogin = () => {
    let valid = true;

    if (!usuario) {
      setUsuarioError('Este campo é obrigatório');
      valid = false;
    } else {
      setUsuarioError(null);
    }

    if (!password) {
      setPasswordError('Este campo é obrigatório');
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (valid) {
      if (usuario === 'admin' && password === 'admin123') {
        onLoginSuccess();
      } else {
        Alert.alert('Usuário ou senha inválidos');
      }
    }
  };

  const handleBlur = (field: 'usuario' | 'password') => {
    if (field === 'usuario' && !usuario) {
      setUsuarioError('Este campo é obrigatório');
    } else {
      setUsuarioError(null);
    }

    if (field === 'password' && !password) {
      setPasswordError('Este campo é obrigatório');
    } else {
      setPasswordError(null);
    }
  };

  const handleFocus = (field: 'usuario' | 'password') => {
    if (field === 'usuario') {
      setUsuarioError(null);
    }

    if (field === 'password') {
      setPasswordError(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Login Sitallcom</Text>
      </View>

      <Text style={styles.welcomeText}>Bem vindo</Text>

      <TextInput
        style={[styles.input, usuarioError ? styles.inputError : null]}
        placeholder="Usuário"
        placeholderTextColor="#999"
        value={usuario}
        onChangeText={text => {
          setUsuario(text);
          if (text) setUsuarioError(null);
        }}
        onBlur={() => handleBlur('usuario')}
        onFocus={() => handleFocus('usuario')}
      />
      {usuarioError && <Text style={styles.errorText}>{usuarioError}</Text>}

      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (text) setPasswordError(null);
        }}
        onBlur={() => handleBlur('password')}
        onFocus={() => handleFocus('password')}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.checkboxContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.optionText}>Lembrar de mim</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.optionText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={validateLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF4081',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
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
  inputError: {
    borderColor: '#FF4081',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
  },
  optionText: {
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#FF4081',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
    width: '50%',
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4081',
    fontSize: 14,
    marginBottom: 16,
    marginLeft: 10,
  },
});

export default LoginScreen;
