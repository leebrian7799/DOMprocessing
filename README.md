# DOMprocessing
DOMprocessing is an implementation of the most commonly used functionality of the jQuery library. jQuery is a small, responsive, and feature-rich JavaScript library. It makes things like HTML document manipulation and traversal, event handling, Ajax, and animation much simpler with an intuitive API that works across many browsers. DOMprocessing allows users to:

Select DOM element
Traverse and manipulate DOM elements
Build DOM elements
Create DOMNodeCollection objects from HTMLElements
Queue callbacks until DOM is ready and loaded
Simplify HTTP requests
<h1>Getting Started</h1>
To get started with DOMprocessing, use the documents in the /dom_processing/lib/ folder by running webpack in the command line to recreate the webpack file, then include the webpack output output dom_processing.js in your source code.

```
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="../lib/dom_processing.js.js"></script>
  ...
</head>
```
<h1>API</h1>

<h2>$l</h2>


The the global variable $l is used as a wrapper for all of the methods in the DOMprocessing library.

$l allows the users to select elements with CSS selectors. $l("span") returns a DOMNodeCollection object which is an object custom to the DOMprocessing library that is an array of HTMLElements.

$l can also be used to create DOMNodeCollection objects given unwrapped HTMLElements allowing these elements to access DOMprocessing methods.

The third way to use $l is to take a string of HTML code, build HTMLElement from the code, then wraps the HTMLElement(s) in a DOMNodeCollection object.

The final use of $l is as tool to queue functions to run once the DOM is fully loaded.
```
// This function runs when DOM is fully loaed.
$l(() => {

  // The element variable is a DOMNodeCollection object, an array-like
  //structure, with all the div elements, so DOMNodeCollection such as `each`
  //may be used
  const elements = $l("div");

  elements.each((element) => {

    // This use of $l takes the string of HTML code, creates a HTMLElement,
    // and wraps the HTMLElement in a DOMNodeCollection object
    const paragraph = $l("<p></p>");

    // Because the elements contained by the DOMNodeCollection are still
    // HTMLElements, they must be wrapped in an DOMNodeCollection before using
    // DOMNodeCollection methods such as `append`
    const $lelement = $l(element);
    $lelement.append(paragraph);

  });

});
```
<h2>DOM Traversal</h2>


DOMNodeCollection methods to navigate DOM elements

<h3>each</h3>
Iterates through  elements in a DOMNodeCollection and applies a callback passed as an argument

```
const elements = $l("div");
elements.each(callbackFunction);
```

<h3>children</h3>
Returns a DOMNodeCollection object containing only the direct children elements of every HTMLElement in the original DOMNodeCollection.

<h3>parent</h3>
Returns a DOMNodeCollection object containing the parent elements of every HTMLElement in the DOMNodeCollection.

<h2>DOM Manipulation</h2>
DOMNodeCollection methods to view and/or change DOM elements


<h3>html</h3>
When no argument is given it returns the innerHTML for the first element in the DOMNodeCollection. If a string argument is given, it sets the innerHTML of each DOMNodeCollection element to the string argument.

<h3>empty</h3>
Clears the innerHTML of each DOMNodeCollection element

<h3>append</h3>
Takes a single HTMLElement, DOMNodeCollection, or a string argument and appends it to each DOMNodeCollection element.

<h3>remove</h3>
Remove DOMNodeCollection elements from the DOM.

<h3>attr</h3>
Takes in either one or two arguments. If given one, the method gets the value of the attribute given for the the first element in the DOMNodeCollection. If both are given, the method sets the attribute and the value for each DOMNodeCollection element.

<h3>addClass</h3>
Adds a class to each DOMNodeCollection element.

<h3>removeClass</h3>
Removes a class from each DOMNodeCollection element.

<h3>toggleClass</h3>
Toggles a class for each DOMNodeCollection element.

<h2>Event Listeners</h2>

```
function handler () {
  console.log("Clicked!")
}
domnodecollection.on("click", handler);
domnodecollection.off("click");
```

<h3>on</h3>
Adds event listener to DOMNodeCollection element. 

<h3>off</h3>
Removes event listener from DOMNodeCollection element.

<h3>$l.ajax</h3>
Sends HTTP Request and returns a Promise. It takes in a Hash object as an argument with any number of these attributes:

```
method (default: "GET"): HTTP Request method or type
url (default: window.location.href): URL for HTTP Request
success: success callback
error: error callback
contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request
$l.ajax({
  url: "/widgets.json",
  method: "POST",
  data: {
    widget: {
      name: "The Best Widget",
      maker: "The Widget King"
    }
  },
  success(widgetData) {
    console.log("Widget created!");
    // `create` action should `render json: @widget`
    // this gives the client access to the `id` attribute issued by
    // the server.
    console.log("issued id: " + widgetData.id);
  }
});
```
