import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {StyleSheet} from 'react-native';

import {width, height, colors, images} from '../../config/globalStyles';
import CollapsibleTitle from './CollapsibleTitle';
import CollapsibleContent from './CollapsibleContent';

const DreamCollapsibleCard = ({style, onPress, ...props}) => {
  const [expanded, setExpanded] = useState(false);
  const todayDate = useSelector(state => state.posting.todayDate);

  useEffect(() => {
    setExpanded(false);
  }, [todayDate]);

  const titleArea = () => (
    <CollapsibleTitle
      content={props.content}
      image={props.image}
      title={props.title}
      subtitle={props.subtitle}
      placeholder={props.placeholder}
      noteIdx={props.noteIdx}
      isActive={expanded}
    />
  );

  const contentArea = () => {
    return (
      <CollapsibleContent
        content={props.content}
        image={props.image}
        isActive={expanded}
        noteIdx={props.noteIdx}
      />
    );
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

export default DreamCollapsibleCard;
