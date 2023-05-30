[toc]

# JS设计模式
#### 一. 设计模式介绍

- 设计模式是我们在 解决问题的时候针对特定问题给出的简洁而优化的处理方案
- 在 JS 设计模式中，最核心的思想：封装变化。
- 将变与不变分离，确保变化的部分灵活、不变的部分稳定。



#### 二. 构造器模式

```js
 var employee1 = {
     name:"kerwin",
     age:100
 }
 var employee2 = {
     name:"tiechui",
     age:18
 }
```

以上写法，如果数据量变多，代码重复并且臃肿

```js
function Employee(name,age){
    this.name = name;
    this.age =age;
    this.say = function(){
        console.log(this.name+"-",this.age)
    }
}
new Employee("kerwin",100)
new Employee("tiechui",18)
```





#### 三. 原型模式

> 基于构造器模式改造， 使得代码复用性增加

```js
function Employee(name,age){
    this.name = name;
    this.age =age;

}
Employee.prototype.say = function(){
    console.log(this.name+"-",this.age)
}
new Employee("kerwin",100)
new Employee("tiechui",18)
```



**案例**

```html


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        .header {
            display: flex;
            width: 500px;
        }

        .header li {
            flex: 1;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid black;
        }

        .box {
            position: relative;
            height: 200px;
        }

        .box li {
            position: absolute;
            left: 0;
            top: 0;
            width: 500px;
            height: 200px;
            background-color: yellow;
            display: none;
        }

        .header .active {
            background-color: red;
        }

        .box .active {
            display: block;
        }
    </style>
</head>

<body>
    <div class="container1">
        <ul class="header">
            <li class="active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
        </ul>
        <ul class="box">
            <li class="active">111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
            <li>555</li>
            <li>666</li>
        </ul>
    </div>

    <div class="container2">
        <ul class="header">
            <li class="active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
        </ul>
        <ul class="box">
            <li class="active">111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
            <li>555</li>
            <li>666</li>
        </ul>
    </div>

    <script>
        function Tabs(selector, type) {
            this.selector = document.querySelector(`${selector}`)
            this.type = type

            this.headers = this.selector.querySelectorAll(".header li ")
            this.boxs = this.selector.querySelectorAll(".box li ")
            this.change()
        }

        Tabs.prototype.change = function () {
            for (let i = 0; i < this.headers.length; i++) {
                this.headers[i].addEventListener(this.type, () => {

                    for (let m = 0; m < this.headers.length; m++) {
                        this.headers[m].classList.remove("active")
                        this.boxs[m].classList.remove("active")
                    }
                    this.headers[i].classList.add("active")
                    this.boxs[i].classList.add("active")

                }, false)
            }
        }

        new Tabs('.container1', "click")
        new Tabs('.container2', "mouseover")
    </script>
</body>

</html>
```



#### 四. 工厂模式

> 由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。

```js
function UserFactory(role){
    function User(role,pages){
        this.role = role;
        this.pages = pages;
        
    }

    switch(role){
        case "superadmin":
            return new User("superadmin",["home","user-manage","right-manage","news-manage"])
            break;
        case "admin":
            return new User("admin",["home","user-manage","news-manage"])
            break;
        case "editor":
            return new User("editor",["home","news-manage"])
            break;
        default:
            throw new Error('参数错误')
    }
}
```

简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。但是在函数内包含了所有对象的创建逻辑和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。当我们的对象不是上面的3个而是10个或更多时，这个函数会成为一个庞大的超级函数，便得难以维护。所以，简单工厂只能作用于**创建的对象数量较少，对象的创建逻辑不复杂时使用**。



#### 五.抽象工厂模式

> 抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建。

```js
class User {
    constructor(name) {
        this.name = name
    }

    welcome() {
        console.log("欢迎回来", this.name)
    }

    dataShow() {
        throw new Error("抽象方法不允许直接调用")
    }
}

class Editor extends User {
    constructor(name) {
        super(name)
        this.role = "editor"
        this.pages = ["home", "news-manage"]
    }

    dataShow() {
        console.log("editor的可视化逻辑")
    }
}

class Admin extends User {
    constructor(name) {
        super(name)
        this.role = "admin"
        this.pages = ["home", "user-manage", "news-manage"]
    }

    dataShow() {
        console.log("admin的可视化逻辑")
    }

    AddUser() {
        console.log("adduser方法")
    }
}

class SuperAdmin extends User {
    constructor(name) {
        super(name)
        this.role = "superadmin"
        this.pages = ["home", "user-manage", "right-manage", "news-manage"]
    }

    dataShow() {
        console.log("superadmin的可视化逻辑")
    }

    AddUser() {
        console.log("adduser方法")
    }

    AddRight() {
        console.log("addright方法")
    }
}

function getAbstractUserFactory(role) {
    switch (role) {
        case 'superadmin':
            return SuperAdmin;
            break;
        case 'admin':
            return Admin;
            break;
        case 'editor':
            return Editor;
            break;
        default:
            throw new Error('参数错误')
    }
}
```



#### 六. 建造者模式

> 建造者模式（builder pattern）属于创建型模式的一种，提供一种创建复杂对象的方式。它将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
>
> 建造者模式是一步一步的创建一个复杂的对象，它允许用户只通过指定复杂的对象的类型和内容就可以构建它们，用户不需要指定内部的具体构造细节。

```js
class Navbar {
    init() {
        console.log("navbar-init")
    }

    getData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
                console.log("navbar-getData")
            }, 1000)
        })
    }

    render() {
        console.log("navbar-render")
    }
}
class List {
    init() {
        console.log("List-init")
    }

    getData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
                console.log("List-getData")
            }, 1000)
        })
    }

    render() {
        console.log("List-render")
    }
}

class Operator {
    async startBuild(builder) {
        await builder.init()
        await builder.getData()
        await builder.render()
    }
}

const op = new Operator();
const navbar = new Navbar();
const list = new List();
op.startBuild(navbar);
op.startBuild(list); 
```

> 建造者模式将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。 工厂模式主要是为了创建对象实例或者类簇（抽象工厂），关心的是最终产出(创建)的是什么，而不关心创建的过程。而建造者模式关心的是创建这个对象的整个过程，甚至于创建对象的每一个细节。



#### 七. 单例模式

> 1、保证一个类仅有一个实例，并提供一个访问它的全局访问点
> 2、主要解决一个全局使用的类频繁地创建和销毁，占用内存

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
</head>
<style>
    .kerwin-modal{
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: yellow;
        text-align: center;
    }
</style>


<body>
    <button id='open'>打开弹框</button>
    <button id='close'>关闭弹框</button>
</body>
<script>
    const Modal = (function () {
        let modal = null
        return function () {
            if (!modal) {
                modal = document.createElement('div')
                modal.innerHTML = '登录对话框'
                modal.className = 'kerwin-modal'
                modal.style.display = 'none'
                document.body.appendChild(modal)
            }
            return modal
        }
    })()


  
    document.querySelector('#open').addEventListener('click', function () {
        const modal = new Modal()
        modal.style.display = 'block'
    })
 
    document.querySelector('#close').addEventListener('click', function () {
        const modal = new Modal()
        modal.style.display = 'none'
    })
</script>


</html>
```



#### 八. 装饰器模式

> 装饰器模式能够很好的对已有功能进行拓展，这样不会更改原有的代码，对其他的业务产生影响，这方便我们在较少的改动下对软件功能进行拓展。

```js
 Function.prototype.before = function (beforeFn) {
     var _this = this;
     return function () {
         beforeFn.apply(this, arguments);
         return _this.apply(this, arguments);
     };
 };
Function.prototype.after = function (afterFn) {
    var _this = this;
    return function () {
        var ret = _this.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    };
};


function test() {
    console.log("11111")
}
var test1 = test.before(() => {
    console.log("00000")
}).after(()=>{
    console.log("22222")
})

test1()
```



#### 九. 适配模式

> 将一个类的接口转换成客户希望的另一个接口。适配器模式让那些接口不兼容的类可以一起工作

```js
 //按照官网代码复制
class TencentMap {
    show() {
        console.log('开始渲染腾讯地图');
    }
}
//按照官网代码复制
class BaiduMap {
    display() {
        console.log('开始渲染百度地图');
    }
}

class BaiduMapAdapter extends BaiduMap {
    constructor() {
        super();
    }
    render() {
        this.display();
    }
}
class TencentMapAdapter extends TencentMap {
    constructor() {
        super();
    }
    render() {
        this.show();
    }
}
// 外部调用者
function renderMap(map) {
    map.render(); // 统一接口调用
}
renderMap(new TencentMapAdapter());
renderMap(new BaiduMapAdapter());
```

适配器不会去改变实现层，那不属于它的职责范围，它干涉了抽象的过程。外部接口的适配能够让同一个方法适用于多种系统。



#### 十. 策略模式

> 策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分割开来，并委派给不同的对象对这些算法进行管理。
>  该模式**主要解决**在有多种算法相似的情况下，使用 `if...else` 所带来的复杂和难以维护。它的**优点**是算法可以自由切换，同时可以避免多重`if...else`判断，且具有良好的扩展性。



```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        li {
            display: flex;
            justify-content: space-between;
        }

        .reditem {
            background-color: red;
        }

        .yellowitem {
            background-color: yellow;
        }

        .greenitem {
            background-color: green;
        }
    </style>
</head>

<body>
    <ul id="mylist">

    </ul>
    <script>
        var list = [{
                title: "男人看了沉默",
                type: 1
            },
            {
                title: "震惊",
                type: 2
            },
            {
                title: "kerwin来了",
                type: 3
            },
            {
                title: "tiechui离开了",
                type: 2
            }
        ]
        let obj = {
            1: {
                content: "审核中",
                className: "yellowitem"
            },
            2: {
                content: "已通过",
                className: "greenitem"
            },
            3: {
                content: "被驳回",
                className: "reditem"
            }
        }

        mylist.innerHTML = list.map(item =>
            `
            <li>
                <div>${item.title}</div>    
                <div class="${obj[item.type].className}">${obj[item.type].content}</div>    
            </li>
           `).join("")
    </script>
</body>

</html>
```



1. 可以有效地避免多重条件选择语句
2. 代码复用性高，避免了很多粘贴复制的操作。
3. 策略模式提供了对开放封闭原则的支持，将算法独立封装在strategies中，使得它们易于切换，易于扩展。





#### 十一. 代理模式

> 代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。
>
> 代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。

```js
let obj = {}
let proxy = new Proxy(obj,{
    get(target,key){
        console.log("get",target[key])
        return target[key]
    },

    set(target,key,value){
        console.log("set",target,key,value)
        if(key==="data"){
            box.innerHTML = value
        }
        target[key] = value
    }
})
```



#### 十二. 观察者模式

> 观察者模式包含观察目标和观察者两类对象，
>
> 一个目标可以有任意数目的与之相依赖的观察者
>
> 一旦观察目标的状态发生改变，所有的观察者都将得到通知。

当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新，解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其他对象通知的问题

```js
class Sub {
    constructor() {
        this.observers = []
    }

    add(observer) {
        this.observers.push(observer)
    }

    remove(observer) {
        this.observers = this.observers.filter(item => item !== observer)
    }

    notify() {
        this.observers.forEach(item => item.update())
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }
    update() {
        console.log("通知了", this.name)
    }
}
const observer1 = new Observer("kerwin")
const observer2 = new Observer("tiechui")

const sub = new Sub()
sub.add(observer1)
sub.add(observer2)

setTimeout(() => {
    sub.notify()
}, 2000)
```

优势：目标者与观察者，功能耦合度降低，专注自身功能逻辑；观察者被动接收更新，时间上解耦，实时接收目标者更新状态。

缺点：观察者模式虽然实现了对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如 “筛选通知”，“指定主题事件通知” 。



#### 十三. 发布订阅模式

>1.观察者和目标要相互知道
>2.发布者和订阅者不用互相知道，通过第三方实现调度，属于经过解耦合的观察者模式

<img src="%E7%AC%94%E8%AE%B0.assets/image-20221031101039497.png" alt="image-20221031101039497" style="zoom:50%;float:left;" />

```js
 class SubPub {
     constructor() {
         this.message = {}
     }

     subscribe(type, fn) {
         if (!this.message[type]) {
             this.message[type] = [fn]
         } else {
             this.message[type].push(fn)
         }
     }

     publish(type, ...arg) {
         if (!this.message[type]) return

         const event = {
             type: type,
             arg: arg || {}
         }

         // 循环执行为当前事件类型订阅的所有事件处理函数
         this.message[type].forEach(item => {
             item.call(this, event)
         })
     }

     unsubscribe(type,fn){
         if (!this.message[type]) return

         if(!fn){
             this.message[type] && (this.message[type].length = 0)
         }else{
             this.message[type] = this.message[type].filter(item=>item!==fn)
         }
     }
 }
```



#### 十四. 模块模式

> 模块化模式最初被定义为在传统软件工程中为类提供私有和公共封装的一种方法。
>
> 能够使一个单独的对象拥有公共/私有的方法和变量，从而屏蔽来自全局作用域的特殊部分。这可以减少我们的函数名与在页面中其他脚本区域内定义的函数名冲突的可能性。

1. 闭包

```js
var testModule = (function () {
    var count = 0;
    return {

        increment () {
            return ++count;
        },

        reset: function () {

            count = 0;
        },

        decrement(){
            return --count;
        }
    };

})();
```

2. 模块化

```js
export default {
    name:"moduleA",
    test(){
        return "test"
    }
}

<script type="module">
        import moduleA from './1.js'
        console.log(moduleA)
</script>
```

module模式使用了闭包封装“私有”状态和组织。它提供了一种包装混合公有/私有方法和变量的方式，防止起泄露至全局作用域，并与别的开发人员的接口发生冲突。通过该模式，只需要返回一个公有的API，而其他的一切则都维持在私有闭包里。



#### 十五. 桥接模式

> 桥接模式：将抽象部分与它的实现部分分离，使它们都可以独立地变化。
>
> 使用场景：一个类存在两个或多个独立变化的维度，且这两个维度都需要进行扩展

**优点：**
把抽象与实现隔离开，有助于独立地管理各组成部分。

**缺点：**
每使用一个桥接元素都要增加一次函数调用，这对应用程序的性能会有一些负面影响——提高了系统的复杂程度。

```js
function Toast(ele,animation){
    this.ele = ele
    this.animation = animation
}

Toast.prototype.show = function(){
    this.animation.show(this.ele)
}
Toast.prototype.hide = function(){
    this.animation.hide(this.ele)
}

function Message(ele,animation){
    this.ele = ele
    this.animation = animation
}

Message.prototype.show = function(){
    this.animation.show(this.ele)
}
Message.prototype.hide = function(){
    this.animation.hide(this.ele)
}

const Animations = {
    bounce:{
        show(ele){
            console.log(ele,"弹跳显示")
        },
        hide(ele){
            console.log(ele,"弹跳隐藏")
        }
    },
    slide:{
        show(ele){
            console.log(ele,"滑动显示")
        },
        hide(ele){
            console.log(ele,"滑动隐藏")
        }
    }
}

let toast = new Toast("div1",Animations.slide)

toast.show()
toast.hide()
```



#### 十六. 组合模式

> 组合模式在对象间形成树形结构;
>
> 组合模式中基本对象和组合对象被一致对待;
>
> 无须关心对象有多少层, 调用时只需在根部进行调用;

它在我们树型结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以向处理简单元素一样来处理复杂元素，从而使得客户程序与复杂元素的内部结构解耦。

```js
const Folder = function (folder) {
    this.folder = folder
    this.lists = []
}
Folder.prototype.add = function (res) {
    this.lists.push(res)
}
Folder.prototype.scan = function () {
    console.log(`开始扫描文件夹: ${this.folder}`)
    for (let index = 0; index < this.lists.length; index++) {
        this.lists[index].scan()
    }
}

const File = function (file) {
    this.file = file
}

File.prototype.scan = function () {
    console.log(`开始扫描文件: ${this.file}`)
}

const folder = new Folder('root')
const folder1 = new Folder('html')
const folder2 = new Folder('js')

const file1 = new File('html4')
const file2 = new File('html5')
const file3 = new File('es5')
const file4 = new File('es6')

folder.add(folder1)
folder.add(folder2)

folder1.add(file1)
folder1.add(file2)
folder2.add(file3)
folder2.add(file4)

folder.scan()
```



#### 十七. 命令模式

> 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。需要一种松耦合的方式来设计程序，使得发送者和接收者能够消除彼此之间的耦合关系。

命令模式由三种角色构成：

1. 发布者 `invoker`（发出命令，调用命令对象，不知道如何执行与谁执行）；
2. 接收者 `receiver` (提供对应接口处理请求，不知道谁发起请求）；
3. 命令对象 `command`（接收命令，调用接收者对应接口处理发布者的请求）。

```js
class Receiver { // 接收者类
    execute() {
        console.log('接收者执行请求');
    }
}

class Command { // 命令对象类
    constructor(receiver) {
        this.receiver = receiver;
    }
    execute() { // 调用接收者对应接口执行
        console.log('命令对象->接收者->对应接口执行');
        this.receiver.execute();
    }
}

class Invoker { // 发布者类
    constructor(command) {
        this.command = command;
    }
    invoke() { // 发布请求，调用命令对象
        console.log('发布者发布请求');
        this.command.execute();
    }
}

const storehouse = new Receiver(); // 仓库
const order = new Command(storehouse); // 订单
const client = new Invoker(order); // 客户
client.invoke();
```



#### 十八. 模板方法模式

> 模板方法模式由两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算结构，并且可以选择重写父类的方法。

```js
 var Container = function (param) {
     var render = function(list){
         console.log("render-list",list)
     }
     var getData = param.getData || function () {
         throw new Error('必须传递getData方法');
     }

     var F = function () {}; //对象 类
     F.prototype.init =async function () {
         let list = await getData()
         render(list)
     };
     return F;
 }
 // 传对象
 var Nowplaying = Container({
     getData(){
         console.log("nowplaying")
         return [1,2,3]
     }
 })
 var nowplaying = new Nowplaying();
nowplaying.init();
var Comingsoon = Container({
    getData(){
        console.log("comingsoon")
        return [4,5,6]
    }
})
var comingsoon = new Comingsoon();
comingsoon.init();
```

模板方法模式时一种典型的通过封装变化提高系统扩展性的设计模式。运用了模板方法模式的程序中，子类方法种类和执行顺序都是不变的，但是子类的方法具体实现则是可变的。父类是个模板，子类可以添加，就增加了不同的功能。



#### 十九. 迭代器模式

> 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

1. 为遍历不同数据结构的 “集合” 提供统一的接口；
2. 能遍历访问 “集合” 数据中的项，不关心项的数据结构

```js
// 统一遍历接口实现
var kerwinEach = function (arr, callBack) {
    for (let i = 0; i < arr.length; i++) {
        callBack(i, arr[i])
    }
}

// 外部调用
kerwinEach([11, 22, 33, 44, 55], function (index, value) {
    console.log([index, value]);
    var oli  =document.createElement("li")
    oli.innerHTML = value
    list.appendChild(oli)
})
```



#### 二十. 职责链模式

> 使多个对象都有机会处理请求，从而避免了请求的发送者与多个接收者直接的耦合关系，将这些接收者连接成一条链，顺着这条链传递该请求，直到找到能处理该请求的对象。

```js
btn.addEventListener("click", function (event) {
    checks.check()
});

function checkEmpty() {
    if (input.value.length == 0) {
        console.log("这里不能为空");
        return
    }
    return "next"
}

function checkNumber() {
    if (Number.isNaN(+input.value)) {
        console.log("这里必须是数字");
        return
    }
    return "next"
}

function checkLength() {
    if (input.value.length < 6) {
        console.log("这里要大于6个数字");
        return
    }
    return "next"
}

class Chain {
    constructor(fn) {
        this.checkRule = fn || (() => "next");
        this.nextRule = null;
    }
    addRule(nextRule) {
        this.nextRule = new Chain(nextRule);
        return this.nextRule;
    }
    end() {
        this.nextRule = {
            check: () => "end"
        };
    }
    check() {
        this.checkRule() == "next" ? this.nextRule.check() : null;
    }
}

const checks = new Chain();
checks.addRule(checkEmpty).addRule(checkNumber).addRule(checkLength).end();
```

优点：

1. 符合单一职责，使每个方法中都只有一个职责。
2. 符合开放封闭原则，在需求增加时可以很方便的扩充新的责任。
3. 使用时候不需要知道谁才是真正处理方法，减少大量的 `if` 或 `switch` 语法。

缺点：

1. 团队成员需要对责任链存在共识，否则当看到一个方法莫名其妙的返回一个 next 时一定会很奇怪。
2. 出错时不好排查问题，因为不知道到底在哪个责任中出的错，需要从链头开始往后找。