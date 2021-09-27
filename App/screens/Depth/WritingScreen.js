import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {colors, images, width, height} from '../../config/globalStyles';

import {SocialButton} from '../../components/SocialButton';

function WritingScreen({navigation}) {
  const textEx =
    '코치님이 하신 모든 말씀과 , 조언을 바탕으로 내가 무엇을 해야 하는 지들을 작성해주세요. 기록을 통해 또 한번 기억하면 내일은 더 잘할 수 있을 거에요.';
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>훈련 중 코치님이 어떤 조언을 해주셨나요?</Text>

      <ScrollView style={{height: '100%'}}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={textEx}
            returnKeyType="next"
          />
        </View>

        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity style={styles.submitButton}>
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 12,
              }}>
              작성완료
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightGrey,
  },
  input: {
    width: width * 343,
    fontSize: 13,
    lineHeight: 25,
    padding: 13,
  },
  inputBox: {
    minHeight: height * 210,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: colors.primary,
    fontSize: 13,
    lineHeight: 25,
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 8,
    width: 62,
    height: 18,
    backgroundColor: colors.primary,
    fontSize: 8,
    justifyContent: 'center',
  },
});

export default WritingScreen;
