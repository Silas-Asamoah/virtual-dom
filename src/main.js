import createElement from './vdom/createElement';


const vApp = createElement('div', {
    attrs: {
        id: 'app',
    },
    children: [
        createElement('img', {
            attrs: {
                src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
            },
        }),
    ],
});

/*const vApp = {
    tagName: 'div',
    attrs: {
        id: 'app',
    },
};
*/
console.log(vApp);




