<template>
<div class="sinput search" style="height:25px;" :value="content">
    <input style="width:100%; background:transparent; border:none; outline:none; box-shadow:none;" v-model="content" ref="input"/>
    <p class="search-icon" :style="xIconColor" @mousedown="Clicked" @mouseup="ClickedUp" ref="icon">{{xIcon}}</p>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'searchbox',
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
        if($(el).attr("xModel")!=null)
            this.xModel($(el).attr("xModel"));
    },
    methods:{
        Clicked: function(){
            this.xIconColor.color = "rgba(242,242,242,1)";
        },
        ClickedUp: function(){
            if($(this.$el).attr("xIconColor")!=null)
                this.xIconColor.color = $(this.$el).attr("xIconColor");
            else
                this.xIconColor.color = "rgba(36,36,36,1)";
        },
        xModel (ParamName) {
            let el = this;
            // let val = "";	//用val存储content的值//属性与存取描述符//因为Object.defineProperty中的this不一定指当前this，所以在不用el的情况下可以用val做中介///
            Object.defineProperty(el,'content',{  //设立content监听//
                get: function(){
                    eval(`content = el.$parent.${ParamName};`);
                    return content;
                },
                set: function(value){
                    content = value;
                    eval(`el.$parent.${ParamName} = content;`);
                }
            });
        }
    }
}
</script>