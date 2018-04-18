// 导入 react
import React, { Component } from 'react'

// 导入路由组件
import {
  Router,
  Scene
} from 'react-native-router-flux'


// 导入 组件
import Home from './components/home/Home'
import About from './components/about/About'
import Movie from './components/movie/Movie'
import MovieDetail from './components/movie/MovieDetail'

// 导出根组件
/*
* 使用 react-native-router-flux 注意点
* 1. 必须最外层用 Router 包裹
* 2. 里面是场景, 有一个根场景 Scene
* 3. 每个场景, 都有一个 key 属性, 标记当前场景, 可以用于跳转, key必须唯一
*    key: 标记场景
*    title: 标记场景标题
*    component: 标记哪个组件
*    initial: 标记哪个组件为根组件
* */
export default class App extends Component {
  render() {
    return (
     <Router>
       <Scene key="root">
         <Scene key="home" title="首页" component={ Home } initial={ true } ></Scene>
         <Scene key="movie" title="电影列表" component={ Movie } ></Scene>
         <Scene key="detail" title="电影详情" component={ MovieDetail } ></Scene>
         <Scene key="about" title="关于" component={ About } ></Scene>
       </Scene>
     </Router>
    )
  }
}