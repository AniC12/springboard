const set1 = new Set([1,1,2,2,3,4]) // [1, 2, 3, 4]

const set2 = [...new Set("referee")].join("") // ['ref']

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
/*
  0: {Array(3) => true}
  1: {Array(3) => false}
*/


/*Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate */

const hasDuplicate = array => new Set(array).size !== array.length;



/*Write a function called vowelCount which accepts a string and returns a map 
where the keys are numbers and the values are the count of the vowels in the string. */

function vowelCount(string) {
    const vowels = "aeiou";
    string = string.toLowerCase()
    let map = new Map();
    for (let char of string) {
        if (vowels.includes(char)) {
            if (map.has(char)) {
                map.set(char, map.get(char) + 1);
            } else {
                map.set(char, 1);
            }
        }
    }
    return map;
}