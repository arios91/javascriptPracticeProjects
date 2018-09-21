//Basic Structure

// (function(){
//     //declare private vars and functions

//     return{
//         //declare public vars and functions
//     }
// })();


//STANDARD MODULE PATTERN
// const UIController = (function() {
//     let text = 'Hello World';

//     const changeText = function(){
//         const element = document.querySelector('h1');
//         element.textContent = text;
//     }

//     return {
//         callChangeText: function(){
//             changeText();
//             console.log(text);
//         }
//     }
// })();

// UIController.callChangeText();


//REVEALING MODULE PATTERN
// const itemController = (function(){
//     let data = [];

//     function add(item){
//         data.push(item);
//         console.log('item added..');
//     }

//     function get(id){
//         return data.find(item => {
//             return item.id === id;
//         })
//     }

//     return{
//         add: add,
//         get: get
//     }
// })();

// itemController.add({id: 0, name: 'Alex'});
// console.log(itemController.get(0));


//SINGLETON
// const singleton = (function(){
//     let instance;
    
//     function createInstance(){
//         const object = new Object('Object Instance!');
//         return object;
//     }

//     return {
//         getInstance: function(){
//             if(!instance){
//                 instance = createInstance();
//             }
//             return instance;
//         }
//     }
// })();

// const instanceA = singleton.getInstance();
// const instanceB = singleton.getInstance();

// console.log(instanceA === instanceB);
// console.log(instanceB);


//Factory
// function MemberFactory(){
//     this.createMember = function(name, type){
//         let member;

//         if(type === 'simple'){
//             member = new SimpleMemberShip(name)
//         }else if(type === 'standard'){
//             member = new StandardMemberShip(name)
//         }else if(type === 'premium'){
//             member = new PremiumMemberShip(name)
//         }

//         member.type = type;

//         member.define = function(){
//             console.log(`${this.name} (${this.type}): ${this.cost}`);
//         }

//         return member;
//     };
// }

// const SimpleMemberShip = function(name){
//     this.name = name;
//     this.cost = '$5';
// }
// const StandardMemberShip = function(name){
//     this.name = name;
//     this.cost = '$15';
// }
// const PremiumMemberShip = function(name){
//     this.name = name;
//     this.cost = '$25';
// }

// const members = [];
// const factory = new MemberFactory();

// members.push(factory.createMember('Alex', 'premium'));
// members.push(factory.createMember('John', 'standard'));
// members.push(factory.createMember('Tom', 'simple'));

// members.forEach(member => {
//     member.define();
// })

//OBSERVER
function EventObserver(){
    this.observers = [];
}

EventObserver.prototype = {
    subscribe: function(fn){
        this.observers.push(fn);
        console.log(`You are now subscribed to ${fn.name}`);
    },
    unsubscribe: function(fn){
        //filter out from the list whatever matches the callback function
        //If there is no match, the callback gets to stay on the lsit
        //the filter returns a new list and re-assigns the list of observers
        this.observers = this.observers.filter(function(item){
            if(item !== fn){
                return item;
            }
        });
        console.log(`You are now unsubscribed from ${fn.name}`);
    },
    fire: function(){
        this.observers.forEach(item => {
         item.call();   
        })
    }
}

const click = new EventObserver();

//event listeners for observer
document.querySelector('.sub-ms').addEventListener('click', function(){
    click.subscribe(getCurrMilliseconds);
});
document.querySelector('.unsub-ms').addEventListener('click', function(){
    click.unsubscribe(getCurrMilliseconds);
});
document.querySelector('.sub-s').addEventListener('click', function(){
    click.subscribe(getCurrSeconds);
});
document.querySelector('.unsub-s').addEventListener('click', function(){
    click.unsubscribe(getCurrSeconds);
});
document.querySelector('.fire').addEventListener('click', function(){
    click.fire();
});

//click handler
const getCurrMilliseconds = function(){
    console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
}
const getCurrSeconds = function(){
    console.log(`Current Seconds: ${new Date().getSeconds()}`);
}