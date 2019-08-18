<template>
<div class="s-progressbar" :class="{normal:!loading}" :value="tPercent<=100?tPercent:100">
    <p v-for="i in num" :style="{background:color}" :key="i"></p>
    <i v-if="!loading" :style="{'width':(tPercent<=100?tPercent:100)+'%',background:color}"></i>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'progress-bar',
    props: {
        color: {
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
            num: 5,
            tPercent: 0,
            isFinished: false
        }
    },
    mounted: function(){
        var el = this.$el;
    },
    watch: {
        percent (val) {
            this.tPercent = val;
        },
        tPercent: function () {
            this.$emit('progresschange',this.tPercent);  //@event progressChange//
        }
    }
}
</script>