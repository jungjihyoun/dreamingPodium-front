/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import {colors, images, width, height} from '../config/globalStyles';

function DreamObjectCard({multiple = true, ...props}) {
  const [showInputBox, setShowInputBox] = useState(false);

  const [text, setText] = useState('');
  const saveText = event => {
    setText(event);
  };

  return (
    <View>
      <View style={styles.boxContainer}>
        <View>
          <View style={styles.addArea}>
            <Text style={styles.titleText}>{props.title}</Text>
            <TouchableOpacity onPress={() => setShowInputBox(true)}>
              <Image source={images.addButton} />
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
          <View>
            {props.state ? (
              props.state.map((data, index, _source) => {
                return (
                  <View style={styles.savedTextArea} key={index}>
                    <Text style={styles.savedText}>{data}</Text>

                    <TouchableOpacity
                      onPress={() => {
                        props.deleteListButton(data, props.state);
                      }}
                      style={styles.deleteButton}>
                      <Image
                        style={styles.closeButton}
                        source={images.closeButton}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text>empty</Text>
            )}
          </View>
        </View>
      </View>
    </View>
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedTextArea: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    borderStyle: 'solid',
    marginVertical: 6,
    paddingLeft: 6,
  },
  savedText: {
    fontSize: 14,
    marginBottom: 8,
  },

  addArea: {
    flexDirection: 'row',
    marginRight: 23,
    width: '100%',
  },

  closeButton: {
    width: 22,
    height: 22,
  },

  handleAddText: {
    fontSize: 18,
    color: colors.darkGrey,
    fontWeight: 'bold',
  },

  inputHolder: {
    minHeight: height * 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    marginVertical: 10,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
  },
});

export default DreamObjectCard;
