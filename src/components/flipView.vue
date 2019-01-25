<template>
<div class="flipview">
    <div class="fake-package" ref="package"><slot></slot></div>
    <div class="flip-container" ref="container">

    </div>
    <p class="slidebtn" style="left: 0px;" @click="slide_last">&#xE0E2;</p>
    <p class="slidebtn" style="right: 0px;" @click="slide_next">&#xE0E3;</p>
    <span class="bot-controller" ref="bot_controller">
        <p v-for="(item,index) in fakeArray" :key="index" @click="slide_index">{{item.value}}</p>
        <button @click="slider_pause">&#xE103;</button>
    </span>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'flipview',
    data:function(){
        return {
            speed:1000,
            lock:true,
            timer:null,
            count:0,
            length:0,
            fakeArray:new Array(),
            pause:false,
            period:5000
        }
    },
    mounted: function(){
        var el = this.$el;
        if($(el).attr("xSpeed")>0)
            this.speed = $(el).attr("xSpeed");
        if($(el).attr("xPeriod")>0)
            this.period = $(el).attr("xPeriod");
        if($(el).attr("xTheme")=="dark")
        {
            $(el).find(".slidebtn").attr("class","slidebtn dark");
            $(el).find(".bot-controller").attr("class","bot-controller dark");
        }
        this.slider_init();
        this.slider();
    },
    methods:{
        slider_init: function(){
            this.length = $(this.$refs.package).children("div").length;
            $(this.$refs.container).append($(this.$refs.package).children("div").get(0));
            for(var i=0;i<this.length;i++){i==0?this.fakeArray.push({value:"\uF127"}):this.fakeArray.push({value:"\uF126"});}  //纯数组对象无法动态双向绑定//
        },
        slide_next: function(f=1.0){
            if(this.lock){  //控制slider的异步等待//
                var el = this;  //用el来引用this以便在setTimeout方法中调用this.lock//不允许直接引用this.lock成员变量原因尚不明确(因为成员变量非静态?)//
                el.lock = false;
                this.counton(); //计数器加一//
                var container = this.$refs.container;   //渲染容器//
                var package_ = this.$refs.package;   //假仓库容器//
                var speed = f>0?Math.round(this.speed/f):this.speed;
                $(package_).children("div").css("margin","0px"); //清除假仓库中的Margin//
                $(container).append($(package_).children("div").get(0));
                $($(container).children("div").get(0)).animate({
                    margin:"0px 0px 0px -100%"
                },{ duration: speed, easing: "swing" });
                setTimeout(function(){
                    $(package_).append($(container).children("div").get(0));
                    el.lock = true;
                    el.slider();   //恢复时钟秩序//
                },speed);
            }
        },
        slide_last: function(f=1.0){
            if(this.lock){
                var el = this;
                el.lock = false;
                this.countdis();    //计数器减一//
                var container = this.$refs.container;
                var package_ = this.$refs.package;
                var speed = f>0?Math.round(this.speed/f):this.speed;
                $(package_).children("div").css("margin","0px"); //清除假仓库中的Margin//
                $($(container).children("div").get(0)).before($(package_).children("div:last-child"));
                $($(container).children("div").get(0)).css("margin","0px 0px 0px -100%");
                $($(container).children("div").get(0)).animate({
                    margin:"0px 0px 0px 0px"
                },{ duration: speed, easing: "swing" });
                setTimeout(function(){
                    $($(package_).children("div").get(0)).before($(container).children("div:last-child"));
                    el.lock = true;
                    el.slider();   //恢复时钟秩序//
                },speed);
            }
        },
        slide_index: function(e){   //理论上无畏惧异步冲突//由于不同次触发函数均为右移或左移//remain加和一定等于最终值//如果真出现问题可在data设全局timer来控制异步等待//
            var remain = $(e.target).index() - this.count;
            var remain_static = Math.abs($(e.target).index() - this.count);
            var el = this;
            var timer = setInterval(function(){
                if(el.lock){
                    if(remain<0)
                    {
                        el.slide_last(remain_static);
                        remain++;
                    }
                    else if(remain>0)
                    {
                        el.slide_next(remain_static);
                        remain--;
                    }
                    else
                        clearInterval(timer);
                }
            },10);
        },
        slider: function(){
            clearInterval(this.timer);
            var el = this;
            this.timer = setInterval(function(){
                el.slide_next();
            },el.period);
        },
        slider_pause: function(e){
            if(this.pause)
            {
                this.slider();
                this.pause = false;
                e.target.innerHTML = "\uE103";
            }
            else
            {
                clearInterval(this.timer);
                this.pause = true;
                e.target.innerHTML = "\uE102";
            }
        },
        counton: function(){
            if(this.count>=this.length-1)
            {
                this.fakeArray[this.count].value = "\uF126";
                this.count = 0;
                this.fakeArray[this.count].value = "\uF127";
            }
            else
            {
                this.fakeArray[this.count].value = "\uF126";
                this.count++;
                this.fakeArray[this.count].value = "\uF127";
            }
        },
        countdis: function(){
            if(this.count<=0)
            {
                this.fakeArray[this.count].value = "\uF126";
                this.count = this.length-1;
                this.fakeArray[this.count].value = "\uF127";
            }
            else
            {
                this.fakeArray[this.count].value = "\uF126";
                this.count--;
                this.fakeArray[this.count].value = "\uF127";
            }
        }
    }
}
</script>