function testDecorator(name: string) {
    return function <T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {
            getName() {
                console.log(`${name} king`);
            }
        };
    };
}

const Test = testDecorator("this")(class {
    name: string;

    constructor() {
        this.name = "wang";
    }
});

const test = new Test();

test.getName();
console.log("Test name", test.name);


