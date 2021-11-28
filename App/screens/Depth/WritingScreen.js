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
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// COMPONENT
import {SocialButton} from '../../components/SocialButton';

// REDUX
import {submitNote, deleteImage} from '../../reducer/postingSlice';

// CONFIG
import {colors, width, height, fonts} from '../../config/globalStyles';

import API from '../../utils/note';

function WritingScreen({navigation, route}) {
  const userToken = useSelector(state => state.user.userToken);
  const todayDate = useSelector(state => state.posting.todayDate);
  const NoteList = useSelector(
    state => state.posting.writtenNote.noteContentGroup.training,
  );
  const dispatch = useDispatch();
  const [content, setContent] = useState(
    route.params.value ? route.params.value : null,
  );
  const [pictures, setPictures] = useState([]);
  const [choosePicture, setChoosePicture] = useState(false);

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
          const inputImage = images.map((v, i) => {
            return {
              uri: v.path,
              type: v.mime,
              name: 'image.jpeg',
            };
          });
          const list = [...pictures, ...inputImage];
          setPictures(list);
          setChoosePicture(true);
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
            setChoosePicture(true);
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
            setChoosePicture(true);
          }
        }
        return Alert.alert('라잇', '사진 첨부가 완료되었습니다');
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

  const handleDeleteImage = imageURI => {
    Alert.alert('라잇', '사진을 삭제 하시겠습니까 ? ', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => {
          console.log('OK Pressed', imageURI);

          dispatch(
            deleteImage({
              noteIdx: route.params.noteIdx,
              imageURI: imageURI,
            }),
          );

          Alert.alert('라잇', '사진 삭제가 완료되었습니다', [{text: '확인'}]);
          // dispatch(
          //   submitNote({
          //     date: todayDate,
          //     noteIdx: route.params.noteIdx,
          //     content: content,
          //     image: pictures.map(data => {
          //       return data.uri;
          //     }),
          //   }),
          // );
          // // 글 작성 post
          // await API.postRecord(
          //   userToken,
          //   todayDate,
          //   route.params.noteIdx,
          //   content,
          // );
          // // 사진 post
          // if (choosePicture) {
          //   await API.postImage(
          //     userToken,
          //     route.params.noteIdx,
          //     todayDate,
          //     formData,
          //   );
          // }
        },
      },
    ]);
  };

  const goToNext = async () => {
    if (!content) {
      Alert.alert('라잇', '내용을 입력해 주세요 ✍️', [{text: '확인'}]);
    } else {
      // 글 상태 관리
      dispatch(
        submitNote({
          date: todayDate,
          noteIdx: route.params.noteIdx,
          content: content,
          image: pictures.map(data => {
            return data.uri;
          }),
        }),
      );
      // // 글 작성 post
      await API.postRecord(userToken, todayDate, route.params.noteIdx, content);
      // 사진 post
      if (choosePicture) {
        await API.postImage(
          userToken,
          route.params.noteIdx,
          todayDate,
          formData,
        );
      }
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

        {route.params.noteIdx !== 'feedback' &&
          route.params.noteIdx !== 'train_detail' &&
          NoteList[route.params.noteIdx].image && (
            <View
              style={{
                flexDirection: 'row',
                // width: width * 300,
                // overflow: 'visible',
                // height: '100%',
              }}>
              {NoteList[route.params.noteIdx].image.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteImage(data);
                    }}>
                    <Image
                      key={data}
                      source={{uri: data}}
                      resizeMode="cover"
                      resizeMethod="auto"
                      style={styles.imageList}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
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
    fontFamily: fonts.spoqaLight,
    width: width * 343,
    fontSize: 15,
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
    fontFamily: fonts.spoqaRegular,
    marginTop: 10,
    borderRadius: 8,
    width: 62,
    height: 24,
    backgroundColor: colors.primary,
    fontSize: 8,
    justifyContent: 'center',
  },
  imageList: {width: width * 70, height: height * 100},
});

export default WritingScreen;
