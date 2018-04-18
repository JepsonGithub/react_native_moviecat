/**
 * Created by Jepson on 2018/4/17.
 */

import React, { Component } from 'react'

// 导入 react-native 的组件
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

// 导入轮播图
import Swiper from 'react-native-swiper';

import {
  Actions
} from 'react-native-router-flux'

// 导出 Home 组件
export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        {/*
          showsButtons 值为 true, false, 表示左右箭头的显示状态
          autoplay: 是否自动轮播
          horizontal: 小圆点的显示方向
          loop: 是否支持循环轮播
        */}

        {/* 轮播图 */}
        <View style={styles.wrapper}>
          <Swiper index={ 0 } showsButtons={true} autoplay={true} horizontal={true} loop={true}>
            <View style={styles.slide1}>
              <Image
                // Image 组件, 必须指定 source 属性, 如果是本地图片通过 require
                // 如果是网络图片, 需要通过 uri 进行请求, 且网络图片必须设置宽高
                source={{ uri: 'http://www.itcast.cn/images/slidead/BEIJING/2017410109413000.jpg' }}
                style={ styles.image }
                resizeMode="stretch"
              ></Image>
            </View>
            <View style={ styles.slide2 }>
              <Image
                source={{ uri: 'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg' }}
                style={ styles.image }
                resizeMode="stretch"
              ></Image>
            </View>
            <View style={ styles.slide3 }>
              <Image
                source={{ uri: 'http://www.itcast.cn/images/slidead/BEIJING/2017441409442800.jpg' }}
                style={ styles.image }
                resizeMode="stretch"
              ></Image>
            </View>
          </Swiper>
        </View>

        {/* tab栏 menu */}
        <View style={ styles.menu } >
          <Text style={ styles.menuItem }>首页</Text>
          <Text onPress={ Actions.movie } style={ styles.menuItem }>电影</Text>
          <Text onPress={ Actions.about } style={ styles.menuItem }>关于</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 300
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  menu: {
    flexDirection: 'row'
  },
  menuItem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'orange',
    height: 50,
    lineHeight: 50
  }
})

