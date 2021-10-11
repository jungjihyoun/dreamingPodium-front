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
export const DreamRoutine = ({
  style,
  onPress,
  routineIdx,
  routine,
  ...props
}) => {
  // const [isRoutineComplete, setIsRoutineComplete] = useState(false);
  // const successRoutine = () => {
  //   setIsRoutineComplete(!isRoutineComplete);
  // };

  return (
    <TouchableOpacity
      onPress={() => onPress(routineIdx)}
      style={styles.dreamNoteGroup}>
      <View style={styles.sectionContainer}>
        <View style={styles.checkbox}>
          <Image
            style={
              props.routineState
                ? {width: 20, height: 15}
                : [styles.unchecking, {width: 20, height: 15}]
            }
            source={images.check}
          />
        </View>

        <View>
          <Text style={styles.titleText}>루틴 체크</Text>
          <Text style={styles.subtitleText}>{routine}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    minHeight: height * 71,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dreamNoteGroup: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    // height: height * 71,
    borderStyle: 'solid',
    borderRadius: 4,
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
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightGrey,
    marginBottom: 3,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ABBABC',
  },
});
