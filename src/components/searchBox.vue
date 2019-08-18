<template>
<div class="search-box">
    <input v-model="content" ref="input" @keyup="Enter"/>
    <p class="search-icon" :style="xIconColor" @mousedown="Clicked" @mouseup="ClickedUp" ref="icon">{{xIcon}}</p>
</div>
</template>

<style lang="scss" scoped>
.search-box
{
    width: auto;
    height: 25px;
    border: rgba(36, 36, 36, 0.3) solid 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.3s;

    &:hover {
        border-color: rgba(36, 36, 36, 0.6);
    }

    &:active {
        border-color: rgba(36, 36, 36, 0.3);
    }

    &:focus {
        border-color: rgba(26, 124, 170, 1);
    }

    input
    {
        width: 100%;
        padding-left: 5px;
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        box-shadow: none;
    }

    .search-icon
    {
        height: 100%;
        padding: 5px;
        font-family: 'Segoe MDL2';
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;

        &:hover
        {
            color: rgba(35,161,193,1.00);
        }

        &:active
        {
            background: rgba(26, 124, 170, 1);
            color: rgba(242,242,242,1);
        }
    }
}
</style>


<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'searchbox',
    props: {
        model: {
            type: String,
            default: ''
        }
    },
    data: function(){
        return {
            xIcon:"&#xE721;",
            xIconColor:
            {
                color:"rgba(36,36,36,1)"
            },
            content:""
        };
    },
    watch: {
        content (val) {
            this.$emit('update:model',val);
        },
        model (val) {
            this.content = val;
        }
    },
    mounted:function(){
        let el = this.$el;
        let target = this;
        switch($(el).attr("xIcon"))
        {
            case "Search":
                this.xIcon = "\uE721";
                break;
            case "Filter":
                this.xIcon = "\uE16E";
                break;
            case "Check":
                this.xIcon = "\uE15E";
                break;
            case "Edit":
                this.xIcon = "\uE70F";
                break;
            case "Submit":
                this.xIcon = "\uE930";
                break;
            case "Voice":
                this.xIcon = "\uE1D6";
                break;
            case "Calendar":
                this.xIcon = "\uE787";
                break;
            case "Upload":
                this.xIcon = "\uE74A";
                break;
            default:
                this.xIcon = "\uE721";
                break;
        }
        if($(el).attr("xIconColor")!=null)
            this.xIconColor.color = $(el).attr("xIconColor");
        if($(el).attr("placeholder")!=null)
            $(this.$refs.input).attr("placeholder",$(el).attr("placeholder"));
        if($(el).attr("readonly")=="readonly")
            $(this.$refs.input).attr("readonly","readonly");
        if($(el).attr("pChange")!=null)
            $(this.$refs.input).keyup(function(){eval(`target.$parent.${$(el).attr("pChange")}("${$(target.$refs.input).val()}")`)});
        if($(el).attr("pIconClick")!=null){
            $(this.$refs.input).keyup((e)=>{
                if(e.keyCode==13)
                    eval(`target.$parent.${$(el).attr("pIconClick")}("${$(target.$refs.input).val()}")`);
            });
            $(this.$refs.icon).click(function(){eval(`target.$parent.${$(el).attr("pIconClick")}("${$(target.$refs.input).val()}")`)});
        }
        this.content = this.model;
    },
    methods:{
        Clicked: function(){
            this.xIconColor.color = "rgba(242,242,242,1)";
            this.$emit('search', $(this.$refs.input).val());
        },
        ClickedUp: function(){
            if($(this.$el).attr("xIconColor")!=null)
                this.xIconColor.color = $(this.$el).attr("xIconColor");
            else
                this.xIconColor.color = "rgba(36,36,36,1)";
        },
        Enter (event) {
            if(event.keyCode == 13)
                this.$emit('search', $(this.$refs.input).val());
        }
    }
}
</script>