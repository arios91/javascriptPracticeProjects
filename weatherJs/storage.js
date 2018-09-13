class Storage{
    constructor(){
        this.zip;
        this.defaultZip = '78572';
    }

    getStoredZip(){
        if(localStorage.getItem('zipCode') === null){
            this.zip = this.defaultZip;
        }else{
            this.zip = localStorage.getItem('zipCode');
        }

        return this.zip;
    }

    setStoredZip(zip){
        localStorage.setItem('zipCode', zip);
    }
}