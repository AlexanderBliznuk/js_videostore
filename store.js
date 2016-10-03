"use strict";
function Customer(data) {
    this._data = data;
}
Customer.prototype.getName = function() {
    return this._data.name;
};
Customer.prototype.getRentals = function() {
    return this._data.rentals.map(function (rental) {
        return new Rental(rental);
    });
};

function Rental(data) {
    this._data = data;
}
Rental.prototype.getDays = function() {
    return this._data.days;
};
Rental.prototype.getMovieID = function() {
    return this._data.movieID;
};

function statement(customerArg, movies) {
    let customer = new Customer(customerArg);
    let result = `Rental Record for ${customer.getName()}\n`;
    for (let rental of customer.getRentals()) {
        result += `\t${findMovie(rental).title}\t${getMovieCost(rental)}\n`;
    }

    return addFooterLines(result);

    function findMovie(rental) {
        return movies[rental.getMovieID()];
    }

    function getMovieCost(rental) {
        let cost = 0;
        let movie = findMovie(rental);

        // determine amount for each movie
        switch (movie.type) {
            case "regular":
                cost = 2;
                if (rental.getDays() > 2) {
                    cost += (rental.getDays() - 2) * 1.5;
                }
                break;
            case "new":
                cost = rental.getDays() * 3;
                break;
            case "children":
                cost = 1.5;
                if (rental.getDays() > 3) {
                    cost += (rental.getDay() - 3) * 1.5;
                }
                break;
        }
        return cost;
    }

    function getFrequentRenterPoints(rental) {
        let movie = findMovie(rental);

        // add bonus for a two day new release rental
        return (movie.type === "new" && rental.getDays() > 2) ? 2 : 1;
    }

    function getTotalCost(customer) {
        let totalCost = 0;
        for (let rental of customer.getRentals()) {
            totalCost += getMovieCost(rental);
        }
        return totalCost;
    }

    function getTotalFrequentRentalPoints(customer) {
        let totalFrequentRenterPoints = 0;
        for (let rental of customer.getRentals()) {
            totalFrequentRenterPoints += getFrequentRenterPoints(rental);
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