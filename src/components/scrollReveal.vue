<template>
<div style="position: relative;">
    <transition :name="animateCss">
    <div v-show="show"><slot></slot></div>
    </transition>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'scroll-reveal',
    data: function(){
        return {
            bodyTop:0,
            elTop:0,
            webVisualHeight:0,
            animateCss:"",
            offset:0,
            mode:"default",
            show:false
        }
    },
    mounted: function(){
        let el = this;
        let target = this.$el;
        window.addEventListener('scroll',function(){
            el.bodyTop = document.body.scrollTop;
            el.elTop = target.offsetTop;
            el.webVisualHeight = $(window).height();
            switch(el.mode){
                case "upNdown":
                el.upNdownAnimate();
                break;
                case "once":
                el.onceAnimate();
                break;
                default:
                el.defaultAnimate();
                break;
            }
        });
        if($(target).attr("xAnimate")!=undefined){
            this.animateCss = $(target).attr("xAnimate");
        }
        if($(target).attr("xOffset")!=undefined){
            this.offset = $(target).attr("xOffset") * 1;
        }
        if($(target).attr("xMode")!=undefined){
            this.mode = $(target).attr("xMode");
        }
    },
    methods: {
        defaultAnimate: function(){
            let el = this;
            if(el.bodyTop+el.webVisualHeight+el.offset>=el.elTop){
                el.show = true;
            }
            else
                el.show = false;
        },
        upNdownAnimate: function(){
            let el = this;
            if(el.bodyTop+el.webVisualHeight+el.offset>=el.elTop&&el.bodyTop+el.offset<el.elTop){
                el.show = true;
            }
            else
                el.show = false;
        },
        onceAnimate: function(){
            let el = this;
            if(el.bodyTop+el.webVisualHeight+el.offset>=el.elTop){
                el.show = true;
            }
        }
    }
}
</script>