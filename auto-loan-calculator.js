document.getElementById("calculateButton").addEventListener("click", function() {
  const purchasePrice = parseFloat(document.getElementById("purchasePrice").value);
  const monthlyPayments = parseFloat(document.getElementById("monthlyPayments").value);
  const numPayments = parseInt(document.getElementById("numPayments").value);

  const rate = newtonRaphsonMethod(purchasePrice, monthlyPayments, numPayments);

  if (!isNaN(rate)) {
    const interestRate = (rate * 12 * 100).toFixed(2);
    const totalInterestPaid = ((monthlyPayments * numPayments) - purchasePrice).toFixed(2);
    const totalCostOfVehicle = (purchasePrice + parseFloat(totalInterestPaid)).toFixed(2);

    document.getElementById("interestRate").textContent = interestRate;
    document.getElementById("totalInterestPaid").textContent = totalInterestPaid;
    document.getElementById("totalCostOfVehicle").textContent = totalCostOfVehicle;
  } else {
    document.getElementById("interestRate").textContent = "Error";
    document.getElementById("totalInterestPaid").textContent = "Error";
    document.getElementById("totalCostOfVehicle").textContent = "Error";
  }
});

function newtonRaphsonMethod(principal, monthlyPayment, numPayments) {
  const epsilon = 0.0000001;
  let rate = 0.05 / 12;
  let deltaRate;

  do {
    const f = principal * rate * (1 - Math.pow(1 + rate, -numPayments)) - monthlyPayment;
    const f_prime = principal * (Math.pow(1 + rate, -numPayments) * (numPayments * rate - numPayments + 1) + rate);
    deltaRate = -f / f_prime;
    rate += deltaRate;
  } while (Math.abs(deltaRate) > epsilon);

  return rate;
}
