<template>
    <section class="investment-input-wrap zyh-input-wrap">
        <div class="input-wrap-head">
            <div class="section-title">找标的</div>
        </div>
        <form @submit.prevent="submit" class="zyh-input-wrap-body">
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-company"></i>
                        <input name="contact" v-model="input.companyName" placeholder="公司名称" autocomplete="off">
                        <label class="zyh-checkbox"><input type="checkbox" v-model="input.companyStatus" /><i></i>不公开</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <select class="zyh-select" v-model="input.acquirerType">
                            <option value="" hidden disabled>收购方类型</option>
                            <option value="1" label="上市公司"></option>
                            <option value="2" label="非上市公司"></option>
                            <option value="3" label="私募基金"></option>
                            <option value="4" label="个人投资者"></option>
                            <option value="5" label="其他"></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box">
                        <select class="zyh-select" v-model="input.acquisitionMode">
                            <option value="" hidden disabled>收购方式</option>
                            <option value="1">参股收购</option>
                            <option value="2">控股收购</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <select class="zyh-select" v-model="input.acquisitionType">
                            <option value="" hidden disabled>收购类型</option>
                            <option value="1" label="战略投资"></option>
                            <option value="2" label="财务投资"></option>
                            <option value="3" label="同业并购"></option>
                            <option value="4" label="产业链并购"></option>
                            <option value="5" label="其他"></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box">
                        <input name="contact" v-model="input.license" placeholder="上传执照" readonly>
                        <button class="form-input"><i class="icon icon-upload"></i><input type="file" @input="upload($event, 'license')"></button>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-user"></i>
                        <input name="contact" v-model="input.contacts" placeholder="联系人" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box min-height">
                        <textarea placeholder="请简述您的标的要求" v-model="input.requirements" @input="justifyLength('requirements', 120, $event)"></textarea>
                        <span class="input-length">0/120</span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-tel"></i>
                        <input name="contact" v-model="input.mobile" type="tel" placeholder="联系电话" autocomplete="off">
                    </div>
                    <div class="input-box">
                        <label class="zyh-checkbox">
                            <input type="checkbox" v-model="input.agreement" /><i></i>
                            <span class="agreement">同意《<a href="javascript:;" class="reset" @click="visible=true">头豹网信息发布协议</a>》</span>
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-submit zyh-btn-big">提交</button>
        </form>
        <AgreementDialog :visible.sync="visible"></AgreementDialog>
    </section>
</template>

<script>
import AgreementDialog from "../components/AgreementDialog.vue";

import utils from '../plugins/utils.js';
import { ajaxUpload } from '../plugins/ajax_zyh.js';

export default {
    components: {
        AgreementDialog,
    },
    props: ['data'],
    data() {
        return {
            input: this.data || {
                adType: 1,
                companyName: '',
                companyStatus: false,
                acquisitionType: '',  // 收购类型
                acquisitionMode: '',  // 收购方式
                acquirerType: '', // 收购方类型
                license: '',
                contacts: '',
                requirements: '',
                mobile: '',
                agreement: true
            },
            visible: false,
        }
    },
    mounted() {
        setTimeout(() => {
            if (!this.data) return;
            this.input = this.data;
        }, 0)
    },
    methods: {
        justifyLength(key, max, e) {
            var value = e.target.value
            var length = value.length;
            if (length > max) {
                this.input[key] = value.slice(0, max);
                length = max;
            }
            e.target.nextSibling.innerText = length + '/' + max;
        },
        submit (e) {
            var data = {...this.input};
            data = utils.decodeForXSS(data);
            this.$emit('submit', data);
        },
        upload: function(e, key) {
            var files = e.target.files;
            var loading = this.$loading({ fullscreen: true });
            utils.uploadImage.call(this, files).then(url => {
                url = utils.addSrcPrefix(url, this.imgbaseurl);
                this.input[key] = url;
                e.target.value = '';
                loading.close();
            }).catch(err => {
                e.target.value = '';
                loading.close();
                this.$message.error(err.message || err.msg);
            });
        },
    }
}
</script>

<style lang="less" scoped>
.icon:not(.icon-upload) {
    margin-right: 10px;
}
.investment-input-wrap {
    padding-bottom: 40px;

    .input-wrap-head {
        margin-bottom: 60px;
    }
    .zyh-btn-big {
        margin-top: 20px;
    }
    .agreement {
        color: #333;
        a {
            text-decoration: underline;
        }
    }
}
</style>

<style lang="less">
.investment-input-wrap {
    @import "../assets/css/var";
    .el-radio__inner {
        border-color: @color !important;
        background: @color !important;
    }
    .el-radio__label {
        color: @color !important;
    }
}
</style>
