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


  find(){}

  children(){}

  parent(){}

}
  module.exports = DomNodeCollection;
