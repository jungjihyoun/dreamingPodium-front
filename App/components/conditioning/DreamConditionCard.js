/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

// REDUX
import {setModalVisible, setModalInner} from '../../reducer/modalSlice';

import DreamEmptyCondition from '../../components/conditioning/DreamEmptyCondition';
import DreamFullCondition from '../../components/conditioning/DreamFullCondition';
import DreamSwiper from '../../components/DreamSwiper';
import DreamFullInjury from './DreamFullInjury';

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

  const injurySwiperItems = () => {
    return filterConditionGroup(idx).map((data, index) => {
      return <DreamFullInjury title="부상" idx="injury" data={data} />;
    });
  };

  return (
    <>
      {idx === 'injury' ? (
        filterConditionGroup(idx) ? (
          <>
            <TouchableOpacity
              style={styles.injuryPlusButton}
              onPress={() => {
                dispatch(
                  setModalVisible({
                    disableYDrawer: 'injury',
                  }),
                );
                dispatch(setModalInner({modalInner: idx}));
              }}>
              <Text style={{color: 'white'}}>부상 추가하기</Text>
            </TouchableOpacity>
            <DreamSwiper swiperItems={injurySwiperItems()} />
          </>
        ) : (
          <DreamSwiper
            swiperItems={[<DreamEmptyCondition title="부상" idx="injury" />]}
          />
        )
      ) : filterConditionGroup(idx) ? (
        <ScrollView style={{flex: 1}}>
          <DreamFullCondition subtitle="신체" idx="physical" />
          <DreamFullCondition subtitle="심리" idx="mind" />
        </ScrollView>
      ) : (
        <DreamEmptyCondition title="컨디션" idx="condition" />
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
    color: colors.darkGrey,
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
    color: colors.lightGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  injuryPlusButton: {
    alignSelf: 'flex-end',
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primary,
    margin: 20,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default DreamConditionCard;
