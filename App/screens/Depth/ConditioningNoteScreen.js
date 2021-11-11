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
import DreamCalendar from '../../components/DreamCalendar';
import DreamConditionCard from '../../components/conditioning/DreamConditionCard';
import DreamModal from '../../components/DreamModal';
import DreamConditionSelect from '../../components/conditioning/DreamConditionSelect';
import DreamInjurySelect from '../../components/conditioning/DreamInjurySelect';
import DreamInjuryCard from '../../components/conditioning/DreamFullInjury';

// REDUX

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

function ConditioningNoteScreen(props) {
  const [selectTab, setSelectTab] = useState('condition');
  const modalInner = useSelector(state => state.modal.modalInner);

  const modalInnerScreen = () => {
    switch (modalInner) {
      case 'condition':
        return <DreamConditionSelect title="컨디션" idx="condition" />;

      case 'injury':
        return <DreamInjurySelect title="부상" idx="injury" />;
      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <DreamCalendar />
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
            <DreamConditionCard idx="mind" />
          </View>
        ) : (
          <>
            <View
              ref={elem => (this.injuryComponent = elem)}
              style={{
                minHeight: height * 500,
                height: '100%',
                flex: 1,
              }}>
              <DreamConditionCard title="부상" idx="injury" />
            </View>
          </>
        )}
      </View>

      <DreamModal>{modalInnerScreen()}</DreamModal>
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
  selectText: {fontSize: 16, fontWeight: 'bold', color: colors.darkGrey},
  selectedText: {fontSize: 16, fontWeight: 'bold', color: '#000000'},
});

export default ConditioningNoteScreen;
