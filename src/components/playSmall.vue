<template>
    <div class="playSmall">
        <!-- 底部播放 -->
        <div class="playAudio_small_hack"></div>
        <div class="playAudio_small">
            <!-- 底部播放组件：音频信息 -->
            <div class="playAudio_small_msg">
                <image class="small_msg_img" :src="localImg.play_small_logo"></image>
                <div class="small_msg_content">
                    <text class="small_content_title">クリスマスソング</text>
                    <text class="small_content_detail">日剧《朝五晚九:俊俏和尚爱上我》主题曲</text>
                </div>
            </div>
            <!-- 底部播放组件：播放功能 -->
            <div class="playAudio_small_action">
                <image class="small_action_btn" :src="localImg.play_small_play"></image>
                <image class="small_action_btn" :src="localImg.play_small_list" @click.stop="showSongList"></image>
            </div>
        </div>
        <!-- 歌曲列表容器 -->
        <wxc-popup pos="bottom" height="800" :show="isShow" @wxcPopupOverlayClicked="hideSongList">
            <div class="small_list_toggle_content">
                <!-- 播放类型选择 -->
                <div class="toggle_btn" @click="songTypeToggle()">
                    <!-- SongType为播放类型，0为列表循环，1为随机播放，2为单曲循环 -->
                    <image v-if="SongType == 0" :src="localImg.toggle_btn1_img" class="toggle_btn_img"></image>
                    <image v-if="SongType == 1" :src="localImg.toggle_btn2_img" class="toggle_btn_img"></image>
                    <image v-if="SongType == 2" :src="localImg.toggle_btn3_img" class="toggle_btn_img"></image>
                    <text v-if="SongType == 0" class="toggle_type">列表循环</text>
                    <text v-if="SongType == 1" class="toggle_type">随机播放</text>
                    <text v-if="SongType == 2" class="toggle_type">单曲循环</text>
                    <!-- 歌曲数量 -->
                    <text class="toggle_songNumber">(86)</text>
                </div>
                <!-- 点击清空当前列表 -->
                <!-- 清空歌曲列表对话框 -->
                <wxc-dialog content="确定要清空播放列表？" confirm-text="清空" :show="show" @wxcDialogCancelBtnClicked="songEmptyCancel" @wxcDialogConfirmBtnClicked="songEmptyConfirm">
                </wxc-dialog>
                <image :src="localImg.toggle_del" @click="songEmpty()" class="toggle_del"></image>
            </div>
            <!-- 歌曲列表 -->
            <scroller class="song_list">
                <!-- 列表循环，挂载点击播放事件，传入index使点击变色样式生效 -->
                <div class="song_list_module" v-for="(item,index) in songList" @click="songPlay(index,item.songId)">
                    <div class="song_module_left">
                        <text class="song_module_title" :class="[currentIndex == index ? 'songChoose' : '']">{{item.name}}</text>
                        <text class="song_module_avatar" :class="[currentIndex == index ? 'songChoose' : '']">&nbsp;-&nbsp;{{item.avatar}}</text>
                    </div>
                    <!-- 挂载点击删除事件 -->
                    <image :src="localImg.song_module_del" @click.stop="songDel(index,item.songId)" class="song_module_right"></image>
                </div>
            </scroller>
        </wxc-popup>
    </div>
</template>
<script>
// 引用数据缓存模块
const storage = weex.requireModule('storage')
    // 导入weexUI组件包：按钮、弹层、对话框
import {
    WxcButton,
    WxcPopup,
    WxcDialog
} from 'weex-ui';
export default {
    name: 'playSmall',
    data() {
        return {
            // 播放类型
            SongType: 0,
            // 渲染本地图片
            localImg: {
                play_small_play: '',
                play_small_list: '',
                play_small_logo: '',
                toggle_del: '',
                toggle_btn1_img: '',
                toggle_btn2_img: '',
                toggle_btn3_img: '',
                song_module_del: ''
            },
            // 对话框
            show: false,
            isChecked: false,
            // 歌曲列表
            isShow: false,
            currentIndex: null,
            songList: [{
                name: '陈一发儿，欧洲人的XX，亚洲XX',
                avatar: '萝菽菽',
                songId: 1
            }, {
                name: '童话镇',
                avatar: '陈一发儿',
                songId: 2
            }, {
                name: '阿婆说',
                avatar: '陈一发儿',
                songId: 3
            }]
        } 
    },
    created() {
        // 获取缓存中播放类型放入data中
        storage.getItem('SongType', event => {
            if (event.data != 'undefined') {
                this.SongType = parseInt(event.data);
            }else{
                this.SongType = 0;
            }
        });
        // 初始化挂载本地图片
        this.localImg.play_small_logo = this.get_img_path('music.jpg');
        this.localImg.play_small_play = this.get_img_path('play_small.png');
        this.localImg.play_small_list = this.get_img_path('list_small.png');
        this.localImg.toggle_del = this.get_img_path('del.png');
        this.localImg.toggle_btn1_img = this.get_img_path('song_sui.png');
        this.localImg.toggle_btn2_img = this.get_img_path('song_shun.png');
        this.localImg.toggle_btn3_img = this.get_img_path('song_dan.png');
        this.localImg.song_module_del = this.get_img_path('close.png');
    },
    methods: {
        // ios&web&android图片转换方法
        get_img_path(img_name) {
            let platform = weex.config.env.platform;
            let img_path = '';
            if (platform == 'Web') {
                img_path = `http://localhost:1337/src/images/${img_name}`;
            } else if (platform == 'android') {
                // android 不需要后缀
                img_name = img_name.substr(0, img_name.lastIndexOf('.'));
                img_path = `local:///${img_name}`;
            } else {
                img_path = `../images/${img_name}`;
            }
            return img_path;
        },
        // 点击切换播放类型，并将播放类型存入全局中
        songTypeToggle() {
            // 计算三种类型循环，三种类型最大不超过2
            if(this.SongType == 2){
                this.SongType = 0;
            }else{
                this.SongType += 1;
            }
            // 计算后的类型结果传入缓存中
            storage.setItem('SongType', this.SongType)
        },
        // 点击切换歌单列表
        showSongList() {
            this.isShow = true;
        },
        hideSongList() {
            this.isShow = false;
        },
        // 播放&删除歌曲
        songDel(index, songId) {
            // 先在客户端进行前端删除处理，隐式抛出数据
            this.songList.splice(index, 1);
        },
        songPlay(index, songId) {
            // 点击变色事件
            this.currentIndex = index;
        },
        // 清除歌曲列表功能：携带对话框
        songEmpty() {
            this.show = true;
        },
        songEmptyCancel() {
            this.show = false;
        },
        songEmptyConfirm() {
            this.show = false;
            this.songList = [];
        }
    },
    components: {
        WxcButton,
        WxcPopup,
        WxcDialog
    }
}
</script>
<style lang="css" scoped>
/* 底部播放器 */

.playAudio_small_hack {
    width: 750px;
    height: 100px;
}

.playAudio_small {
    width: 750px;
    height: 100px;
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
}


/* 底部播放器左侧 */

.playAudio_small_msg {
    width: 500px;
    height: 100px;
    flex-direction: row;
    -ms-align-items: center;
    align-items: center;
}

.small_msg_img {
    width: 80px;
    height: 80px;
    margin-left: 20px;
    margin-right: 20px;
}

.small_msg_content {
    height: 80px;
    justify-content: space-around;
}

.small_content_title {
    font-size: 26px;
}

.small_content_detail {
    font-size: 22px;
    color: #999;
    lines: 1;
}


/* 底部播放器右侧 */

.playAudio_small_action {
    height: 100px;
    width: 140px;
    margin-right: 20px;
    flex-direction: row;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.small_action_btn {
    width: 60px;
    height: 60px;
}

/*歌曲列表 循环播放：点击框*/

.small_list_toggle_content {
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #ddd;
}

.toggle_btn {
    flex-direction: row;
    -ms-align-items: center;
    align-items: center;
}

.toggle_btn_img {
    width: 40px;
    height: 40px;
    margin-left: 15px;
    margin-right: 20px;
}

.toggle_type {
    font-size: 30px;
    margin-top: 4px;
    color: #333;
    margin-right: 15px;
}

.toggle_songNumber {
    margin-top: 2px;
    font-size: 28px;
    color: #333;
}

.toggle_del {
    width: 36px;
    height: 36px;
    margin-left: 20px;
    margin-right: 20px;
}


/*歌曲列表*/

.song_list {
    width: 750px;
}

.song_list_module {
    border-bottom-color: #eee;
    border-bottom-width: 1px;
    flex-direction: row;
    -ms-align-items: center;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
}

.song_module_right {
    width: 38px;
    height: 38px;
}

.song_module_left {
    width: 600px;
    height: 100px;
    lines: 1;
    flex-direction: row;
    justify-content: flex-start;
    -ms-align-items: center;
    align-items: center;
}

.song_module_title {
    font-size: 30px;
}

.song_module_avatar {
    font-size: 26px;
    color: #6C6C6C;
}


/*点选歌曲变成红色*/

.songChoose {
    color: #d33a31;
}
</style>
