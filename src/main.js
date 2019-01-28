import createElement from './vdom/createElement';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff';


const createVApp = count => createElement('div', {
    attrs: {
        id: 'app',
        dataCount: count,
    },
    children: [
        'The current count is: ', //represents TextNode
        String(count),
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

let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);


let $rootEl = mount($app, document.getElementById('app'));

setInterval(() => {
    //count++;
    //const 
    count = Math.floor(Math.random() * 10);
    const vNewApp = createVApp(count);
    const patch = diff(vApp, vNewApp);


    //$rootEl = mount(render(createVApp(count)), $rootEl);

    $rootEl = patch($rootEl);
    
    vApp = vNewApp;
}, 1000);

//console.log($app);

//Mount $app to the empty div
//mount($app, document.getElementById('app'));




