<template>
<div class="parallax-view" ref="main">
    <div class="container" :class="{light:!theme}" ref="container">
        <slot></slot>
    </div>
    <img :src="source" class="bg" ref="bg" :style="{'margin-top':-ratio+'px',filter:acrylic?'blur(15px)':'none'}"/>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'parallax-view',
    data: function(){
        return {
            source: '',
            dis_bg: 0,
            dis_container: 0,
            ratio: 0,
            acrylic: false,
            theme: true
        }
    },
    mounted: function(){
        let el = this.$el;
        if($(el).attr("xSource")!=undefined)
        {
            this.source = $(el).attr("xSource");
            this.$refs.bg.onload = () => {
                this.dis_bg = this.$refs.bg.offsetHeight - this.$refs.main.clientHeight;
                this.dis_container = this.$refs.container.scrollHeight - this.$refs.main.clientHeight;
                let target = this;
                this.$refs.container.addEventListener("scroll",function(){
                    target.ratio = target.$refs.container.scrollTop / target.dis_container * target.dis_bg;
                });
            }
        }
        if($(el).attr("xAcrylic")=="true")
        {
            this.acrylic = true;
        }
        if($(el).attr("xTheme")=="light")
        {
            this.theme = false;
        }
    }
}
</script>