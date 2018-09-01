class Person{
    constructor(fname, lname){
        this.fname = fname;
        this.lname = lname;
    }

    greeting(){
        return `Hello, my name is ${this.fname} ${this.lname}`;
    }
}

class Customer extends Person{
    constructor(fname, lname, phone, membership){
        super(fname, lname);
        this.phone = phone;
        this.membership = membership;
    }

    static getMembershipCost(){
        return this.membership === 'admin' ? 10 : 35;
    }
}

const alex = new Customer('Alex', 'Rios', '956-529-6849', 'admin');
console.log(alex);
console.log(alex.greeting());