/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

// REDUX
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

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

  return (
    <>
      {title && (
        <Text style={style ? [styles.titleText, style] : styles.titleText}>
          {title}
        </Text>
      )}
      {subtitle && <Text style={styles.subTitle}>{subtitle}</Text>}
      <TouchableOpacity
        onPress={() => {
          dispatch(
            setModalVisible({disableYDrawer: idx === 'injury' ? false : true}),
          );
          dispatch(setModalInner({modalInner: idx}));
        }}
        style={styles.savedTextArea}>
        {filterConditionGroup(idx) ? (
          filterConditionGroup(idx).map((data, index) => {
            return (
              <Text style={styles.savedText} key={index}>
                {data}
              </Text>
            );
          })
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
