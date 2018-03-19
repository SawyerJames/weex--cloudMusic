<template>
    <div class="mine">
        <div @click="setPlayIconStorage(0)" class="mine_module" style="padding-top: 20px;">
            <div class="mine_module_left">
                <image :src="localImg.nav_1" class="mine_module_icon"></image>
                <text class="module_left_title">本地音乐</text>
                <text class="module_left_number">(0)</text>
            </div>
            <image v-if="PlayIconStorage == 0" :src="localImg.playIcon" class="mine_module_right"></image>
        </div>
        <div @click="setPlayIconStorage(1)" class="mine_module">
            <div class="mine_module_left">
                <image :src="localImg.nav_2" class="mine_module_icon"></image>
                <text class="module_left_title">最近播放</text>
                <text class="module_left_number">(100)</text>
            </div>
            <image v-if="PlayIconStorage == 1" :src="localImg.playIcon" class="mine_module_right"></image>
        </div>
        <div @click="setPlayIconStorage(2)" class="mine_module">
            <div class="mine_module_left">
                <image :src="localImg.nav_3" class="mine_module_icon"></image>
                <text class="module_left_title">下载管理</text>
                <text class="module_left_number">(2)</text>
            </div>
            <image v-if="PlayIconStorage == 2" :src="localImg.playIcon" class="mine_module_right"></image>
        </div>
        <div @click="setPlayIconStorage(3)" class="mine_module">
            <div class="mine_module_left">
                <image :src="localImg.nav_4" class="mine_module_icon"></image>
                <text class="module_left_title">我的收藏</text>
                <text class="module_left_number">(6)</text>
            </div>
            <image v-if="PlayIconStorage == 3" :src="localImg.playIcon" class="mine_module_right"></image>
        </div>
    </div>
</template>
<script>
// 引用数据缓存模块
const storage = weex.requireModule('storage')
export default {
    name: "mine",
    data() {
        return {
            // 渲染本地图片
            localImg: {
                nav_1: '',
                nav_2: '',
                nav_3: '',
                nav_4: ''
            },
            // 缓存识别的小喇叭标志
            PlayIconStorage: 0
        }
    },
    created() {
        // 每次进入程序后获取缓存数据，并赋值给data
        storage.getItem('PlayIcon', event => {
                if (event.data != 'undefined') {
                    this.PlayIconStorage = event.data;
                }
            })
            // 初始化挂载本地图片
        this.localImg.nav_1 = this.get_img_path('play_icon.png');
        this.localImg.nav_2 = this.get_img_path('play_icon.png');
        this.localImg.nav_3 = this.get_img_path('play_icon.png');
        this.localImg.nav_4 = this.get_img_path('play_icon.png');
        this.localImg.playIcon = this.get_img_path('play_icon.png');
    },
    methods: {
        // 点击每一个小模块进行的数据缓存并及时读取，用来标志下一次进入程序，喇叭应该处在的位置
        setPlayIconStorage(PlayIconStorage) {
            storage.setItem('PlayIcon', PlayIconStorage, event => {
                storage.getItem('PlayIcon', event => {
                    this.PlayIconStorage = event.data;
                })
            })
        },
        // ios&web&android图片转换方法
        get_img_path(img_name) {
            let platform = weex.config.env.platform
            let img_path = ''

            if (platform == 'Web') {
                img_path = `http://localhost:1337/src/images/${img_name}`
            } else if (platform == 'android') {
                // android 不需要后缀
                img_name = img_name.substr(0, img_name.lastIndexOf('.'));
                img_path = `local:///${img_name}`
            } else {
                img_path = `../images/${img_name}`
            }
            return img_path
        }
    }
}
</script>
<style src='@/css/mine.css' scoped/>
