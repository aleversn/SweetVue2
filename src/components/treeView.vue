<template>
<div>
    <div v-for="(item,index) in objs" :class="[customerClass]" :key="index">
        <div class="item" :class="{'drop-down':isDropDown[index],highlight:item.Choose}" :style="{padding:'3px '+ padding*25+'px'}" @click="DropDown(index)">
            <p class="icon" style="font-family: Segoe MDL2;" :style="{visibility: item.children!=null ? 'visible' : 'hidden'}">&#xE0E3;</p>
            <p class="content">{{item.name}}</p>
        </div>
        <transition name="treeview">
        <treeview v-if="item.children!=null" v-show="isDropDown[index]" :xChildIndex="index"></treeview>
        </transition>
    </div>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'treeview',
    data: function(){
        return {
            objs:[],
            rootObjs:[],
            padding:1,//层叠偏移大小//
            isDropDown:new Array(),
            customerClass:'treeview'
        }
    },
    mounted: function(){
        let el = this.$el;
        if($(el).attr("xJson")!=undefined)  //xJson不存在将以默认空数组返回//
        {
            this.objs = eval(`${$(el).attr("xJson")}`);
            this.rootObjs = this.objs;
        }
        else if($(el).attr("xChildIndex")!=undefined)
        {
            let index = $(el).attr("xChildIndex");
            this.objs = this.$parent.objs[index].children;
            this.rootObjs = this.$parent.rootObjs;
            this.padding = this.$parent.padding + 1;
            if($(this.$parent.$el).attr("xFunc")!=undefined)
                $(el).attr("xFunc",$(this.$parent.$el).attr("xFunc"));
        }
        this.objInit();
    },
    methods: {
        objInit: function(){
            for(let i = 0; i < this.objs.length; i++){
                this.isDropDown.push(false);
            }
        },
        DropDown: function(index){
            let nowStatus = this.isDropDown[index];
            Vue.set(this.isDropDown,index,!nowStatus);  //我们可以动态控制数据的增减，但是我们却无法做到对某一条数据的修改//用Vue.set解决此问题//
            
            //xFunc//
            if($(this.$el).attr("xFunc")!=undefined)
                eval(`${$(this.$el).attr("xFunc")}('${this.objs[index].value}')`);
            
            this.ClearChoose(this.rootObjs);
            let t = this.objs[index];
            t.Choose = true;
            Vue.set(this.objs,index,t);
        },
        ClearChoose: function(objs){
            for(let i = 0; i < objs.length; i++){
                let t = objs[i];
                t.Choose = false;
                Vue.set(objs,i,t);
                if(objs[i].children!=null)
                    this.ClearChoose(objs[i].children);
            }
        }
    }
}
</script>