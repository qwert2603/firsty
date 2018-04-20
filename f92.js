function forEach(array, action) {
    for (let i = 0; i < array.length; i++) {
        action(array[i]);
    }
}

forEach(['a', 's', 'd'], console.log);
forEach(['a', 's', 'd'], console.info);
forEach(['a', 's', 'd'], console.warn);
forEach(['a', 's', 'd'], console.error);
forEach([1, 2, 3], function (a) {
    console.log(a * a);
});


[11, 12, 13, 14].forEach(function (a, i) {
    console.log(i, a, a * a * a);
});

function decor(f) {
    return function (arg) {
        console.log('decor', arg, f(arg))
    }
}

decor(function (a) {
    return a * a;
})(3);

decor(String)({a: 2});

function transparentWrapping(f) {
    console.log('q', arguments);
    return function () {
        console.log('w', arguments);
        return f.apply(null, arguments)
    }
}

console.log(
    transparentWrapping(
        function (a) {
            return a * a;
        }
    )
    (3)
);

function concatArrays(a1, a2) {
    const result = [];
    const pusher = function (e) {
        result.push(e);
    };
    a1.forEach(pusher);
    a2.forEach(pusher);
    return result;
}

const arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce(concatArrays, []));
console.log(arrays.reduce(function (a1, a2) {
    return a1.concat(a2);
}, []));
console.log(arrays);


function _every(array, f) {
    for (let i = 0; i < array.length; i++) {
        if (!f(array[i])) return false;
    }
    return true;
}

function _some(array, f) {
    for (let i = 0; i < array.length; i++) {
        if (f(array[i])) return true;
    }
    return false;
}

console.log(_every([NaN, NaN, NaN], isNaN));
console.log(_every([NaN, NaN, 4], isNaN));
console.log(_some([NaN, 3, 4], isNaN));
console.log(_some([2, 3, 4], isNaN));