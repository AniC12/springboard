/*function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
}*/

const filterOutOdds = (...nums) => nums.filter(value => value % 2 === 0);



/*Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.
Make sure to do this using the rest and spread operator.*/

const findMin = (...nums) => nums.reduce((min, currVal) => currVal < min ? currVal: min);



/*Write a function called mergeObjects that accepts two objects and returns a new object
 which contains all the keys and values of the first object and second object.*/

// mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});



/*Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. 
The function should return a new array with the original array values and all of additional arguments doubled.*/

//doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
//doubleAndReturnArgs([2],10,4) // [2, 20, 8]


const doubleAndReturnArgs = (array, ...arg) => [...array, ...arg.map(num => num * 2)];


/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = items => {
    let index = Math.floor(Math.random() * items.length);
    return [...items.slice(0, index), ...items.slice(index + 1)];
}


/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
    let newObject = {...obj};
    newObject[key] = val;
    return newObject;
}


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    let newObject = {...obj};
    delete newObject[key];
    return newObject;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
    return {...obj1, ...obj2};
}


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    let newObject = {...obj};
    newObject[key] = val;
    return newObject;
}