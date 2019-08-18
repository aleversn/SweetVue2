<template>
<div class="s-search-box">
    <input v-model="content" :placeholder="placeholder" @keyup="Enter"/>
    <p class="search-icon" @click="Click">{{icon}}</p>
    <transition-group :id="suggestListId" name="suggest-item" v-show="showSuggest && canBeShow" class="suggest-block" tag="div">
        <option v-show="item.show" v-for="(item, index) in Suggest" :value="item.name" :key="`suggest-item: ${index}`" @click="SuggestClick(item)">{{item.name}}</option>
    </transition-group>
</div>
</template>

<style lang="scss" scoped>
.s-search-box
{
    position: relative;
    width: auto;
    height: 30px;
    border: rgba(36, 36, 36, 0.3) solid 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    overflow: visible;
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
        font-size: 13px;
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

    .suggest-block
    {
        position: absolute;
        left: -2px;
        top: calc(100% + 2px);
        width: calc(100% + 4px);
        height: auto;
        max-height: 300px;
        padding: 8px 0px;
        background: rgba(242, 242, 242, 0.9);
        border: rgba(36, 36, 36, 0.1) solid thin;
        box-sizing: border-box;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1),
            0px 6px 8px rgba(0, 0, 0, 0.1);
        overflow: auto;
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        -ms-overflow-style: -ms-autohiding-scrollbar;
        z-index: 125;
        &::-webkit-scrollbar
        {
            width: 5px;
            background-color: transparent;
            border-radius: 0px;
            &:hover
            {
                width: 8px;
            }
        }
        &::-webkit-scrollbar-thumb
        {
            &:vertical
            {
                height: 50px;
                background-color: rgba(36, 36, 36, 0.1);
                border-radius: 5px;
                &:hover
                {
                    background-color: rgba(36, 36, 36, 0.2);
                }
            }
        }
        option
        {
            height: 35px;
            padding-left: 5px;
            font-size: 15px;
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
            cursor: default;
            &:hover
            {
                background: rgba(36, 36, 36, 0.05);
            }
            &:active
            {
                background: rgba(36, 36, 36, 0.2);
            }
            &.choose
            {
                background: rgba(0, 120, 215, 0.3);
                &:hover
                {
                    background: rgba(0, 120, 215, 0.35);
                }
                &:active
                {
                    background: rgba(0, 120, 215, 0.45);
                }
            }
        }
    }

    .suggest-item-move
    {
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
    }

    .suggest-item-enter-active
    {
        opacity: 0;
        transform: translateX(-75px);
        transition: all 0.2s;
    }
    .suggest-item-enter-to
    {
        opacity: 1;
        transform: translateX(0px);
        transition: all 0.2s;
    }
    .suggest-item-leave-active
    {
        opacity: 1;
        transform: translateX(0px);
        transition: all 0.2s;
    }
    .suggest-item-leave-to
    {
        opacity: 0;
        transform: translateX(-75px);
        transition: all 0.2s;
    }
}
</style>

<script>
export default {
    name: 'auto-suggest-box',
    props: {
        value: {
            default: ''
        },
        placeholder: {
            default: ''
        },
        suggest: {
            default: () => {
                return []
            }
        },
        xIcon: {
            default: 'Search'
        }
    },
    data () {
        return {
            suggestListId: '',
            content: '',
            Suggest: [],
            lock: true,
            showSuggest: false
        }
    },
    watch: {
        value (val) {
            this.content = val;
        },
        content (val) {
            this.$emit('update:value', val);
            if(this.lock)
            {
                this.RefreshData(val);
                this.showSuggest = true;
            }
        },
        suggest (val) {
            this.Suggest = JSON.parse(JSON.stringify(val));
            if(this.lock)
                this.RefreshData(this.content);
        }
    },
    computed: {
        icon () {
            switch(this.xIcon)
            {
                case "Search":
                    return "\uE721";
                    break;
                case "Filter":
                    return "\uE16E";
                    break;
                case "Check":
                    return "\uE15E";
                    break;
                case "Edit":
                    return "\uE70F";
                    break;
                case "Submit":
                    return "\uE930";
                    break;
                case "Voice":
                    return "\uE1D6";
                    break;
                case "Calendar":
                    return "\uE787";
                    break;
                case "Upload":
                    return "\uE74A";
                    break;
                default:
                    return "\uE721";
                    break;
            }
        },
        canBeShow () {
            for(let item of this.Suggest) {
                if(item.show)
                    return true;
            }
            return false;
        }
    },
    beforeMount () {
        this.suggestListId = this.S4();
    },
    mounted () {
        this.LazyLoadInit();
        this.outSideClick();
    },
    methods: {
        LazyLoadInit () {
            this.ScrollToLoadInit(document.getElementById(this.suggestListId), () => {
                this.$emit('scroll');
            });
        },
        Click () {
            this.$emit('click', this.value);
        },
        Enter (event) {
            if(event.keyCode === 13)
                this.$emit('enter', this.value);
        },
        RefreshData (val) {
            if(!this.lock)
                return 0;
            this.lock = false;
            for(let item of this.Suggest) {
                if(item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0)
                    item.show = true;
                else
                    item.show = false;
                this.$set(this.Suggest, this.Suggest.indexOf(item), item);
            }
            this.$emit('update:suggest', this.Suggest);
            setTimeout(() => {
                this.lock = true;
            }, 50);
        },
        SuggestClick (item) {
            this.lock = false;
            this.$emit('chooseitem', item);
            this.$emit('update:suggest', this.Suggest);
            this.content = item.name;
            this.showSuggest = false;
            setTimeout(() => {
                this.lock = true;
            }, 300);
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
                    this.showSuggest = false;
            });
        },
        ScrollToLoadInit(e, callback = null, offset = 0) {
            e.addEventListener("scroll", (event) => {
                if (e.scrollTop + offset >= e.scrollHeight - e.clientHeight)
                    callback();
            });
        },
        S4() {
            return (((1 + Math.random()) * 0x10000) | 0)
                .toString(16)
                .substring(1);
        }
    }
}
</script>