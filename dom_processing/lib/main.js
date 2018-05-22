const DomNodeCollection = require("./dom_node_collection.js");

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
