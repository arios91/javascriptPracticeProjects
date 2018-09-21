//Storage Controller

//Item Controller, IIFE - Immediately-invoked function expression
const ItemController = (function(){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cereal', calories: 375},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    //return public methods
    return {
        logData: function(){
            return data;
        }
    }
})();




//UI Controller
const UIController = (function(){

    return {

    }
})();




//App Controller
const App = (function(ItemController, UIController){

    //Public Methods
    return {
        init: function(){
            console.log('Initializing App');
        }
    }
})(ItemController, UIController);

App.init();