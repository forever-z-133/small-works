<template>
    <section class="financing-input-wrap zyh-input-wrap">
        <div class="input-wrap-head">
            <div class="section-title">找融资</div>
        </div>
        <form @submit.prevent="submit" class="zyh-input-wrap-body">
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-company"></i>
                        <input name="contact" v-model="input.companyName" placeholder="公司名称" @input="justifyLength('companyName', 100, $event)" autocomplete="off">
                        <label class="zyh-checkbox"><input type="checkbox" v-model="input.companyStatus" /><i></i>不公开</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-user"></i>
                        <input name="contact" v-model="input.contacts" placeholder="联系人"  @input="justifyLength('contacts', 100, $event)" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box min-height">
                        <textarea placeholder="公司简介" v-model="input.resume" @input="justifyLength('resume', 120, $event)"></textarea>
                        <span class="input-length">0/120</span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-tel"></i>
                        <input name="contact" v-model="input.mobile" type="tel" placeholder="联系电话" autocomplete="off">
                    </div>
                    <div class="input-box">
                        <select class="zyh-select" v-model="input.turn">
                            <option value="" hidden disabled>融资轮</option>
                            <option value="1">天使轮</option>
                            <option value="2">PreA轮融资</option>
                            <option value="3">A轮融资</option>
                            <option value="4">B轮融资</option>
                            <option value="5">C轮融资</option>
                            <option value="6">D轮融资</option>
                            <option value="7">E轮融资</option>
                            <option value="8">PreIPO</option>
                            <option value="9">其他</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box">
                        <select class="zyh-select" v-model="input.industrie">
                            <option value="" hidden disabled>行业</option>
                            <template v-for="(item, index) in industyArr">
                                <option :value="item.id" :index="index" :key="index">{{item.name}}</option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <img :src="input.BP" v-if="input.BP" width="75" height="45">
                        <input name="contact" v-model="input.BP" placeholder="上传BP" readonly>
                        <label class="zyh-checkbox"><input type="checkbox" v-model="input.BPStatus" /><i></i>不公开</label>
                        <button class="form-input upload-bp"><i class="icon icon-upload"></i><input type="file" @change="upload($event, 'BP')"></button>
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box">
                        <img :src="input.license" v-if="input.license" width="75" height="45">
                        <input name="contact" v-model="input.license" placeholder="上传执照" readonly>
                        <button class="form-input"><i class="icon icon-upload"></i><input type="file" @change="upload($event, 'license')"></button>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-box">
                        <i class="icon icon-safe"></i>
                        <input name="contact" type="number" min="0" v-model="input.amount" placeholder="规模" autocomplete="off">
                        <label class="units">百万元</label>
                    </div>
                </div>
            </div>
            <div class="rowline">
                <div class="form-group">
                    <div class="input-box min-height">
                        <textarea placeholder="请简述您的融资用途" v-model="input.purpose" @input="justifyLength('purpose', 120, $event)"></textarea>
                        <span class="input-length">0/120</span>
                    </div>
                </div>
                <div class="form-group">
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

import { getIndustyList } from '../plugins/ajax_zyh.js'
import { decodeForXSS, uploadImage, addSrcPrefix } from '../plugins/utils.js';

export default {
    components: {
        AgreementDialog
    },
    props: ['data'],
    data() {
        return {
            input: this.data || {
                adType: '0',
                companyName: '',
                companyStatus: '',
                contacts: '',
                resume: '',
                mobile: '',
                turn: '',
                industrie: '',
                BP: '',
                BPStatus: '',
                license: '',
                amount: '',
                purpose: '',
                agreement: true
            },
            industyArr: [],
            visible: false,
        }
    },
    mounted() {
        setTimeout(() => {
            if (!this.data) return;
            this.input = this.data;
        }, 0)
    },
    created() {
        getIndustyList().then(data => {
            this.industyArr = data;
        });
    },
    methods: {
        justifyLength(key, max, e) {
            var value = e.target.value
            var length = value.length;
            if (length > max) {
                this.input[key] = value.slice(0, max);
                length = max;
            }
            var $text = e.target.parentNode.querySelector('span')
            if($text) $text.innerText = length + '/' + max;
        },
        submit (e) {
            var data = {...this.input};
            data = decodeForXSS(data);
            this.$emit('submit', data);
        },
        upload: function(e, key) {
            var files = e.target.files;
            for (var i in files) {
                if (files[i].size > 1 * 1024 * 1024) {
                    return this.$message.warning('上传文件大小请小于 1M。');
                }
            }
            var loading = this.$loading({ fullscreen: true });
            uploadImage.call(this, files).then(url => {
                url = addSrcPrefix(url, this.imgbaseurl);
                this.input[key] = url;
                e.target.value = '';
                this.$message.success('上传成功');
                loading.close();
            }).catch(err => {
                e.target.value = '';
                console.log(err);
                loading.close();
                this.$message.warning(err);
            });
        },
    }
}
</script>

<style lang="less" scoped>
img {
    flex-shrink: 0;
}
input[readonly] {
    margin: 0 8px;
}
.icon:not(.icon-upload) {
    margin-right: 10px;
}
.financing-input-wrap {
    padding-bottom: 60px;
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
.upload-bp {
    flex-shrink: 0;
    margin-left: 15px;
    padding: 5px 0 5px 15px;
    border-left: 1px solid #ddd;
}
</style>
