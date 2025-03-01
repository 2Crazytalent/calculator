
// konstruktor za kalkulator
function Calculator() {
    this.productsInput = document.getElementById("products");
    this.ordersInput = document.getElementById("orders");
    this.packageInput = document.getElementById("package");
    this.accountingInput = document.getElementById("accounting");
    this.rentalInput = document.getElementById("rental");

    this.productsData = document.getElementsByClassName("products-data")[0];
    this.ordersData = document.getElementsByClassName("orders-data")[0];
    this.packageData = document.getElementsByClassName("package-data")[0];
    this.accountingData = document.getElementsByClassName("accounting-data")[0];
    this.rentalData = document.getElementsByClassName("rental-data")[0];

    this.totalData = document.getElementsByClassName("total")[0];
    this.init();
}
// 1. init bo nastavil evente
// 2. init bo izracunal vrednost
Calculator.prototype = {
    init: function () {
        console.log("init fired");
        this.createEventListeners();
        this.calculateTotal();
    },
    createEventListeners: function () {
        this.productsInput.addEventListener("change", () => this.calculateTotal());
        this.ordersInput.addEventListener("change", () => this.calculateTotal());
        this.packageInput.addEventListener("change", () => this.calculateTotal());
        this.accountingInput.addEventListener("change", () => this.calculateTotal());
        this.rentalInput.addEventListener("change", () => this.calculateTotal());
    },
    getPackagePrice: function (package_name) {
        if(package_name === "Basic") {
            return 0;
        } else if(package_name === "Professional") {
            return 25;
        } else if(package_name === "Premium"){
            return 60;
        }
    },
    calculateTotal: function () {
        const productsValue = parseInt(this.productsInput.value);
        const ordersValue = parseInt(this.ordersInput.value);
        const packageValue = this.packageInput.value;
        const accountingValue = this.accountingInput.checked ? parseInt(this.accountingInput.value) : 0; // fancy if stavek
        const rentalValue = this.rentalInput.checked ? parseInt(this.rentalInput.value) : 0; // fancy if stavek

        const products = productsValue * 0.5;
        const orders = ordersValue * 0.25;
        const package = this.getPackagePrice(packageValue);
        const accounting = accountingValue;
        const rental = rentalValue;

        const total = products + orders + package + accounting + rental;

        console.log(products);
        this.showTotal({
            productsValue, products, ordersValue, orders, packageValue, package, accountingValue, accounting, rentalValue, rental, total
        });
    },
    showRow: function (rowValue, rowData, price, rowTotal ) {
        if(rowValue) {
            rowData.classList.remove("hidden");
            if(price != null)
                rowData.children[1].innerHTML =  "$" + rowValue + " * " + price;
            else
                rowData.children[1].innerHTML =  rowValue;
            rowData.children[2].innerHTML = "$" + rowTotal;
        } else {
            rowData.classList.add("hidden");
        }
    },
    showTotal: function (data) {

        this.showRow(data.productsValue, this.productsData, 0.5, data.products);
        this.showRow(data.ordersValue, this.ordersData, 0.25, data.orders);
        this.showRow(data.packageValue, this.packageData, null, data.package);
        this.showRow(data.accountingValue, this.accountingData, null, data.accounting);
        this.showRow(data.rentalValue, this.rentalData, null, data.rental);

        if(data.productsValue)
            this.totalData.innerHTML = "Total: " + data.total;
        else
            this.totalData.innerHTML = "";
    }
}

// event DOMContentLoaded, ce nebi imeli JS na koncu HTML
const calculator = new Calculator();