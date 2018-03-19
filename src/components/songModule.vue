<template>
<div class="song_module_content">
    <!-- 歌单标题-->
    <div class="song_title_content">
        <text class="song_title">{{song_title}}</text>
        <image :src="localImg.arrow" class="song_title_img"></image>
    </div>
    <!-- 歌单小模块-->
    <div class="song_container">
        <!--  循环歌单模块-->
        <div v-for="item in songList" class="song_module">
            <!--  歌单主图-->
            <image :src="item.src" class="song_module_img"></image>
            <!--  歌单标题-->
            <text class="song_module_title">{{item.name}}</text>
            <div class="song_module_msg">
                <image class="song_module_msg_icon" :src="localImg.song_icon"></image>
                <text class="song_module_msg_text">{{item.number}}</text>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "songModule",
    // 冒泡接收：title为模块名称，type为需要去拉取数据的标志
    props: {
        song_title: {
            type: String,
            default: '暂未开通'
        },
        song_type: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            // 渲染本地图片
            localImg: {
                arrow: '',
                song_icon: ''
            },
            // 获取网络歌单信息列表
            songList: [{
                    src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1496256616,1598089790&fm=27&gp=0.jpg',
                    number: '73万',
                    name: '如果让你选一首BGM出场，你会选哪个？'
                },
                {
                    src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2987485451,2103926387&fm=27&gp=0.jpg',
                    number: '1.2亿',
                    name: '华语速爆新歌'
                },
                {
                    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1543716466,2388588981&fm=27&gp=0.jpg',
                    number: '8969',
                    name: '有没有那么一束光，照亮你'
                },
                {
                    src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1442547355,2343761033&fm=27&gp=0.jpg',
                    number: '1.1万',
                    name: '最佳英伦风'
                },
                {
                    src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1605546327,1310572982&fm=27&gp=0.jpg',
                    number: '974',
                    name: '华语||拥有你，仿佛拥有了全世界'
                }, {
                    src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2618383637,3522268811&fm=27&gp=0.jpg',
                    number: '39',
                    name: '解乏跑步者的福音'
                }
            ]
        }
    },
    created() {
        // 初始化挂载本地图片
        this.localImg.arrow = this.get_img_path('arrow.png');
        this.localImg.song_icon = this.get_img_path('song_icon.png');
        // 页面加载前判断模块类型，并进行异步加载
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
    }
}
</script>
<style lang="css" scoped>
/* 最外层主体结构 */
.song_module_content{
    width: 750px;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: column;
}
/* 模块名称*/
.song_title_content{
    width: 750px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    -ms-align-items: center;
    align-items: center;
}
.song_title{
    font-size: 32px;
    color: #333;
    padding-left: 20px;
    border-left-width: 6px;
    border-left-color: rgb(211, 58, 49);
}
.song_title_img{
    width: 36px;
    height: 36px;
    margin-left: 10px;
}
/*  每一个小模块：最外层主体*/
.song_container{
    width: 750px;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-align-items: center;
    align-items: center;
}
/*  每一个小模块*/
.song_module{
    width: 250px;
    height: 340px;
    position: relative;
    flex-direction: column;
    -ms-align-items: center;
    align-items: center;
}
.song_module_img{
    width: 246px;
    height: 246px;
    margin-bottom: 20px;
}
.song_module_title{
    width: 240px;
    color: #333;
    font-size: 24px;
    line-height: 30px;
}
/*  收听量*/
.song_module_msg{
    flex-direction: row;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
}
.song_module_msg_icon{
    width: 30px;
    height: 30px;
    margin-right: 8px;
    margin-top: -2px;
}
.song_module_msg_text{
    color: #fff;
    font-size: 24px;
    font-family: serif;
}
</style>
