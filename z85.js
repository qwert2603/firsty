function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], list: list}
    }
    return list;
}

function listToArray(list) {
    const array = [];
    while (list != null) {
        array.push(list.value);
        list = list.list;
    }
    return array;
}

function prepend(value, list) {
    return {value: value, list: list}
}

function nth(list, index) {
    if (list === null || index < 0) return null;
    if (index === 0) return list.value;
    return nth(list.list, index - 1);
}

console.log(arrayToList([10, 20, 30, 40, 50]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nth(arrayToList([10, 20, 30]), 2));
console.log(nth(arrayToList([10, 20, 30]), 3));
console.log(nth(arrayToList([10, 20, 30]), -1));