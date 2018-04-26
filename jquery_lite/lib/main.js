const DomNodeCollection = require("./dom_node_collection");

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
  return DomNodeCollection(nodesArray);
};

$(function(){


});
