import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';

import {colors, images, width, height} from '../config/globalStyles';
import DatePicker from 'react-native-date-picker';

function ProfileInputLine({inputType, onConfirm, ...props}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const zero = num => (num < 10 && num >= 0 ? '0' + num : num);
  const dateKo = date =>
    `${date.getFullYear()}년 ${zero(date.getMonth() + 1)}월 ${zero(
      date.getDate(),
    )}일`;

  const inputUI = () => {
    // 성별
    if (inputType === 'gender') {
      return (
        <View style={styles.selectGender}>
          <TouchableOpacity
            style={styles.genderButton}
            onPress={() => {
              props.onChangeGender('female');
            }}>
            <Text
              style={
                props.value === 'female'
                  ? styles.genderSelected
                  : styles.genderText
              }>
              여자
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderButton}
            onPress={() => {
              props.onChangeGender('male');
            }}>
            <Text
              style={
                props.value === 'male'
                  ? styles.genderSelected
                  : styles.genderText
              }>
              남자
            </Text>
          </TouchableOpacity>
        </View>
      );
      // 날짜
    } else if (inputType === 'date') {
      return props.value === new Date().toDateString() ? (
        <Button title="선택" onPress={() => setOpen(true)} />
      ) : (
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{...styles.inputHolder, width: width * 150}}>
            {dateKo(new Date(props.value))}
          </Text>
        </TouchableOpacity>
      );
      // 택스트 인풋
    } else {
      return (
        <TextInput
          onChangeText={props.onChangeText}
          style={styles.inputHolder}
          value={props.value}
          placeholder="입력해주세요"
          editable={true}
        />
      );
    }
  };

  return (
    <>
      <View style={styles.inputArea}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputName}> {props.inputName} </Text>

          {inputUI()}

          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              onConfirm(date.toDateString());
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
    fontSize: 18,
    width: width * 100,
    textAlign: 'right',
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
    height: height * 30,
    borderBottomWidth: 1.5,
    borderStyle: 'solid',
    borderColor: colors.whiteGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectGender: {
    flexDirection: 'row',
    textAlign: 'right',
  },
  genderButton: {
    marginRight: 10,
    width: 40,
  },
  genderText: {
    fontSize: 18,
    textAlign: 'right',
    color: colors.darkGrey,
  },
  genderSelected: {
    fontSize: 18,
    textAlign: 'right',
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default ProfileInputLine;
