<template>
    <div class="menubox">
        <ul class="menu-con">
            <li :class="['menu-list',location==='index'?'liston':'']" @click="indexgo()">
                <img class="menuicon menuicon1" src="../../public/images/homeicon1.png" alt="">
                <img class="menuicon menuicon2" src="../../public/images/homeicon2.png" alt="">
                <p class="menu-txt">比赛首页</p>
            </li>
            <li :class="['menu-list',location==='work'?'liston':'']" @click="workgo()">
                <img class="menuicon menuicon1" src="../../public/images/workicon1.png" alt="">
                <img class="menuicon menuicon2" src="../../public/images/workicon2.png" alt="">
                <p class="menu-txt">作品展示</p>
            </li>
            <li :class="['menu-list',location==='lesson'?'liston':'']" @click="lessongo()">
                <img class="menuicon menuicon1" src="../../public/images/lessonicon1.png" alt="">
                <p class="menu-txt">预约课程</p>
            </li>
            <li :class="['menu-list',location==='me'?'liston':'']" @click="jfgo()">
                <img class="menuicon menuicon1" src="../../public/images/meicon1.png" alt="">
                <img class="menuicon menuicon2" src="../../public/images/meicon2.png" alt="">
                <p class="menu-txt">我的积分</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        props:['location'],
        data(){
            return{

            }
        },
        cteated(){

        },
        methods:{
            indexgo(){
                this.$router.push('acthome');
                setTimeout(()=> {
                    window.location.reload();
                }, 100);
            },
            workgo(){
                this.$router.push('work')
                setTimeout(()=> {
                    window.location.reload();
                }, 100);
            },
            lessongo(){
                window.location.href="http://landing.dfth.com/market/mobile/index.html?tgid=baidusj"
            },
            jfgo(){
                this.$router.push('integral')
                setTimeout(()=> {
                    window.location.reload();
                }, 100);
            }
        }
    }
</script>

<style>
    .menubox {position: fixed;width: 100%;height: 10rem;background: #fff;border-top: 0.1rem solid #ddd;z-index:200;bottom: 0;left: 0;
    display: flex;align-items: center;}
    .menubox .menu-con {display: flex;width: 100%;justify-content: center;}
    .menubox .menu-con .menu-list {font-size: 1.8rem;color:#abb6ba;text-align: center;width: 25%;}
    .menubox .menu-con .menu-list:nth-child(1) img{width: 4.1rem;}
    .menubox .menu-con .menu-list:nth-child(2) img{width: 4rem;}
    .menubox .menu-con .menu-list:nth-child(3) img{width: 4.5rem;}
    .menubox .menu-con .menu-list:nth-child(4) img{width: 3.8rem;}
    .menubox .menu-con .menu-list .menuicon1 {display: inline-block;}
    .menubox .menu-con .menu-list .menuicon2 {display: none;}
    .menubox .menu-con .liston {color:#05adf3;}
    .menubox .menu-con .liston .menuicon1 {display: none;}
    .menubox .menu-con .liston .menuicon2 {display: inline-block;}
</style>