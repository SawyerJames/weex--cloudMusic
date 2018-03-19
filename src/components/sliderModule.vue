<template>
<slider class="slider" interval="3000" auto-play="true">
    <div v-for="item in bannerList" class="slider_content">
        <!--  轮播图片-->
        <image class="slider_image" :src="item.src"></image>
        <!--  轮播类型-->
        <text class="slider_type slider_0" v-if="item.type == 0">演出</text>
        <text class="slider_type slider_1" v-if="item.type == 1">独家出品</text>
        <text class="slider_type slider_2" v-if="item.type == 2">活动</text>
    </div>
    <indicator class="indicator"></indicator>
</slider>
</template>
<script>
export default {
    name: "sliderModule",
    data() {
        return {
            // 轮播图列表: src为图片地址。type为类型，0为演出，1为独家，2为活动
            bannerList: [{
                    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3354755097,142727630&fm=27&gp=0.jpg',
                    type: 0,
                    id: 0
                },
                {
                    src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2453256577,735188857&fm=27&gp=0.jpg',
                    type: 1,
                    id: 1
                },
                {
                    src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1491774849,797738821&fm=27&gp=0.jpg',
                    type: 1,
                    id: 2
                },
                {
                    src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4226054052,1726051008&fm=27&gp=0.jpg',
                    type: 2,
                    id: 3
                },
                {
                    src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1618343187,1781073875&fm=27&gp=0.jpg',
                    type: 0,
                    id: 4
                }
            ]
        }
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
}
</script>
<style lang="css" scoped>
/* 轮播图 */

.slider {
    width: 750px;
    height: 300px;
}

.slider_content {
    width: 750px;
    height: 300px;
    position: relative;
}

.slider_image {
    width: 750px;
    height: 300px;
}

.slider_type {
    height: 50px;
    line-height: 50px;
    padding-left: 40px;
    padding-right: 10px;
    text-align: right;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    color: #fff;
    font-size: 22px;
    background-color: #000;
    position: absolute;
    bottom: 20px;
    right: 0;
}

.slider_0 {
    background-color: rgb(33, 143, 199);
}

.slider_1 {
    background-color: rgb(191, 2, 36);
}

.slider_2 {
    background-color: rgb(139, 37, 201);
}

.indicator {
    position: absolute;
    width: 750px;
    height: 530px;
    item-color: rgba(142, 142, 142, 0.6);
    item-selected-color: rgba(196, 52, 27, 0.8);
    item-size: 16px;
}
</style>
