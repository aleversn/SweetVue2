<template>
<div class="date-picker">
    <div class="date-picker-input" :class="{dark:theme}" @click="show=!show">
        <p style="width: 50%; border-right: rgba(0,0,0,0.2) solid 1px;">{{day.month}}月</p>
        <p style="border-right: rgba(0,0,0,0.2) solid 1px;">{{day.date}}</p>
        <p>{{day.year}}</p>
    </div>
    <transition 
    v-on:before-enter="beforeEnter"
    v-on:enter="enter">
    <div v-show="show" class="date-picker-container" :class="{dark:theme}" :style="{'z-index':show?500:''}">
        <div style="width: 100%; height: 100%; display: flex;">
            <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 50%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerMonth">
                <p v-for="(item,index) in monthWheel" :key="index" @click="clickMonth(index)">{{item}}</p>
                <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
            </div>
            <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 25%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerDate">
                <p v-for="(item,index) in dateWheel" :key="index" @click="clickDate(index)">{{item}}</p>
                <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
            </div>
            <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 25%;" @mousewheel="scrollerYear">
                <p v-for="(item,index) in yearWheel" :key="index" @click="clickYear(index)">{{item}}</p>
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
    name: 'date-picker',
    data: function(){
        return {
            show:false,
            theme:false,
            monthContent:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            dayList: [31,28,31,30,31,30,31,31,30,31,30,31],
            yearWheel:[1970,1971,1972,1973,1974,1975,1976],
            monthWheel:["一月","二月","三月","四月","五月","六月","七月"],
            dateWheel:[1,2,3,4,5,6,7],
            yearRange:1970,
            monthRange:{s:0,e:6},
            dateRange:{s:0,e:6},
            currentDateSum:30,
            day:{
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                date:new Date().getDate()
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
                this.temple = {year:this.day.year,month:this.day.month,date:this.day.date};
        }
    },
    methods: {
        init: function(){
            this.dateFormat();
            this.yearRange=this.day.year-3;
            this.monthRange={s:this.Mode((this.day.month-3-1),12),e:this.Mode((this.day.month+3-1),12)};
            this.dateRange={s:this.Mode((this.day.date-3-1),this.currentDateSum),e:this.Mode((this.day.date+3-1),this.currentDateSum)};
            for(let i = 0; i < 7; i++){
                Vue.set(this.yearWheel,i,this.yearRange+i);
                Vue.set(this.monthWheel,i,this.monthContent[this.Mode((this.monthRange.s+i),12)]);
                Vue.set(this.dateWheel,i,this.Mode((this.dateRange.s+i),this.currentDateSum)+1);
            }
            // console.log(this.day.year,this.day.month,this.day.date,`monthRange.s = ${this.monthRange.s} monthRange.e = ${this.monthRange.e} dateRange.s = ${this.dateRange.s} dateRange.e = ${this.dateRange.e} yearRange = ${this.yearRange}`);
        },
        scrollerYear: function(event){
            let toward = event.wheelDelta > 0 ? 'up' : 'down';
            event.preventDefault();
            switch(toward){
                case 'up':
                this.yearWheel.splice(6,1);
                this.yearWheel.unshift(this.yearRange-1);
                this.yearRange--;
                break;
                case 'down':
                this.yearWheel.splice(0,1);
                this.yearWheel.push(this.yearRange+7);
                this.yearRange++;
                break;
            }
            this.day.year = this.yearWheel[3];
            this.dateFormat();
        },
        scrollerMonth: function(event){
            let toward = event.wheelDelta > 0 ? 'up' : 'down';
            event.preventDefault();
            switch(toward){
                case 'up':
                this.monthWheel.splice(6,1);
                if(this.monthRange.s==0)
                    this.monthRange.s=11;
                else
                    this.monthRange.s--;
                if(this.monthRange.e==0)
                    this.monthRange.e=11;
                else
                    this.monthRange.e--;
                this.monthWheel.unshift(this.monthContent[this.monthRange.s]);
                break;
                case 'down':
                this.monthWheel.splice(0,1);
                if(this.monthRange.s==11)
                    this.monthRange.s=0;
                else
                    this.monthRange.s++;
                if(this.monthRange.e==11)
                    this.monthRange.e=0;
                else
                    this.monthRange.e++;
                this.monthWheel.push(this.monthContent[this.monthRange.e]);
                break;
            }
            this.day.month = (this.monthRange.s + 3) % 12 + 1;
            this.dateFormat();
        },
        scrollerDate: function(event){
            let toward = event.wheelDelta > 0 ? 'up' : 'down';
            event.preventDefault();
            switch(toward){
                case 'up':
                this.dateWheel.splice(6,1);
                if(this.dateRange.s==0)
                    this.dateRange.s=this.currentDateSum-1;//31/30//
                else
                    this.dateRange.s--;
                if(this.dateRange.e==0)
                    this.dateRange.e=this.currentDateSum-1;
                else
                    this.dateRange.e--;
                this.dateWheel.unshift(this.dateRange.s+1);
                break;
                case 'down':
                this.dateWheel.splice(0,1);
                if(this.dateRange.s==this.currentDateSum-1)
                    this.dateRange.s=0;
                else
                    this.dateRange.s++;
                if(this.dateRange.e==this.currentDateSum-1)
                    this.dateRange.e=0;
                else
                    this.dateRange.e++;
                this.dateWheel.push(this.dateRange.e+1);
                break;
            }
            this.day.date = this.dateWheel[3];
        },
        clickYear: function(index){
            this.day.year = this.yearRange + index;
            this.init();
        },
        clickMonth: function(index){
            this.day.month = this.Mode(this.monthRange.s + index,12) + 1;
            this.init();
        },
        clickDate: function(index){
            this.day.date = this.Mode(this.dateRange.s + index,this.currentDateSum) + 1;
            this.init();
        },
        leapYear: function(num){
            if(num%4==0&&num%100!=0)
                return true;
            else if(num%400==0)
                return true;
            else
                return false;
        },
        dateFormat: function(){ //cal a month contains how many days//
            if(this.day.month==2&&this.leapYear(this.day.year))
                this.currentDateSum = 29;
            else
                this.currentDateSum = this.dayList[this.day.month-1];
            
            let j = 1;
            for(let i = 0; i < this.dateWheel.length; i++){
                if(this.dateWheel[i]>this.currentDateSum||j>1){
                    Vue.set(this.dateWheel,i,j);
                    j++;
                }
            }
            j = this.currentDateSum;
            for(let i = this.dateWheel.length - 1; i >= 0; i--){
                if(this.dateWheel[i]==1||j<this.currentDateSum){
                    if(i>0){
                        Vue.set(this.dateWheel,i-1,j);
                        j--;
                    }
                }
            }
            this.dateRange.s = this.dateWheel[0] - 1;
            this.dateRange.e = this.dateWheel[6] - 1;
        },
        Mode: function(num,mod){    //标准模运算
            if(num>0)
                return num % mod;
            else
                return mod + num % mod;
        },
        confirm: function(){
            this.show = false;
            this.Func(this.day);
        },
        cancel: function(){
            this.show = false;
            this.day = this.temple;
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