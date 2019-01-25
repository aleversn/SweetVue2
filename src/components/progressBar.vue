<template>
<div class="s-progressbar" :class="{normal:!loading}" :value="percent<=100?percent:100">
    <p v-for="i in num" :style="{background:color}" :key="i"></p>
    <i v-if="!loading" :style="{'width':(percent<=100?percent:100)+'%',background:color}"></i>
</div>
</template>

<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'progress-bar',
    data:function(){
        return {
            num: 0,
            percent: 0,
            loading: false,
            color: "",
            isFinished: false
        }
    },
    mounted: function(){
        var el = this.$el;
        if($(el).attr("xColor")!=undefined)
            this.color = $(el).attr("xColor");
        if($(el).attr("xLoading")=="true")
        {
            this.loading = true;
            this.num = 5;
        }
        else if($(el).attr("xPercent")!=undefined)
        {
            let target = this;
            let pName = $(el).attr("xPercent");
            this.percent = eval(`${pName}.ratio`)==undefined?0:eval(`${pName}.ratio`);
            Object.defineProperty(eval(`${pName}`),'ratio',{
                get: function(){
                    return ratio;
                },
                set: function(value){
                    ratio = value;
                    target.percent = eval(`${pName}.ratio`);
                }
            });
            eval(`${pName}.ratio=0`);   //单属性值一定要初始化//
        }
    },
    watch: {
        percent: function(){
            let el = this.$el;
            let funcs = $(el).attr("xFunc");
            let func = null;
            if(funcs!=undefined)
            {
                func = funcs.toString().split(' ')[0];
                eval(`${func}(${this.percent})`);
                if(this.percent<100){   //当比例小于100将重置isFinished//
                    this.isFinished = false;
                }
                if(funcs.split(' ').length>1)   //如果存在finished函数则执行//
                {
                    func = funcs.toString().split(' ')[1];
                    if(this.percent>=100&&!this.isFinished){
                        eval(`${func}(${this.percent})`);
                        this.isFinished = true;
                    }
                }
            }
        }
    }
}
</script>