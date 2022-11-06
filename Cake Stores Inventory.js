/*
Class: CakeStore
Description: Cake store that keeps the list of cakes available

Properties:
    cakes - array of cakes
    storenumber - the number of the store
    city - city the store is located in
    state - state the store is located in

Methods:
    describe - returns a description of the cake store
    addCake - adds a cake to the cake store
    removeCake - removes a cake from the cake store
*/

class CakeStore{
    constructor(storenumber, city, state){
        this.cakes = [];
        this.storenumber = storenumber;
        this.city = city;
        this.state = state;
    }
    
    describe(){
        return `${this.storenumber} ${this.city} ${this.state}`;
    }
    
    addCake(cake){
        if (cake instanceof Cake) {
          this.cakes.push(cake);  
        }else{
            throw new Error("This object is not a cake object");
        }
    }

    removeCake(index){   
        if (index > -1 &&  index < this.cakes.length){
            this.cakes.splice(index, 1);
        }
    }
}

class Cake{
    constructor(cakename){
    this.cakename = cakename;  
    }
    
    describe(){
        return `${this.cakename}`;
    }
}

class Menu{
    constructor() {
        this.cakestores = [];

        this.selectedCakeStore = null;
    }

    start(){
        let selection = this.displayMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createCakeStore();
                    break;
                case '2':
                    this.displayCakeStore();
                    break;
                case '3':
                    this.deleteCakeStore();
                    break;
                case '4':
                    this.displayCakeStores();
                    break;
                default:
                    selection = 0;   
            }

            selection = this.displayMainMenuOptions();
        }
        
        alert ('Goodbye');
    }

    displayMainMenuOptions(){
         return prompt(`
            0) exit
            1) create new cake store
            2) view cake store
            3) delete cake store
            4) display all cake stores 
            `);
    }

    displayCakeStoreOptions(cakeStoreInfo){
        return prompt(`
            0) back
            1) add cake
            2) delete cake
            ________________

            ${cakeStoreInfo}
        `);
    }

    createCakeStore(){
        let storeNumber = prompt('Enter store number');
        let storeCity = prompt('Enter store city');
        let storeState = prompt('Enter store state');

        this.cakestores.push(new CakeStore(storeNumber, storeCity, storeState));
    }

    displayCakeStore(){
        let index = prompt('Enter the index of the cake store you wish to view:');

        if (index > -1 && index < this.cakestores.length) {
            this.selectedCakeStore = this.cakestores[index];
            
            let description = 'Cake Store Number: ' + this.selectedCakeStore.storenumber + '\n';
            
            for (let i = 0; i < this.selectedCakeStore.cakes.length; i++){
                description += i + ')' + ' ' + this.selectedCakeStore.cakes[i].cakename + '\n';
            }

            let selection = this.displayCakeStoreOptions(description);
            
            switch (selection){
                case '1':
                    this.addCake();
                    break;
                case '2':
                    this.removeCake();
                    break;
            }
        }
    }

    deleteCakeStore(){
        let index = prompt('Enter the index of the cake store you wish to delete:');
        
        if (index > -1 && index < this.cakestores.length) {
            this.cakestores.splice(index, 1);
        }
    }

    displayCakeStores(){
        let cakeStoreString = '';
        
        for (let i = 0; i < this.cakestores.length; i++) {
            cakeStoreString += i + ') ' + this.cakestores[i].storenumber + ' ' +
            this.cakestores[i].city + ' ' + this.cakestores[i].state + '\n';
        }
        
        alert(cakeStoreString);
    }

    addCake(){
        let newCakeName = prompt('Enter the name of the cake:');

        this.selectedCakeStore.addCake(new Cake(newCakeName));
    }

    removeCake(){
        let index = prompt('Enter index of cake you want to remove');

        this.selectedCakeStore.removeCake(index);
    }    
}

let menu = new Menu();
menu.start();

