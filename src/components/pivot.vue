<template>
<div class="pivot" :class="[theme?'dark':'',customerClass]">
    <div v-show="false" ref="package"><slot></slot></div>
    <p class="pivot-option" v-for="(item,index) in objs" :class="[customerOptionClass,currentIndex==index?customerOptionChooseClass:'']" :index="index" :value="item.value" :key="index" @click="switchOn">{{item.name}}</p>
    <i class="pivot-lightbar" :class="[customerLightClass]" ref="lighting"></i>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'pivot',
    props: {
        setindex: {
            type: Number,
            default: 0
        }
    },
    data: function(){
        return {
            objs:[{name:"Empty",value:0}],
            currentIndex:0,
            lastOption:{},
            theme:false,
            customerClass:"",
            customerLightClass:"",
            customerOptionClass:"",
            customerOptionChooseClass:"choose"
        }
    },
    watch: {
        setindex (val) {
            this.afterIndex(val);
        }
    },
    mounted: function(){
        let el = this;
        let target = this.$el;
        this.init();
        

        if($(target).attr("xTheme")=="dark"){
            this.theme = true;
        }
        if($(target).attr("xPivotStyle")!=undefined){
            this.customerClass=$(target).attr("xPivotStyle");
        }
        if($(target).attr("xLightbarStyle")!=undefined){
            this.customerLightClass=$(target).attr("xLightbarStyle");
        }
        if($(target).attr("xOptionStyle")!=undefined){
            this.customerOptionClass=$(target).attr("xOptionStyle");
        }
        if($(target).attr("xOptionChooseStyle")!=undefined){
            this.customerOptionChooseClass=$(target).attr("xOptionChooseStyle");
        }

        $(target).ready(()=>{
            if(this.setindex != 0)
                this.afterIndex(this.setindex);
        });
    },
    computed:{
        
    },
    methods: {
        init: function(){
            let el = this;
            let target = this.$el;
            let tObjs = [];
            $.each($(this.$refs.package).children("*"),function(i,item){
                tObjs.push({name:$(item).text(),value:$(item).attr("value")});
                if(tObjs[i].value==undefined){
                    tObjs[i].value=i;
                }
            });
            this.objs = tObjs;
            this.lastOption.target = $(target).children(".pivot-option").get(0);
            $(target).ready(function(){
                $(el.$refs.lighting).css("left",el.lastOption.target.offsetLeft +'px');
                $(el.$refs.lighting).css("width",$(el.lastOption.target).width()+'px');
            });
        },
        switchOn: function(e){
            let el = this;
            this.currentIndex = $(e.target).attr("index");
            let disWidth = Math.abs($(e.target).offset().left - $(this.lastOption.target).offset().left)+$(e.target).width();
            if($(e.target).attr("index")>$(this.lastOption.target).attr("index")){
                $(this.$refs.lighting).animate({
                    width:disWidth +'px',
                },{duration:180});
                $(this.$refs.lighting).animate({
                    left:e.target.offsetLeft,
                    width:$(e.target).width()+'px'
                },{duration:50});
            }
            else
            {
                $(this.$refs.lighting).animate({
                    width:disWidth +'px',
                    left:e.target.offsetLeft,
                },{duration:180});
                $(this.$refs.lighting).animate({
                    width:$(e.target).width()+'px'
                },{duration:50});
            }
            this.lastOption.target = e.target;
            this.Func($(e.target).attr("value"),$(e.target).attr("index"));
        },
        afterIndex (val) {
            let target = this.$el;
            let e = {};
            e.target = $(target).children('.pivot-option').get(val);
            this.currentIndex = $(e.target).attr("index");
            let disWidth = Math.abs($(e.target).offset().left - $(this.lastOption.target).offset().left)+$(e.target).width();
            if($(e.target).attr("index")>$(this.lastOption.target).attr("index")){
                $(this.$refs.lighting).animate({
                    width:disWidth+'px',
                },{duration:180});
                $(this.$refs.lighting).animate({
                    left:e.target.offsetLeft,
                    width:$(e.target).width()+'px'
                },{duration:50});
            }
            else
            {
                $(this.$refs.lighting).animate({
                    width:disWidth+'px',
                    left:e.target.offsetLeft,
                },{duration:180});
                $(this.$refs.lighting).animate({
                    width:$(e.target).width()+'px'
                },{duration:50});
            }
            this.lastOption.target = e.target;
            this.Func($(e.target).attr("value"),$(e.target).attr("index"));
        },
        Func: function(val,index){
            let el = this;
            this.$emit('switchoption',{val:val,index:index});   //@event switchOption//
            if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el.$el).attr("pFunc")}('${val}',${index})`);
            this.$emit('switch',{val,index});
        }
    }
}
</script>