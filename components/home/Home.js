/**
 * Created by Jepson on 2018/4/17.
 */

import React, { Component } from 'react'

// 导入 react-native 的组件
import {
  View,
  Text
} from 'react-native'

// 导出 Home 组件
export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>我是 Home 首页</Text>
      </View>
    )
  }
}

