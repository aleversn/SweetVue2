<template>
<div class="toggle-switch" @click="toggle">
    <div :class="{'toggle-on':active, dark:darktheme}" :style="themeOutlineStyle()">
        <p :style="themeRingStyle()"></p>
    </div>
    <p class="content" :class="{dark:darktheme}" :style="themeContentStyle()">{{statusContent}}</p>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'toggle-switch',
    data: function(){
        return {
            active:false,
            darktheme:false,
            statusContentArray:[
                "On",
                "Off"
            ],
            statusContent:"Off",
            theme: {
                highlightBackground: '',
                outline: '',
                ring: '',
                onContentColor: '',
                offContentColor: ''
            },
            themeOutlineStyle: function(){
                if(!this.active)
                    return {
                        'border-color':this.theme.outline
                    }
                else
                    return{
                        'background': this.theme.highlightBackground
                    }
            },
            themeRingStyle: function(){
                if(!this.active)
                    return {
                        'background':this.theme.ring
                    }
            },
            themeContentStyle: function(){
                if(!this.active)
                    return {
                        'color':this.theme.offContentColor
                    }
                else
                    return{
                        'color': this.theme.onContentColor
                    }
            }
        }
    },
    mounted: function(){
        let el = this.$el;
        if($(el).attr("xOnContent")!=undefined)
            this.statusContentArray[0]=$(el).attr("xOnContent");
        if($(el).attr("xOffContent")!=undefined)
            this.statusContentArray[1]=$(el).attr("xOffContent");
        if($(el).attr("xOnContentColor")!=undefined)
            this.theme.onContentColor=$(el).attr("xOnContentColor");
        if($(el).attr("xOffContentColor")!=undefined)
            this.theme.offContentColor=$(el).attr("xOffContentColor");
        if($(el).attr("xTheme")=="dark")
            this.darktheme = true;
        if($(el).attr("xIsOn")=="true")
            this.toggle();
        if($(el).attr("xOutline")!=undefined)
            this.theme.outline=$(el).attr("xOutline");
        if($(el).attr("xRingBackground")!=undefined)
            this.theme.ring=$(el).attr("xRing");
        if($(el).attr("xOnBackground")!=undefined)
            this.theme.highlightBackground=$(el).attr("xOnBackground");
        this.updateStatus();
    },
    methods:{
        toggle: function(){
            this.active=!this.active;
        },
        updateStatus: function(){
            $(this.$el).attr("value",this.active);
            if(this.active)
                this.statusContent=this.statusContentArray[0];
            else
                this.statusContent=this.statusContentArray[1];
        }
    },
    watch: {
        active: function(){
            let el = this.$el;
            this.$emit('click',this.active);    //@event click//
            if($(el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el).attr("pFunc")}(${this.active})`);
            this.updateStatus();
        }
    }
}
</script>