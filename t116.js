const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function rowHeights(rows) {
    return rows.map(function (row) {
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function (_, i) {
        return rows.reduce(function (max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0)
    });
}

function drawTable(rows) {
    let height = rowHeights(rows);
    let width = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(' ');
    }

    function drawRow(row, rowNum) {
        let blocks = row.map(function (cell, colNum) {
            return cell.draw(width[colNum], height[rowNum]);
        });

        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join('\n');
    }

    return rows.map(drawRow).join('\n');
}

function repeat(s, times) {
    let result = "";
    for (let i = 0; i < times; i++) {
        result += s;
    }
    return result;
}

function TextCell(text) {
    this.text = text.split('\n');
}

TextCell.prototype.minWidth = function () {
    return this.text.reduce(function (max, line) {
        return Math.max(max, line.length);
    }, 0);
};

TextCell.prototype.minHeight = function () {
    return this.text.length;
};

TextCell.prototype.draw = function (width, height) {
    let result = [];
    for (let i = 0; i < height; i++) {
        let line = this.text[i] || "";
        result.push(line + repeat(' ', width - line.length));
    }
    return result;
};

let chess = [];
for (let i = 0; i < 15; i++) {
    let row = [];
    for (let j = 0; j < 15; j++) {
        row.push(new TextCell((i + j) % 2 === 0 ? "##" : "  "));
    }
    chess.push(row);
}
console.log(drawTable(chess));

function UnderlinedCell(inner) {
    this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function () {
    return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function () {
    return this.inner.minHeight() + 1;
};

UnderlinedCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height - 1).concat([repeat('-', width)]);
};

function RTextCell(text) {
    TextCell.call(this, text);
    // this.text = ['d']
}

RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function (width, height) {
    let result = [];
    for (let i = 0; i < height; i++) {
        let line = this.text[i] || "";
        result.push(repeat(' ', width - line.length) + line);
    }
    return result;
};

function dataTable(data) {
    let keys = Object.keys(data[0]);
    let headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name));
    });
    let body = data.map(function (item) {
        return keys.map(function (key) {
            return key === 'height' ? new RTextCell(String(item[key])) : new TextCell(String(item[key]));
        });
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));

console.log(new RTextCell("a") instanceof RTextCell);
console.log(new RTextCell("a") instanceof TextCell);
console.log(new TextCell("a") instanceof RTextCell);
console.log([] instanceof Array);

let smth = {
    get p() {
        return 42;
    },
    set p(value) {
        if (value % 2 === 0) {
            this.anth = value;
        } else {
            console.log("NO! it's == " + value)
        }
    }
};

console.log(smth.p, smth.anth);
smth.p = 26;
console.log(smth.p, smth.anth);
smth.p = 27;
console.log(smth.p, smth.anth);


function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (anth) {
    return new Vector(this.x + anth.x, this.y + anth.y);
};
Vector.prototype.negate = function () {
    return new Vector(-this.x, -this.y);
};
Vector.prototype.minus = function (anth) {
    return this.plus(anth.negate());
};
Object.defineProperty(Vector.prototype, "length", {
    get: function () {
        return Math.hypot(this.x, this.y)
    },
    enumerable: true
});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);

const vector = new Vector(12, 5);
for (let k in vector) {
    console.log(k, vector[k], vector.hasOwnProperty(k));
}

function StretchCell(inner, minW, minH) {
    this.inner = inner;
    this.minW = minW;
    this.minH = minH;
}

StretchCell.prototype.minWidth = function () {
    return Math.max(this.inner.minWidth(), this.minW);
};

StretchCell.prototype.minHeight = function () {
    return Math.max(this.inner.minHeight(), this.minH);
};

StretchCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height);
};

const sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
console.log(sc.minHeight());
console.log(sc.draw(3, 2));


console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log({}.prototype);
console.log(Object.getPrototypeOf({}));

let prot = RTextCell.prototype;
do {
    console.log("prot", prot);
    prot = Object.getPrototypeOf(prot);
} while (prot != null);