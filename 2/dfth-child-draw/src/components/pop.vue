<template>
    <div :class="['pop',{popoff:message}]">
        <div class="p1">
            <slot name="pop">
                弹窗测试
            </slot>
        </div>
    </div>
</template>

<script>
    export default{
        props:['message'],
        data(){
            return{

            }
        },
        created(){

        }
    }
</script>

<style scoped>
    .pop {position: fixed;width: 100%;height: 100%;top: 0;left: 0;z-index:100;display: flex;justify-content: center;align-items:center;
    transition:all ease 0.5s;opacity: 1;z-index:1001;}
    .popoff {opacity: 0;z-index:-1;}
    .pop .p1 {height: 8rem;line-height: 8rem;color:#fff;background: rgba(0,0,0,0.5);font-size: 2.6rem;
    padding:0 3rem;border-radius:1.2rem;}
</style>