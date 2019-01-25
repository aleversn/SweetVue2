<template>
<div class="calendar-view" :class="{dark:theme}" :style="{background:themeColor}">
    <div class="control-bar">
        <transition-group name="switcher">
        <p v-show="status==0" class="switcher" :class="{dark:theme}" :key="0">{{barCurrent.yearRing}} - {{barCurrent.yearRing+10}}</p>
        <p v-show="status==1" class="switcher" :class="{dark:theme}" :key="1" @click="backYear">{{barCurrent.year}}年</p>
        <p v-show="status==2" class="switcher" :class="{dark:theme}" :key="2" @click="backMonth">{{barCurrent.year}}年{{barCurrent.month}}月</p>
        </transition-group>
        <div class="slider-bar" :class="{dark:theme}">
            <p @click="slideUp">&#xE098;</p>
            <p @click="slideDown">&#xE099;</p>
        </div>
    </div>
    <div style="width: 100%; height: 280px;">
        <transition-group name="pickerContainer">
        <div v-show="status==0" class="pickerContainer years" key="p0" ref="p0">
            <button v-for="(year,index) in years" :class="{preview:index>10,dark:theme,choose:year==current.year}" :key="index" @click="pickYear(year)">{{year}}</button>
        </div>
        <div v-show="status==1" class="pickerContainer months" key="p1" ref="p1">
            <button v-for="(month,index) in months" :class="{preview:index>11,dark:theme,choose:month==current.month&&barCurrent.year==current.year}" :key="index" @click="pickMonth(index)">{{month}}月</button>
        </div>
        <div v-show="status==2" class="pickerContainer days" key="p2" ref="p2">
            <button class="weekday" :class="{dark:theme}" v-for="(weekday,index) in weekdays" :key="index">{{weekday}}</button>
            <button class="day" v-for="(day,index) in days" 
            :class="{preview:!day.current,dark:theme,choose:day.num==current.date&&barCurrent.year==current.year&&barCurrent.month==current.month}"
            :title="day.cyear+'年'+day.cmonth+'月'+day.num+'日'" :key="index" @click="pickDay(day)">
            {{day.num}}
            </button>
        </div>
        </transition-group>
    </div>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'calendar-view',
    data: function(){
        return {
            status: 2,
            years: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //years grid array//
            months: [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4],   //months grid array//
            days: [],   //days grid array//
            dayList: [31,28,31,30,31,30,31,31,30,31,30,31], //days of one month//
            weekdays: ['日','一','二','三','四','五','六'], //weekdays//
            current: {  //contains current date//
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                date: new Date().getDate(),
                weekday: new Date().getDay()
            },
            barCurrent:{    //contains picking date//
                yearRing: parseInt(new Date().getFullYear()/10)*10, //init with current year's decade beginner//
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            },
            theme:false,
            themeColor:''
        }
    },
    mounted: function(){
        let el = this.$el;
        if($(el).attr("xTheme")=="dark"){
            this.theme = true;
        }
        if($(el).attr("xThemeColor")!=undefined){
            this.themeColor = $(el).attr("xThemeColor");
        }
        this.updateRing();
        this.updateDays();
    },
    methods: {
        updateRing: function(){ //update decades//
            for(let i = 0; i < this.years.length; i++){
                Vue.set(this.years,i,this.barCurrent.yearRing+i);
            }
        },
        pickYear: function(year){
            this.barCurrent.year = year;
            this.status = 1;
        },
        pickMonth: function(index){
            if(index<11)
                this.barCurrent.month = index + 1;
            else
            {
                this.barCurrent.year++;
                this.barCurrent.month = index % 11;
            }
            this.status = 2;
            this.updateDays();
        },
        pickDay: function(day){
            let tday = {year: day.cyear,
                month: day.cmonth,//for the picker shouldn't min 1//
                date: day.num};
            this.Func(tday);
            return {
                year: day.cyear,
                month: day.cmonth - 1,
                date: day.num
            }
        },
        backMonth: function(){
            this.status = 1;
        },
        backYear: function(){
            this.status = 0;
        },
        slideUp: function(){
            switch(this.status){
                case 0:
                this.barCurrent.yearRing-=10;
                this.updateRing();
                $(this.$refs.p0).animate({margin:"100% 0px"},250);
                $(this.$refs.p0).animate({margin:"-100% 0px"},0);
                $(this.$refs.p0).animate({margin:"0% 0px"},250);
                break;
                case 1:
                this.barCurrent.year--;
                $(this.$refs.p1).animate({margin:"100% 0px"},250);
                $(this.$refs.p1).animate({margin:"-100% 0px"},0);
                $(this.$refs.p1).animate({margin:"0% 0px"},250);
                break;
                case 2:
                if(this.barCurrent.month<=1)
                {
                    this.barCurrent.month=12;
                    this.barCurrent.year--;
                }
                else
                    this.barCurrent.month--;
                this.updateDays();
                $(this.$refs.p2).animate({margin:"100% 0px"},250);
                $(this.$refs.p2).animate({margin:"-100% 0px"},0);
                $(this.$refs.p2).animate({margin:"0% 0px"},250);
                break;
            }  
        },
        slideDown: function(){
            switch(this.status){
                case 0:
                this.barCurrent.yearRing+=10;
                this.updateRing();
                $(this.$refs.p0).animate({margin:"-100% 0px"},250);
                $(this.$refs.p0).animate({margin:"100% 0px"},0);
                $(this.$refs.p0).animate({margin:"0% 0px"},250);
                break;
                case 1:
                this.barCurrent.year++;
                $(this.$refs.p1).animate({margin:"-100% 0px"},250);
                $(this.$refs.p1).animate({margin:"100% 0px"},0);
                $(this.$refs.p1).animate({margin:"0% 0px"},250);
                break;
                case 2:
                if(this.barCurrent.month>=12)
                {
                    this.barCurrent.month=1;
                    this.barCurrent.year++;
                }
                else
                    this.barCurrent.month++;
                this.updateDays();
                $(this.$refs.p2).animate({margin:"-100% 0px"},250);
                $(this.$refs.p2).animate({margin:"100% 0px"},0);
                $(this.$refs.p2).animate({margin:"0% 0px"},250);
                break;
            }  
        },
        updateDays: function(){
            let pickMonth = this.stringToDate(`${this.barCurrent.year}/${this.barCurrent.month}/01 00:00:00`);
            let weekdayIndex = pickMonth.getDay();
            let days = [];
            let dayList = this.dayList;
            if(this.leapYear(pickMonth.getFullYear()))
                dayList[1] = 29;
            for(let i = weekdayIndex - 1; i >= 0; i--){ //date that ahead of picking month//
                days.push({
                    num:31-i,current:false,
                    cmonth:this.barCurrent.month==1?12:this.barCurrent.month-1,
                    cyear:this.barCurrent.month==1?this.barCurrent.year-1:this.barCurrent.year});
            }
            for(let i = 0; i < dayList[pickMonth.getMonth()]; i++){ //date that belong to picking month//
                days.push({
                    num:i+1,current:true,
                    cmonth:this.barCurrent.month,
                    cyear:this.barCurrent.year});
            }
            let remain = 42 - days.length;
            for(let i = 0; i < remain; i++){ //date that after picking month//
                days.push({
                    num:i+1,current:false,
                    cmonth:this.barCurrent.month==12?1:this.barCurrent.month+1,
                    cyear:this.barCurrent.month==12?this.barCurrent.year+1:this.barCurrent.year});
            }
            this.days = days;
        },
        stringToDate: function(str){ //from sDate import stringToDate//usual.js//
            let reg = /\d+/g;
            let timeArray = new Array();
            let d = new Date();
            while((x = reg.exec(str))!= null)
            {
                timeArray.push(x[0]);
            }
            if(timeArray.length<=0)
                return new Date();
            d.setFullYear(timeArray[0]);
            d.setMonth(timeArray[1]-1);
            d.setDate(timeArray[2]);
            d.setHours(timeArray[3]);
            d.setMinutes(timeArray[4]);
            d.setSeconds(timeArray[5]);
            return d;
        },
        leapYear: function(num){
            if(num%4==0&&num%100!=0)
                return true;
            else if(num%400==0)
                return true;
            else
                return false;
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