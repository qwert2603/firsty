let arr = [];
arr[100] = 42;
arr[1000] = 42;
arr[500] = 42;
arr[-500] = 42;
console.log(arr);
console.log("fish".split("").reverse().join(""));

const a = {
    i: [0] + [2],
    toString: function () {
        return ++this.i;
    }
};

if (a == 3 && a == 4) {
    console.log("omg");
}

let r1 = {name: 't1'};

function speak(s) {
    console.log(this.name + " speaks " + s);
}

speak('nth');

speak.call(r1, "qq");
speak.apply({name: 'nd'}, ["ww"]);

r1.speak = speak;
r1.speak('hi');


console.log({}.toString);
console.log({}.toString());
console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));

let q1 = {a: 2};
let q2 = Object.create(q1);
console.log("q2.a", q2.a, q2);
q1.a = 1;
console.log("q2.a", q2.a, q2);
q2.a = 3;
console.log(q1.a, q2.a);
q1.a = 4;
console.log(q1.a, q2.a);
console.log(q1, q2);

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype.say = function (s) {
    console.log(this.name + " says " + s);
};

let a1 = new Rabbit('a1');
console.log(a1);
a1.say('wow');
new Rabbit('a2').say("i'm a2");

Rabbit.prototype.f1 = function () {
    console.log("name == " + this.name, this);
};

a1.f1();


console.log(Object.getPrototypeOf(Rabbit));
console.log(Rabbit.prototype);
console.log('Rabbit.prototype === Object.getPrototypeOf(Rabbit)', Rabbit.prototype === Object.getPrototypeOf(Rabbit));
console.log('Rabbit.prototype === Object.getPrototypeOf(new Rabbit())', Rabbit.prototype === Object.getPrototypeOf(new Rabbit()));

let d = Object.create({a: 1});

function printProperties(q, own = true) {
    for (let k in q) {
        if (!own || q.hasOwnProperty(k)) {
            console.log('k', k, q[k]);
        }
    }
}

d.w = 42;
printProperties(d, true);


let map = Object.create(null);
console.log("==");
printProperties(map, false);
console.log("==");
map[2] = 26;
printProperties(map, false);


function ArrayList(array) {
    this.array = array;
    this.current = 0;
}

ArrayList.prototype.hasNext = function () {
    return this.current < this.array.length;
};
ArrayList.prototype.getNext = function () {
    return this.array[this.current++];
};

function logFive(list) {
    console.log("logFive", list);
    for (let i = 0; i < 5 && list.hasNext(); i++) {
        console.log(list.getNext());
    }
}

logFive(new ArrayList([1, 2, 3, 4, 5, 6, 7, 8, 9]));
logFive(new ArrayList([1, 2, 3]));

function RangeList(b, e) {
    this.current = b;
    this.e = e;
}

RangeList.prototype.hasNext = function () {
    return this.current < this.e;
};
RangeList.prototype.getNext = function () {
    return this.current++;
};

logFive(new RangeList(-2, 7));
logFive(new RangeList(3, 5));

logFive(new ArrayList([1, 2]));
logFive(new RangeList(100, 1000));