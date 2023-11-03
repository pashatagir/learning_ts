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

// !I failed with this practice
/**Let's build a house.
1)Create an abstract class House, it should contain the following logic:
-door property – it can be closed or open.
-key property is an object of the Key class.
-constructor takes an argument of the Key class and stores it in the key property.
-comeIn method, which adds an object of class Person to the tenants property, and this only works if the door is open.
-openDoor abstract method takes an argument of the Key class
2)Create a MyHouse class that implements the House class:
-openDoor method, since it accepts a key, we check the stored key in the key property
to see if it is equal to the key from the argument, if so, we open the door. 
3)Create a Key object:
-signature property;
-generates a random number during object creation and stores it in signature;
-getSignature method returns a random number from the signature.
4)Create a Person object:
-constructor takes a key of the Key class and stores it in the key property;
-getKey method returns key.
5)Help the resident get home.
*/
class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class PersonP {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}

abstract class HouseP {
  protected door = false;
  private tenants: PersonP[] = [];
  constructor(protected key: Key) {}

  comeIn(person: PersonP): void {
    if (!this.door) {
      throw new Error("Door is close");
    }

    this.tenants.push(person);
    console.log("Person inside");
  }

  abstract openDoor(key: Key): boolean;
}

class MyHouse extends HouseP {
  openDoor(key: Key) {
    if (key.getSignature() !== this.key.getSignature()) {
      throw new Error("Key to another door");
    }

    return (this.door = true);
  }
}

const key = new Key();

const house = new MyHouse(key);
const personP = new PersonP(key);

house.openDoor(personP.getKey());

house.comeIn(personP);
