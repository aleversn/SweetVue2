<template>
<div class="flipview">
    <div class="fake-package" ref="package"><slot></slot></div>
    <transition name="fade-in">
    <div v-show="enable" class="flip-container" ref="container">

    </div>
    </transition>
    <transition name="fade-in"><p v-show="enable" class="slidebtn" style="left: 0px;" :class="{dark:xTheme=='dark'}" @click="slide_last">&#xE0E2;</p></transition>
    <transition name="fade-in"><p v-show="enable" class="slidebtn" style="right: 0px;" :class="{dark:xTheme=='dark'}" @click="slide_next">&#xE0E3;</p></transition>
    <transition name="fade-in">
    <span v-show="enable" class="bot-controller" :class="{dark:xTheme=='dark'}" ref="bot_controller">
        <p v-for="(item,index) in fakeArray" :key="index" @click="slide_index">{{item.value}}</p>
        <button @click="slider_pause">&#xE103;</button>
    </span>
    </transition>
</div>
</template>

<style lang="scss" scoped>
.flipview {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
    }
    .fake-package {
        display: none;
    }
    .flip-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        div {
            position: relative;
            min-width: 100%;
            min-height: 100%;
        }
    }
    &:hover {
        .controlbtn {
            position: absolute;
            height: 35px;
            padding: 8px;
            font-family: "Segoe MDL2";
            font-size: 13px;
            background: rgba(0, 0, 0, 0.5);
            color: rgba(242, 242, 242, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .slidebtn {
            opacity: 1;
            &.dark {
                opacity: 1;
            }
        }
    }
    .controlbtn {
        display: none;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
        &:hover {
            background: rgba(0, 0, 0, 0.8);
            color: rgba(242, 242, 242, 0.8);
        }
    }
    .slidebtn {
        position: absolute;
        top: calc(50% - 25px);
        width: 25px;
        height: 50px;
        background: rgba(0, 0, 0, 0.05);
        font-family: "Segoe MDL2";
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        cursor: pointer;
        transition: all 0.5s;
        -webkit-transition: all 0.5s, color 0.01s;
        -webkit-user-select: none;
        &:hover {
            background: rgba(0, 0, 0, 0.15);
            &.dark {
                background: rgba(242, 242, 242, 0.15);
            }
        }
        &:active {
            background: rgba(0, 120, 215, 0.6);
            color: rgba(242, 242, 242, 0.6);
            &.dark {
                background: rgba(0, 120, 215, 0.6);
                color: rgba(242, 242, 242, 0.6);
            }
        }
        &.dark {
            background: rgba(242, 242, 242, 0.05);
            color: rgba(242, 242, 242, 1);
        }
    }
    .bot-controller {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 50px;
        font-family: "Segoe MDL2";
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-user-select: none;
        * {
            margin: 1.5px;
            cursor: pointer;
        }
        &.dark {
            * {
                color: rgba(242, 242, 242, 1);
            }
        }
        button {
            width: 30px;
            height: 30px;
            background: transparent;
            font-family: "Segoe MDL2";
            border: thin;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
                background: rgba(0, 0, 0, 0.1);
                transition: all 0.3s;
                -webkit-transition: all 0.3s;
            }
            &:active {
                background: rgba(0, 0, 0, 0.15);
            }
        }
    }
}
.fade-in-enter,.fade-in-leave-to
{
    opacity: 0;
    transition: all 0.8s;
}
.fade-in-enter-to,.fade-in-leave
{
    opacity: 1;
    transition: all 0.8s;
}
</style>


<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'flipview',
    props: {
        await: {
            type: String,
            default: 'false'
        },
        xTheme: {
            type: String,
            default: 'light'
        }
    },
    watch: {
        await (val) {
            if(val == 'done' && !this.enable)
            {
                $(this.$el).ready(() => {
                    this.slider_init();
                    this.slider();
                });
            }
        }
    },
    data:function(){
        return {
            speed:1000,
            lock:true,
            enable:false,
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
        if(this.await == 'false')
        {
            this.slider_init();
            this.slider();
        }
    },
    methods:{
        slider_init: function(){
            this.length = $(this.$refs.package).children("div").length;
            $(this.$refs.container).append($(this.$refs.package).children("div").get(0));
            for(var i=0;i<this.length;i++){i==0?this.fakeArray.push({value:"\uF127"}):this.fakeArray.push({value:"\uF126"});}  //纯数组对象无法动态双向绑定//
            this.enable = true;
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