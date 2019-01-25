<template>
<div :class="['s-progressring',size]">
    <p v-for="i in num" :style="{background:color}" :key="i"></p>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'progress-ring',
    data:function(){
        return {
            num: 5,
            size: "xs",
            color: ""
        }
    },
    mounted: function(){
        var el = this.$el;
        var legal = "l,m,s,xs";
        if(legal.indexOf($(el).attr("xSize"))>=0)
            this.size = $(el).attr("xSize");
        if($(el).attr("xColor")!=undefined)
            this.color = $(el).attr("xColor");
    }
}
</script>