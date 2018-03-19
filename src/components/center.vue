<template>
    <wxc-popup pos="left" width="500" :show="isShowCenter" @wxcPopupOverlayClicked="hideCenter">
        <text>{{text}}</text>
    </wxc-popup>
</template>
<script>
// 引用数据缓存模块
const storage = weex.requireModule('storage')
import {
    WxcPopup
} from 'weex-ui';
export default {
    name: 'center',
    data() {
        return {
            isShowCenter: true,
            text: ''
        }
    },
    created () {
        this.text = this.$store.state.CenterState;
        // this.text = 1;
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
        // 隐藏我的弹层
        hideCenter() {
            this.isShowCenter = false;
        }
    },
    components: {
        WxcPopup
    }
}
</script>
<style scoped>
</style>
