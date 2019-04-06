<template>
<div class="checkBox" style="opacity: 1;" @click="Checked">
    <div class="checkbox-rec">
        <p class="border" :class="{check: isCheck,dark: theme == 'dark'}"></p>
        <transition name="font-scale-in">
            <p v-show="isCheck" class="content" :style="{background: isCheck ? checkBackground : ''}">&#xE10B;</p>
        </transition>
    </div>
    <p style="margin-left: 5px;">{{xContent}}</p>
</div>
</template>

<style lang="scss">
.checkbox-rec
{
    position: relative;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition: all 0.5s;

    .border
    {
        width: 100%;
        height: 100%;
        border: solid 2px;
        border-color: black;
        box-sizing: border-box;
        
        .dark
        {
            border-color: white;
        }

        .check
        {
            border-color: transparent;

            &:hover
            {
                border-color: inherit;
            }
        }
    }

    .content
    {
        position: absolute;
        width: 100%;
        height: 100%;
        font-family: Segoe MDL2;
        font-size: 13px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    &:hover
    {
        .content
        {
            z-index: -1;
        }
    }
    
    .font-scale-in-enter,.font-scale-in-leave-to
    {
        transition: all 0.5s;
        transform: scale(0);
    }
    .font-scale-in-enter-to,.font-scale-in-leave
    {
        transition: all 0.5s;
        transform: scale(1);
    }
}
</style>


<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'checkbox',
    props: {
        setStatus: {
            type: Boolean,
            default: false  
        },
        checkBackground: {
            type: String,
            default: 'rgba(0,120,215,0.9)'
        },
        theme: {
            type: String,
            default: 'light'
        }
    },
    data: function(){
        return {isCheck:false, xContent:""};
    },
    watch: {
        setStatus () {
            this.isCheck = this.setStatus;
        }  
    },
    mounted:function(){
        var el = this.$el;
        this.xContent = $(el).attr("xContent");
        this.isCheck = this.setStatus;
    },
    methods:{
        Checked: function(){
            this.isCheck = !this.isCheck;
            this.Func();
            this.$emit('click',this.isCheck);   //@event click//
        },
        Func: function(){
            let el = this;
            if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el.$el).attr("pFunc")}('${$(el.$el).attr("value")}',${this.isCheck})`);
        }
    }
}
</script>