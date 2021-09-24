import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

function HomeScreen(props) {
  return (
    <SafeAreaView>
      <View>
        <Text>Home screen</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('WritingTraining')}>
          <Text>트레이닝 작성하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
