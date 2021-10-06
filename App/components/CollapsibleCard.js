import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {width, height, colors, images} from '../config/globalStyles';
import CollapsibleTitle from './CollapsibleTitle';
import CollapsibleContent from './CollapsibleContent';

const CollapsibleCard = ({style, onPress, ...props}) => {
  const [state, setState] = useState({activeSections: []});

  const titleArea = (section, index, isActive, sections) => (
    <CollapsibleTitle
      section={section}
      index={index}
      isActive={isActive}
      sections={sections}
      noteInfo={props.noteInfo}
    />
  );

  const contentArea = (section, index, isActive, sections) => {
    return (
      <CollapsibleContent
        section={section}
        index={index}
        isActive={isActive}
        sections={sections}
        noteInfo={props.noteInfo}
      />
    );
  };

  const updateSections = activeSections => {
    setState({activeSections});
  };

  return (
    <Accordion
      sections={props.noteInfo}
      containerStyle={styles.accordionStyle}
      underlayColor="#f0f0f0"
      activeSections={state.activeSections}
      renderHeader={titleArea}
      renderContent={contentArea}
      onChange={updateSections}
    />
  );
};

const styles = StyleSheet.create({
  accordionStyle: {backgroundColor: '#f0f0f0'},

  boxContainer: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    height: height * 71,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 2.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // android
    elevation: 3,
  },
});

export default CollapsibleCard;
