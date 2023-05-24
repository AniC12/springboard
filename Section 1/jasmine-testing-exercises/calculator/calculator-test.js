
it('should calculate the monthly rate correctly', function () {
  const values = {amount: 5000, years: 3, rate: 3};
  expected(calculateMonthlyPayment(values)).toEqual(145.41);
});


it("should return a result with 2 decimal places", function() {
  const values = {amount: 50000, years: 6, rate: 2.5};
  expected(calculateMonthlyPayment(values)).toEqual(898.26);
});

