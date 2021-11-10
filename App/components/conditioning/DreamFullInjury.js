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
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

function DreamFullInjury({
  subtitle,
  title,
  content,
  style,
  idx,
  data,
  ...props
}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  const filterConditionGroup = () => {
    var [_conditionGroup] = writtenNote.filter(data => {
      return data.date === todayDate;
    });

    if (_conditionGroup !== [] && _conditionGroup !== undefined) {
      [_conditionGroup] = _conditionGroup.conditionGroup.filter(data => {
        return data.conditionIdx === idx;
      });
      if (_conditionGroup.content.length === 0) {
        return false;
      }

      return _conditionGroup.content;
    }
  };

  return (
    <>
      {filterConditionGroup(idx) && (
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                setModalVisible({
                  disableYDrawer: idx === 'injury' ? false : true,
                }),
              );
              dispatch(setModalInner({modalInner: idx}));
            }}
            style={styles.savedTextArea}>
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
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#ffffff',
    minHeight: 300,
    height: '100%',
    width: width * 310,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  savedTextArea: {
    flexDirection: 'column',
    height: '100%',
    width: width * 300,
    marginVertical: 6,
    margin: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGrey,
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
    color: colors.darkGrey,
  },
});

export default DreamFullInjury;
