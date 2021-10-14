import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {StyleSheet} from 'react-native';

import {width, height, colors, images} from '../config/globalStyles';
import CollapsibleTitle from './CollapsibleTitle';
import CollapsibleContent from './CollapsibleContent';

const CollapsibleCard = ({style, onPress, ...props}) => {
  const [expanded, setExpanded] = useState(false);
  const todayDate = useSelector(state => state.posting.todayDate);

  useEffect(() => {
    setExpanded(false);
  }, [todayDate]);

  const titleArea = () => (
    <CollapsibleTitle
      content={props.content}
      title={props.title}
      subtitle={props.subtitle}
      placeholder={props.placeholder}
      noteIdx={props.noteIdx}
    />
  );

  const contentArea = () => {
    return <CollapsibleContent content={props.content} />;
  };

  return (
    <>
      <Collapse
        isExpanded={expanded}
        onToggle={isExpanded => {
          setExpanded(isExpanded);
        }}>
        <CollapseHeader>{titleArea()}</CollapseHeader>
        <CollapseBody>{contentArea()}</CollapseBody>
      </Collapse>
    </>
  );
};

const styles = StyleSheet.create({
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
