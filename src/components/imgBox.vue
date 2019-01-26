<template>
<div class="imgBox" :style="{background:onbackground?'url('+imgUri.data+') no-repeat':''}">
    <progress-ring v-show="imgUri.state=='loading'"></progress-ring>
    <img v-show="imgUri.state=='done'&&!onbackground" alt="" :src="imgUri.data"/>
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
    img {
        width: 100%;
        height: auto;
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
    }
}
</script>