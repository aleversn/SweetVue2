<template>
<div class="fly-out">
    <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
    <div v-show="show" class="flyobj" :style="{'top':offset}" :class="[customerClass]" ref="flyobj" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <slot name="flyout"></slot>
    </div>
    </transition>
    <div @mouseenter="mouseenter" @mouseleave="mouseleave"><slot name="target"></slot></div>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'flyout',
    data: function(){
        return {
            show:false,
            theme:false,
            customerClass:'',
            toward:"up"
        }
    },
    mounted: function(){
        let el = this;
        let target = this.$el;
        if($(target).attr("xToward")!=undefined){
            this.toward=$(target).attr("xToward");
        }
        if(target.offsetTop-document.body.scrollTop<$(el.$refs.flyobj).height()){
            el.toward='down';
        }
        if($(target).attr("xFlyoutStyle")!=undefined){
            this.customerClass=$(target).attr("xFlyoutStyle");
        }
        if($(el).attr("xTheme")=="dark")
        {
            this.theme = true;
        }
        this.correct();
    },
    computed:{
        offset: function(){
            return this.toward=='down'?'100%':'-100%';
        }
    },
    methods: {
        mouseenter: function(){
            this.show = true;
        },
        mouseleave: function(){
            this.show = false;
        },
        beforeEnter: function(target){
            switch(this.toward){
                case "down":
                $(target).css("margin-top","-25px");
                target.style.opacity = 0;
                break;
                default:
                $(target).css("margin-top","25px");
                target.style.opacity = 0;
                break;
            }
        },
        enter: function(target,done){
            $(target).animate({
                'margin-top': '0px',
                'opacity': '1'
            },{duration:120},done);
        },
        leave: function(target,done){
            switch(this.toward){
                case "down":
                $(target).animate({
                    'margin-top': '-25px',
                    'opacity': '0'
                },{duration:50},done);
                break;
                default:
                $(target).animate({
                    'margin-top': '25px',
                    'opacity': '0'
                },{duration:50},done);
                break;
            }
        },
        correct: function(){    //校正朝向使得用户总能看到Flyout//
            let el = this;
            let target = this.$el;
            $(window).scroll(function(){
                if(target.offsetTop-document.body.scrollTop<$(el.$refs.flyobj).height()){
                    el.toward='down';
                }
                else
                    el.toward=$(target).attr("xToward");
            });
        }
    }
}
</script>