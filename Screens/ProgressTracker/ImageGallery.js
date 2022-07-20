import { View, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import ImageCarousel, { SLIDER_WIDTH, ITEM_WIDTH } from '../../components/ProgressionTracker/ImageCarousel'
import Icon from 'react-native-vector-icons/Entypo'
import store from "../../redux/store"

function ImageGallery (props) {
  const isCarousel = React.useRef(null)
  const data = store.getState()

  return (
      <View style = {styles.container}>
        <View style = {styles.header}>
          <TouchableOpacity style = {styles.backButton} onPress ={() => props.toggleScreen()}>
            <Icon name="chevron-small-left" size={40} color="#fff"/>
          </TouchableOpacity>
          <Text style = {styles.heading}>Progression Gallery</Text>
        </View>
        <View style = {styles.carousel}>
          <Carousel
            layout="stack"
            layoutCardOffset={20}
            ref={isCarousel}
            data={data}
            renderItem={ImageCarousel}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    backgroundColor: "#f00",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    color: "#fff"
  },
  carousel: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    top: 60
  },
  backButton: {
    position: "absolute",
    right: 350,
  },
})

export default ImageGallery

