/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

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

  return (
    <>
      {filterConditionGroup(idx) && (
        <>
          <InjurySVG injury={data.injurySection} />

          <View style={styles.section}>
            <TouchableOpacity style={styles.savedTextArea}>
              <Text style={styles.title}>
                {data.injuryDirection} {data.injurySection}
              </Text>

              <View style={styles.degreeGroup}>
                <Text style={styles.degreeTitle}>통증정도</Text>
                <Text style={styles.degreeNumber}>{data.painData}</Text>
              </View>

              <View style={styles.degreeGroup}>
                <Text style={styles.degreeTitle}>운동방해정도</Text>
                <Text style={styles.degreeNumber}>{data.interruptData}</Text>
              </View>

              <ScrollView style={{width: 270, marginTop: 20, marginBottom: 30}}>
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
                style={{
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                  backgroundColor: colors.primary,
                  height: height * 40,
                  width: width * 310,
                }}>
                <Text>부상 삭제</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.lightGrey,
    marginTop: 15,
    marginBottom: 15,
  },
  degreeGroup: {
    flexDirection: 'row',
  },
  degreeTitle: {
    fontSize: 16,
  },
  degreeNumber: {
    fontSize: 16,
  },
  memoSection: {},
  memoContent: {
    fontSize: 14,
    color: colors.lightGrey,
  },
});

export default FullInjury;
