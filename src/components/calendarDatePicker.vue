<template>
<div style="position: relative; width: 295px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
    <div @click="picker">
        <searchbox placeholder="yyyy/mm/dd" xIcon="Calendar" readonly="readonly" style="width: 295px; height: 35px; border: rgba(0,0,0,0.2) solid 2px; border-radius: 0px;" :style="{border:theme?'rgba(255,255,255,0.2) solid 2px':''}"/>
    </div>
    <transition 
    v-on:before-enter="beforeEnter"
    v-on:enter="enter">
    <calendar-view v-show="show" style="margin-top:5px;" pFunc="pickDay"></calendar-view>
    </transition>
</div>
</template>

<script>
import calendarView from './calendarView.vue';
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'calendar-date-picker',
    components: {
        calendarView  
    },
    data: function(){
        return {
            show:false,
            day:{
                year:1970,
                month:1,
                date:1
            },
            theme:false
        }
    },
    mounted: function(){
        let el = this;
        let target = this.$el;
        if($(target).attr("xTheme")=="dark"){
            this.theme = true;
            this.$children[1].theme = true;
            this.$children[0].xIconColor.color = 'rgba(255,255,255,0.6)';
        }
    },
    methods: {
        picker: function(){
            this.show = !this.show;
        },
        pickDay: function(day){
            this.day = day;
            $($(this.$el).find("input").get(0)).attr('placeholder',`${this.format(day.year)}/${this.format(day.month)}/${this.format(day.date)}`);
            this.show = false;
            this.Func(day);
        },
        format: function(num){
            if(num<10)
                return '0'+num;
            else
                return num;
        },
        beforeEnter: function(target){
            $(target).css("margin-top","-25px");
            $(target).css("opacity","0");
        },
        enter: function(target,done){
            $(target).animate({
                'margin-top': '5px',
                'opacity': '1'
            },{duration:120},done);
        },
        Func: function(day){
            let el = this;
            if($(el.$el).attr("xFunc")!=undefined)
                eval(`${$(el.$el).attr("xFunc")}(day)`);
            if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el.$el).attr("pFunc")}(day)`);
            this.$emit('choosedate',day);
        }
    }
}
</script>