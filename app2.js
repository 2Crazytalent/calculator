function Calculator(containerId) {
    this.container = document.getElementById(containerId);
    this.productsInput = document.getElementById("products"); // input za produkte
    this.ordersInput = document.getElementById("orders"); // input za orderje
    this.packageInput = document.getElementById("package"); // input za paket
    this.accountingInput = document.getElementById("accounting"); // input za accounting
    this.rentalInput = document.getElementById("rental"); // input za rental

    this.products = 0; // vrednost inputa za produkte
    this.orders = 0; // vrednost inputa za orderje
    this.package = 0; // vrednost inputa za paket
    this.accounting = 0; // vrednost inputa za accounting
    this.rental = 0; // vrednost inputa za rental

    this.totals = {
        products : 0, // vrednsot za produkte
        orders : 0, // vrednost za orderje
        package : 0,
        packagePrice : 0,
        accounting: 0,
        rental : 0,
        total : 0 // skupna vrednost
    }
    console.log(this.container);
}

Calculator.prototype.calculateTotal = function () {
    this.totals.total = 0;
    if(this.totals.products)
        this.totals.total += this.totals.products;

    if(this.totals.orders)
        this.totals.total += this.totals.orders;

    if(this.totals.packagePrice)
        this.totals.total += this.totals.packagePrice;

    if(this.totals.accounting)
        this.totals.total += this.totals.accounting;

    if(this.totals.rental)
        this.totals.total += this.totals.rental;
}

Calculator.prototype.createEventListeners = function () {
    this.productsInput.addEventListener("change", this.getValues);
    this.ordersInput.addEventListener("change", this.getValues);
    this.packageInput.addEventListener("change", this.getValues);
    this.accountingInput.addEventListener("change", this.getValues);
    this.rentalInput.addEventListener("change", this.getValues);
}

Calculator.prototype.getValues = function () {
    this.products = parseInt(this.productsInput.value); // dobim vrednost za produkt
    this.totals.products = this.products * 0.5; // izracunam total za produkt
    this.orders = parseInt(this.ordersInput.value);
    this.totals.orders = this.orders * 0.25;
    this.package = this.packageInput.value;
    this.totals.package = this.package;
    this.totals.packagePrice = getPackagePrice(this.package);
    this.rental = this.rentalInput.value;
    if(this.accountingInput.checked) {
        this.accounting = true;
        this.totals.accounting = 35;
    } else {
        this.accounting = false;
        this.totals.accounting = 0;
    }

    if(this.rentalInput.checked) {
        this.rental = true;
        this.totals.rental = 5;
    } else {
        this.rental = false;
        this.totals.rental = 0;
    }
    console.log(this.totals);
    //showTotal();
}

const totalCalculate = new Calculator("calculator");
totalCalculate.createEventListeners();
console.log(totalCalculate);