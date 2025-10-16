import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaProvider style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderTopWidth: 1,
            borderTopColor: '#e6e6e6',
            padding: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="Введите сообщение..."
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 20,
              backgroundColor: '#f2f2f2',
              marginRight: 8,
            }}
            returnKeyType="send"
          />

          <TouchableOpacity
            onPress={() => {
            }}
            activeOpacity={0.7}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#ffffffff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome5 name="telegram-plane" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
