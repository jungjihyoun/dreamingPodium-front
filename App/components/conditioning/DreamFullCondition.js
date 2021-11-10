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
          <Text style={styles.savedText} key={index}>
            {data}
          </Text>
        );
      });
    }
  };

  return (
    <>
      <View
        style={{
          borderRadius: 10,
          flex: 1,
          backgroundColor: '#ffffff',
          height: height * 450,
          width: width * 300,
          flexDirection: 'column',
          alignSelf: 'center',
        }}>
        {title && (
          <Text style={style ? [styles.titleText, style] : styles.titleText}>
            {title}
          </Text>
        )}
        {subtitle && <Text style={styles.subTitle}>{subtitle}</Text>}

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
    marginVertical: 6,
    paddingLeft: 6,
    marginLeft: 10,
  },
  savedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
  },
  textInputButton: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DreamConditionCard;
