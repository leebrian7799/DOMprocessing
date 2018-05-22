/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

window.DomNodeCollection = DomNodeCollection;
const _docReadyCallbacks = [];
let _docReady = false;

window.$l = function(arg){
  switch(typeof arg){
    case "string":
      return getNodesFromDom(arg);
    case "object":
      if (arg instanceof HTMLElement){
        return new DomNodeCollection(arg);
      }
    case "function":
      if (arg instanceof HTMLElement){
        return new DomNodeCollection([arg]);
      }
  }
};


$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
}


$l.ajax = (options) => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    options.url += `?${toQueryString(options.data)}`;
  }

  request.open(options.method, options.url, true);
  request.onload = (e) => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};


  toQueryString = (obj) => {
    let result = "";
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        result += `${prop}=${obj[prop]}&`;
      }
    }
    return result.substring(0, result.length - 1);
  };

  registerDocReadyCallback = (func) => {
    if (!_docReady) {
      _docReadyCallbacks.push(func);
    } else {
      func();
    }
  };


getNodesFromDom = (arg) => {
  const nodes = document.querySelectorAll(arg);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach(func => func());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes){
    this.nodes = nodes;
  }

  html(str = null){
    if (str.constructor.name === 'String') {
      this.nodes.forEach((node) => {
        node.innerHTML = str;
      });
    } else if (this.node.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  each(cb){
    this.nodes.forEach(cb);
  }

  empty(){
    this.html('');
  }

  append(children){
    if (this.node.length === 0) return;

    if (typeof children === 'object'
     && !(children instanceof DomNodeCollection)){
      children = $l(children);
    }

    if (typeof children == "string"){
      this.each((node)=> {
        node.innerHTML += children;
      });
    } else if (children instanceof DomNodeollection){
      this.each((node) => {
        children.each((childNode) => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  remove(){
    this.nodes.forEach(node.parentNode.removeChild(node));
  }

  attr(key, val){
    if (typeof val === 'string'){
      this.each(node => node.setAttribute(key, val));
    }else{
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(){
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass){
   this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(toggleClass){
    this.each(node => node.classList.toggle(toggleClass));
  }

  find(callback){
    let foundNodes = [];
    this.each((node) => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });
    return new DomNodeCollection(foundNodes);
  }

  children(){
    let childNodes = [];
    this.each((node) => {
        const childNodeList = node.children;
        childNodes = childNodes.concat(Array.from(childNodeList));
    });

    return new DomNodeCollection(childNodes);
  }


  parent(){
    let parentNode = [];
    parentNode = this.parent;

    this.each(({parentNode}) => {
        if (!parentNode.visisted){
          parentNodes.push(parentNode);
          parentNode.visisted = true;
      }
    });

    parentNode.forEach((node) => {
      node.visited = false;
    })

    return new DomNodeCollection(childNodes);
    }


    on(eventName, callback) {
      this.each((node) => {
        node.addEventListener(eventName, callback);
        const eventKey = `domprocessingEvents-${eventName}`;
        if (typeof node[eventKey] === "undefined") {
          node[eventKey] = [];
        }
        node[eventKey].push(callback);
      });
    }

    off(eventName) {
      this.each((node) => {
        const eventKey = `domprocessingEvents-${eventName}`;
        if (node[eventKey]) {
          node[eventKey].forEach((callback) => {
            node.removeEventListener(eventName, callback);
          });
        }
        node[eventKey] = [];
      });
    }
  }
  module.exports = DomNodeCollection;


/***/ })
/******/ ]);