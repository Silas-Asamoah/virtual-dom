const renderElem = ({tagName, attrs, children}) => {

    //Element creation
    const $el = document.createElement(tagName);

    //Adding all the attributes attributed to vNode.attrs
    //eg. <div id="app"></div>

    for (const [k, v] of Object.entries(attrs)){
        $el.setAttribute(k, v);
    }

    //append all children as specified in vNode.children
    //eg. <div id="app"><img><div>

    for (const child of children) {
        $el.appendChild(render(child));
    }

    return $el;

};


const render = (vNode) => {
    if (typeof vNode === 'string'){
        return document.createTextNode(vNode);
    }

    return renderElem(vNode);
};


export default render;