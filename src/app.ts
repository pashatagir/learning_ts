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

// console.log(customError("not found", 404));

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

// !example from notes
// Use this approach if you expect your method to be copied to another object.
// class House {
//   street: string;

//   constructor(n: string) {
//     this.street = n;
//   }

//   showAddress(this: House) {
//     console.log("Address: " + this.street);
//   }
// }

// const house = new House("Middle-earth");

// house.showAddress();
// // the method is copied to another object
// const houseCopy = { street: "Dummy", showAddress: house.showAddress };

// houseCopy.showAddress();

// ?

// class House {
//   private street: string;
//   private tenants: string[] = [];

//   constructor(n: string) {
//     this.street = n;
//   }

//   public showAddress(this: House) {
//     console.log("Address: " + this.street);
//   }

//   public addTenant(tenant: string) {
//     this.tenants.push(tenant);
//   }

//   public showTenants() {
//     console.log(this.tenants);
//   }
// }

// const house = new House("Middle-earth");

// house.addTenant("Anton");
// house.addTenant("Nikita");

// house.showTenants();

// ?an example of class inheritance
class House {
  private tenants: string[] = [];

  constructor(private readonly type: string, private street: string) {}

  public showAddress(this: House) {
    console.log("Address: " + this.street);
  }

  public showType(this: House) {
    console.log("House Type: " + this.type);
  }

  public addTenant(tenant: string) {
    this.tenants.push(tenant);
  }

  public showTenants() {
    console.log(this.tenants);
  }
}

class StoneHouse extends House {
  private chargeOfTheHouse: string; // Головний в будинку

  constructor(street: string, generalTenant: string) {
    super("stone", street); // Виклик батьківського конструктора

    // Додаємо власника квартири
    this.chargeOfTheHouse = generalTenant;
    this.addTenant(generalTenant);
  }

  public showTenants() {
    console.log("General: " + this.chargeOfTheHouse);

    // Запускаємо батьківський метод showTenants();
    super.showTenants();
  }
}

const stoneHouse = new StoneHouse("Stone-world", "Max");

stoneHouse.addTenant("Anton");
stoneHouse.addTenant("Nikita");

stoneHouse.showTenants();
stoneHouse.showType();
stoneHouse.showAddress();

// ?Getter/Setter
type PersonInformation = {
  firstName?: string;
  lastName?: string;
};

class Person {
  private personInfo: PersonInformation = {};

  set firstName(value: string) {
    console.log("firstName added");
    this.personInfo.firstName = value;
  }

  set lastName(value: string) {
    console.log("lastName added");
    this.personInfo.lastName = value;
  }

  get info() {
    const { personInfo } = this;
    return `${personInfo.firstName} ${personInfo.lastName} `;
  }
}

const person = new Person();

person.firstName = "Petha";
person.lastName = "Pupkin";

console.log(person.info);
