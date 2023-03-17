document.getElementById("calculateButton").addEventListener("click", function () {

    const purchasePrice = parseFloat(document.getElementById("purchasePrice").value);
    const monthlyPayments = parseFloat(document.getElementById("monthlyPayments").value);
    const numPayments = parseInt(document.getElementById("numPayments").value);

    const interestRate = calculateInterestRate(purchasePrice, monthlyPayments, numPayments);
    const totalInterestPaid = (monthlyPayments * numPayments) - purchasePrice;
    const totalCostOfVehicle = purchasePrice + totalInterestPaid;

    document.getElementById("interestRate").textContent = interestRate.toFixed(2);
    document.getElementById("totalInterestPaid").textContent = totalInterestPaid.toFixed(2);
    document.getElementById("totalCostOfVehicle").textContent = totalCostOfVehicle.toFixed(2);
});

function calculateInterestRate(purchasePrice, monthlyPayments, numPayments) {
    let rate = 0.1;
    let precision = 0.0001;
    let maxIterations = 1000;
    let currentIteration = 0;

    while (Math.abs(monthlyPayments - calculateMonthlyPayment(purchasePrice, rate, numPayments)) > precision && currentIteration < maxIterations) {
        rate = rate - (calculateMonthlyPayment(purchasePrice, rate, numPayments) - monthlyPayments) / calculateDerivative(purchasePrice, rate, numPayments);
        currentIteration++;
    }

    return rate * 12 * 100;
}

function calculateMonthlyPayment(principal, rate, numPayments) {
    const monthlyRate = rate / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateDerivative(principal, rate, numPayments) {
    const monthlyRate = rate / 12;
    const a = Math.pow(1 + monthlyRate, numPayments);
    const b = Math.pow(1 + monthlyRate, numPayments) - 1;
    const numerator = principal * monthlyRate * a * (a - (numPayments * (a - 1)));
    const denominator = b * b * (1 + monthlyRate);
    return numerator / denominator;
}
