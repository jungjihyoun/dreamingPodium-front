/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

// COMPONENT
import DreamSliderGroup from './DreamSliderGroup';
import DreamPicker from '../DreamPicker';

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

const DreamInjurySelect = () => {
  const [pain, setPain] = useState(5);
  const [interruption, setInterruption] = useState(5);

  // drawer 리스트 UI
  const drawerUI = title => {
    let selectList = [];
    if (title === '부상방향') {
      selectList = ['왼쪽', '오른쪽'];
    } else if (title === '부상부위') {
      selectList = ['어깨', '허리', '골반', '엉덩이', '무릎', '발목'];
    } else {
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
      keyboardVerticalOffset={height * 230}
      style={{
        width: '100%',
      }}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      enabled>
      <ScrollView
        style={{
          minHeight: '100%',
        }}>
        <View style={styles.drawerSection}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    width: '100%',
    height: height * 200,
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
});

export default DreamInjurySelect;
