"use strict";

function statement(customer, movies) {
  let totalCost = 0;
  let totalFrequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of customer.rentals) {
    let movie = findMovie(rental);
    let currentMovieCost = 0;

    // determine amount for each movie
    switch (movie.type) {
      case "regular":
        currentMovieCost = 2;
        if (rental.days > 2) {
          currentMovieCost += (rental.days - 2) * 1.5;
        }
        break;
      case "new":
        currentMovieCost = rental.days * 3;
        break;
      case "children":
        currentMovieCost = 1.5;
        if (rental.days > 3) {
          currentMovieCost += (rental.days - 3) * 1.5;
        }
        break;
    }

    //add frequent renter points
    totalFrequentRenterPoints++;
    // add bonus for a two day new release rental
    if (movie.type === "new" && rental.days > 2) totalFrequentRenterPoints++;

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