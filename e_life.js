// test: no

(function () {
    "use strict";

    let active = null;

    function Animated(world) {
        this.world = world;
        let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
        let node = outer.appendChild(doc.createElement("div"));
        node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
        this.pre = node.appendChild(doc.createElement("pre"));
        this.pre.appendChild(doc.createTextNode(world.toString()));
        this.button = node.appendChild(doc.createElement("div"));
        this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
            "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
        this.button.innerHTML = "stop";
        let self = this;
        this.button.addEventListener("click", function () {
            self.clicked();
        });
        this.disabled = false;
        if (active) active.disable();
        active = this;
        this.interval = setInterval(function () {
            self.tick();
        }, 333);
    }

    Animated.prototype.clicked = function () {
        if (this.disabled) return;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.button.innerHTML = "start";
        } else {
            let self = this;
            this.interval = setInterval(function () {
                self.tick();
            }, 333);
            this.button.innerHTML = "stop";
        }
    };

    Animated.prototype.tick = function () {
        this.world.turn();
        this.pre.removeChild(this.pre.firstChild);
        this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
    };

    Animated.prototype.disable = function () {
        this.disabled = true;
        clearInterval(this.interval);
        this.button.innerHTML = "Disabled";
        this.button.style.color = "red";
    };

    window.animateWorld = function (world) {
        new Animated(world);
    };
})();


const plan = [
    "############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
];

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
    }
});

function Grid(width, height) {
    this.space = Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function (vector) {
    return this.space[vector.y * this.width + vector.x];
};

Grid.prototype.set = function (vector, value) {
    this.space[vector.y * this.width + vector.x] = value;
};
Grid.prototype.forEach = function (f, thisArg) {
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            const vector = new Vector(x, y);
            let value = this.get(vector);
            if (value !== null && value !== undefined) {
                f.call(thisArg, value, vector);
            }
        }
    }
};

const grid = new Grid(5, 5);
console.log(grid.get(new Vector(1, 1)));
grid.set(new Vector(1, 1), "X");
console.log(grid.get(new Vector(1, 1)));

const directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function BouncingCritter() {
    this.direction = randomElement(Object.keys(directions))
}

BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) !== " ") {
        this.direction = view.find(" ") || "s"
    }
    return {type: "move", direction: this.direction};
};

function elementFromChar(legend, char) {
    if (char === " ") return null;
    let element = new legend[char]();
    element.originChar = char;
    return element;
}

function charFromElement(element) {
    return element != null ? element.originChar : " ";
}

function World(map, legend) {
    const grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach(function (line, y) {
        for (let x = 0; x < line.length; x++) {
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
        }
    })
}

World.prototype.toString = function () {
    let output = "";
    for (let y = 0; y < this.grid.height; y++) {
        for (let x = 0; x < this.grid.width; x++) {
            output += charFromElement(this.grid.get(new Vector(x, y)));
        }
        output += '\n';
    }
    return output;
};

function Wall() {
}

World.prototype.turn = function () {
    let acted = [];
    this.grid.forEach(function (critter, vector) {
        if (critter.act && acted.indexOf(critter) === -1) {
            this.letAct(critter, vector);
            acted.push(critter);
        }
    }, this);
};

World.prototype.letAct = function (critter, vector) {
    let action = critter.act(new View(this, vector));
    if (action && action.type === "move") {
        let dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        let dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(vector)) {
            return dest;
        }
    }
};

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function (dir) {
    let target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    }
    return "#";
};
View.prototype.findAll = function (ch) {
    let found = [];
    for (let d in directions) {
        if (this.look(d) === ch) {
            found.push(d);
        }
    }
    return found;
};
View.prototype.find = function (ch) {
    let found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};

let world = new World(plan, {'#': Wall, 'o': BouncingCritter});

let directionNames = Object.keys(directions);

function dirPlus(dir, n) {
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8]
}

function WallFollower() {
    this.direction = "s";
}

WallFollower.prototype.act = function (view) {
    let start = this.direction;
    if (view.look(dirPlus(this.direction, -3)) !== " ") {
        start = this.direction = dirPlus(this.direction, -2);
    }
    while (view.look(this.direction) !== " ") {
        this.direction = dirPlus(this.direction, 1);
        if (this.direction === start) break;
    }
    return {type: "move", direction: this.direction};
};


// animateWorld(world);

// animateWorld(new World(
//     [
//         "############",
//         "#   ~  ooo #",
//         "#  ##  oo  #",
//         "#  ##   ####",
//         "############"
//     ], {"#": Wall, "~": WallFollower, "o": BouncingCritter}
// ));

function LifelikeWorld(map, legend) {
    World.call(this, map, legend)
}

LifelikeWorld.prototype = Object.create(World.prototype);

let actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function (critter, vector) {
    let action = critter.act(new View(this, vector));
    let handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);
    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
            this.grid.set(vector, null);
        }
    }
};

actionTypes.grow = function (critter) {
    critter.energy += 0.5;
    return true;
};

actionTypes.move = function (critter, vector, action) {
    let dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) {
        return false;
    }
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};

actionTypes.eat = function (critter, vector, action) {
    let dest = this.checkDestination(action, vector);
    let atDest = dest != null && this.grid.get(dest);
    if (!atDest && atDest.energy == null) {
        return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};

actionTypes.reproduce = function (critter, vector, action) {
    let baby = elementFromChar(this.legend, critter.originChar);
    let dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
        return false;
    }
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};

function Plant() {
    this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function (view) {
    if (this.energy > 15) {
        let space = view.find(" ");
        if (space) {
            return {type: "reproduce", direction: space};
        }
    }
    if (this.energy < 20) {
        return {type: "grow"};
    }
};

function PlantEater() {
    this.energy = 20;
}

PlantEater.prototype.act = function (view) {
    let space = view.find(" ");
    if (space && this.energy > 60) {
        return {type: "reproduce", direction: space};
    }
    let plant = view.find("*");
    if (plant) {
        return {type: "eat", direction: plant};
    } else {
        return {type: "move", direction: space};
    }
};

function Tiger() {
    this.energy = 50;
}

Tiger.prototype.act = function (view) {
    let space = view.find(" ");
    if (space && this.energy > 140) {
        return {type: "reproduce", direction: space};
    }
    let food = view.find("O");
    if (food) {
        return {type: "eat", direction: food};
    } else {
        return {type: "move", direction: space};
    }
};

animateWorld(new LifelikeWorld(
    ["####################################################",
        "#                 ####         ****              ###",
        "#   *  @  ##                 ########       OO    ##",
        "#   *    ##        O O                 ****       *#",
        "#       ##*                        ##########     *#",
        "#      ##***  *         ****                     **#",
        "#* **  #  *  ***      #########                  **#",
        "#* **  #      *               #   *              **#",
        "#     ##              #   O   #  ***          ######",
        "#*            @       #       #   *        O  #    #",
        "#*                    #  ######                 ** #",
        "###          ****          ***                  ** #",
        "#       O                        @@@@@@    O       #",
        "#   *     ##  ##  ##  ##               ###      *  #",
        "#   **         #              *       #####  O     #",
        "##  **  O   O  #  #    ***  ***        ###      ** #",
        "###               #   *****                    ****#",
        "####################################################"],
    {
        "#": Wall,
        "@": Tiger,
        "O": PlantEater,
        "*": Plant
    }
));