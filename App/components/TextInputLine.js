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

function TextInputLine(props) {
  return (
    <>
      <View style={styles.inputArea}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputName}> {props.inputName} </Text>

          <TextInput
            onChangeText={props.onChangeText}
            style={styles.inputHolder}
            value={props.value}
            placeholder="입력해주세요"
            editable={true}
          />
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
    marginRight: 30,
  },
  inputName: {
    color: colors.darkGrey,
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
    borderColor: colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TextInputLine;
