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
            dispatch(setModalInner({modalInner: 'condition'}));
          }}
          style={styles.savedTextArea}>
          {filterConditionGroup(idx) ? savedTextUI(idx) : <></>}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
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
    color: colors.lightGrey,
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
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInputButton: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  paneUI: {
    width: 150,
    margin: 2,
    borderWidth: 2,
    borderColor: '#8ED7E1',
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DreamConditionCard;
