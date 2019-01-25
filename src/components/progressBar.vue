<template>
<div class="s-progressbar" :class="{normal:!loading}" :value="percent<=100?percent:100">
    <p v-for="i in num" :style="{background:color}" :key="i"></p>
    <i v-if="!loading" :style="{'width':(percent<=100?percent:100)+'%',background:color}"></i>
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
            type: String,
            default: false
        },
        percent: {
            type: String,
            default: 0
        },
    },
    data:function(){
        return {
            num: 0,
            isFinished: false
        }
    },
    mounted: function(){
        var el = this.$el;
        if($(el).attr("xColor")!=undefined)
            this.color = $(el).attr("xColor");
        if($(el).attr("xLoading")=="true")
        {
            this.loading = true;
            this.num = 5;
        }
    },
    watch: {
        percent: function(){
            this.$emit('progresschange',this.percent);  //@event progressChange//
        }
    }
}
</script>