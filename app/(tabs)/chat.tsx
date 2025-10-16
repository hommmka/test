import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useRef } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const textInputRef = useRef(null);

  // Функция для отправки сообщения и закрытия клавиатуры
  const handleSend = () => {
    Keyboard.dismiss(); // Закрываем клавиатуру
    // Здесь можно добавить логику отправки сообщения
  };

  // Закрытие клавиатуры при касании вне инпута
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Используем padding для обеих платформ
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Подстройка для Android
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.messagesContainer} />

          <View style={styles.inputContainer}>
            <TextInput
              ref={textInputRef}
              placeholder="Введите сообщение..."
              style={styles.textInput}
              returnKeyType="send"
              onSubmitEditing={handleSend} // Отправка по нажатию "Enter"
            />
            <TouchableOpacity
              onPress={handleSend} // Обработчик для кнопки отправки
              activeOpacity={0.7}
              style={styles.sendButton}
            >
              <FontAwesome5 name="telegram-plane" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
});
