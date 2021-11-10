import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import DreamEmptyCondition from './conditioning/DreamEmptyCondition';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {colors, width, height} from '../config/globalStyles';

const ENTRIES1 = [
  <DreamEmptyCondition title="컨디션" idx="mind" />,
  <DreamEmptyCondition title="컨디션" idx="mind" />,
];
const {width: screenWidth} = Dimensions.get('screen');

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(props.swiperItems);
  }, [props.swiperItems]);

  const renderItem = ({item, index}, parallaxProps) => {
    return <View>{item}</View>;
  };

  return (
    <View style={[styles.container]}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={500}
        itemWidth={screenWidth - 90}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
