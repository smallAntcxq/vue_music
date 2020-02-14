import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import { Config } from '../common/js/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //1.搜索页面关键字vuex操作
    keywordsList: [],

    //2.播放器有关state
    // id数据
    id:222,
    // 歌手信息
    singer: {},
    // 播放状态(播放，暂停)
    playing: false,
    // 播放器(展开还是收起)
    fullScreen: false,
    // 播放列表
    playList: [],
    // 歌曲循序列表，如果是随机播放，跟播放列表的顺序是不一样的
    sequenceList: [],
    // 播放类型
    mode: Config.playMode.sequence,
    // 当前播放索引
    currentIndex: -1,

    // 3.个人中心有关state
    // 登录状态
    loginStatus:false,
    // 用户Id
    userId:0,
    // 用户等级
    userLevel:0,
    // 用户信息
    userMess:{},
    // 播放记录
    audioRecord:[],
    // 我的关注
    Myfocus:[],
    // 我的喜欢
    Mylove:[],
  },
    


  mutations: {
    // 1.修改关键字
    addTokeywords(state, obj) {
      //flag用来表示keywords数组中是否存在keyword
      var flag = false;
      //遍历keywords数组，如果keywords数组中有keword
      state.keywordsList.forEach((item) => {
        if (item == obj.keyword) {
          flag = true;
        }
      })
      //如果keywordsList数组没有keword，直接把obj.keyword添加到keywordsList数组
      if (flag == false) {
        state.keywordsList.unshift(obj.keyword)
      }
    },
    // 删除历史记录
    deleteToKeywords(state) {
      state.keywordsList = [];
    },

    //2.修改播放器有关state
    setId(state,id){
      state.id = id;
    },

    setSinger(state, singer) {
      state.singer = singer
    },

    setPlayState(state, flag) {
      state.playing = flag
    },

    setFullScreen(state, flag) {
      state.fullScreen = flag
    },

    setPlayList(state, list) {
      state.playList = list
    },

    setSequenceList(state, list) {
      state.sequenceList = list
    },

    setPlayMode(state, mode) {
      state.mode = mode
    },

    setCurrentIndex(state, index) {
      state.currentIndex = index
    },
    addToMylove(state,obj){
      state.Mylove.push(obj)
    },

    // 3.修改个人登录有关state
    setLoginStatus(state,status){
      state.loginStatus = status
    },
    setUserId(state,id){
      state.id = id;
    },
    setUserMess(state,mess){
      state.userMess = mess
    },
    setUserLevel(state,number){
      state.userLevel= number
    },
    // 4.删除登录有关信息
    deleteUserMess(state){
      state.userMess = {}
    },
    deleteUserLevel(state){
      state.userLevel = 0;
    },
    // 5.添加登录有关信息
    // 播放记录
    addAudioRecord(state,arr){
      state.audioRecord = arr
    },
    // 我的关注
    addMyfocus(state,focusArr){
      state.Myfocus=focusArr;
    },
    // 我的喜欢
    addMylove(state,loveArr){
      state.Mylove = loveArr
    }
  },
  actions: {
    selectPlay({commit}, {list, index}){
      commit('setSequenceList', list)
      commit('setPlayList', list)
      commit('setCurrentIndex',index)
      commit('setPlayState', true)
    }
  },
  modules: {
  },
  getters: {
    // 1.播放器
    id: (state)=>{
      return state.id
    },
    singer: function (state) {
      return state.singer
    },

    playing: function (state) {
      return state.playing
    },

    fullScreen: function (state) {
      return state.fullScreen
    },

    playList: function (state) {
      return state.playList
    },

    sequenceList: function (state) {
      return state.sequenceList
    },

    mode: function (state) {
      return state.mode
    },

    currentIndex: function (state) {
      return state.currentIndex
    },

    currentSong: function (state) {
      return state.playList[state.currentIndex] || {}
    },
    // 2.个人中心
    loginStatus: function (state) {
      return state.loginStatus
    },

    // 用户Id
    userId : function (state) {
      return state.userId
    },
    // 用户等级
    userLevel: function (state) {
      return state.userLevel
    },
    // 用户信息
    userMess: function (state) {
      return state.userMess
    },
   // 登录添加信息
   audioRecord:function(state){
     return state.audioRecord;
   },
   Myfocus:function(state){
    return state.Myfocus;
  },
  Mylove:function(state){
    return state.Mylove;
  }
  },
  plugins: [createPersistedstate()]
})
