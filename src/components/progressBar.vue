<template>
<div class="s-progressbar" :class="{normal:!tLoading}" :value="tPercent<=100?tPercent:100">
    <p v-for="i in num" :style="{background:color}" :key="i"></p>
    <i v-if="!tLoading" :style="{'width':(tPercent<=100?tPercent:100)+'%',background:color}"></i>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'progress-bar',
    props: {
        color: {
            type: String,
            default: ''
        },
        loading: {
            default: false
        },
        percent: {
            default: 0
        },
    },
    data:function(){
        return {
            num: 0,
            tLoading: false,
            tPercent: 0,
            isFinished: false
        }
    },
    mounted: function(){
        var el = this.$el;
        if($(el).attr("xColor")!=undefined)
            this.color = $(el).attr("xColor");
        if($(el).attr("xLoading")=="true")
        {
            this.tLoading = true;
            this.num = 5;
        }
    },
    watch: {
        loading (val) {
            this.tLoading = val;
        },
        percent (val) {
            this.tPercent = val;
        },
        tPercent: function () {
            this.$emit('progresschange',this.tPercent);  //@event progressChange//
        }
    }
}
</script>