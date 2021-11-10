/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

// REDUX
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

// import DreamEmptyCondition from '../../components/conditioning/DreamEmptyCondition';

function DreamConditionCard({subtitle, title, content, style, idx, ...props}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  const filterConditionGroup = idx => {
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

  const savedTextUI = param => {
    if (param === 'injury') {
      return filterConditionGroup(param).map((data, index) => {
        return (
          <>
            <Text style={styles.savedText} key={index}>
              {data.injuryDirection}
              {data.injurySection}
              {data.injuryForm}
            </Text>
            <Text style={styles.savedText} key={index}>
              {data.painData}
              {data.interruptData}
              {data.injuryMemo}
            </Text>
          </>
        );
      });
    } else {
      return filterConditionGroup(param).map((data, index) => {
        return (
          <View style={styles.paneUI}>
            <Text style={styles.savedText} key={index}>
              {data}
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <>
      <View style={styles.section}>
        {title && (
          <Text style={style ? [styles.titleText, style] : styles.titleText}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subTitle}>오늘의 {subtitle} 컨디션은</Text>
        )}

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
          {filterConditionGroup(idx) ? (
            savedTextUI(idx)
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setModalVisible({
                    disableYDrawer: idx === 'injury' ? false : true,
                  }),
                );
                dispatch(setModalInner({modalInner: idx}));
              }}>
              <Text style={styles.textInputButton}>입력해 주세요</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    // flex: 1,
    backgroundColor: '#ffffff',
    height: height * 490,
    width: width * 310,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: colors.lightGrey,
  },
  savedTextArea: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: width * 300,
    marginVertical: 6,
  },
  savedText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInputButton: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  paneUI: {
    width: 130,
    margin: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    height: 36,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DreamConditionCard;
