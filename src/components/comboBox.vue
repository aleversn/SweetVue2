<template>
<div class="combobox" :class="{dark:xTheme=='dark'}" ref="co_head" style="width: 80px;" :style="{'z-index':status?500:''}" @click="isSelected">
    <div v-show="false" ref="itemContainer"><slot></slot></div>
    <div v-show="status" class="combobox-item-container" ref="co_items">
        <option v-for="(item,index) in items" :class="{choose:index==currentIndex}" :index="index" @click="Choose" :key="index" :title="item.name == null ? item : item.name">{{item.name==null?item:item.name}}</option>
    </div>
    <p class="format">{{now}}</p>
    <p class="drop-down">&#xE70D;</p>
</div>
</template>

<style lang="scss" scoped>
.combobox {
    position: relative;
    width: auto;
    height: 25px;
    border: rgba(36, 36, 36, 0.3) solid 2px;
    font-family: "微软雅黑", Segoe MDL2;
    font-size: 15px;
    color: rgba(36, 36, 36, 0.8);
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    z-index: 120;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;

    p.format
    {
        width: 100%;
        padding: 5px;
        font-size: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    p.drop-down
    {
        padding: 5px;
        font-family: Segoe MDL2;
        font-size: 12px;
        color: rgba(36,36,36,0.5);
    }

    &:hover {
        border-color: rgba(36, 36, 36, 0.6);
    }

    &:active {
        background: rgba(36, 36, 36, 0.1);
        border-color: rgba(36, 36, 36, 0.3);
    }

    &.dark
    {
        color: whitesmoke;
        border-color: rgba(250, 250, 250, 0.3);

        p.format
        {
            color: whitesmoke;
        }

        p.drop-down
        {
            color: whitesmoke;
        }

        &:hover {
            border-color: rgba(250, 250, 250, 0.6);
        }

        &:active {
            background: rgba(250, 250, 250, 0.1);
            border-color: rgba(250, 250, 250, 0.3);
        }

        .combobox-item-container
        {
            background: rgba(36, 36, 36, 0.9);

            option
            {
                color: whitesmoke;
            }
        }
    }
    .combobox-item-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        max-height: 300px;
        padding: 8px 0px;
        background: rgba(242, 242, 242, 0.9);
        border: rgba(36, 36, 36, 0.05) solid thin;
        box-sizing: border-box;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1),
            0px 6px 8px rgba(0, 0, 0, 0.1);
        overflow: auto;
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        -ms-overflow-style: -ms-autohiding-scrollbar;
        z-index: 125;
        &::-webkit-scrollbar {
            width: 5px;
            background-color: transparent;
            border-radius: 0px;
            &:hover {
                width: 8px;
            }
        }
        &::-webkit-scrollbar-thumb {
            &:vertical {
                height: 50px;
                background-color: rgba(36, 36, 36, 0.1);
                border-radius: 5px;
                &:hover {
                    background-color: rgba(36, 36, 36, 0.2);
                }
            }
        }
        option {
            height: 25px;
            padding-left: 5px;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            display: flex;
            align-items: center;
            overflow: hidden;
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            &:hover {
                background: rgba(36, 36, 36, 0.05);
            }
            &:active {
                background: rgba(36, 36, 36, 0.2);
            }
            &.choose {
                background: rgba(0, 120, 215, 0.3);
                &:hover {
                    background: rgba(0, 120, 215, 0.35);
                }
                &:active {
                    background: rgba(0, 120, 215, 0.45);
                }
            }
        }
    }
}
</style>


<script>
import $ from '../js/jquery-3.2.1.min.js';
import '../css/sweet.css';

export default {
    name: 'combobox',
    props: {
        xTheme: {
            default: 'light'
        },
        setindex: {
            default: '0'
        },
        setdata: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data: function(){
        return {
                status:false,
                items:["ComboBox"],
                now:"",
                value:-1,
                currentIndex:-1
            };
    },
    watch: {
        setindex (val) {
            this.afterIndex(val);
        },
        setdata () {
            if(this.setdata.length > 0)
            {
                this.items = []
                for(let item of this.setdata)
                {
                    this.items.push({
                        name: item.name,
                        value: item.value == undefined ? this.setdata.indexOf(item) : item.value
                    });
                }
                this.now = this.items[this.currentIndexSafe].name;
            }
            else
            {
                this.items = ["Combobox"];
                this.now = "";
            }
        }
    },
    computed: {
        currentIndexSafe () {
            if(this.setindex < 0 || this.setindex > this.items.length - 1)
                return 0;
            else
                return this.setindex;
        }
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
            this.now = titems[this.currentIndexSafe].name;
        }
        if(this.setdata.length > 0)
        {
            this.items = []
            for(let item of this.setdata)
            {
                this.items.push({
                    name: item.name,
                    value: item.value == undefined ? this.setdata.indexOf(item) : item.value
                });
            }
            this.now = this.items[this.currentIndexSafe].name;
        }
        this.afterIndex(0);
        if(this.setindex != 0)
            this.afterIndex(this.setindex);
        this.outSideClick();
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
        afterIndex (val) {
            try
            {
                if(val < 0 || val > this.items.length - 1)
                    return 0;
                this.now = this.items[val].name;    //更新状态//
                this.value = this.items[val].value;
                this.currentIndex = val;
            }
            catch(e)
            {
                this.afterIndexByValue(val);
            }
        },
        afterIndexByValue (val) {
            val = this.items.indexOf(this.items.find(item => item.value == val));
            if(val == undefined)
                return 0;
            this.now = this.items[val].name;    //更新状态//
            this.value = this.items[val].value;
            this.currentIndex = val;
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
        },
        outSideClick () {
            window.addEventListener('click', event => {
                let x = event.target;
                let _self = false;
                while(x.tagName.toLowerCase() != 'body')
                {
                    if(x == this.$el)
                    {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if(!_self)
                    this.status = false;
            });
        }
    }
}
</script>