<template>
    <div class="wrapper">
        <!-- 头部导航 -->
        <header-nav></header-nav>
        <!-- 二级导航：路由切换 -->
        <div class="second_content">
            <text @click="transFormRouter(index)" v-for="(item,index) in sectionNav" :class="[currentIndex == index ? 'second_nav_choose' : '']" class="second_nav">{{item}}</text>
        </div>
        <!-- 切换页面: 滑动切换，配合滚动区域以及slider进行滑动 -->
        <scroller>
            <slider :style="height" @change="transSlider" :index="sliderVal">
                <find ref="find"></find>
                <mine ref="mine"></mine>
                <transceiver ref="transceiver"></transceiver>
            </slider>
        </scroller>
        <!-- 底部播放组件 -->
        <play-small></play-small>
        <!-- 侧拉组件：我的信息 -->
        <center></center>
    </div>
</template>
<script>
// 获取dom结构包
const domModule = weex.requireModule('dom')
    // 组件导入
import playSmall from '@/components/playSmall';
import headerNav from '@/components/headerNav';
import center from '@/components/center';
// 将页面作为组件导入
import find from '@/view/find';
import mine from '@/view/mine';
import transceiver from '@/view/transceiver';
export default {
    name: 'index',
    data() {
        return {
            // 二级导航
            sectionNav: ['发现', '我的', '电台'],
            currentIndex: 0,
            // 滑动切换
            sliderVal: 0,
            height: {
                height: ''
            }
        }
    },
    methods: {
        // 滑动切换页面
        transSlider(e) {
            this.currentIndex = e.index;
            this.transPage(this.currentIndex);
        },
        // 点击导航切换页面
        transFormRouter(index) {
            this.currentIndex = index;
            this.sliderVal = index;
            this.transPage(this.currentIndex);
        },
        // 无缝切换页面函数
        transPage(index) {
            // 定义ref要携带的变量
            var ref;
            // 判断当前页面的index值，进行ref的赋值
            switch (index) {
                case 0:
                    ref = this.$refs.find;
                    break;
                case 1:
                    ref = this.$refs.mine;
                    break;
                case 2:
                    ref = this.$refs.transceiver;
                    break;
                default:
                    ref = this.$refs.find;
            }
            // 调用dom接口，获取当前页面的高度，如果高度小于屏幕。则充满屏幕
            domModule.getComponentRect(ref, option => {
                this.height.height = option.size.height + 'px';
                if (option.size.height >= 880) {
                    this.height.height = option.size.height + 'px';
                } else {
                    this.height.height = 880 + 'px';
                }
            })
        }
    },
    components: {
        playSmall,
        headerNav,
        center,
        find,
        mine,
        transceiver
    }
}
</script>
<style src='./css/index.css' scoped/>
