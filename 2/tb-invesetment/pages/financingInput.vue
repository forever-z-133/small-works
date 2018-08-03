<template>
    <div class="page-input-wrap">
        <div class="page-input-box">
            <FinancingInput @submit="submit" :data="data"></FinancingInput>
        </div>
    </div>
</template>

<script>
import FinancingInput from '../components/FinancingInput.vue';

import { addFinancing } from "../plugins/ajax_zyh.js";

export default {
    components: {
        FinancingInput,
    },
    data () {
        return { data: null }
    },
    mounted() {
        var temp = window.sessionStorage.getItem('temp_financing');
        temp = JSON.parse(temp);
        var data = temp ? temp : data;
        this.data = data;
        window.sessionStorage.removeItem('backto');
    },
    methods: {
        submit (data) {

            if (!data.companyName) return this.$message.warning('请填写公司名称');
            if (!data.purpose) return this.$message.warning('请填写融资用途');
            if (!data.contacts) return this.$message.warning('请填写联系人');
            if (!data.mobile) return this.$message.warning('请填联系电话');
            
            if (!window.localStorage.getItem('userinfo')) {
                window.sessionStorage.setItem('temp_financing', JSON.stringify(data));
                this.$message.warning('请先登录');
                window.sessionStorage.setItem('backto', '/financingInput');
                return this.$router.push('/login');
            }

            data = JSON.stringify(data);
            addFinancing({paramsMap: data}).then(data => {
                if (!data) return this.$message.error('提交失败')
                this.$message.success('提交成功');
                window.sessionStorage.removeItem('temp_financing');
                this.$router.replace('/userCenter?tab=2');
            }).catch(err => {
                this.$message.error('提交失败')
            });
        }
    }
}
</script>

<style>
.page-input-wrap {
    background: #f5f5f5;
    padding: 60px 0;
    margin: -45px 0;
}
.page-input-box {
    width: 980px;
    margin: 0 auto;
    background: #fff;
}
</style>
