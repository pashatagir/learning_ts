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

//?some patterns
// Singleton
class Singleton {
  private static instance: Singleton;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    Singleton.instance = this;

    return Singleton.instance;
  }

  public someBusinessLogic() {
    // ...
  }
}

const s1 = new Singleton();
const s2 = new Singleton();

if (s1 === s2) {
  console.log("Той самий об`єкт");
} else {
  console.log("Щось не так, отримали різні об`єкти");
}

// Factory
interface IProduct {
  getInfo(): void;
}

class Small implements IProduct {
  getInfo(): void {
    console.log("I'm small");
  }
}
class Big implements IProduct {
  getInfo(): void {
    console.log("I'm big");
  }
}

class Factory {
  private objects = {
    small: Small,
    big: Big,
  } as any;

  create(type: string): IProduct {
    const { objects } = this;

    type = type.toLowerCase();
    if (!objects[type]) {
      throw new Error("No classes to create");
    }

    return new objects[type]();
  }
}

const factory = new Factory();

const small = factory.create("small");
const big = factory.create("big");

small.getInfo();
big.getInfo();
