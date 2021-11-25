/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';
import AppXBar from './AppXBar';
// REDUX
import {deleteInjury} from '../../reducer/postingSlice';
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

import InjurySVG from '../InjurySVG';

function FullInjury({subtitle, title, content, style, idx, data, ...props}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  const filterConditionGroup = idx => {
    const conditionGroup = writtenNote.noteContentGroup.conditioning[idx];
    return conditionGroup;
  };

  const uri = '';

  return (
    <>
      {filterConditionGroup(idx) && (
        <>
          <InjurySVG injury={data.injurySection} />

          <View style={styles.section}>
            <TouchableOpacity style={styles.savedTextArea}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{width: 50, height: 50}}
                  source={{
                    uri: encodeURI(
                      `https://wright-images.s3.ap-northeast-2.amazonaws.com/front_injury/${data.injurySection.normalize()}.png`,
                    ),
                  }}
                />
                <Text style={styles.title}>
                  {data.injuryDirection} {encodeURI('머리')} {data.injuryForm}
                </Text>
              </View>

              <View style={styles.degreeGroup}>
                <Text style={styles.degreeTitle}>통증정도</Text>
                <AppXBar amount={data.painData} />
                <Text style={styles.degreeNumber}>{data.painData}</Text>
              </View>

              <View style={styles.degreeGroup}>
                <Text style={styles.degreeTitle}>운동방해정도</Text>
                <AppXBar amount={data.interruptData} />
                <Text style={styles.degreeNumber}>{data.interruptData}</Text>
              </View>

              <ScrollView style={styles.scrollMemo}>
                <TouchableWithoutFeedback style={styles.memoSection}>
                  <Text style={styles.memoContent}>{data.injuryMemo}</Text>
                </TouchableWithoutFeedback>
              </ScrollView>

              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    deleteInjury({
                      todayDate: todayDate,
                      injuryDirection: data.injuryDirection,
                      injurySection: data.injurySection,
                      injuryForm: data.injuryForm,
                      injuryMemo: data.injuryMemo,
                      interruptData: data.interruptData,
                      painData: data.painData,
                    }),
                  );
                }}
                style={styles.deleteButton}>
                <Text style={{fontSize: 16, color: colors.white}}>
                  부상 삭제
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  graphColors: {
    backgroundColor: colors.primary,
    height: height * 13,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  graphFull: {
    backgroundColor: colors.primary,
    height: height * 13,
    borderRadius: 7,
  },
  graph: {
    width: width * 170,
    height: height * 15,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#E3E3E3',
    backgroundColor: '#E3E3E3',
  },
  section: {
    position: 'absolute',
    bottom: height * 30,
    borderRadius: 10,
    backgroundColor: colors.white,
    minHeight: 230,
    width: width * 310,
    alignSelf: 'center',
  },

  savedTextArea: {
    flexDirection: 'column',
    height: '100%',
    width: width * 300,
    marginVertical: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textGrey,
    marginTop: 15,
    marginBottom: 15,
  },
  degreeGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  degreeTitle: {
    fontSize: 16,
    color: colors.lightGrey,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  degreeNumber: {
    position: 'absolute',
    right: width * 2,
    fontSize: 16,
    color: colors.lightGrey,
    fontWeight: 'bold',
  },
  scrollMemo: {
    width: 270,
    height: height * 28,
    marginTop: 20,
    marginBottom: 30,
  },
  memoContent: {
    fontSize: 14,
    color: colors.textGrey,
    fontWeight: '600',
    marginLeft: width * 10,
  },
  deleteButton: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: colors.primary,
    height: height * 40,
    width: width * 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullInjury;
