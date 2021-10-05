import React from 'react';
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

function DreamTextInputLine(props) {
  return (
    <>
      <View style={styles.inputArea}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputName}> {props.inputName} </Text>
          {props.value ? (
            <TextInput
              onChangeText={props.onChangeText}
              style={styles.inputHolder}
              placeholder="입력해주세요"
              value={props.value}
              editable={false}
            />
          ) : (
            <TextInput
              onChangeText={props.onChangeText}
              style={styles.inputHolder}
              placeholder="입력해주세요"
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    alignItems: 'center',
    height: height * 68,
  },
  inputHolder: {
    // width: width * 200,
    marginRight: 30,
  },
  inputName: {
    color: colors.lightGrey,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  inputGroup: {
    // paddingBottom: 10,
    // paddingTop: 30,
    width: width * 325,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.lightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DreamTextInputLine;
