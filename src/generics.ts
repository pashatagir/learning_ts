// ?
const promise: Promise<string> = new Promise((resolve) => {
  setInterval(() => {
    resolve("Done!");
  }, 1000);
});

promise.then((data) => {
  console.log(data);
});

// ?Generic function/method
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const merged = merge({ name: "Alisa" }, { age: 28 });

console.log(merged.name);

// ?
interface ILength {
  length: number;
}

function getLength<T extends ILength>(str: T) {
  return str.length;
}

console.log(getLength("text"));
console.log(getLength(["a", "m", 3, 4, "k", 5]));
