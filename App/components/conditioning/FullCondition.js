/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

// REDUX
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

// import EmptyCard from '../../components/conditioning/EmptyCard';

function FullCondition({subtitle, title, content, style, idx, ...props}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  const filterConditionGroup = () => {
    const conditionGroup = writtenNote.noteContentGroup.conditioning[idx];
    if (conditionGroup.length !== 0) {
      return conditionGroup;
    } else {
      return [];
    }
  };

  const savedTextUI = param => {
    if (filterConditionGroup() !== []) {
      return filterConditionGroup().map((data, index) => {
        return (
          <View style={styles.paneUI}>
            <Text style={styles.savedText} key={index}>
              {data}
            </Text>
          </View>
        );
      });
    } else {
      return <></>;
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
            dispatch(setModalInner({modalInner: 'condition'}));
          }}
          style={styles.savedTextArea}>
          {filterConditionGroup(idx).length > 0 ? (
            savedTextUI(idx)
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setModalVisible({
                    disableYDrawer: idx === 'injury' ? false : true,
                  }),
                );
                dispatch(setModalInner({modalInner: 'condition'}));
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
    backgroundColor: colors.white,
    width: '90%',
    minHeight: 200,
    alignSelf: 'center',
    marginTop: 20,
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
    color: colors.darkGrey,
  },
  savedTextArea: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 6,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: width * 15,
  },
  savedText: {
    color: colors.textGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInputButton: {
    color: colors.lightGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  paneUI: {
    width: 150,
    margin: 2,
    backgroundColor: colors.lightBlue,
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullCondition;
