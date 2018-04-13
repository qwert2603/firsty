function fib(n) {
    if (n <= 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

console.log(fib(12));


function de(n, way = '') {
    if (n === 1) return way;
    if (n % 3 === 0) {
        let r = de(n / 3, '3' + way);
        if (r != null)
            return r;
    }
    if (n > 5) {
        let r = de(n - 5, '5' + way);
        if (r != null)
            return r;
    }
    return null;
}

for (let i = 1; i < 100; i++) {
    console.log(i, de(i));
}

function m(q, w) {
    return q < w ? q : w;
}

console.log(m(1, 2));
console.log(m('1', '2'));
console.log(m('11', '2'));
console.log(m('11', 921));
console.log(m('-11', undefined));
console.log(m('-11', null));
console.log(m(undefined, null));


function countChar(s, c) {
    let r = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === c) ++r;
    }
    return r;
}

function countF(s) {
    return countChar(s, 'f');
}

console.log(countChar('alexa', 'a'));
console.log(countF('fishff'));