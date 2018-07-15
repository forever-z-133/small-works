<template>
    <el-dialog class="agreement-dialog margin-back" :visible.sync="visible">
        <div class="input-wrap-head">
            <div class="section-title">头豹网发布信息协议</div>
        </div>
        <div class="zyh-input-wrap-body">
            <article class="article-wrap">
                <h4>第一条　信息发布管理规定</h4>
            　　<p>一、连入校园网的单位所有工作人员和用户必须遵守执行国家有关计算机网络管理的法律和法规。《中华人民共和国计算机信息网络国际联网络管理暂行规定》；《中国教育和科研计算机网用户守则（试行）》；《中国教育和科研计算机网暂行管理办法》。严格执行安全保密制度，并对所发布信息承担法律责任。</p>
            　　<p>二、校园网的所有工作人员和用户不得利用计算机连网从事危害国家安全，泄露国家秘密的犯罪活动，不得制作、查阅、复制和传播有碍社会治安和有伤风化的信息。</p>
            　　<p>三、信息发布的内容要符合学院对外宣传的规定和要求，涉及国家机密的信息严禁上网。不允许在校园网络上发布商业性广告和不真实的信息，散布计算机病毒以及以不真实的身份使用网络资源等。 </p>
            　　<p>四、各信息发布单位必须遵守知识产权的有关法律法规，规定至少一名网络管理员对本单位的网络进行严格管理，负责相应的网络设备和信息安全工作。</p>
            　　<p>五、各信息发布单位自主发布的WEB内容在发布以前应使用正版杀毒软件查杀病毒，不得将含有病毒的WEB页面发布。同时应将所发布的内容存档保存一年，以备公安部门的检查。</p>
            　　<p>六、信息发布单位有义务向上一级网络中心和有关部门报告网络上的违法犯罪行为和有害信息。</p>

            　　<h4>第二条　技术分工</h4>
            　　<p>一、甲方负责提供乙方网络信息发布的空间和初始发布密码，对乙方发布信息的过程提供技术支持。</p>
            　　<p>二、乙方有责任保证发布密码的安全性，并定期更改此密码。如因密码管理不善并由此发生的网络安全事件，乙方将承担由此引发的全部责任。</p>

            　　<h4>第三条　违章处理</h4>
            　　<p>一、甲方将对违反本协议的网络信息自主发布单位进行适当处罚。例如警告，取消信息自主发布资格，停止网络连接等。</p>
            　　<p>二、乙方如有超出甲方处罚范围之外的违规行为，甲方有义务配合相应管理部门对乙方进行处理。</p>
            </article>
        </div>
        <button class="btn btn-red zyh-btn-big" @click="close">确认</button>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: { type: Boolean, default: false },
    },
    methods: {
        close (done) {
            this.$emit('update:visible', false)
        },
    }
}
</script>

<style lang="less" scoped>
.article-wrap {
    max-height: 400px;
    overflow: auto;

    h4 {
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    p {
        margin-bottom: 10px;
    }
}
</style>
