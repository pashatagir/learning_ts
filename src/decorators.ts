// ?Decorators classes
// 1)
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Controller {
  public id = 1;
}

// 2)
function Logger1(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}
@Logger1('LOGGING - CONTROLLER')
class Controller1 {
  public id = 1;
}

// 3)
function Logger2(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function AddProperty() {
  return function (constructor: Function) {
    console.log('Modify');
    constructor.prototype.modify = true;
  };
}

@Logger2('LOGGING - CONTROLLER')
@AddProperty()
class Controller2 {
  public id = 1;
  public modify?: boolean;
}

const controller = new Controller2();

console.log('Modified classes', controller.modify);

// 4)
interface IDecoration {
  parent: string;
  template: string;
}

function ControllerDecoration(config: IDecoration) {
  return function <T extends { new (...args: any[]): { content: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      private element: HTMLElement;
      private parent: HTMLElement;
      constructor(...arg: any[]) {
        super(...arg);
        this.parent = document.getElementById(config.parent)!;
        this.element = document.createElement(config.template);

        this.element.innerHTML = this.content;

        this.parent.appendChild(this.element);
      }
    };
  };
}

@ControllerDecoration({
  parent: 'app',
  template: 'H1',
})
class Controller3 {
  public content = 'My custom controller';
}

const controller1 = new Controller3();

// ?Decorators methods
// 1)
function ShowMeParams(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log('target', target);
  console.log('name', name);
  console.log('descriptor', descriptor);
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return method.bind(this);
    },
  };
}

class Notifier {
  public content = 'Show me message!';

  @AutoBind
  @ShowMeParams
  showMessage() {
    console.log(this.content);
  }
}

const notifier = new Notifier();

const showMe = notifier.showMessage;
notifier.showMessage();
showMe();

// 2)
function AddTax(taxPercent: number) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    return {
      configurable: true,
      enumerable: false,
      get() {
        return (...args: any[]) => {
          const result = method.apply(this, args);

          return result + (result / 100) * taxPercent;
        };
      },
    };
  };
}

class Payment {
  @AddTax(20)
  pay(money: number): number {
    return money;
  }
}

const payment = new Payment();

console.log('Amount with tax: ', payment.pay(100));

// ?Decorators parameters

function CheckEmail(target: any, name: string, position: number) {
  if (!target[name].validation) {
    target[name].validation = {};
  }
  Object.assign(target[name].validation, {
    [position]: (value: string) => {
      if (value.includes('@')) {
        return value;
      }
      throw new Error('No valid field');
    },
  });
}

function Validation(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return (...args: any[]) => {
        if (method.validation) {
          args.forEach((item, index) => {
            if (method.validation[index]) {
              args[index] = method.validation[index](item);
            }
          });
        }
        return method.apply(this, args);
      };
    },
  };
}

class Person3 {
  @Validation
  setEmail(@CheckEmail email: string) {
    console.log(email);
  }
}

const person3 = new Person3();

person3.setEmail('test@gmail.com');

// ?Decorators properties

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Person4 {
  @Required
  name: string;
  @PositiveNumber
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}
