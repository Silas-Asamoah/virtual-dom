/*export default (tagName, { attrs = {}, children = [] } = {}) => {
    return{
        tagName,
        attrs,
        children,
    };
};

*/

//Making the DOM purer using the Object.create(null)
//This creates a truly plain object that doesn't inherit from Object but null instead

export default (tagName, { attrs = {}, children = [] } = {}) => {
    const vElem = Object.create(null);

    Object.assign(vElem, {
        tagName,
        attrs,
        children,
    });
    
    return vElem;
};