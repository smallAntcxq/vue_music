import axios from 'axios'
import QS from 'qs';

// axios.defaults.baseURL = 'http://192.168.0.102:4000'
//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求方法的封装
export default function myaxios(method,url,params){
    if(method == "GET"){
        return axios.get(url,{params:params})
    }
    else if(method == "POST"){
        let params = QS.stringify(params);
        return axios.post(url,params)
    }
}
export const isRegister ='/cellphone/existence/check?phone=' //手机号是否在网易云注册

export const iphoneLogin ="/login/cellphone?" //手机登录 get
export const isPassword='/login/cellphone?'  //判断密码是否正确
export const customMess='/login/status?date=' //获取用户信息

export const customMessages='/user/detail?uid=' //获取用户详细信息
export const customeRecord='/user/record?uid=' //获取用户播放记录
export const customeFocus='/user/follows?uid=' //获取用户关注列表

export const customLike='/like?id=' //传入音乐id可添加对歌曲的喜欢

export const customMusicList='/likelist?uid=' //获取用户喜欢歌单
export const customMusicListDetail='/song/detail?ids=' //获取用户喜欢歌单详情
export const musicPlay ="/song/url?id=" //音乐播放 get
export const songDetails ="/song/detail?ids="//获取歌单详情 get(榜单歌曲信息)



export const musicSwipe ="banner?type=1" //轮播图 get

export const searchsuggest ="/search/suggest?keywords=" //搜索提示 get
export const searchKeywords ="/search?keywords=" //关键字 get
export const hotSearch ="/search/hot/detail" //关键字 get

export const recommodList ="/personalized?limit=9" //推荐歌单 get 
export const getRecommodLists ="/playlist/detail?id="//获取歌单列表信息 get
export const getMusicWords ="/lyric?id="//获取歌词  get

export const getList ="/top/list?idx="//获取排行榜  get
export const getToplist ="/toplist"//榜单内容摘要  get
export const getToplistDetail ="/toplist/detail"//榜单内容摘要  get

export const getCommentList ="/comment/playlist?id="//获取歌单评论  get
export const getComment ="/msg/comments?uid="//登录后获取评论  get
export const postComment ="/comment?t=1&type=2&id=5436712&content=test" //发送歌单评论


export const getSingerList ="/artist/list?limit=100&cat="//获取歌手
export const getPlayerDetail ="/artists?id="//获取歌手详情页





















