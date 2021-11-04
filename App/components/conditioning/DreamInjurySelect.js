/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

// COMPONENT
import DreamSliderGroup from './DreamSliderGroup';
import DreamPicker from '../DreamPicker';

// REDUX
import {checkRoutine, submitCondition} from '../../reducer/postingSlice';

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

const DreamInjurySelect = props => {
  const dispatch = useDispatch();
  const todayDate = useSelector(state => state.posting.todayDate);
  const [pain, setPain] = useState(5);
  const [interruption, setInterruption] = useState(5);
  // const [submitList, setSubmitList] = useState([
  //   {
  //     idx: '부상방향',
  //     content: '왼쪽',
  //   },
  //   {
  //     idx: '부상부위',
  //     content: '어깨',
  //   },
  //   {
  //     idx: '부상형태',
  //     content: '연골부상1',
  //   },
  //   {
  //     idx: '통증정도',
  //     content: 5,
  //   },
  //   {
  //     idx: '운동방해정도',
  //     content: 5,
  //   },
  //   {
  //     idx: '메모',
  //     content: '테슷흐',
  //   },
  // ]);

  // drawer 리스트 UI
  const drawerUI = title => {
    let selectList = [];
    if (title === '부상방향') {
      selectList = ['왼쪽', '오른쪽'];
    } else if (title === '부상부위') {
      selectList = ['어깨', '허리', '골반', '엉덩이', '무릎', '발목'];
    } else if (title === '부상형태') {
      selectList = [
        '연골부상1',
        '연골부상2',
        '연골부상3',
        '연골부상4',
        '연골부상5',
        '연골부상6',
      ];
    }
    return (
      <View style={styles.drawerGroup}>
        <Text style={styles.drawerTitle}>{title}</Text>
        <View
          style={
            Platform.OS === 'ios' ? styles.drawerIos : styles.drawerAndroid
          }>
          <DreamPicker selectList={selectList} />
        </View>
      </View>
    );
  };

  // ############ 화면 UI ################
  return (
    <KeyboardAvoidingView
      style={{
        width: '100%',
      }}
      keyboardVerticalOffset={height * 230}
      behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
      enabled>
      <ScrollView
        style={{
          height: '100%',
        }}>
        <View
          style={
            Platform.OS === 'ios'
              ? [styles.drawerSection, {height: height * 200}]
              : [styles.drawerSection, {height: height * 140}]
          }>
          {drawerUI('부상방향')}
          {drawerUI('부상부위')}
          {drawerUI('부상형태')}
        </View>

        <View style={styles.sliderSection}>
          <View style={styles.sliderGroup}>
            <Text style={styles.sliderTitle}>통증정도</Text>
            <DreamSliderGroup sliderData={pain} setSliderData={setPain} />
          </View>

          <View style={styles.sliderGroup}>
            <Text style={styles.sliderTitle}>운동방해정도</Text>
            <DreamSliderGroup
              sliderData={interruption}
              setSliderData={setInterruption}
            />
          </View>
        </View>

        <View style={styles.memoSection}>
          <Text style={styles.sliderTitle}>메모</Text>
          <TextInput
            size={10}
            scrollEnabled={false}
            multiline={true}
            style={styles.inputHolder}
            placeholder="내용을 입력해주세요"
          />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text
            style={{
              fontSize: 14,
              color: colors.white,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            완료
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    width: '100%',
    flexDirection: 'row',
  },
  sliderSection: {
    width: '100%',
    height: height * 180,
    marginTop: height * 20,
    marginLeft: width * 5,
  },
  memoSection: {
    width: '100%',
    marginTop: height * 20,
    marginLeft: width * 5,
  },
  drawerGroup: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  drawerTitle: {
    backgroundColor: '#ffffff',
    zIndex: 9,
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    position: 'absolute',
    top: height * 45,
    left: width * 10,
  },

  drawerAndroid: {
    position: 'absolute',
    top: height * 70,
  },

  sliderGroup: {
    height: height * 100,
  },
  sliderTitle: {
    backgroundColor: '#ffffff',
    zIndex: 9,
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    paddingLeft: width * 5,
  },
  inputHolder: {
    marginLeft: width * 5,
    marginRight: width * 20,
    marginTop: height * 12,
    lineHeight: 24,
    fontSize: 16,
    color: colors.darkGrey,
  },
  submitButton: {
    borderRadius: 6,
    width: 90,
    height: 24,
    backgroundColor: colors.primary,
    marginTop: 10,
    marginBottom: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default DreamInjurySelect;
