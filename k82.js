function f() {
    console.log(arguments.length, arguments)
}

f();
f(1, 2);
f([1, 2]);


function randomPointOnCircle(radius) {
    const fi = Math.random() * 2 * Math.PI;
    return {
        x: radius * Math.cos(fi),
        y: radius * Math.sin(fi)
    }
}

console.log(randomPointOnCircle(5));
console.log(Math.floor(Math.random() * 10));
console.log(Math.floor(Math.random() * 10));
console.log(window);

function range(b, e, s = 1) {
    if (e > b !== s > 0 || s === 0) return [];
    const result = [];
    for (let i = b; (s > 0 && i <= e) || (s < 0 && i >= e); i += s) {
        result.push(i);
    }
    return result;
}

function sum(array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result;
}

console.log(range(1, 8));
console.log(range(1, 8, 2));
console.log(range(1, 8, -2));
console.log(range(8, 1, -2));
console.log(range(8, -5, -2));
console.log(sum(range(1, 10)));
console.log(sum(range(8, -6, -2)));

function reverseArray(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.unshift(array[i]);
    }
    return result;
}

function reverseArrayInPlace(array) {
    for (let i = 0; i < array.length / 2; i++) {
        const j = array.length - i - 1;
        const t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}

console.log(reverseArray(["A", "B", "C"]));
const arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

function keysCount(obj) {
    let count = 0;
    for (const k in obj) {
        ++count;
    }
    return count;
}

function deepEqual(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || typeof o1 !== "object" || o2 === null || typeof o2 !== "object") return false;
    if (keysCount(o1) !== keysCount(o2)) return false;
    for (const k in o1) if (!deepEqual(o1[k], o2[k])) return false;
    return true;
}

const obj = {here: {is: "an"}, object: 2};
console.log(true === deepEqual(obj, obj));
console.log(false === deepEqual(obj, {here: 1, object: 2}));
console.log(true === deepEqual(obj, {here: {is: "an"}, object: 2}));
console.log(true === deepEqual({"a": 3 - 1}, {a: 2}));
console.log(false === deepEqual({a: {s: 2, f: [1, 2]}}, {a: {s: 2, f: [1, 3]}}));
console.log(false === deepEqual({f: [1]}, {f: [2]}));
console.log(true === deepEqual({f: null}, {f: null}));
console.log(true === deepEqual({f: {}}, {f: {}}));
console.log(false === deepEqual({f: {}}, {f: null}));
console.log(true === deepEqual(2, 2));
console.log(false === deepEqual(2, 3));
console.log(true === deepEqual(null, null));
