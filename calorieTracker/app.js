//Storage Controller
const StorageController = (function(){

    const setLocalStorage = function(items){
        localStorage.setItem('items', JSON.stringify(items));
    };

    const getLocalStorage = function (){
        return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    };

    const updateDeleteHelper = function(itemToEdit, update){
        let items = getLocalStorage();
        items.forEach((item, index) => {
            if(item.id === itemToEdit.id){
                if(update){
                    items.splice(index, 1, itemToEdit);
                }else{
                    items.splice(index, 1);
                }
            }
        });
        setLocalStorage(items);
    };

    //return public methods
    return {
        storeItem: function(item){
            let items = getLocalStorage();
            items.push(item);
            setLocalStorage(items);
        },
        
        updateItemInLocalStorage: (updatedItem) => {
            updateDeleteHelper(updatedItem, true);
        },
        
        removeItemFromLocalStorage: (itemToDelete) => {
            updateDeleteHelper(itemToDelete, false);
        },

        removeAllItemFromLocalStorage: () => {
            localStorage.removeItem('items');
        },

        getItemsFromStorage: function(){
            return getLocalStorage();
        }
    }
})();

//Item Controller, IIFE - Immediately-invoked function expression
const ItemController = (function(StorageController){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        items: StorageController.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    //return public methods
    return {
        getItems: function(){
            return data.items;
        },

        getTotalCalories: function(){
            this.calculateTotalCalories();
            return data.totalCalories;
        },

        addItem: function(name, calories){
            let ID = 0;
            //create ID, add one to id of last index
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id +1;
            }
            const newItem =  new Item(ID, name, parseInt(calories));
            data.totalCalories += newItem.calories;
            data.items.push(newItem);
            return newItem;
        },

        updateItem: function(name, calories){
            calories = parseInt(calories);
            let found = null;

            data.items.forEach(item => {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            this.calculateTotalCalories();
            return found;
        },

        calculateTotalCalories: function(){
            data.totalCalories = 0;
            data.items.forEach(item => {
                data.totalCalories += item.calories;
            })
        },

        getItemById: function(id){
            let returnedItem = null;
            data.items.forEach(item => {
                if(item.id === id){
                    returnedItem = item;
                }
            });
            return returnedItem;
        },

        deleteItem: function(id){
            //use a map to change it up
            const ids = data.items.map(item => {
                return item.id;
            });
            //get index
            const index = ids.indexOf(id);
            //remove Item
            data.items.splice(index, 1);
        },

        clearAllItems: function(){
            data.items = [];
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        logData: function(){
            return data;
        }
    }
})(StorageController);




//UI Controller
const UIController = (function(){

    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories',
        updateButton: '.update-btn',
        deleteButton: '.delete-btn',
        backButton: '.back-btn',
        clearButton: '.clear-btn'
    }

    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    </li>`;
            });

            //insert List Items
            document.querySelector(UISelectors.itemList).innerHTML = html;
            this.updateCalories();
        },

        removeItems: function(){
            const items = Array.from(document.querySelectorAll(UISelectors.listItems));
            items.forEach(item => item.remove());
            this.updateCalories();
            this.hideList();
        },
        
        
        addItemToList: function(item){
            //show list
            document.querySelector(UISelectors.itemList).style.display = 'block';

            //create <li> element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
            <strong>${item.name}</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            //insert List Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
            this.updateCalories();
        },
        
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
            //turn nodeList into Array
            listItems = Array.from(listItems);
            listItems.forEach(tmpItem => {
                const itemId = tmpItem.getAttribute('id'); 
                if(itemId === `item-${item.id}`){
                    document.querySelector(`#${itemId}`).innerHTML = `
                    <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;
                }
            });
            document.querySelector(UISelectors.totalCalories).textContent = ItemController.getTotalCalories();
        },
        
        updateCalories: function(){
            document.querySelector(UISelectors.totalCalories).textContent = ItemController.getTotalCalories();
        },

        deleteListItem: function(id){
            document.querySelector(`#item-${id}`).remove();
            this.updateCalories();
            this.clearEditState();
        },

        getSelectors: function(){
            return UISelectors;
        },

        getFormInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        
        clearFormInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
            UIController.showEditState();
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        
        clearEditState: function(){
            UIController.clearFormInput();
            document.querySelector(UISelectors.updateButton).style.display = 'none';
            document.querySelector(UISelectors.deleteButton).style.display = 'none';
            document.querySelector(UISelectors.backButton).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function(){
            UIController.clearFormInput();
            document.querySelector(UISelectors.updateButton).style.display = 'inline';
            document.querySelector(UISelectors.deleteButton).style.display = 'inline';
            document.querySelector(UISelectors.backButton).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        }

        
    }
})();




//App Controller
const App = (function(ItemController, UIController, StorageController){
    //load event listeners
    const loadEventListeners = function(){
        const UISelectors = UIController.getSelectors();

        //addItem event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
            }
        });
        
        //edit icon click event, target list icons are in
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        //update item event
        document.querySelector(UISelectors.updateButton).addEventListener('click', itemUpdateSubmit);
        //update item event
        document.querySelector(UISelectors.deleteButton).addEventListener('click', itemDeleteSubmit);
        //back button
        document.querySelector(UISelectors.backButton).addEventListener('click', UIController.clearEditState);
        //clear button
        document.querySelector(UISelectors.clearButton).addEventListener('click', clearAllItems);
    };

    //addItem submit
    const itemAddSubmit = function(e){
        //get form input form UI Controller
        const input = UIController.getFormInput();

        //validate input
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemController.addItem(input.name, input.calories);
            UIController.addItemToList(newItem);
            //store in localStorage
            StorageController.storeItem(newItem);
            UIController.clearFormInput();
        }else{
            console.log('error');
        }
        e.preventDefault();
    };

    //itemEditClick 
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            //get list item id
            const listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);
            //get item
            const itemToEdit = ItemController.getItemById(id);
            //set current item
            ItemController.setCurrentItem(itemToEdit);
            //add item to form
            UIController.addItemToForm();
        }
        // console.log(e.target.classList);
        e.preventDefault();
    };

    //itemUpdateSubmit
    const itemUpdateSubmit = function(e){
        const input = UIController.getFormInput();
        const updatedItem = ItemController.updateItem(input.name, input.calories);
        UIController.updateListItem(updatedItem);
        //update item in localStorage
        StorageController.updateItemInLocalStorage(updatedItem);
        //clear form
        UIController.clearEditState();

        e.preventDefault();
    }

    //itemDeleteSubmit
    const itemDeleteSubmit = function(e){
        //get current item
        const currentItem = ItemController.getCurrentItem();
        //delete from data structure
        ItemController.deleteItem(currentItem.id);
        //delete from local storage
        StorageController.removeItemFromLocalStorage(currentItem);
        //delete from UI
        UIController.deleteListItem(currentItem.id);
        e.preventDefault();
    }

    const clearAllItems = function(e){
        ItemController.clearAllItems();
        UIController.removeItems();
        StorageController.removeAllItemFromLocalStorage();
        e.preventDefault();
    }

    //Public Methods
    return {
        init: function(){
            //set initial state
            UIController.clearEditState();

            //populate list with items
            const items = ItemController.getItems();
            if(items.length === 0){
                UIController.hideList();
            }else{
                ItemController.calculateTotalCalories();
                UIController.populateItemList(items);
            }

            //load event listeners
            loadEventListeners();
        }
    }
})(ItemController, UIController, StorageController);

App.init(
);