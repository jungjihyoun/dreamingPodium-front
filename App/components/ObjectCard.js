/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {colors, images, width, height} from '../config/globalStyles';

function ObjectCard({multiple = true, ...props}) {
  const [showInputBox, setShowInputBox] = useState(false);

  const [text, setText] = useState('');

  const [showDelete, setShowDelete] = useState(false);

  const saveText = event => {
    setText(event);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      enabled>
      <ScrollView style={styles.boxContainer}>
        <View style={styles.addArea}>
          <Text style={styles.titleText}>{props.title}</Text>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setShowInputBox(true)}>
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={images.addButton}
            />
          </TouchableOpacity>
        </View>

        {showInputBox ? (
          <TextInput
            onChangeText={saveText}
            style={styles.inputHolder}
            placeholder="입력해주세요"
            clearTextOnFocus={true}
            autoFocus={true}
            onSubmitEditing={() => [
              props.handleAddText(text),
              setShowInputBox(false),
              setText(''),
            ]}
          />
        ) : (
          <></>
        )}

        {/* 작성된 리스트 UI */}

        {props.state ? (
          props.state.map((data, index, _source) => {
            return (
              <View style={styles.savedTextArea} key={index}>
                <Text style={styles.savedText}>{data}</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.deleteListButton(data, props.state);
                  }}
                  style={styles.deleteArea}>
                  <Image
                    style={styles.deleteButton}
                    source={images.closeButton}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text>empty</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    position: 'relative',
    paddingHorizontal: 8,
    marginVertical: 20,
    width: width * 341,
    minHeight: height * 100,
  },

  titleText: {
    fontSize: 18,
    color: colors.textGrey,
    fontWeight: 'bold',
  },
  savedTextArea: {
    borderBottomWidth: 2,
    borderBottomColor: colors.borderGrey,
    borderStyle: 'solid',
    marginVertical: 6,
    paddingLeft: 6,
    width: width * 320,
    height: 30,
  },
  savedText: {
    fontSize: 18,
    color: colors.textGrey,
    // marginBottom: 8,
  },

  addArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  deleteButton: {
    tintColor: colors.darkGrey,
  },

  handleAddText: {
    fontSize: 18,
    color: colors.lightGrey,
    fontWeight: 'bold',
  },

  inputHolder: {
    minHeight: height * 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
    marginVertical: 10,
  },
  deleteArea: {
    position: 'absolute',
    right: 0,
  },
});

export default ObjectCard;
