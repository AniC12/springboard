// add whatever parameters you deem necessary

/*Write a function called ***constructNote***, which accepts two strings, a message and some letters. 
The function should return ***true*** if the message can be built with the letters that you are given; otherwise, it should return ***false***.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

**Constraints**:

Time Complexity: O(M + N) - If M is the length of message and N is the length of letters: */

function createFrequencyCounter(str) {
    let frequency = new Map();

    for (const letter of str) {
        let count = frequency.get(letter) || 0;
        frequency.set(letter, count + 1);
    }

    return frequency;
}

function constructNote(message, letters) {
    let messageCount = createFrequencyCounter(message);
    let lettersCount = createFrequencyCounter(letters);

    for (const key of messageCount.keys()) {
        if (!lettersCount.has(key) || (messageCount.get(key) > lettersCount.get(key))) {
            return false
        }
    }

    return true;
}
