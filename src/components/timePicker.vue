<template>
<div class="date-picker">
    <div class="date-picker-input" :class="{dark:theme}" @click="show=!show">
        <p style="width: 50%; border-right: rgba(0,0,0,0.2) solid 1px;">{{time.hour}}</p>
        <p style="width: 50%; border-right: rgba(0,0,0,0.2) solid 1px;">{{time.minute}}</p>
    </div>
    <transition 
    v-on:before-enter="beforeEnter"
    v-on:enter="enter">
    <div v-show="show" class="date-picker-container" :class="{dark:theme}" :style="{'z-index':show?500:''}">
        <div style="width: 100%; height: 100%; display: flex;">
            <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 50%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerHour">
                <p v-for="(item,index) in hourWheel" :key="index" @click="clickHour(index)">{{item}}</p>
                <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
            </div>
            <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 50%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerMinute">
                <p v-for="(item,index) in minuteWheel" :key="index" @click="clickMinute(index)">{{item}}</p>
                <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
            </div>
        </div>
        <div style="height: 40px; display: flex; align-items: center;">
            <button class="sbutton" :class="{black:theme}" style="width: 100%; height: 40px; font-family: Segoe MDL2;" @click="confirm">&#xE0E7;</button>
            <button class="sbutton" :class="{black:theme}" style="width: 100%; height: 40px; font-family: Segoe MDL2;" @click="cancel">&#xE106;</button>
        </div>
    </div>
    </transition>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'time-picker',
    data: function(){
        return {
            show:false,
            theme:false,
            hourWheel:[0,1,2,3,4,5,6],
            minuteWheel:[0,1,2,3,4,5,6],
            hourRange:{s:0,e:6},
            minuteRange:{s:0,e:6},
            time:{
                hour:new Date().getHours(),
                minute:new Date().getMinutes()
            },
            temple:null
        }
    },
    mounted: function(){
        // window.addEventListener('scroll',this.scroller);
        let el = this;
        let target = this.$el;
        $(document).on("click",function(e){
            if(el.show&&$(e.target).parents(".date-picker").length<=0){
                el.cancel();
            }
        });
        if($(target).attr("xTheme")=="dark"){
            this.theme = true;
        }
        this.init();
    },
    watch: {
        show: function(val){
            if(val)
                this.temple = {hour:this.time.hour,minute:this.time.minute};
        }
    },
    methods: {
        init: function(){
            this.hourRange={s:this.Mode((this.time.hour-3),24),e:this.Mode((this.time.hour+3),24)};
            this.minuteRange={s:this.Mode((this.time.minute-3),60),e:this.Mode((this.time.minute+3),60)};
            for(let i = 0; i < 7; i++){
                Vue.set(this.hourWheel,i,this.Mode((this.hourRange.s+i),24));
                Vue.set(this.minuteWheel,i,this.Mode((this.minuteRange.s+i),60));
            }
        },
        scrollerHour: function(event){
            let toward = event.wheelDelta > 0 ? 'up' : 'down';
            event.preventDefault();
            switch(toward){
                case 'up':
                this.hourWheel.splice(6,1);
                if(this.hourRange.s==0)
                    this.hourRange.s=23;
                else
                    this.hourRange.s--;
                if(this.hourRange.e==0)
                    this.hourRange.e=23;
                else
                    this.hourRange.e--;
                this.hourWheel.unshift(this.hourRange.s);
                break;
                case 'down':
                this.hourWheel.splice(0,1);
                if(this.hourRange.s==23)
                    this.hourRange.s=0;
                else
                    this.hourRange.s++;
                if(this.hourRange.e==23)
                    this.hourRange.e=0;
                else
                    this.hourRange.e++;
                this.hourWheel.push(this.hourRange.e);
                break;
            }
            this.time.hour = (this.hourRange.s + 3) % 24;
        },
        scrollerMinute: function(event){
            let toward = event.wheelDelta > 0 ? 'up' : 'down';
            event.preventDefault();
            switch(toward){
                case 'up':
                this.minuteWheel.splice(6,1);
                if(this.minuteRange.s==0)
                    this.minuteRange.s=59;//31/30//
                else
                    this.minuteRange.s--;
                if(this.minuteRange.e==0)
                    this.minuteRange.e=59;
                else
                    this.minuteRange.e--;
                this.minuteWheel.unshift(this.minuteRange.s);
                break;
                case 'down':
                this.minuteWheel.splice(0,1);
                if(this.minuteRange.s==59)
                    this.minuteRange.s=0;
                else
                    this.minuteRange.s++;
                if(this.minuteRange.e==59)
                    this.minuteRange.e=0;
                else
                    this.minuteRange.e++;
                this.minuteWheel.push(this.minuteRange.e);
                break;
            }
            this.time.minute = (this.minuteRange.s + 3) % 60;
        },
        clickHour: function(index){
            this.time.hour = this.Mode(this.hourRange.s + index,24);
            this.init();
        },
        clickMinute: function(index){
            this.time.minute = this.Mode(this.minuteRange.s + index,60);
            this.init();
        },
        Mode: function(num,mod){    //标准模运算
            if(num>0)
                return num % mod;
            else
                return mod + num % mod;
        },
        confirm: function(){
            this.show = false;
            this.Func(this.time);
        },
        cancel: function(){
            this.show = false;
            this.time = this.temple;
            this.init();
        },
        beforeEnter: function(target){
            $(target).css("padding","150px");
            $(target).css("opacity","0");
        },
        enter: function(target,done){
            $(target).animate({
                'padding': '0px',
                'opacity': '1'
            },{duration:300},done);
        },
        Func: function(day){
            let el = this;
            if($(el.$el).attr("xFunc")!=undefined)
                eval(`${$(el.$el).attr("xFunc")}(day)`);
            if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el.$el).attr("pFunc")}(day)`);
        }
    }
}
</script>