<template>
<div class="find">
    <!-- 轮播图 -->
    <slider-module></slider-module>
    <!--  推荐导航-->
    <div class="find_nav">
        <div class="nav_module">
            <image :src="localImg.nav_1" class="nav_module_img"></image>
            <text class="nav_module_title">私人FM</text>
        </div>
        <div class="nav_module">
            <image :src="localImg.nav_2" class="nav_module_img"></image>
            <text class="nav_module_title">每日推荐</text>
        </div>
        <div class="nav_module">
            <image :src="localImg.nav_3" class="nav_module_img"></image>
            <text class="nav_module_title">歌单</text>
        </div>
        <div class="nav_module">
            <image :src="localImg.nav_4" class="nav_module_img"></image>
            <text class="nav_module_title">排行榜</text>
        </div>
    </div>
    <!--  歌单模块组件-->
    <song-module :song_title="'推荐歌单'" :song_type="0"></song-module>
    <song-module :song_title="'最近新歌'" :song_type="1"></song-module>
    <song-module :song_title="'主播电台'" :song_type="2"></song-module>
</div>
</template>
<script>
import songModule from '@/components/songModule';
import sliderModule from '@/components/sliderModule';
export default {
    name: "find",
    data() {
        return {
            // 渲染本地图片
            localImg: {
                nav_1: '',
                nav_2: '',
                nav_3: '',
                nav_4: ''
            }
        }
    },
    created() {
        // 初始化挂载本地图片
        this.localImg.nav_1 = this.get_img_path('nav_one.png');
        this.localImg.nav_2 = this.get_img_path('nav_two.png');
        this.localImg.nav_3 = this.get_img_path('nav_three.png');
        this.localImg.nav_4 = this.get_img_path('nav_four.png');
    },
    methods: {
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
    },
    components: {
        songModule,
        sliderModule
    }
}
</script>
<style src='@/css/find.css' scoped/>
