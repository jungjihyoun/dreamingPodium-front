/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// COMPONENT
import DreamCalendar from '../../components/DreamCalendar';
import DreamConditionCard from '../../components/conditioning/DreamConditionCard';
import DreamModal from '../../components/DreamModal';
import DreamConditionSelect from '../../components/conditioning/DreamConditionSelect';
import DreamInjurySelect from '../../components/conditioning/DreamInjurySelect';

// REDUX

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

function ConditioningNoteScreen(props) {
  const [selectTab, setSelectTab] = useState('condition');

  const modalInnerScreen = () => {
    switch (modalInner) {
      case 'mind':
        return <DreamConditionSelect title="심리" idx="mind" />;
      case 'physical':
        return <DreamConditionSelect title="신체" idx="physical" />;
      case 'injury':
        return <DreamInjurySelect title="부상" idx="injury" />;
      default:
        break;
    }
  };

  const modalInner = useSelector(state => state.modal.modalInner);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <DreamCalendar />
      <View style={styles.selectTabGroup}>
        <TouchableOpacity
          style={
            selectTab === 'condition'
              ? [styles.selectTab, {backgroundColor: '#E6E6E6'}]
              : styles.selectTab
          }
          onPress={() => setSelectTab('condition')}>
          <Text
            style={
              selectTab === 'condition'
                ? [styles.selectedText]
                : styles.selectText
            }>
            컨디션
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectTab === 'injury'
              ? [{backgroundColor: '#E6E6E6'}, styles.selectTab]
              : styles.selectTab
          }
          onPress={() => setSelectTab('injury')}>
          <Text
            style={
              selectTab === 'injury' ? [styles.selectedText] : styles.selectText
            }>
            부상
          </Text>
        </TouchableOpacity>
      </View>

      {selectTab === 'condition' ? (
        <ScrollView style={styles.boxContainer}>
          <DreamConditionCard subtitle="심리적" idx="mind" />
          <DreamConditionCard subtitle="신체적" idx="physical" />
        </ScrollView>
      ) : (
        <ScrollView style={styles.boxContainer}>
          <DreamConditionCard idx="injury" />
        </ScrollView>
      )}

      <DreamModal>{modalInnerScreen()}</DreamModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    width: '100%',
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
