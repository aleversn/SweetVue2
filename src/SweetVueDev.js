import $ from './js/jquery-3.2.1.min.js';
import './css/sweet.css';

import Vuex from 'vuex';

import checkBox from './components/checkBox.vue';
import searchBox from './components/searchBox.vue';
import comboBox from './components/comboBox.vue';
import progressRing from './components/progressRing.vue';
import progressBar from './components/progressBar.vue';
import flipView from './components/flipView.vue';
import scrollSticky from './components/scrollSticky.vue';
import toggleSwitch from './components/toggleSwitch.vue';
import treeView from './components/treeView.vue';
import calendarView from './components/calendarView.vue';
import calendarDatePicker from './components/calendarDatePicker.vue';
import datePicker from './components/datePicker.vue';
import timePicker from './components/timePicker.vue';
import parallaxView from './components/parallaxView.vue';
import scrollReveal from './components/scrollReveal.vue';
import flyout from './components/flyout.vue';
import pivot from './components/pivot.vue';
import imgbox from './components/imgBox.vue';

import fluentProgressBar from './components/fluentProgressBar.vue';


let SweetVue = {};
SweetVue.install = function(Vue, options) {
    Vue.use(Vuex);
    const SweetStore = new Vuex.Store({
        state: {
            imgUriList: []  //{data:Base64String,key:String,state:('none'|'loading'|'done')}
        },
        getters: {
            imgUri: (state) => (key) => {
                return state.imgUriList.find(item => item.key === key);
            }
        },
        mutations: {
            setImgUri (state,imgUri) {
                let status = imgUri.state;
                if(imgUri.key == undefined)
                    return 0;
                if(status != 'none' && status != 'loading' && status != 'done')
                    imgUri.state = 'none';
                let item = state.imgUriList.find(item => item.key === imgUri.key);
                if(item == undefined)
                    state.imgUriList.push({data:imgUri.data,key:imgUri.key,state:imgUri.state});
                else
                    Vue.set(state.imgUriList,state.imgUriList.indexOf(item),{data:imgUri.data,key:imgUri.key,state:imgUri.state});
            },
            clearImgUri (state, key) {
                let item = state.imgUriList.find(item => item.key === imgUri.key);
                if(item == undefined)
                    return 0;
                else
                    state.imgUriList.splice(state.imgUriList.indexOf(item),1);
            }
        }
    });
    Vue.prototype.$Sweet = Sweet;
    Vue.prototype.$SweetStore = SweetStore;

    Vue.component(checkBox.name,checkBox);
    Vue.component(searchBox.name,searchBox);
    Vue.component(comboBox.name,comboBox);
    Vue.component(progressRing.name,progressRing);
    Vue.component(progressBar.name,progressBar);
    Vue.component(flipView.name,flipView);
    Vue.component(scrollSticky.name,scrollSticky);
    Vue.component(toggleSwitch.name,toggleSwitch);
    Vue.component(treeView.name,treeView);
    Vue.component(calendarView.name,calendarView);
    Vue.component(calendarDatePicker.name,calendarDatePicker);
    Vue.component(datePicker.name,datePicker);
    Vue.component(timePicker.name,timePicker);
    Vue.component(parallaxView.name,parallaxView);
    Vue.component(scrollReveal.name,scrollReveal);
    Vue.component(flyout.name,flyout);
    Vue.component(pivot.name,pivot);
    Vue.component(imgbox.name,imgbox);

    Vue.component(fluentProgressBar.name,fluentProgressBar);
}


//Sweet//
class Sweet{
    constructor(){
    }
    static get Controls(){
        return ['glass-button',
                'combobox',
                'progress-ring',
                'searchbox',
                'toggle-switch',
                'treeview',
                'parallax-view'];
    }
    static AjaxGet(url)
    {
        var r = null;
        $.ajax({
            type:"get",
            url:url,
            async:false,
            timeout:30000,
            success:function(data){
                r = data;
            },
            error:function(){
                r = null;
            }
        });
        return r;
    }
    static AjaxGetAsync(url,func=null,useArg=false)
    {
        var r = null;
        $.ajax({
            type:"get",
            url:url,
            timeout:30000,
            success:function(data){
                r = data;
                if(func!=null)
                {
                    if(useArg==true)
                        func(data);
                    else
                        func();
                }
            },
            error:function(){
                r = null;
                if(func!=null)
                {
                    if(useArg==true)
                        func(null);
                    else
                        func();
                }
            }
        });
        return r;
    }
    static AjaxPost(url,Post_Data)
    {
        var r = null;
        $.ajax({
            type:"post",
            url:url,
            data:Post_Data,
            async:false,
            timeout:30000,
            success:function(data){
                r = data;
            },
            error:function(){
                r = null;
            }
        });
        return r;
    }
    static AjaxPostAsync(url,Post_Data,func=null,useArg=false)
    {
        var r = null;
        $.ajax({
            type:"post",
            url:url,
            data:Post_Data,
            timeout:30000,
            success:function(data){
                r = data;
                if(func!=null)
                {
                    if(useArg==true)
                        func(data);
                    else
                        func();
                }
            },
            error:function(){
                r = null;
                if(func!=null)
                {
                    if(useArg==true)
                        func(null);
                    else
                        func();
                }
            }
        });
        return r;
    }
    //GetAsync//PostAsync//简化//
    static gs(url,func = null) {
        if(func == null)
            this.AjaxGetAsync(url,()=>{});
        else
            this.AjaxGetAsync(url,func,true);
    }
    static ps(url,data,func = null) {
        if(func == null)
            this.AjaxPostAsync(url,data,()=>{});
        else
            this.AjaxPostAsync(url,data,func,true);
    }
    //
    static xhr(params = {})
    {
        if(params.url == undefined)
        {
            this.barWarning(0,'expected url');
            return 0;
        }
        if(params.data == undefined)
        {
            this.barWarning(0,'expected data');
            return 0;
        }
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        for (let i = 0; i < params.data.length; i++) {
            formData.append(params.data[i].name == undefined ? `obj: ${i}` : params.data[i].name, params.data[i].value);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if(params.success != null)
                    params.success(xhr.responseText);
            }
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                if(params.error != null)
                    params.error(xhr.responseText);
            }
        }

        let loaded = 0;
        xhr.upload.addEventListener("progress", function (e) {
            loaded += e.loaded;
            if(params.progress != null)
                params.progress(loaded,e.loaded);
        });
        xhr.open("post", params.url);
        xhr.send(formData);
    }
    static SwiftWarning(e,c)
    {
        var x=$(e).prop('class');
        var xc=$(e).html();
        var xcolor=$(e).css('color');
        $(e).attr('class',x+' warning-text');
        $(e).css('color','rgba(200,50,59,1)');
        $(e).html(c);
        setTimeout(function(){
            $(e).attr('class',x);
            $(e).css('color',xcolor);
            $(e).html(xc);
        },3000);
    }
    static barWarning(s=-1,c="警告信息")
    {
        var timer = null;
        var icon = "&#xEB90;";
        var background_o = "rgba(173,38,45,0.8)";
        if(s==1)
            {
                background_o = "rgba(234,159,1,0.8)";
                icon = "&#xE783;";
            }
        else if(s==0)
            {
                background_o = "rgba(25,180,110,0.8)";
                icon = "&#xEC61;";
            }
        var x = document.createElement("div");
        $(x).append(`
        <div style='position: fixed; left: 0; top: 0; width: 100%; height: 30px; background: ${background_o}; text-align: center; display: none; justify-content:center; align-items:center; z-index:2002;'>
            <span style='font-family: 微软雅黑; font-size:12px; color: rgba(242,242,242,0.8); display: flex; justify-content:center; align-items:center; z-index:999;'>
                <span style='margin-right:5px; font-family:Segoe MDL2;'>${icon}</span>${c}
            </span>
        </div>`);
        $("body").append(x);
        $(x).find("div").slideDown();
        $(x).find("div").css("display","flex");
        timer = setInterval(function(){
            var stimer = null;
            $(x).find("div").fadeOut();
            stimer = setInterval(function(){
                $(x).empty();
                clearInterval(stimer);
            },1000);
            clearInterval(timer);
        },3000);
    }
    //s//-1-err//0-success//1-warn//2-default//
    //title//信息框标题//
    //content//信息框内容//
    //theme//信息框主题//light-亮色调//dark-暗色调//
    static InfoBox(s=2,content="",title="提示",theme="light")
    {
        var themeColor = theme=="dark"?" dark":"";
        if($("#s_info_box").length<=0)
        {
            $(document.body).append(`
            <div id="s_info_box" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(255,255,255,0.5); -webkit-backdrop-filter:blur(15px); display: flex; justify-content: center; align-items: center; z-index:2001;">
                <div class="sinfo-box" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; z-index:2001;">
                    <div class="title-bar">
                        <i id="s_info_icon" style="font-family: Segoe MDL2; color: rgba(255,255,255,1); font-style: normal; text-align: center;">&#xE783;</i>
                        <span style="margin-left: 5px; font-family: 微软雅黑; font-size: 13px; color: rgba(255,255,255,1); text-align: center;">${title}</span>
                    </div>
                    <span id="s_info_content" style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">${content}</span>
                    <button class="sbutton black glass" style="width: 150px; margin: 15px;" onClick="$('#s_info_box').fadeOut();">关闭</button>
                </div>
            </div>`);
        }
        else
            $("#s_info_content").html(content);
        $("#s_info_box").css('display','flex');
        if(themeColor==" dark")
            $("#s_info_box").css("background","rgba(0,0,0,0.6)");
        if(s==1)
        {
            $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box brown"+themeColor);
            $('#s_info_icon').html('&#xE7BA;');
            $("#s_info_box").find("button").attr("class","sbutton brown glass");
        }
        else if(s==0)
        {
            $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box green"+themeColor);
            $('#s_info_icon').html('&#xEC61;');
            $("#s_info_box").find("button").attr("class","sbutton green glass");
        }
        else if(s==-1)
        {
            $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box red"+themeColor);
            $('#s_info_icon').html('&#xEB90;');
            $("#s_info_box").find("button").attr("class","sbutton red glass");
        }
        else if(s==2)
        {
            $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box"+themeColor);
            $('#s_info_icon').html('&#xE946;');
            if(themeColor==" dark")
                $("#s_info_box").find("button").attr("class","sbutton dark");
        }
    }
    //content-信息框内容//
    //f-执行确定操作函数//
    //t1-确定按钮标题//
    //t2-取消按钮标题//
    //title-信息框标题//
    //theme-主题//red//green//brown//red dark//green dark//brown dark//dark//
    static JudgeBox(info = {
            content,
            t1:'确认',
            t2:'取消',
            title:"信息"
        },
        func_confirm,
        func_cancel=null,
        theme="")
    {
        if($("#s_judge_box").length<=0)
        {
            $(document.body).append(`
            <div id="s_judge_box" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(255,255,255,0.5); -webkit-backdrop-filter:blur(15px); display: flex; justify-content: center; align-items: center; z-index:2001;">
                    <div  class="sinfo-box" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; z-index:2001;">
                        <div class="title-bar">
                            <i id="s_judge_icon" style="font-family: Segoe MDL2; color: rgba(255,255,255,1); font-style: normal; text-align: center;">&#xE783;</i>
                            <span id="s_judge_title" style="margin-left: 5px; font-family: 微软雅黑; font-size: 13px; color: rgba(255,255,255,1); text-align: center;">提示</span>
                        </div>
                        <span id="s_judge_content" style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">Content</span>
                        <div style="width: 100%; margin-top: 15px; padding: 5px; box-sizing: border-box; display: flex; justify-content: space-between;">
                        <button id="s_judge_confirm" class="sbutton blue" style="width: 100%; margin-right: 2.5px;">确认</button>
                        <button id="s_judge_cancel" class="sbutton black" style="width: 100%; margin-left: 2.5px;">取消</button>
                    </div>
                </div>
            </div>`);
        }
        if(theme.indexOf("dark")>=0)
            $("#s_judge_box").css("background","rgba(0,0,0,0.6)");
        $("#s_judge_box").css('display','flex');
        $($("#s_judge_box").children("div").get(0)).attr("class","sinfo-box "+theme);
        $($("#s_judge_box").find("button").get(0)).attr("class","sbutton "+theme.split(' ')[0]);
        $("#s_judge_confirm").html(info.t1);
        $("#s_judge_cancel").html(info.t2);
        $("#s_judge_title").html(info.title);
        $("#s_judge_content").html(info.content);
            
        $("#s_judge_confirm").unbind();
        $("#s_judge_confirm").click(function(){
            func_confirm();
            $('#s_judge_box').fadeOut();
        });
        $("#s_judge_cancel").unbind();
        $("#s_judge_cancel").click(function(){
            if(func_cancel!=null)
                func_cancel();
            $('#s_judge_box').fadeOut();
        });
    }
    static Guid(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
         }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    static GuidWithoutDash(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
         }
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }
    static set MousePosition(e)
    {
        Sweet.sMousePosition = {x: e.pageX, y: e.pageY};
    }
    static set MousePositionVisual(e)
    {
        Sweet.sMousePositionWithOutScroller = {x: e.originalEvent.x, y: e.originalEvent.y};
    }
    static get MousePosition()
    {
        return Sweet.sMousePosition;
    }
    static get MousePositionVisual()
    {
        return Sweet.sMousePositionWithOutScroller;
    }
}

export default SweetVue;
window.SweetVue = SweetVue;