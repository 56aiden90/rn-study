import React, { useMemo, useRef, useCallback } from 'react';

import { ScrollView, View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

const App = () => {
  const PRODUCT_LIST = useMemo(() => {
    return [
      { "id": "1002", "author": "NASA", "width": 4312, "height": 2868, "url": "https://unsplash.com/photos/6-jTZysYY_U", "download_url": "https://picsum.photos/id/1002/4312/2868" },
      { "id": "1003", "author": "E+N Photographies", "width": 1181, "height": 1772, "url": "https://unsplash.com/photos/GYumuBnTqKc", "download_url": "https://picsum.photos/id/1003/1181/1772" },
      { "id": "1004", "author": "Greg Rakozy", "width": 5616, "height": 3744, "url": "https://unsplash.com/photos/SSxIGsySh8o", "download_url": "https://picsum.photos/id/1004/5616/3744" },
      { "id": "1005", "author": "Matthew Wiebe", "width": 5760, "height": 3840, "url": "https://unsplash.com/photos/tBtuxtLvAZs", "download_url": "https://picsum.photos/id/1005/5760/3840" },
      { "id": "1006", "author": "Vladimir Kudinov", "width": 3000, "height": 2000, "url": "https://unsplash.com/photos/-wWRHIUklxM", "download_url": "https://picsum.photos/id/1006/3000/2000" },
      { "id": "1008", "author": "Benjamin Combs", "width": 5616, "height": 3744, "url": "https://unsplash.com/photos/5L4XAgMSno0", "download_url": "https://picsum.photos/id/1008/5616/3744" }]
  }, []);

  // const _scrollX = useRef(new Animated.Value(0)).current;
  const _scrollX = useRef(new Animated.Value(0)).current;

  const _renderItem = useCallback((el, idx) => {
    const inputRange = [
      // (idx - 2) * width,
      (idx - 1) * width,
      (idx) * width,
      (idx + 1) * width
    ];

    const outputScale = _scrollX.interpolate({
      inputRange,
      outputRange: [
        0.4, 1, 0.4
      ]
    });

    const outputOpacity = _scrollX.interpolate({
      inputRange,
      outputRange: [
        0.2, 1, 0.2
      ]
    });

    const imageStyle = {
      transform: [{ scale: outputScale }],
      opacity: outputOpacity
    }

    return <View key={el.id} style={[styles.container, styles.item]}>
      <Animated.Image style={[styles.image, imageStyle]} source={{ uri: el.download_url }}></Animated.Image>
      <Text style={styles.text}>{el.id}</Text>
      <Text style={styles.text}>{el.author}</Text>
    </View>
  }, [PRODUCT_LIST]);

  return (
    <View
      style={styles.container}
    >
      <Animated.ScrollView
        pagingEnabled={true} // the scroll view stops on multiples of the scroll view's size when scrolling.
        contentContainerStyle={styles.scrollView}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {PRODUCT_LIST.map((el, idx) => _renderItem(el, idx))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  item: {
    height,
    width
  },
  image: {
    width,
    height: 300
  },
  text: {
    color: "#000"
  },
  scrollView: {

  }
})

export default App;