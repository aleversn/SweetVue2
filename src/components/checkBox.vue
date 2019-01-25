<template>
<div class="checkBox" @click="Checked">
    <p class="checkBox" style="font-family: Segoe MDL2; cursor: pointer;" ref="fontstatus">&#xE003;</p>
    <p style="margin-left: 5px;">{{xContent}}</p>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'checkbox',
    data: function(){
        return {isCheck:false, xContent:""};
    },
    mounted:function(){
        var el = this.$el;
        this.xContent = $(el).attr("xContent");
    },
    methods:{
        Checked: function(){
            if(this.isCheck)
                this.$refs.fontstatus.innerHTML = "&#xE003;";
            else
                this.$refs.fontstatus.innerHTML = "&#xE005;";
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