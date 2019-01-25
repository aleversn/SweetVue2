<template>
<div class="combobox" ref="co_head" style="width: 80px;" :style="{'z-index':status?500:''}" @click="isSelected">
    <div v-show="false" ref="itemContainer"><slot></slot></div>
    <div v-show="status" class="combobox-item-container" ref="co_items">
        <option v-for="(item,index) in items" :class="{choose:index==currentIndex}" :index="index" @click="Choose" :key="index">{{item.name==null?item:item.name}}</option>
    </div>
    <p style="width: 100%; padding: 5px;">{{now}}</p>
    <p style="padding: 5px; font-family: Segoe MDL2; font-size: 12px; color: rgba(36,36,36,0.5);">&#xE70D;</p>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'combobox',
    data: function(){
        return {
                status:false,
                items:["ComboBox"],
                now:"Now",
                value:-1,
                currentIndex:-1
            };
    },
    mounted:function(){
        let el = this.$el;
        let target = this;
        if($(this.$refs.itemContainer).children("*").length>0)  //以插槽形式赋值//
        {
            let titems = [];
            $.each($(this.$refs.itemContainer).children("*"),function(i,item){
                titems.push({
                        name:$(item).text(),
                        value:$(item).attr("value")==undefined?i:$(item).attr("value")
                    });
            });
            this.items = titems;
            this.now = titems[0].name;
        }
    },
    methods:{
        isSelected: function(e){
            this.status=!this.status;
        },
        Choose: function(e){
            e.stopPropagation();    //阻止冒泡事件//
            this.now=e.target.innerHTML;    //更新状态//
            var index = $(e.target).index();
            this.value = this.items[index].value;
            this.currentIndex = index;
            // $(this.$refs.co_items).animate({top:-30*index+"px"},200);
            let el = this;
            $(this.$refs.co_items).animate({
                scrollTop:$(this.$refs.co_items).children("option").get(index).offsetTop+"px"
            },200,function(){
                el.status=!el.status;
            });
            this.$emit('chooseitem',{value:this.value,currentIndex:this.currentIndex}); //@event chooseItem//
            if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                eval(`this.$parent.${$(el.$el).attr("pFunc")}('${this.value}',${this.currentIndex})`);
        },
        updateItems: function(){
            for(let i = 0; i < this.items.length; i++)
            {
                if(this.items[i].default==true)
                {
                    this.now = this.items[i].name;
                    this.value = this.items[i].value;
                    this.currentIndex = i;
                    break;
                }
            }
            this.now = this.value==-1?this.items[0].name:this.now;
            this.value = this.value==-1?this.items[0].value:this.value;
            this.currentIndex = this.currentIndex==-1?0:this.currentIndex;
        }
    }
}
</script>