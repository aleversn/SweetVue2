<template>
<div class="toggle-switch" @click="toggle">
    <div :class="{'toggle-on':active, dark:darktheme}" :style="themeOutlineStyle()">
        <p :style="themeRingStyle()"></p>
    </div>
    <p class="content" :class="{dark:darktheme}" :style="themeContentStyle()">{{active ? onContent: offContent}}</p>
</div>
</template>

<style lang="scss" scoped>
.toggle-switch {
    display: flex;
    align-items: center;
    div {
        position: relative;
        width: 45px;
        height: 20px;
        padding: 5px;
        border: rgba(0,0,0,1) solid 2px;
        border-radius: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        opacity: 0.8;
        transition: all 0.2s, background-color 0.5s;
        -webkit-transition: all 0.2s, background-color 0.5s;
        &:hover {
            opacity: 1;
        }
        &:active {
            background: rgba(36,36,36,0.6);
            border: rgba(0,0,0,0) solid 2px;
            p {
                background: rgba(255,255,255,1);
            }
        }
        p {
            width: 10px;
            height: 10px;
            background: rgba(0,0,0,1);
            border-radius: 50%;
            box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
            transition: all 0.2s;
        }
        &.dark {
            border: rgba(242,242,242,0.8) solid 2px;
            p {
                background: rgba(242,242,242,0.8);
            }
        }
        &.toggle-on {
            background: rgba(0,120,215,0.8);
            border: rgba(0,0,0,0) solid 2px;
            p {
                margin-left: 20px;
                background: rgba(255,255,255,1);
                box-shadow: -3px 3px 10px rgba(0,0,0,0.2);
            }
        }
    }
    .content {
        margin-left: 5px;
        font-family: '微软雅黑';
        font-size: 13px;
        cursor: default;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
    }
    p {
        &.dark {
            color: rgba(255,255,255,1);
        }
    }
}
</style>


<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'toggle-switch',
    props: {
        xOnContent: {
            default: 'On'
        },
        xOffContent: {
            default: 'Off'
        },
        xOnContentColor: {
            default: ''
        },
        xOffContentColor: {
            default: ''
        },
        xTheme: {
            default: 'light'
        },
        xIsOn: {
            default: false
        },
        xOutline: {
            default: ''
        },
        xRingBackground: {
            default: ''
        },
        xOnBackground: {
            default: ''
        }
    },
    watch: {
        active: function(){
            let el = this.$el;
            this.$emit('click',this.active);    //@event click//
            if($(el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el).attr("pFunc")}(${this.active})`);
            this.updateStatus();
        },
        xOnContent (val) {
            this.onContent = val;
        },
        xOffContent (val) {
            this.offContent[1] = val;
        },
        xOnContentColor (val) {
            this.theme.onContentColor = val;
        },
        xOffContentColor (val) {
            this.theme.offContentColor = val;
        },
        xTheme (val) {
            if(val == 'dark')
                this.darktheme = true;
        },
        xIsOn (val) {
            if(val.toString() == 'true')
                this.active = true;
        },
        xOutline (val) {
            this.theme.outline = val;
        },
        xRingBackground (val) {
            this.theme.ring = val;
        },
        xOnBackground (val) {
            this.theme.highlightBackground = val;
        }
    },
    data: function(){
        return {
            active:false,
            darktheme:false,
            onContent: 'On',
            offContent: 'Off',
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
    mounted() {
        this.onContent = this.xOnContent;
        this.offContent = this.xOffContent;
        this.theme.onContentColor = this.xOnContentColor;
        this.theme.offContentColor = this.xOffContentColor;
        if(this.xTheme == 'dark')
            this.darktheme = true;
        if(this.xIsOn.toString() == 'true')
            this.active = true;
        this.theme.outline = this.xOutline;
        this.theme.ring = this.xRingBackground;
        this.theme.highlightBackground = this.xOnBackground;
    },
    methods:{
        toggle: function(){
            this.active=!this.active;
        },
        updateStatus: function(){
            $(this.$el).attr("value",this.active);
        }
    }
}
</script>