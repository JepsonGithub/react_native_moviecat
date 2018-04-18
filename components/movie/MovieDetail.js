// 导入 React
import React, { Component } from "react"


// 导入 RN 组件
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native'

// 创建导出组件
export default class MovieDetail extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      info: {},
      isLoading: true
    }
  }

  // 钩子函数
  componentDidMount= () => {
    // 进行请求
    fetch(`https://api.douban.com/v2/movie/subject/${ this.props.id }`)
      .then( res => res.json() )
      .then( data => {
        console.log( data )
        this.setState({
          info: data,
          isLoading: false
        })
      })
  }
  
  // render 方法
  render() {
    if ( this.state.isLoading ) return null

    return (
      <ScrollView style={ styles.scroll } >
        {/* 图片模块 */}
        <View style={ styles.pic }>
          <Image
            style={ styles.picImage }
            source={{ uri: this.state.info.images.large }}
          ></Image>
        </View>


        {/* 主要演员模块 */}
        <Text style={ styles.title }>主要演员:</Text>
        <View style={ styles.stars }>
          {
            this.state.info.casts.map( item => {
              return (
                <View style={ styles.starsItem } key={ item.id }>
                  <Image
                    style={ styles.starsItemImg }
                    source={{ uri: item.avatars.small }}
                  ></Image>
                  <Text style={ styles.starsItemInfo }>{ item.name }</Text>
                </View>
              )
            })
          }
        </View>

        {/* 剧情介绍 */}
        <Text style={ styles.title }>剧情介绍:</Text>
        <Text style={ styles.info }>
          { this.state.info.summary }
        </Text>

      </ScrollView>
    )
  }

}


const styles = StyleSheet.create({
  scroll: { padding: 20 },
  pic: { alignItems: 'center'},
  picImage: { width: 270, height: 400 },

  title: { fontSize: 20, marginTop: 20, marginBottom: 10 },
  stars: { flexDirection: 'row', justifyContent: 'space-between' },
  starsItemImg: { width: 100, height: 142 },
  starsItemInfo: { textAlign: 'center' },
  info: { fontSize: 16 }
})