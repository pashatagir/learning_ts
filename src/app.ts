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

// ?static method and properties
class UseStatic {
  private static count = 0;

  constructor() {
    UseStatic.count += 1;
  }

  public static itStaticMethod() {
    console.log("Run static method");
  }

  public showCount() {
    console.log(UseStatic.count);
  }
}

const obj1 = new UseStatic();
const obj2 = new UseStatic();
const obj3 = new UseStatic();

obj1.showCount();
obj2.showCount();
obj3.showCount();

UseStatic.itStaticMethod();

// ?abstract ckasses and method
// abstract class Plane {
//   protected pilotInCabin = false;

//   public sitInPlane() {
//     this.pilotInCabin = true;
//   }

//   public abstract startEngine(): boolean;
// }

// class Maize extends Plane {
//   public startEngine() {
//     // Запускаємо гвинти двигуна
//     return true;
//   }
// }

// class Boeing extends Plane {
//   public startEngine() {
//     // Розігріваємо реактивні турбіни
//     return true;
//   }
// }

// ?intarface classes
interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

interface IPilot {
  flyMessage(): void;
}

class Pilot implements IPerson, IPilot {
  constructor(public name: string, public age: number) {
    if (this.age < 28) {
      throw new Error("Pilot too young");
    }
  }

  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }

  flyMessage(): void {
    console.log("Літак набрав висоту, всім приємного польоту!");
  }
}

abstract class Plane {
  protected pilot?: IPilot;

  public sitInPlane(pilot: IPilot): void {
    this.pilot = pilot;
  }

  public abstract startEngine(): boolean;
}

class Boeing extends Plane {
  public startEngine(): boolean {
    if (!this.pilot) {
      throw new Error("No pilot in cabin");
    }
    // Розігріваємо реактивні турбіни
    console.log("Запуск турбін");

    this.pilot.flyMessage();
    return true;
  }
}

// const boeing = new Boeing();
// const pilot = new Pilot("Anthony", 32);

// Капітан вітає пасажирів на трапі
// pilot.greet("Вас вітає капітан корабля");

// Займає місце пілота
// boeing.sitInPlane(pilot);

// Запускаємо двигуни
// boeing.startEngine();

class Terrorist implements IPilot {
  bluff(phrase: string): void {
    console.log(phrase);
  }

  flyMessage(): void {
    console.log(
      "Наші вимоги 9 мільйонів, інакше ми можемо вбити всіх заручників"
    );
  }
}

const boeing = new Boeing();
const pilot = new Terrorist();

//Капітан вітає пасажирів на трапі
pilot.bluff("Ми захопили цей літак!");

// Займає місце пілота
boeing.sitInPlane(pilot);

// Запускаємо двигуни
boeing.startEngine();

// ?readonly in interface
interface ITest {
  readonly name: string;
}

const pers: ITest = {
  name: "Person Name",
};

// pers.name = "Person name"; //Cannot assign to 'name' because it is a read-only property.
console.log(pers.name);

// ?unified modeling language(UML) and design patterns
//imitation
class Animal {
  constructor(public name: string) {}

  say() {
    console.log("Nothing to say");
  }
}

class Cat extends Animal {
  constructor(name: string, private speed: number) {
    super(name);
  }

  say() {
    console.log("Meow!");
  }

  run(time: number) {
    return `${this.name} бігла зі швидкістю ${this.speed} протягом ${time} секунд`;
  }
}

// dependence
type ItemType = {
  name: string;
};

class Catalog {
  showCatalog(items: ItemType[]) {
    items.forEach((item) => {
      console.log(item.name);
    });
  }
}

class Items {
  private items: ItemType[] = [];
  setItem(name: string) {
    this.items.push({ name });
  }

  getItems(): ItemType[] {
    return this.items;
  }
}

const items = new Items();
const catalog = new Catalog();

items.setItem("Catalog 1");
items.setItem("Catalog 2");
items.setItem("Catalog 3");

catalog.showCatalog(items.getItems());

// association
class DB {
  connection() {
    console.log("Db connected");
  }
}

class Server {
  constructor(private database: DB) {}

  init() {
    this.database.connection();
  }
}

const db = new DB();
const server = new Server(db);

server.init();

// aggregation
class PersonAgregation {
  constructor(public name: string) {}
}

class Home {
  private guests: PersonAgregation[] = [];

  addGuest(guest: PersonAgregation) {
    this.guests.push(guest);
  }
}

const home = new Home();

const guest1 = new PersonAgregation("Max");
const guest2 = new PersonAgregation("Anton");
const guest3 = new PersonAgregation("Nikita");

home.addGuest(guest1);
home.addGuest(guest2);
home.addGuest(guest3);

// composition
class PersonCompos {
  constructor(public name: string) {}
}

class HomeCompos {
  private tenants: PersonCompos[] = [];

  addTenant(name: string) {
    const tenant = new PersonCompos(name);
    this.tenants.push(tenant);
  }
}

const homeCompos = new HomeCompos();

homeCompos.addTenant("Max");
homeCompos.addTenant("Anton");
homeCompos.addTenant("Nikita");
