<template>
<div>
    <div ref="ori"><slot></slot></div>
    <div v-show="sticky" style="visibility: hidden;" ref="clone"></div>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'scroll-sticky',
    data: function(){
        return {
            sticky: false,
            left: 0,
            top: 0,
            outerWidth: 0,
            offset: 0,
            css: ''
        }
    },
    mounted: function(){
        let el = this.$el;
        let target = this;
        let item = $(this.$refs.ori).children("*").get(0);
        
        this.top = item.offsetTop;
        this.left = $(item).offset().left;
        this.outerWidth = $(item).width();
        if($(el).attr("xOuterWidth")=="true")
            this.outerWidth = $(item).outerWidth();
        this.css = $(item).attr("style")==undefined?"":$(item).attr("style");
        
        if($(el).attr("xOffset")!=undefined)
            this.offset = $(el).attr("xOffset");
        else
            this.offset = 0;
        $(this.$refs.clone).attr("style",$(item).attr("style"));
        $(this.$refs.clone).attr("class",$(item).attr("class"));
        $(document).scroll(function(){
            if(window.scrollY>target.top-target.offset)
            {
                target.sticky = true;
                $(item).css("position","fixed");
                $(item).css("left",target.left+"px");
                $(item).css("top",target.offset + "px");
                $(item).width(target.outerWidth);
            }
            else
            {
                target.sticky = false;
                $(item).attr("style",target.css);
            }
        });
    }
}
</script>