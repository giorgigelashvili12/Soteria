// mechanism checking if currency is supported

const RATES = {
  USD: 1,
  GEL: 2.69,
  //eur: 0.92, test
};

let userInput = "EUR"; // not supported
userInput = "GEL"; // supported

if (!(userInput in RATES)) {
  console.log(`true, currency not supported`);
} else {
  console.log(`false, currency supported`);
}

// two cases
//
// supported
// const from = "USD";
// const to = "GEL";

// not supproted
const from = "EUR";
const to = "GEL";

if (!(from in RATES) || !(to in RATES)) {
  console.log(`not supported`);
} else {
  console.log("supported");
}
