/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';

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
      <ScrollView style={styles.boxContainer}>
        <DreamConditionCard title="컨디션" subtitle="심리적" idx="mind" />
        <DreamConditionCard subtitle="신체적" idx="physical" />
        <DreamConditionCard title="부상" style={{marginTop: 70}} idx="injury" />
      </ScrollView>

      <DreamModal>{modalInnerScreen()}</DreamModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    paddingHorizontal: 24,
    marginVertical: 20,
    width: width * 341,
    minHeight: height * 120,
  },
});

export default ConditioningNoteScreen;
