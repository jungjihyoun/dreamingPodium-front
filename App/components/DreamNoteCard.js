import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
} from 'react-native';
//custom imports
import {width, height, colors, images} from '../config/globalStyles';

// TODO : 이미지를 벡터 아이콘으로 변경하기
export const DreamNoteCard = ({
  style,
  onPress,
  isRoutineComplete = undefined,
  hasWriting,
  ...props
}) => {
  const [isRoutine, setIsRoutine] = useState(isRoutineComplete);
  const successRoutine = () => {
    setIsRoutine(!isRoutine);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        isRoutine !== undefined ? successRoutine() : onPress;
      }}
      style={styles.dreamNoteGroup}>
      {props.hasWriting || isRoutine ? (
        <View style={styles.checkbox}>
          <Image style={{width: 20, height: 15}} source={images.check} />
        </View>
      ) : (
        <View style={styles.checkbox}>
          <Image
            style={[styles.unchecking, {width: 20, height: 15}]}
            source={images.check}
          />
        </View>
      )}
      <View>
        <Text style={styles.partTitle}>{props.NoteTitle}</Text>
        <Text style={styles.partSubtitle}>{props.NoteSubtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dreamNoteGroup: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    height: height * 71,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 2.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // android
    elevation: 3,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: colors.primary,
    width: 34,
    height: 34,
    padding: 23,
    marginRight: 23,
  },
  unchecking: {
    tintColor: colors.darkGrey,
    opacity: 0.5,
  },
  partTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightGrey,
    marginBottom: 3,
  },
  partSubtitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ABBABC',
  },
});
