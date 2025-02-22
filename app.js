// Input vrednosti
var productsInput = document.getElementById("products"); // input za produkte
var ordersInput = document.getElementById("orders"); // input za orderje
var packageInput = document.getElementById("package"); // input za paket
var accountingInput = document.getElementById("accounting"); // input za accounting
var rentalInput = document.getElementById("rental"); // input za rental

// Tabele na desni strani
var productsData = document.getElementsByClassName("products-data")[0];
var ordersData = document.getElementsByClassName("orders-data")[0];
var packageData = document.getElementsByClassName("package-data")[0];
var accountingData = document.getElementsByClassName("accounting-data")[0];
var rentalData = document.getElementsByClassName("rental-data")[0];
var totalData = document.getElementsByClassName("total")[0];

var products = 0; // vrednost inputa za produkte
var orders = 0; // vrednost inputa za orderje
var package = 0; // vrednost inputa za paket
var accounting = 0; // vrednost inputa za accounting
var rental = 0; // vrednost inputa za rental

// objekt celotne kalukacije
var totals = {
    products : 0, // vrednsot za produkte
    orders : 0, // vrednost za orderje
    package : 0,
    packagePrice : 0,
    accounting: 0,
    rental : 0,
    total : 0 // skupna vrednost
}

// funckija vrne ceno paketa glede na ime
function getPackagePrice(package_name) {
    if(package_name === "Basic") {
        return 0;
    } else if(package_name === "Professional") {
        return 25;
    } else if(package_name === "Premium"){
        return 60;
    }
}
// funkcija nastavi vrednost v tabeli glede na podan parameter
function setproductData(productsData, value, valueTotal) {
    productsData.children[1].innerHTML = value
    productsData.children[2].innerHTML = valueTotal;
}
// izracuna celotno ceno nakupa
function calculateTotal() {
    totals.total = 0;
    if(totals.products)
        totals.total += totals.products;

    if(totals.orders)
        totals.total += totals.orders;

    if(totals.packagePrice)
        totals.total += totals.packagePrice;

    if(totals.accounting)
        totals.total += totals.accounting;

    if(totals.rental)
        totals.total += totals.rental;

}
// skrije element
function hideElement(productData, element) {
    if(element !== 0 || element === true) {
        productData.classList.remove("hidden");
    }
}
// prikaze vrstico v tabeli
function showTotal() {
    if(totals.products > 0) {
        setproductData(productsData, products + " * " + "$" + 0.5,"$" + totals.products);
        hideElement(productsData, products);
    }
    else
        productsData.classList.add("hidden")
    if(totals.orders > 0) {
        setproductData(ordersData, orders + " * " + "$" + 0.25, "$" + totals.orders);
        hideElement(ordersData, orders);
    }
    else
        ordersData.classList.add("hidden")
    if(totals.package !== "Choose package") {
        setproductData(packageData, package, "$" + totals.packagePrice);
        hideElement(packageData, package);
    }
    if(totals.accounting === 35) {
        setproductData(accountingData, null, "$" + totals.accounting);
        hideElement(accountingData, accounting);
    }
    else
        accountingData.classList.add("hidden")
    if(totals.rental === 5) {
        setproductData(rentalData, null, "$" + totals.rental);
        hideElement(rentalData, rental);
    }
    else
        rentalData.classList.add("hidden")

    calculateTotal();
    totalData.innerHTML = "Total " + totals.total;
}
// dobi in nastavi vrednost objekta
function getValues() {
    products = parseInt(productsInput.value); // dobim vrednost za produkt
    totals.products = products * 0.5; // izracunam total za produkt
    orders = parseInt(ordersInput.value);
    totals.orders = orders * 0.25;
    package = packageInput.value;
    totals.package = package;
    totals.packagePrice = getPackagePrice(package);
    rental = rentalInput.value;
    if(accountingInput.checked) {
        accounting = true;
        totals.accounting = 35;
    } else {
        accounting = false;
        totals.accounting = 0;
    }

    if(rentalInput.checked) {
        rental = true;
        totals.rental = 5;
    } else {
        rental = false;
        totals.rental = 0;
    }
    console.log(totals);
    showTotal();
}

productsInput.addEventListener("change", getValues);
ordersInput.addEventListener("change", getValues);
packageInput.addEventListener("change", getValues);
accountingInput.addEventListener("change", getValues);
rentalInput.addEventListener("change", getValues);


/*
function Calculator() {
    this.productsInput = document.getElementById("products");
    this.products = 0;
    //this.products.addEventListener("change", this.calculate());
}

Calculator.prototype.calculate = function () {
    console.log("Calculating total");
    console.log(this.products);
}

const totalCalculate = new Calculator();
console.log(totalCalculate);
totalCalculate.productsInput.addEventListener("change", totalCalculate.calculate);
 */