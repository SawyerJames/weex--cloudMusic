<template>
<!-- 头部导航 -->
<div class="header">
    <div class="header_nav">
        <image class="header_img" :src="localImg.header_nav" @click.stop="showCenter"></image>
    </div>
    <div class="header_nav">
        <image class="header_img" :src="localImg.header_center"></image>
    </div>
    <div class="header_nav">
        <image class="header_img" :src="localImg.header_search"></image>
    </div>
</div>
</template>
<script>
export default {
    name: 'headerNav',
    data() {
        return {
            // 渲染本地图片
            localImg: {
                header_nav: '',
                header_center: '',
                header_search: ''
            }
        }
    },
    created() {
        // 初始化挂载本地图片
        this.localImg.header_nav = this.get_img_path('header_nav.png');
        this.localImg.header_center = this.get_img_path('header_muisc.png');
        this.localImg.header_search = this.get_img_path('header_search.png');
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
        },
        // 展开“我的”弹层
        showCenter(){
            
        }
    }
}
</script>
<style lang="css" scoped>
/* 导航头部 */

.header {
    height: 100px;
    background-color: rgb(211, 58, 49);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header_nav {
    height: 100px;
    width: 100px;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}

.header_img {
    height: 50px;
    width: 50px;
}
</style>
