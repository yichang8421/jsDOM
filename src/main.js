//document.createElement('div');
const div = dom.create("<div>newDiv1</div>");
console.log(div);

dom.after(window.test, div);

const div2 = dom.create("<div>newDiv2</div>");
dom.before(window.test, div2);

//测试wrap()
const div3 = dom.create("<div id='parent'></div>");
dom.wrap(window.test, div3);

//测试empty()
const node = dom.empty(window.testEmpty);
console.log(node);

//设置title属性
dom.attr(window.test, 'title', 'helloWorld');
//读取title属性
const title = dom.attr(window.test, 'title');
console.log(`title:${title}`);

//设置节点的文本内容(会整体替换节点内容)
dom.text(window.test, '你好，这是新的内容');
//获取节点的文本内容
dom.text(window.test);

//设置节点的样式
dom.style(window.test, {border: '1px solid red', color: 'green'});
//获取节点的样式
console.log(`test.color: ${dom.style(window.test, 'color')}`);
//修改样式属性值
dom.style(window.test, 'color', 'blue');

//给节点添加class属性
dom.class.add(window.test, 'red');
//删除class属性
dom.class.remove(window.test, 'red');
//判断某个class属性是否存在
console.log(`含有class=red? ${dom.class.contains(window.test, 'red')}`);

const testClick = () => {
    console.log('点击事件');
};
//添加点击事件
dom.on(window.test, 'click', testClick);
//移出点击事件
dom.off(window.test, 'click', testClick);

//获取元素
const testDiv = dom.find('#test2')[0];
console.log(testDiv);
console.log(dom.find('.red',testDiv)[0]);

//获取父节点
console.log(dom.parent(window.test));

const sibling2 =dom.find('#siblings2')[0];
console.log('兄弟节点:');
console.log(dom.siblings(sibling2));

console.log('前一个兄弟节点:');
console.log(dom.next(sibling2));

console.log('后一个兄弟节点:');
console.log(dom.previous(sibling2));

//设置子元素属性
const t = dom.find("#testTravel")[0];
dom.each(dom.children(t),(n)=> dom.style(n,'color','red'));

//找到节点在平级节点中的索引
console.log(`siblings的索引：${dom.index(sibling2)}`);

