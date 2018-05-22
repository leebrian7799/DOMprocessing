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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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

window.$l = function(arg){

  switch(typeof arg){
    case "string":
      return getNodesFromDom(arg);
    case "object":
      if (arg instanceof HTMLElement){
        return new DomNodeCollection(arg);
      }
  }


};


getNodesFromDom = (arg) => {

  const nodes = document.querySelectorAll(arg);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};



/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes){
    this.nodes = nodes;
  }
  html(str = null){


    if (str.constructor.name === 'String'){
      this.nodes.forEach( (node)=>{
        node.innerHTML = str;
      });
    }else if (this.node.length > 0){
      return this.nodes[0].innerHTML;
    }
  }


  empty(){
    this.html('');
  }


  append(children){
    if (this.node.length === 0) return;

    if (typeof children === 'string' && !(children instanceof DomNodeCollection)){
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

  addClass(){}

  removeClass(){}


  find(callback){
    let nodes = [];
    this.each( (node)=>{
      if (callback(node)) nodes.push(node);
    });

    return new DomNodeCollection(nodes);
  }

  children(){
    let childNodes = [];
    this.each((node)=>{
        const childNodeList = node.children;
        childNodes = childNodes.concat(Array.from(childNodeList));
    });

    return new DomNodeCollection(childNodes);
  }

  parent(){
    let parentNode = [];
    parentNode = this.parent;

    return new DomNodeCollection(childNodes);


  }

}
  module.exports = DomNodeCollection;


/***/ })
/******/ ]);
