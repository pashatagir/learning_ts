// example for UnionType
function combine(param1: string | number, param2: string | number) {
  if (typeof param1 === "number" && typeof param2 === "number") {
    return param1 + param2;
  }
  return param1.toString() + param2.toString();
}

console.log(combine(2, 3));
console.log(combine("str1", "str2"));

// example for LiteralType
const fruit: string[] = [];
function workWithArr(arr: string[], value: string, action: "add" | "delete") {
  if (action === "add") {
    arr.push(value);
  } else {
    const index = arr.indexOf(value);
    arr.splice(index, 1);
  }
  return arr;
}

workWithArr(fruit, "bannana", "add");
workWithArr(fruit, "watermelon", "add");
workWithArr(fruit, "melon", "add");
workWithArr(fruit, "watermelon", "delete");
console.log(fruit);

//example for Void - function returns nothing
function print(): void {
  console.log("Print some text!");
}
print();

//example for Return Type - function returns specified type
function combine1(num1: number, num2: number): number {
  return num1 + num2;
}
console.log(combine1(60, 1));

// example for Never
function customError(message: string, status: number): never {
  throw { message, status };
}

console.log(customError("not found", 404));

// example for Function Type
function calc(
  param1: number,
  param2: number,
  callback: (num1: number, num2: number) => number
): void {
  console.log("Result:", callback(param1, param2));
}
calc(1, 1, (num1, num2) => num1 + num2);
calc(10, 5, (num1, num2) => num1 - num2);

// examples for Custom Type
// ? - optionality operator

type PersonType = {
  readonly name: string; // readonly - makes it impossible changed property outside object
  age?: number;
  showName: () => void;
};

const person1: PersonType = {
  name: "Alex",
  age: 30,
  showName() {
    console.log(this.name);
  },
};

// person1.name = 'Ian'; Cannot assign to 'name' because it is a read-only property.

const person2: PersonType = {
  name: "Max",
  showName() {
    console.log(this.name);
  },
};

person1.showName();
person2.showName();

// practise
enum Load {
  LOADING,
  READY,
}

const state = {
  load: Load.READY,
};

if (state.load === Load.LOADING) {
  console.log("Сторінка завантажується");
}
if (state.load === Load.READY) {
  console.log("Сторінка завантажена");
}

let union: string | number;
let literal: "enable" | "disable";

function showMessage(message: string): void {
  console.log(message);
}

function calcu(num1: number, num2: number): number {
  return num1 + num2;
}

function customErr(): never {
  throw new Error("Error");
}

type PageType = {
  title: string;
  likes: number;
  accounts: string[];
  status: "open" | "close";
  details?: {
    createAt: Date;
    updateAt: Date;
  };
};

const page: PageType = {
  title: "Python or Js",
  likes: 5,
  accounts: ["Alex"],
  status: "close",
};
