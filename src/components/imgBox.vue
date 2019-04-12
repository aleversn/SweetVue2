<template>
<div class="imgBox" :style="{background:onbackground?'url('+imgUri.data+') no-repeat':''}">
    <div v-show="imgUri.state!='done'" class="content">
        <progress-bar v-show="imgUri.state=='none'" xLoading="true" style="width: 100%;"></progress-bar>
        <progress-ring v-show="imgUri.state=='loading'"></progress-ring>
    </div>
    <transition name="fade-in">
        <img v-if="imgUri.state=='done'&&!onbackground" draggable="false" alt="" :src="imgUri.data"/>
    </transition>
</div>
</template>

<style lang="scss">
.imgBox
{
    position: relative;
    width: 300px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    .content
    {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
    img
    {
        width: 100%;
        height: auto;
        z-index: -1;
    }

    .fade-in-enter,.fade-in-leave-to
    {
        opacity: 0;
        filter: blur(8px);
        transition: all 0.8s;
    }
    .fade-in-enter-to,.fade-in-leave
    {
        opacity: 1;
        filter: blur(0px);
        transition: all 0.8s;
    }
}
</style>



<script>
import $ from '../js/jquery-3.2.1.min.js';
import progressRing from './progressRing.vue';
import { mapState } from 'vuex'

export default {
    name: 'imgbox',
    components: {
        progressRing
    },
    props: {
        url: {
            type: String,
            default: ''
        },
        onbackground: {
            type: String,
            default: false
        }
    },
    data () {
        return {
            xhr: false,
            formatTimer: null
        }
    },
    computed: {
        imgUri () {
            if(this.$SweetStore.getters.imgUri(this.url)==undefined)
                return {data:'',key:this.url,state:'none'};
            return this.$SweetStore.getters.imgUri(this.url);
        }
    },
    watch: {
        url () {
            if(this.xhr != false)
                this.xhr.abort();
            if(this.url!='')
                this.LoadingImg();
        }
    },
    mounted () {
        if(this.url!='')
            this.LoadingImg();
    },
    methods:{
        LoadingImg () {
            if(this.imgUri.state=='none'){
                this.$SweetStore.commit('setImgUri',{
                    data:'',
                    key:this.url,
                    state:'loading'
                });
                this.getUrlImg(this.url);
            }
            clearInterval(this.formatTimer);
            this.formatTimer = setInterval(() => {
                if((this.imgUri.data == undefined || this.imgUri.data.length == 0) && (this.imgUri.state == 'none' || this.imgUri.state == 'done'))
                {
                    this.$store.commit('setImgUri',{
                        data: '',
                        key: this.xId,
                        state: 'loading'
                    });
                    this.getUrlImg();
                }
            },3000);
        },
        getUrlImg (url) {
            let xhr = new XMLHttpRequest();
            xhr.open("get",url,true);
            xhr.responseType = "blob";
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let blob = xhr.response;
                    let FR = new FileReader();
                    FR.onload = (event) => {
                        let base64 = event.target.result;
                        this.UpdateStore(base64);
                    }
                    FR.readAsDataURL(blob);
                }
                else if (xhr.readyState == 4) {
                    
                }
            }
            xhr.send();
            this.xhr = xhr;
        },
        UpdateStore (base64) {
            this.$SweetStore.commit('setImgUri',{
                data:base64,
                key:this.url,
                state:'done'
            });
        },
        Func: function(){
            let el = this;
            if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el.$el).attr("pFunc")}('${$(el.$el).attr("value")}',${this.isCheck})`);
        }
    },
    beforeDestroy () {
        clearInterval(this.formatTimer);
    }
}
</script>