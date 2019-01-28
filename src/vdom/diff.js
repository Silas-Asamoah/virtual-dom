import render from './render';



const zip = (xs, ys) => {
    const zipped = [];
    for (let i = 0; i < Math.min(xs.length, ys.length); i++){
        zipped.push(xs[i], ys[i]);
    }

    return zipped;
};

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
        for (const patch of patches){
            patch($node);
        }
        //return $node;
    };
};


const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];

    oldVChildren.forEach((oldVChild, i) => {
        childPatches,push(diff(oldVChild, newVChildren[i]));        
    });


    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slic(oldVChildren.length)){
        additionalPatches.push($node => {
            $node.appendChild(render(newVChildren));
            return $node;
        });
    }

    return $parent => {
        $parent.childNodes.forEach(($child, i) => {
            childPatches[i]($child);
        });

        for (const patch of additionalPatches){
            patch($parent);
        }

        return $parent;
    };
    /*return $node => {
        return $node;
    };

    */
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