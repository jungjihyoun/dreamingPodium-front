/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Picker} from 'react-native';

import {colors, width, height} from '../config/globalStyles';

var PickerItem = Picker.Item;

const DreamPicker = props => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [selectedItem, setSelectItem] = useState(props.selectList[0]);
  const [selectList, setSelectList] = useState(props.selectList);

  return (
    <View>
      <Picker
        style={{width: width * 130}}
        lineColor="#000000"
        lineGradientColorFrom="#008000"
        lineGradientColorTo="#FF5733"
        selectedValue={selectedItem}
        itemStyle={{color: 'black', fontSize: 18, width: '100%'}}
        onValueChange={index => setSelectItem(index)}
        mode="dropdown">
        {selectList.map((value, i) => (
          <PickerItem label={value} value={value} key={i} />
        ))}
      </Picker>

      {/* <Text>{selectedItem}</Text> */}
    </View>
  );
};

export default DreamPicker;
