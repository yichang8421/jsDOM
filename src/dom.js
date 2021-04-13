window.dom = {
    /* 增加节点 */
    create(string) {
        // 创建任意新节点
        const container = document.createElement('template');
        container.innerHTML = string.toString().trim();
        return container.content.firstChild;
    },

    after(node, newNode) {
        // 在node节点之后添加节点
        // 相当于在node下一个节点之前插入newNode节点
        // console.log(node.nextSibling);
        node.parentNode.insertBefore(newNode, node.nextSibling);
    },

    before(node, newNode) {
        node.parentNode.insertBefore(newNode, node);
    },

    append(parentNode, newNode) {
        parentNode.appendChild(newNode);
    },

    wrap(node, newParent) {
        //    新增父节点
        /* 先将newParent插到node前面，保证newParent可以承接原node的父节点 */
        /* 再将node移到newParent里面 */
        // 也可以先将newParent插到node后面，因为并不改变与原node父节点的包含关系（注意，这与链表不同）
        dom.before(node, newParent);
        dom.append(newParent, node);
    },

    /* 删除节点 */
    remove(deleteNode) {
        deleteNode.parentNode.removeChild(deleteNode);
        return deleteNode;
        //    return deleteNode的目的是保留删除节点引用
    },

    empty(node) {
        const {childNodes} = node;
        //const childNodes = node.childNodes;
        const arr = [];
        for (let n = node.firstChild; n; n = node.firstChild) {
            arr.push(dom.remove(node.firstChild));
        }
        return arr;
    },

    /* 修改节点 */
    attr(node, key, value) {    //重载
        if (arguments.length === 3) {
            node.setAttribute(key, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(key);
        }
    },

    text(node, string) {
        if (arguments.length === 2) {
            //适配
            if ('innerText' in node) {
                node.innerText = string.toString();     //ie
            } else {
                node.textContent = String(string);      //FireFox/Chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText;        //ie
            } else {
                return node.textContent;      //FireFox/Chrome
            }
        }
    },

    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = String(string);
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },

    style(node, key, value) {
        if (arguments.length === 3) {
            //    dom.style(div,'color','green');
            //    修改style
            node.style[key] = value;
        } else if (arguments.length === 2) {
            if (typeof key === 'string') {
                //dom.style(div.'color');
                //获取key样式的属性值
                return node.style[key];
            } else if (key instanceof Object) {
                //    dom.style(div,{color:'red'});
                //    设置style
                for (let n in key) {
                    node.style[n] = key[n];
                }
            }
        }
    },

    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        contains(node, className) {
            return node.classList.contains(className);
        }
    },

    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },

    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },

    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node);
    },

    next(node) {
        let x = node.nextSibling;
        while (x && x.nodeType === 3) {
            //    当x存在且x是文本，则一直移动到下一个节点，直到x是元素节点停止
            x = x.nextSibling;
        }
        return x;
    },
    previous(node) {
        let x = node.previousSibling;
        while (x && x.nodeType === 3) {
            //    当x存在且x是文本，则一直移动到下一个节点，直到x是元素节点停止
            x = x.previousSibling;
        }
        return x;
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call('', nodeList[i]);
        }
    },
    index(node) {
        //定义list表示node平级所有节点（包括node本身）
        const list = dom.children(node.parentNode);
        let index = -1;
        for(let i=0;i<list.length;i++){
            if(list[i] ===node){
                index = i;
                break;
            }
        }
        return index;
    }
};
