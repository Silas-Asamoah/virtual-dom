import render from './render';

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];

    //setting newAttrs
    for (const [k, v] of Object.entires(newAttrs)){
        patches.push($node => {
            $node.setAttribute(k, v);
            return $node
        });
    }

    // removing attrs
    for (const k in oldAttrs){
        if(!(k in newAttrs)){
            patches.push($node => {
                $node.removeAttribute(k);
                return $node;
            });
        }
    }



    return $node => {
        return $node;
    };
};


const diffChildren = (oldVChildren, newVChildren) => {
    return $node => {
        return $node;
    };
};

const diff = (oldVTree, newVTree) => {
    //assume oldVTree is not defined
    if (newVTree === undefined){
        return $node => {
            $node.remove();
            //The patch returns the new root node, since there is none in case undefined is returned
            return undefined;
        }
    }

    if (typeof oldVTree === 'string' || typeof newVTree == 'string'){
        if (oldVTree !== newVTree){
            //2 cases are existent here
            //1. both trees are string and they have different values
            //2. one of the trees is text node and the other one is elem node
            // Either case render(newVTree)
            return $Node => {
                const $newNode = render(newVTree);
                $node.replaceWith($newNode);
                return $newNode;
            };
        } else{
            //both trees are strings and they have the same values
            return $node => $node;
        }
    }

    if (oldVTree.tagName !== newVTree.tagName){
        //assume that they are totally different
        return $node => {
            const $newNode = render(newVTree);
            $node.replaceWith($newNode);
            return $newNode;
        };
    }


    const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
    const patchChildren = diffChildren(oldVTree.children, newVTree.children);

    return $node => {
        patchAttrs($node);
        patchChildren($node);
        return $node;
    };
};

export default diff;