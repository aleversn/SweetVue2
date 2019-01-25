# SweetVue.js
##### 基于Vue和jQuery的响应式组件框架

## 前言
我们知道对于很多Web开发者来说，前端的UI设计是一件难过的事情。对于热衷于实现功能和挑战代码完美度的人却需要花费时间在设计界面上;或者对于一个全栈能手，但却烦恼于你设计的控件无法复用于其他场合，即便是MVVM设计思想流行的今天，你可以利用许多框架进行组件的封装，但是每当面对一项新的使用场景，你的组件将不得不在功能上做出一定的调整，到头来仍需重新拷贝一份前端代码，制作一个新组件，尽管这项任务是必须的，但谁都想将其维护的成本降到最低，更何况当团队共同开发时，你不能确保每个成员都有对应的框架开发基础，因此你所设计的组件在共享给他人时，还需要花费时间来部署它。我们开发出这一个框架的目的，就是为了简化其中一些不必要的步骤，并利用Vue.js所提供的双向绑定来提供一系列基础控件和模板组件让大家能够轻易地上手使用。

## 2.0 特性
> * SweetVue是基于Vue.js和jQuery开发的响应式组件框架，其设计理念同时结合了Xaml设计思想，使用户可通过定义客制化标签来使用预置组件。
> * 在2.0版本中SweetVue的引入方式将变得十分轻松，这也意味着在2.0版本SweetVue将更深入其与Vue的结合，需要注意的是从2.0开始SweetVue将不再支持对外界非Vue情况下的X系列数据和事件绑定方法，但样式绑定将会继续得到支持。
> * 在2.0版本中SweetVue将会提供更多组件和响应事件，同时事件的调用将更接近原生Vue的写法，因此2.0组件库将不再适用于非Vue开发者。

## 开发
目录结构
```html
└─ root
   ├─ dist
   │  ├─ SweetVue.min.js
   ├─ src
   │  ├─ components
   │  ├─ css
   |  ├─ js
   |  └─ SweetVueDev.js
   ├─ .babelrc
   ├─ index.html
   ├─ package.json
   ├─ Readme.md
   └─ webpack.config.js

```

## 安装
直接引入生产版本
```html
└─ root
   └─ dist
      └─ SweetVue.min.js


<!-- 方式一 -->
<script type="text/javascript" src="SweetVue.min.js"></script>

<!-- 方式二 -->
import SweetVue from 'SweetVue.min.js';
```

## Sweet 实例
```html
<div id="app">
    <progress-ring></progress-ring>
</div>
```

```javascript
    Vue.use(SweetVue);

    new Vue({
        el: '#app'
    });
```
    在Vue实例前引用SweetVue插件，即可使用SweetVue组件。


## Sweet 组件
目前Sweet一共包含17个基本组件
```javascript
    checkBox
    searchBox
    comboBox
    progressRing
    progressBar
    flipView
    scrollSticky
    toggleSwitch
    treeView
    calendarView
    calendarDatePicker
    datePicker
    timePicker 
    parallaxView
    scrollReveal 
    flyout
    pivot
```

### CheckBox
- [ ] 暗黑主题
- [x] 重定义样式(局部)
- [ ] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xData)
- [ ] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xContent   |    {文本内容}   |  No    | 复选框内容  |

```html
<checkbox></checkbox>
<checkbox xContent="OK"></checkbox>   <!-- 复选框内容 -->
<checkbox style="color: rgba(0,153,204,1);">OK</checkbox>   <!-- 重定义Css(目前只支持color) -->
```

### ComboBox
- [ ] 暗黑主题
- [ ] 重定义样式
- [x] 可嵌套数据
- [x] 固定数据绑定(xJson)
- [x] 响应式数据绑定(xData)
- [x] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   pFunc   |     {函数名}   |  No    | 回调函数(val,index)  |