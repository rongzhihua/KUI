import {createRenderer} from 'vue';
// import {Renderer, RendererOptions} from "vue-server-renderer";
// import Vue, { VNode, VNodeDirective } from 'vue';

function objToStyle (field) {
    const stringArray = field.split('') // 将字符串分割成相应的字符串数组
    let newField = field
    stringArray.forEach(t => {
        if (/[A-Z]/.test(t)) {
            // 遍历分割之后的字符串组，将找到的大写字母替换成其他字符串，将替换后的字符串赋值给另外一个新的string 变量
            newField = newField.replace(t, `-${t.toLowerCase()}`)
        }
    })
    return newField
}

const render = createRenderer({
    forcePatchProp(el, key){
        //// console.log(key+"=forecePatchProp=="+el)
        //一般原生控件的一些属性会在这里进行进一步的处理
        /*例如:
          if(key=="modelValue"){
            if(el.type="TTrackBar"){
            }
        }*/
        return false;
    },
    createElement(type,isSVG) {
        // console.log(type,isSVG, '-------')
        let element
        if(isSVG)
          element = document.createElementNS('http://www.w3.org/2000/svg', type)
        else
         element = document.createElement(type)
        return element;
    },
    insert(el, parent, anchor) {
        if(parent) {
            if (el) {
                parent.appendChild(el);
            }
        }
    },
    parentNode(node) {
        return node.parentNode;
    },
    remove(el) {
        //// console.log("remove--------");
        const parent = el.parentNode
        if(parent) {
            parent.removeChild(el)
        }
    },
    createText(text) {
        //// console.log("createText");
        return document.createTextNode(text)
    },
    patchProp(el, key, preValue, nextValue) {
        //  console.log("patchProp="+key+":"+preValue+"----->"+nextValue)
        //  // console.log(el.innerHTML)
        if(key==="onUpdate:modelValue"){
            //// console.log("改改改改改改改")
        } else if(key.startsWith('on')) {
            el.addEventListener(key.substr(2).toLowerCase(), nextValue)
        } else if(key==="id") {
            if(window.native){
              if(el.type!=="radio")
                el.setAttribute("name", nextValue)
            } else {
                el.setAttribute("id", nextValue)
            }
            el[key] = nextValue;
        } else if(key==="style"){
            let str = ""
            // // console.log(JSON.stringify(nextValue))
            for(let item in nextValue) {
                str += objToStyle(item) +':'+ nextValue[item]+';'
            }
            // // console.log(str)
            if(str!=="") el.setAttribute("style", str);
        } else if(key==="class") {
             // // console.log("patchProp="+key+":"+preValue+"----->"+nextValue)
            el.className = nextValue;
            el[key] = nextValue;
        }  else if(key==="checked") {
          // // console.log("patchProp="+key+":"+preValue+"----->"+nextValue)
          el.setAttribute("checked", nextValue)
            el[key] = nextValue;
          }  else if(key==="readonly") {
            // console.log("readonly它会根据");
            if(nextValue)
              el.setAttribute("readonly", nextValue)
            else
              el.removeAttribute("readonly");
            el[key] = nextValue;
          } else if(key==="modelValue") {
            //// console.log("patchProp="+key+":"+preValue+"----->"+nextValue)
            if(window.native){
                el.ParseAttribute('Value', nextValue);
                el.setAttribute("Value", nextValue)
                el[key] = nextValue;
                /*这里可以直接对控件绑定原始JS的事件,或控制属性,如下面
                if(el.Control){
                    el.Control.Value = el.Control.Value + 10
                    // console.log(el.Control.name);
                }*/
            } else {
                el.setAttribute("Value", nextValue)
                el["Value"] = nextValue;
            }
        } else if(el.nodeName.toLowerCase()==="path") {
            // // console.log(key, nextValue, '+++++++');
          el.setAttribute(key, nextValue)
          
        } else if(el.nodeName.toLowerCase()==="svg") {
            // // console.log(key, nextValue, '-------');
          // // console.log(el.outerHTML);
          el.setAttribute(key, nextValue)
        } else {
           // console.log("endpatchProp="+key+"       :=>"+nextValue+"     ------>tag:"+el.nodeName)
           el.setAttribute(key, nextValue)
           el[key] = nextValue;
        }
    },
    setElementText(node, text) {
        node.innerText = text;
    },
    querySelector(selector){
        return document.querySelector(selector);
    },
    // ticker.add 要实现的
    nextSibling(node){
        //// console.log("nextSibling"+typeof node);
        return node.nextSibling
    },
    createComment(text) {
        // console.log("createComment" + text);
        let element;
        if(window.native){
            element = document.createElement("comment");
            element.content = text;
        } else {
            element = document.createComment(text);
        }
        return element;
    },
    setText(node, text) {
        // console.log("setText:"+text);
        if (window.native)
            node.content = text
        else
            node.nodeValue = text
    },
    setScopeId(el, id){
        // console.log("setScopeId:" + id , el.outerHTML);
        //ID必须与属性名称相同,这样才能生成'class="" data-v-67ab86e3 disabled="false"'
        el.setAttribute(id, id)
    },
    //这里不处理cloneNode,对于原生程序,对于浏览器并不会调用这个方法
    // cloneNode(node) {
        // // console.log("cloneNode")
        // // console.log(node)
        // // console.log(node.outerHTML)
        // return node.cloneNode(true);
    // },
    insertStaticContent(content, parent, anchornull, isSVG) {
        //// console.log("insertStaticContent");
        return []
    }
});

function createAppNative(rootComponent) {
    return render.createApp(rootComponent)
}

import {createApp} from "vue";

// export let createAppTarget = window.native?createAppNative: createApp
export let createAppTarget = createAppNative
