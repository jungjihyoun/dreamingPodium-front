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

  return (
    <>
      <View style={styles.inputArea}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputName}> {props.inputName} </Text>
          {inputType === 'date' ? (
            date === new Date() ? (
              <>
                <Button title="선택" onPress={() => setOpen(true)} />
              </>
            ) : (
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>{dateKo(date)}</Text>
              </TouchableOpacity>
            )
          ) : (
            <TextInput
              onChangeText={props.onChangeText}
              style={styles.inputHolder}
              value={props.value}
              placeholder="입력해주세요"
              editable={true}
            />
          )}

          {/* DatePicker */}
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

export default ProfileInputLine;
