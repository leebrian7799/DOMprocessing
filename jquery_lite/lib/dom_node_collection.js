


class DomNodeCollection{
  constructor(nodes){
    this.nodes = nodes;
  }
  html(str = null){
    if (typeof str === 'string'){
      this.nodes.for( (node)=>{
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

  remove(){}

  attr(){}

  addClass(){}

  removeClass(){}


  find(){}

  children(){}

  parent(){}

}
