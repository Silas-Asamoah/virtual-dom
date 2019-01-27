const render = (vNode) => {

    //Element creation
    const $el = document.createElement(vNode.tagName);

    //Adding all the attributes attributed to vNode.attrs
    //eg. <div id="app"></div>

    for (const [k, v] of Object.entries(vNode.attrs)){
        $el.setAttribute(k, v);
    }

    //append all children as specified in vNode.children
    //eg. <div id="app"><img><div>

    for (const child of children) {
        $el.appendChild(render(child));
    }

    return $el;

};

export default render;