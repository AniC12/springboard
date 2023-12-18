// add whatever parameters you deem necessary

/* ### **twoArrayObject**

Write a function called ***twoArrayObject*** which accepts two arrays of varying lengths.

The first array consists of keys and the second one consists of values. Your function should return an 

object created from the keys and values. If there are not enough values, the rest of keys should have a value of null. 

If there not enough keys, just ignore the rest of values.

 */
function twoArrayObject(sortedKeys, sortedValues) {
    let obj = {};

    for (let i = 0; i < sortedKeys.length; i++) {
        if (i > sortedValues.length - 1) {
            obj[sortedKeys[i]] = null;
        } else {
            obj[sortedKeys[i]] = sortedValues[i];
        }
    }
    return obj;
}
