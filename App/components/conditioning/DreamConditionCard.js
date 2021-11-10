/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

// REDUX
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

import DreamEmptyCondition from '../../components/conditioning/DreamEmptyCondition';
import DreamFullCondition from '../../components/conditioning/DreamFullCondition';
import DreamSwiper from '../../components/DreamSwiper';

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

  const conditionUI = () => {
    let physical = '';
    let mind = '';
    filterConditionGroup('mind')
      ? (mind = <DreamFullCondition title="심리" subtitle="심리" idx="mind" />)
      : (mind = <DreamEmptyCondition title="심리" idx="mind" />);

    filterConditionGroup('physical')
      ? (physical = (
          <DreamFullCondition title="신체" subtitle="신체" idx="physical" />
        ))
      : (physical = <DreamEmptyCondition title="신체" idx="physical" />);

    return <DreamSwiper swiperItems={[mind, physical]} />;
  };

  return (
    <>
      {idx === 'injury' ? (
        filterConditionGroup(idx) ? (
          <DreamSwiper
            swiperItems={[
              <DreamFullCondition title="부상" subtitle="부상" idx="injury" />,
            ]}
          />
        ) : (
          <DreamSwiper
            swiperItems={[<DreamEmptyCondition title="부상" idx="injury" />]}
          />
        )
      ) : (
        conditionUI()
      )}
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
    // height: 40,
    // fontSize: 16,
    // borderWidth: 1.5,
    // borderStyle: 'solid',
    // borderColor: '#d2d2d2',
    // borderRadius: 20,
    // padding: 10,
    // marginRight: 4,
    // // marginTop: 10,
    // overflow: 'hidden',
    // backgroundColor: colors.primary,
    // color: colors.white,
  },
  textInputButton: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DreamConditionCard;
