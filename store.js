"use strict";

function statement(customer, movies) {
    let totalCost = 0;
    let totalFrequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        let movie = findMovie(rental);
        let currentMovieCost = getMovieCost(rental);

        totalFrequentRenterPoints += getFrequentRenterPoints(rental);

        //print figures for this rental
        result += `\t${movie.title}\t${currentMovieCost}\n`;
        totalCost += currentMovieCost;
    }
    // add footer lines
    result += `Amount owed is ${totalCost}\n`;
    result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

    return result;

    function findMovie(rental) {
        return movies[rental.movieID];
    }

    function getMovieCost(rental) {
        let cost = 0;
        let movie = findMovie(rental);

        // determine amount for each movie
        switch (movie.type) {
            case "regular":
                cost = 2;
                if (rental.days > 2) {
                    cost += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                cost = rental.days * 3;
                break;
            case "children":
                cost = 1.5;
                if (rental.days > 3) {
                    cost += (rental.days - 3) * 1.5;
                }
                break;
        }
        return cost;
    }

    function getFrequentRenterPoints(rental) {
        let movie = findMovie(rental);

        // add bonus for a two day new release rental
        return (movie.type === "new" && rental.days > 2) ? 2 : 1;
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