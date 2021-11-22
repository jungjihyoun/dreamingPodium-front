/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// COMPONENT
import AppCalendar from '../../components/AppCalendar';
import ConditionCard from '../../components/conditioning/ConditionCard';
import AppModal from '../../components/AppModal';
import ConditionSelect from '../../components/conditioning/ConditionSelect';
import DreamInjurySelect from '../../components/conditioning/DreamInjurySelect';
import DreamInjuryCard from '../../components/conditioning/FullInjury';

// REDUX

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

function ConditioningNoteScreen(props) {
  const [selectTab, setSelectTab] = useState('condition');
  const modalInner = useSelector(state => state.modal.modalInner);

  const modalInnerScreen = () => {
    switch (modalInner) {
      case 'condition':
        return <ConditionSelect title="컨디션" idx="condition" />;

      case 'injury':
        return <DreamInjurySelect title="부상" idx="injury" />;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white}}>
      <AppCalendar />
      <View style={styles.selectTabGroup}>
        <TouchableOpacity
          style={
            selectTab === 'condition'
              ? [styles.selectTab, {backgroundColor: '#E6E6E6'}]
              : styles.selectTab
          }
          onPress={() => {
            setSelectTab('condition');
          }}>
          <Text
            style={
              selectTab === 'condition'
                ? [styles.selectedText]
                : styles.selectText
            }>
            컨디션리포트
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectTab === 'injury'
              ? [{backgroundColor: '#E6E6E6'}, styles.selectTab]
              : styles.selectTab
          }
          onPress={() => {
            setSelectTab('injury');
          }}>
          <Text
            style={
              selectTab === 'injury' ? [styles.selectedText] : styles.selectText
            }>
            부상리포트
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        {selectTab === 'condition' ? (
          <View
            style={{minHeight: height * 500}}
            ref={elem => (this.conditionComponent = elem)}>
            <ConditionCard idx="mind" />
          </View>
        ) : (
          <>
            {/* 부상일때 */}
            <View
              ref={elem => (this.injuryComponent = elem)}
              style={{
                minHeight: height * 500,
                height: '100%',
                flex: 1,
              }}>
              <ConditionCard title="부상" idx="injury" />
            </View>
          </>
        )}
      </View>

      <AppModal>{modalInnerScreen()}</AppModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    // paddingHorizontal: 24,
    // paddingTop: 30,
    width: '100%',
    height: '100%',
    minHeight: height * 120,
    backgroundColor: '#E6E6E6',
    paddingTop: 30,
  },
  selectTabGroup: {
    flexDirection: 'row',
  },
  selectTab: {
    marginRight: 1,
    marginLeft: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width * 100,
    height: height * 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6E6E6',
  },
  selectText: {fontSize: 16, fontWeight: 'bold', color: colors.lightGrey},
  selectedText: {fontSize: 16, fontWeight: 'bold', color: '#000000'},
});

export default ConditioningNoteScreen;
