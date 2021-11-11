import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {width, height} from '../config/globalStyles';

const {width: screenWidth} = Dimensions.get('window');

const DreamSwiper = props => {
  const [entries, setEntries] = useState([props.swiperItems]);
  const carouselRef = useRef(null);

  useEffect(() => {
    console.log('짠');
    setEntries(props.swiperItems);
  }, [props.swiperItems]);

  const renderItem = ({item, index}, parallaxProps) => {
    return <View style={styles.item}>{item}</View>;
  };
  return (
    <View style={[styles.container]}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={450}
        itemWidth={screenWidth - 100}
        data={entries}
        renderItem={renderItem}
        parallaxFactor={0.1}
      />
    </View>
  );
};

export default DreamSwiper;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    alignSelf: 'center',
  },
});
