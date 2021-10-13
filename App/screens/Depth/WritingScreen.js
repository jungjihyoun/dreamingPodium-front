/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

// COMPONENT
import {SocialButton} from '../../components/SocialButton';

// REDUX
import {submitNote} from '../../reducer/postingSlice';

// CONFIG
import {colors, images, width, height} from '../../config/globalStyles';

function WritingScreen({navigation, route}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    avatar: '',
  });

  const showImage = () => {
    launchImageLibrary({mediaType: 'video'}, response => {
      alert(response.assets[0]);

      setState({
        avatar: response.assets[0].uri,
      });
    });
  };

  const [content, setContent] = useState('');

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{route.params.title}</Text>
      {/* 
      <Button title="add" onPress={() => showImage()} />

      <Image
        source={{uri: state.avatar}}
        resizeMode="cover"
        resizeMethod="scale"
        style={{width: 200, height: 200}}
      /> */}

      <ScrollView style={{height: '100%'}}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={route.params.placeholder}
            returnKeyType="next"
            onChange={event => {
              const {eventCount, target, text} = event.nativeEvent;
              setContent(text);
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              dispatch(
                submitNote({
                  date: todayDate,
                  noteIdx: route.params.noteIdx,
                  content: content,
                }),
              );
              navigation.navigate('TrainingNote', {
                content: content,
                noteTitle: route.params.title,
              });
            }}>
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
    marginBottom: 20,
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
