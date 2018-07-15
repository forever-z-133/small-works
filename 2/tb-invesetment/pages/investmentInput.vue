<template>
    <div class="page-input-wrap">
        <div class="page-input-box">
            <InvestmentInput @submit="submit" :data="data"></InvestmentInput>
        </div>
    </div>
</template>

<script>
import InvestmentInput from '../components/InvestmentInput.vue';

import { addInvestment } from "../plugins/ajax_zyh.js";

export default {
    components: {
        InvestmentInput,
    },
    data () {
        return { data: null }
    },
    mounted() {
        var temp = window.sessionStorage.getItem('temp_investment');
        temp = JSON.parse(temp);
        var data = temp ? temp : data;
        this.data = data;
        window.sessionStorage.removeItem('backto');
    },
    methods: {
        submit (data) {

            if (!data.companyName) return this.$message.warning('请填写公司名称');
            if (!data.requirements) return this.$message.warning('请填写标的要求');

            if (!window.localStorage.getItem('userinfo')) {
                window.sessionStorage.setItem('temp_investment', JSON.stringify(data));
                this.$message.warning('请先登录');
                window.sessionStorage.setItem('backto', '/investmentInput');
                return this.$router.push('/login');
            }

            data = JSON.stringify(data);
            addInvestment({paramsMap: data}).then(data => {
                if (!data) return this.$message.error('提交失败')
                this.$message.success('提交成功');
                window.sessionStorage.removeItem('temp_investment');
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
