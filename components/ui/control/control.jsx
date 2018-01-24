import React, { Component } from "react"
/**
 * @desc 表示一个组件
 */
export default class Control extends Component {
    constructor(props) {
        super(props)
    }
}


/**
     * @desc 过滤属性 对创建节点进行属性、事件等绑定
     */
export function propsFilter(props, className) {
    const node = document.createElement(props.domType)
    let params = {
        className: className
    }
    for (const key in props) {
        const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
        // 过滤特殊字段
        if (node[filterKey] !== undefined) {
            switch (filterKey) {
                case "pattern":
                case "patternMessage":
                    break;
                case "className":
                    params[key] = unique(props[key].split(" ")).join(" ");
                    break;
                default:
                    params[key] = props[key] instanceof Function ? event => props[key](event) : props[key];
                    break;
            }
        }

        // 如果有eRef 则进行绑定
        key === "inputRef" && (params["ref"] = props["inputRef"])
    }
    return params
}
/**
 * @desc 去重
 * @param {*} arr 
 */
export function unique(arr) {
    var res = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        for (var j = 0, jlen = res.length; j < jlen; j++) {
            if (res[j] === obj) break;
        }
        if (jlen === j) res.push(obj);
    }
    return res;
}

/**
 * @desc 向上寻找指定节点
 */
export function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}