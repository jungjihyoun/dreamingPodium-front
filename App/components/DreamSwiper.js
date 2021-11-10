import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('screen');

const DreamSwiper = props => {
  const [entries, setEntries] = useState(props.swiperItems);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(props.swiperItems);
  }, [props.swiperItems]);

  const renderItem = ({item, index}, parallaxProps) => {
    return <View style={styles.item}>{item}</View>;
  };
  return (
    <View style={[styles.container]}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={500}
        itemWidth={screenWidth - 90}
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
