import createElement from './vdom/createElement';


const vApp = createElement('div', {
    attrs: {
        id: 'app',
    },
    children: [
        'Hello world'. //represents TextNode
        createElement('img', {
            attrs: {
                src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
            },
        }), //represents Element Node
    ],
}); //represent Element Node

/*const vApp = {
    tagName: 'div',
    attrs: {
        id: 'app',
    },
};
*/
console.log(vApp);




