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

const DreamAccordion = ({
  style,
  onPress,
  isRoutineComplete = undefined,
  hasWriting,
  ...props
}) => {
  const [isRoutine, setIsRoutine] = useState(isRoutineComplete);
  const successRoutine = () => {
    setIsRoutine(!isRoutine);
  };
  const [state, setState] = useState({activeSections: []});

  const titleArea = (section, index, isActive, sections) => {
    return (
      <View style={isActive ? styles.boxContainerActive : styles.boxContainer}>
        <View style={styles.checkbox}>
          <Image
            style={
              props.hasWriting || isRoutine
                ? {width: 20, height: 15}
                : [styles.unchecking, {width: 20, height: 15}]
            }
            source={images.check}
          />
        </View>

        <View>
          <Text style={styles.titleText}>{section.noteTite}</Text>
          <Text style={styles.subtitleText}>{section.noteSubtitle}</Text>
        </View>

        {!isActive && (
          <View style={styles.dropButton}>
            <Image
              style={
                props.isOpened
                  ? {width: 18, height: 18}
                  : {width: 18, height: 18}
              }
              source={images.dropButton}
            />
          </View>
        )}
      </View>
    );
  };

  const contentArea = (section, index, isActive, sections) => {
    return (
      <View
        style={
          isActive ? [styles.content, styles.contentActive] : styles.content
        }>
        <Text multiline={true}>{section.content}</Text>

        {isActive && (
          <View style={styles.dropButton}>
            <Image
              style={
                props.isOpened
                  ? {width: 18, height: 18}
                  : {width: 18, height: 18}
              }
              source={images.upButton}
            />
          </View>
        )}
      </View>
    );
  };

  const updateSections = activeSections => {
    setState({activeSections});
  };

  return (
    <Accordion
      containerStyle={styles.accordionStyle}
      underlayColor="#f0f0f0"
      sections={props.noteInfo}
      activeSections={state.activeSections}
      renderHeader={titleArea}
      renderContent={contentArea}
      onChange={updateSections}
    />
  );
};

const styles = StyleSheet.create({
  accordionStyle: {backgroundColor: '#f0f0f0'},

  content: {
    padding: 10,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    width: width * 341,
    height: '100%',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  contentActive: {
    borderBottomWidth: 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: '#ffffff',
  },

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
  boxContainerActive: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    height: height * 71,
    borderStyle: 'solid',
    borderColor: '#ffffff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#ffffff',
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: colors.primary,
    width: 34,
    height: 34,
    padding: 23,
    marginRight: 23,
  },
  dropButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  unchecking: {
    tintColor: colors.darkGrey,
    opacity: 0.5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightGrey,
    marginBottom: 3,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ABBABC',
  },
});

export default DreamAccordion;
