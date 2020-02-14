import Vue from 'vue'
import VueRouter from 'vue-router'
const  Music = ()=> import('@/views/Music.vue')
const  Singer = ()=> import('@/views/Singer.vue')
const  Person = ()=> import('@/views/Person.vue')
const  Ranking = ()=> import('@/views/Ranking.vue')
const  Search = ()=> import('@/views/music/Search.vue')
const  SearchList = ()=> import('@/views/music/Searchlist.vue')
const  MusicPlay = ()=> import('@/components/music/musicplay.vue')
const  RecommondList = ()=> import('@/views/music/RecommondList.vue')
const  CommentList = ()=> import('@/views/comment/Comment.vue')
const  PlayerDetail = ()=> import('@/components/playerDetail/playerDetail.vue')
const  beforeLogin = ()=> import('@/components/beforeLogin/beforeLogin.vue')
const  AudioRecord = ()=> import('@/views/person/AudioRecord.vue')
const  Mylove = ()=> import('@/views/person/Mylove.vue')







Vue.use(VueRouter)

const routes = [
  // 主页
  {
    path: '/',
    component: Music
  },
  {
    path: '/Singer',
    component: Singer
  },
  {
    path: '/Person',
    component: Person
  },
  {
    path: '/Ranking',
    component: Ranking
  },
  
  // 搜索
  {
    path: '/music/search',
    component: Search
  },
  {
    path: '/music/searchlist',
    component: SearchList
  },
  // 播放
  {
    path: '/music/musicplay',
    component: MusicPlay
  },
  // 推荐歌单列表
  {
    path: '/music/recommondlist',
    component: RecommondList
  },
// 评论列表
  {
    path: '/comment/recommondlist',
    component: CommentList
  },
// 歌手详情页
{
  path: "/Singer/playerDetail",
  component: PlayerDetail
},
// 登录
{
  path: "/beforeLogin",
  component:beforeLogin
},
{
  path: "/person/audioRecord",
  component:AudioRecord
},
{
  path: "/person/mylove",
  component:Mylove
}

]

const router = new VueRouter({
  routes
})

export default router
