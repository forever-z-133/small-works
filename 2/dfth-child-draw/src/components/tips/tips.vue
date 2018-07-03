<template>
    <div :class="['tips',{'tipsoff':tipsoff}]">
        <p class="p1">{{msg}}</p>
    </div>
</template>

<script>
    export default{
        props:['msg','msgshow'],
        data(){
            return{
                tipsoff:true
            }
        },
        created(){
            setTimeout(()=> {
                this.tipsoff=false
            }, 3000);
        }
    }
</script>

<style scoped>
    .tips {width: 100%;height: 100%;z-index:-1;position: fixed;left: 0;top: 0;display: flex;justify-content: center;
    align-items: center;transition:all ease 0.5s;opacity: 0;}
    .tips .p1 {font-size: 3rem;color:#fff;padding:1.5rem 2.5rem;background: rgba(0,0,0,0.5);border-radius:1.5rem;}
    .tipsoff {z-index:3000;opacity: 1;}
</style>