/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// COMPONENT
import {SocialButton} from '../../components/SocialButton';

// REDUX
import {submitNote} from '../../reducer/postingSlice';

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

import API from '../../utils/note';

function WritingScreen({navigation, route}) {
  const userToken = useSelector(state => state.user.userToken);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();
  const [content, setContent] = useState(
    route.params.value ? route.params.value : null,
  );
  const [pictures, setPictures] = useState([]);

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'asc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        if (pictures && pictures.length > 0) {
          const totalLength = pictures.length + images.length;
          if (totalLength > 5) {
            return Alert.alert('알림', '최대 다섯개까지 가능합니다.');
          } else {
            const inputImage = images.map((v, i) => {
              return {
                uri: v.path,
                type: v.mime,
                name: 'image.jpeg',
              };
            });
            const list = [...pictures, ...inputImage];
            if (list.length <= 5) {
              setPictures(list);
            } else {
              const length = list.length - 5;
              list.splice(5, length);
              setPictures(list);
            }
          }
        } else {
          if (images.length > 5) {
            const maxImage = [];
            images.map((v, i) => {
              if (i < 5) {
                return maxImage.push(v);
              }
            });
            setPictures(
              maxImage.map((v, i) => {
                console.log('receive image', v);
                return {
                  uri: v.path,
                  type: v.mime,
                  name: 'image.jpeg',
                };
              }),
            );
          } else {
            console.log(images);
            setPictures(
              images.map((v, i) => {
                console.log('receive image', v);
                return {
                  uri: v.path,
                  type: v.mime,
                  name: 'image.jpeg',
                };
              }),
            );
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  var formData = new FormData();
  const uploadImageData = pictures.filter(value => value.name === 'image.jpeg');
  uploadImageData.forEach((v, i) => {
    formData.append('files', v);
  });

  const goToNext = async () => {
    if (!content) {
      Alert.alert('라잇', '내용을 입력해 주세요 ✍️', [{text: '확인'}]);
    } else {
      dispatch(
        submitNote({
          date: todayDate,
          noteIdx: route.params.noteIdx,
          content: content,
          image: pictures,
        }),
      );

      // // 글 작성 post
      await API.postRecord(userToken, todayDate, route.params.noteIdx, content);

      // 사진 post
      await API.postImage(userToken, route.params.noteIdx, todayDate, formData);

      navigation.navigate('TrainingNote', {
        content: content,
        noteTitle: route.params.title,
      });
    }
  };

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: 'white'}}>
      <Text style={styles.title}>{route.params.title}</Text>

      <ScrollView style={{height: '100%'}}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={
              route.params.placeholder
                ? route.params.placeholder
                : route.params.value
            }
            value={content}
            returnKeyType="next"
            onChange={event => {
              const {eventCount, target, text} = event.nativeEvent;
              setContent(text);
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          {(route.params.noteIdx === 'success' ||
            route.params.noteIdx === 'failure') && (
            <TouchableOpacity
              style={{...styles.submitButton, marginRight: 10}}
              onPress={() => pickMultiple()}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                사진첨부
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              goToNext();
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
    color: colors.darkGrey,
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
    height: 24,
    backgroundColor: colors.primary,
    fontSize: 8,
    justifyContent: 'center',
  },
});

export default WritingScreen;
