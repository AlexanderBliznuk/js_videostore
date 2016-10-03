"use strict";
function Customer(data, moviesAvailable) {
    this._data = data;
    this._moviesAvailable = moviesAvailable;
}
Customer.prototype.getName = function() {
    return this._data.name;
};
Customer.prototype.getRentals = function() {
    return this._data.rentals.map((function (rental) {
        return new Rental(rental, this._moviesAvailable);
    }).bind(this));
};

function Rental(data, moviesAvailable) {
    this._data = data;
    this._movie = new Movie(moviesAvailable[this.getMovieID()]);
}
Rental.prototype.getDays = function() {
    return this._data.days;
};
Rental.prototype.getMovieID = function() {
    return this._data.movieID;
};
Rental.prototype.getMovie = function() {
    return this._movie;
};
Rental.prototype.getFrequentRenterPoints = function() {
    // add bonus for a two day new release rental
    return (this.getMovie().getType() === "new" && this.getDays() > 2) ? 2 : 1;
};
Rental.prototype.getCost = function() {
    let cost = 0;
    switch (this.getMovie().getType()) {
        case "regular":
            cost = 2;
            if (this.getDays() > 2) {
                cost += (this.getDays() - 2) * 1.5;
            }
            break;
        case "new":
            cost = this.getDays() * 3;
            break;
        case "children":
            cost = 1.5;
            if (this.getDays() > 3) {
                cost += (this.getDays() - 3) * 1.5;
            }
            break;
    }
    return cost;
};

function Movie(data) {
    this._data = data;
}
Movie.prototype.getType = function() {
    return this._data.type;
};
Movie.prototype.getTitle = function() {
    return this._data.title;
};

function statement(customerArg, moviesAvailable) {
    let customer = new Customer(customerArg, moviesAvailable);
    let result = `Rental Record for ${customer.getName()}\n`;
    for (let rental of customer.getRentals()) {
        result += `\t${rental.getMovie().getTitle()}\t${rental.getCost()}\n`;
    }

    return addFooterLines(result);

    function getTotalCost(customer) {
        let totalCost = 0;
        for (let rental of customer.getRentals()) {
            totalCost += rental.getCost();
        }
        return totalCost;
    }

    function getTotalFrequentRentalPoints(customer) {
        let totalFrequentRenterPoints = 0;
        for (let rental of customer.getRentals()) {
            totalFrequentRenterPoints += rental.getFrequentRenterPoints();
        }
        return totalFrequentRenterPoints;
    }

    function addFooterLines(msg) {
        msg += `Amount owed is ${getTotalCost(customer)}\n`;
        msg += `You earned ${getTotalFrequentRentalPoints(customer)} frequent renter points\n`;
        return msg;
    }
}

let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    }, ]
};

let movies = {
    "F001": {
        "title": "Ran",
        "type": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "type": "regular"
    },
    // etc
};

console.log(statement(customer, movies));