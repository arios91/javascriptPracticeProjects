//person constructor
function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

//greeting
Person.prototype.greeting = function(){
    return `Hello there ${this.firstName} ${this.lastName}`;
}


//customer constructor
function Customer(firstName, lastName, phone, membership){
    Person.call(this, firstName, lastName);
    this.phone = phone;
    this.membership = membership;
}

//inherit person prototype
Customer.prototype = Object.create(Person.prototype);
//make customer.prototype return Customer
Customer.prototype.constructor = Customer;

const person1 = new Person('Alex', 'Rios');
const customer1 = new Customer('Alex', 'Rios', '956-529-6849', 'Admin');

console.log(person1.greeting());

Customer.prototype.greeting = function(){
    return `Hello there ${this.firstName} ${this.lastName}, welcome to our company`;
}
console.log(customer1.Person.greeting());
