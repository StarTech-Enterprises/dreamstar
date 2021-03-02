// Find parent with given class
function parent_by_class(elem, cls, stop_selector = 'body') {
    return elem.closest("." + cls)
}

// Find parent with given selector
function parent_by_selector(elem, selector, stop_selector = 'body') {
    return elem.closest(selector)
}

// Find child with given selector
function child_by_selector(elem, selector) {
    let children = elem.childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i].className &&
            children[i].className.split(' ').indexOf(selector) >= 0) {
            return children[i];
         }
     }
     for (let i = 0; i < children.length; i++) {
         let child = child_by_selector(children[i], selector);
         if (child !== null) {
             return child;
         }
     }
     return null;
}

// Find next sibling of particular class
function nextByClass(elem, cls) {
    while (elem = elem.nextElementSibling) {
        if (hasClass(elem, cls)) {
            return elem;
        }
    }
    return null;
}

// Find previous sibling of particular class
function previousByClass(elem, cls) {
    while (elem = elem.previousElementSibling) {
        if (hasClass(elem, cls)) {
            return elem;
        }
    }
    return null;
}

// Sibling class found?
function hasClass(elem, cls) {
    return elem.classList.contains(cls);
}




