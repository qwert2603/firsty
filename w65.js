const arr = [1, 2, '3', 4];
console.log(arr);
console.log(arr.length);
console.log(arr.max);
console.log(arr['length']);
console.log(arr['max']);
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[6]);
console.log(arr[-1]);

// let length = null.length;

console.log(Math.max(23, 51));

console.log(typeof ''.charAt);
console.log('asdfg'.toUpperCase());

const a = [];
a.push('q');
a.push('w', 'e');
console.log(a.join('_'));
console.log(a.pop());
console.log(a);

var fish = {
    age: 3,
    events: ['a', 'd'],
    '7 v': true,
    42: 4 + 2,
    false: 'alex',
    null: 'value of null'
};

console.log(fish);
console.log(fish.events);
console.log(fish['age']);
console.log(fish['7 v']);
console.log(fish['7 b']);
fish.s1 = 41;
fish['7 b'] = NaN;
console.log(fish['s1']);
console.log(fish['7 b']);
console.log("'7 v' in fish", '7 v' in fish);
delete fish["7 v"];
console.log(fish['7 v']);
console.log('age' in fish);
console.log("'7 v' in fish", '7 v' in fish);
console.log(typeof []);
console.log(typeof {});
console.log(fish[42]);
console.log(fish[false]);
console.log(fish.false);
const n = null;
console.log(fish[n]);
console.log({a: {b: 3}}.a);


const q1 = {d: 7};
const q2 = q1;
const q3 = {d: 7};
console.log(q1 === q2);
console.log(q1 === q3);
q1.s = 42;
console.log(q2.s);