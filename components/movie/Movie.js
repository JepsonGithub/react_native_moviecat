/**
 * Created by Jepson on 2018/4/17.
 */

import React, { Component } from 'react'

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity  /* 作用, 用于封装视图, 让视图可以正确的响应点击事件 */
} from 'react-native'

import { Actions } from 'react-native-router-flux'



export default class Movie extends Component {

  constructor( props ) {
    super( props )

    // state 初始化
    this.state = {
      // 数据是否加载中
      isLoading: true,
      // 电影列表数据
      list: []
    }

    // 当前页
    this.currentPage = 0

    // 标记当前是否有更多内容需要加载了
    this.isMoreToLoad = true
  }

  // https://api.douban.com/v2/movie/in_theaters?start=0&count=10
  // 组件第一次挂载完成后调用
  componentDidMount= () => {
    this.fetchMovieData()
  }

  fetchMovieData= () => {
    console.log( '当前页' + this.currentPage )

    // 说明还有更多数据需要加载, 所以需要进行请求
    if ( this.isMoreToLoad ) {
      // 每次调用, 当前页 + 1
      this.currentPage++;

      // start 计算公式
      let start = (this.currentPage-1) * 10

      // 发送请求, 获取豆瓣电影数据
      fetch( `https://api.douban.com/v2/movie/in_theaters?start=${ start }&count=10` )
        .then( res => res.json() )
        .then( data => {
          console.log( data )
          // 总页数
          let totalPages = Math.ceil( data.total / data.count )
          // 获取到的所有的数据
          const list = data.subjects
          
          console.log( "总页数" + totalPages );

          // 如果当前页大于等于总页数, 说明没有更多数据需要加载了
          if ( this.currentPage >= totalPages ) {
            // 将全局的更多数据的 flag 置为 false
            this.isMoreToLoad = false
          }
          
          // 将获取来的数据同步到 state 状态中
          this.setState({
            isLoading: false,
            // 利用 concat 将旧数组与原数组进行拼接
            list: this.state.list.concat( list )
          })

        })
    } 
    
  }


  // 渲染数据源的每一项
  /**
   * 在RN中, 不是所有的控件都能添加 onPress的, 
   * 常用的组件中只有 Text 和 Button 有 onPress,
   * 就是说, Image 和 View 等都没有 onPress 事件
   */
  _renderItem=({ item }) => {
    return (
      <TouchableOpacity activeOpacity={ 0.4 }  style={ styles.item } onPress={ () => Actions.detail({ id: item.id }) } >
        <Image
          style={ styles.leftImg }
          source={{ uri: item.images.small }}
        />
        <View style={ styles.rightInfo }>
          <Text style={ styles.rightInfoTxt }>电影名称: { item.title }</Text>
          <Text style={ styles.rightInfoTxt }>电影类型: { item.genres.join(",") } </Text>
          <Text style={ styles.rightInfoTxt }>上映年份: { item.year } </Text>
          <Text style={ styles.rightInfoTxt }>豆瓣评分: { item.rating.average } </Text>
        </View>
      </TouchableOpacity>
    )
  }


  // 每个 Item 的关键字
  _keyExtractor = ( item ) => {
    return item.id
  }

  // 分割线组件
  _ItemSeparatorComponent = () => {
    return (
      <View style={{ height: 3, backgroundColor: '#DDD' }}></View>
    )
  }

  // 底部组件
  _ListFooterComponent = () => {
    if ( this.isMoreToLoad ) {
      return null
    }

    return <View><Text style={{ textAlign: 'center', fontSize: 20, height: 50 }}>别拉辣, 没有更多数据啦</Text></View>
  }



  // 触底回调函数
  _onEndReached = () => {
    // 在触底回调函数中
    this.fetchMovieData()
  }


  render() {
    // 由于数据fetch加载需要时间, 所以需要判断
    // 如果数据没有加载完成, 就显示: loading 效果
    // 如果数据加载完成了, 就显示电影列表数据
    if ( this.state.isLoading ) {
      // 说明加载中
      return (
        <ActivityIndicator color="orange" size="large"></ActivityIndicator>
      )
    }


    return (
      /**
       * FlatList组件使用说明
       * 1. data: 指定数据源
       * 
       * 2. 通过 renderItem 设置每一项的内容展示结构
       *    需要注意的是参数是一个对象, 需要通过解构赋值, 得到里面的 item (每一项)
       * 
       * 3. keyExtractor 指定 key 属性, 保证列表的唯一性(便于将来进行 diff)
       *    接收一个函数, 参数是每一项, 并且函数的返回值要求是字符串
       * 
       * 4. ItemSeparatorComponent 配置分割线, 接收一个组件构造函数
       * 
       * 5. 配置上拉加载更多
       *    onEndReachedThreshold: 当距离底部还有多少距离时触发回调 取值:(0-1)
       *    onEndReached: 触底回调函数
       * 
       * 6. ListFooterComponent 底部组件
       */
      <FlatList 
        keyExtractor={ this._keyExtractor }
        data={ this.state.list }
        keyExtractor={ this._keyExtractor }
        renderItem={ this._renderItem }
        ItemSeparatorComponent={ this._ItemSeparatorComponent }
        onEndReachedThreshold="0.4"
        onEndReached={ this._onEndReached }
        ListFooterComponent={ this._ListFooterComponent }
      >
      </FlatList>
    )
  }
}

const styles = StyleSheet.create({
  // 整个列表单项
  item: {
    flexDirection: 'row',
    padding: 10
  },
  leftImg: {
    width: 135,
    height: 200
  },
  rightInfo: {
    flex: 1,
    paddingLeft: 10
  },
  rightInfoTxt: {
    height: 50,
    lineHeight: 50,
    fontSize: 20
  }
})
