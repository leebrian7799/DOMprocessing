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

    parentNode.forEach(node) => {
      node.visited = false;
    }

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
