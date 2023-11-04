// notes from textbook
// ?Intersection Types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};
// It is possible to combine types and interfaces using extends, but there is a shorter notation.
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Anton",
  privileges: ["drop-all"],
  startDate: new Date(),
};

// We can also combine interfaces into a type
interface IAdmin {
  name: string;
  privileges: string[];
}

interface IEmployee {
  name: string;
  startDate: Date;
}

type ElevatedType = IAdmin & IEmployee;
// but when stored in an interface, we will have to use extends
interface IElevatedEmployee extends IEmployee, IAdmin {}

// ?Type Guards
type ComplexType = string | number;

function combine(a: ComplexType, b: ComplexType) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

//when we have a mixed type of objects
// operator 'in' allows us to check whether a field is present in an object
type TAdmin = {
  name: string;
  privileges: string[];
};

type TEmployee = {
  name: string;
  startDate: Date;
};

type UnknownObject = TEmployee | TAdmin;

function showFields(e1: UnknownObject) {
  console.log(e1.name);
  if ("privileges" in e1) {
    console.log(e1.privileges);
  }
  if ("startDate" in e1) {
    console.log(e1.startDate);
  }
}

// and now if classes are used as type
// instanceof allows us to check which class an object belongs to
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

// ?Type Casting
const input = document.getElementById("inputEmail") as HTMLInputElement;

input.value = "test@test.ts";
/**if (input) {
  (input as HTMLInputElement).value = 'test@test.ts';
} */

// ?Index Properties
interface Person1 {
  name: string;
  [x: string]: string;
}

const user: Person1 = {
  name: "Alex",
  gender: "MAN",
  country: "Ukraine",
};

// ?Optional Chaining

interface Person2 {
  name: string;
  additionInfo?: {
    someInfo: string;
  };
}

const user2: Person2 = {
  name: "Alex",
};

console.log(user2?.additionInfo?.someInfo);

// ?Nullish Coalescing
const userInput = "";

const store = userInput ?? "DEFAULT";

console.log(store);

// ?function overloads
// 1
type Combinable = string | number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// 2
type AdminType = {
  type: "admin";
  name: string;
};

type UserType = {
  type: "user";
  name: string;
};

function checkUser(name: string, type: "admin"): AdminType;
function checkUser(name: string, type: "user"): UserType;
function checkUser(name: string, type: "admin" | "user") {
  if (type === "admin") {
    return {
      name,
      type: "admin",
    };
  } else {
    return {
      name,
      type: "user",
    };
  }
}

const user3 = checkUser("Nikita", "user");
const admin = checkUser("Tonya", "admin");
