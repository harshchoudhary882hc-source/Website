"use client";

import { useState, useEffect } from 'react';

/**
 * PricingCalculator component that allows users to calculate the total price of a unit
 * based on unit type and floor level, and also estimate monthly EMI for a home loan.
 * It uses React's useState and useEffect hooks to manage state and re-calculate values dynamically.
 * @returns {JSX.Element} The JSX for the pricing calculator section.
 */
export default function PricingCalculator() {
  // State variables for unit selection and pricing calculations
  const [unitType, setUnitType] = useState('1bhk-a1');
  const [floorLevel, setFloorLevel] = useState('1-5');
  const [basePrice, setBasePrice] = useState(0);
  const [floorPremium, setFloorPremium] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // State variables for EMI calculation
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emiAmount, setEmiAmount] = useState(0);

  // Defines the base price and area for different unit types
  const unitOptions = {
    '1bhk-a1': { price: 8500, area: 48 },
    '1bhk-a2': { price: 9000, area: 51 },
    '2bhk-b1': { price: 12000, area: 78 },
    '2bhk-b2': { price: 13000, area: 84 },
    '3bhk-c1': { price: 15000, area: 112 },
    '3bhk-c2': { price: 16000, area: 126 },
  };

  // Effect hook to recalculate price whenever unitType or floorLevel changes
  useEffect(() => {
    calculatePrice();
  }, [unitType, floorLevel]);

  // Effect hook to recalculate EMI whenever loanAmount, interestRate, or loanTenure changes
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  /**
   * Calculates the total price of a unit based on the selected unit type and floor level.
   * Updates the `basePrice`, `floorPremium`, `gst`, `totalPrice`, and `loanAmount` states.
   */
  const calculatePrice = () => {
    const selectedUnit = unitOptions[unitType as keyof typeof unitOptions];
    if (!selectedUnit) return;

    const basePricePerSqM = selectedUnit.price;
    const area = selectedUnit.area;

    let floorMultiplier = 1;
    if (floorLevel === '6-12') floorMultiplier = 1.05;
    else if (floorLevel === '13-18') floorMultiplier = 1.10;
    else if (floorLevel === '19-24') floorMultiplier = 1.15;

    const calculatedBasePrice = basePricePerSqM * area;
    const calculatedTotalBasePrice = calculatedBasePrice * floorMultiplier;
    const calculatedFloorPremium = calculatedTotalBasePrice - calculatedBasePrice;
    const calculatedGst = calculatedTotalBasePrice * 0.05;
    const calculatedTotalPrice = calculatedTotalBasePrice + calculatedGst;

    setBasePrice(calculatedBasePrice);
    setFloorPremium(calculatedFloorPremium);
    setGst(calculatedGst);
    setTotalPrice(calculatedTotalPrice);
    setLoanAmount(Math.round(calculatedTotalPrice * 0.8)); // Auto-fill 80% of total price as loan
  };

  /**
   * Calculates the estimated monthly EMI (Equated Monthly Installment) for a home loan.
   * Updates the `emiAmount` state.
   */
  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate;
    const time = loanTenure;

    if (principal === 0) {
      setEmiAmount(0);
      return;
    }

    const monthlyRate = rate / 12 / 100;
    const months = time * 12;
    // EMI formula: P * R * (1 + R)^N / ((1 + R)^N - 1)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmiAmount(Math.round(emi));
  };

  return (
    <section id="pricing" className="section container">
      {/* Kicker text for the section */}
      <div className="kicker">Investment Calculator</div>
      {/* Main heading for the pricing calculator section */}
      <h2>Plan your investment</h2>
      {/* Pricing calculator interface, with a scroll-reveal animation */}
      <div className="pricing-calculator reveal">
        <div className="calculator-grid">
          {/* Input section for unit type, floor level, and payment plan */}
          <div className="calculator-inputs">
            <h3>Calculate Your Investment</h3>
            {/* Unit Type Selection */}
            <div className="input-group">
              <label htmlFor="unit-type">Unit Type</label>
              <select id="unit-type" value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                {Object.entries(unitOptions).map(([key, value]) => (
                  <option key={key} value={key} data-price={value.price} data-area={value.area}>
                    {key.toUpperCase().replace('BHK-', ' BHK ').replace('A', ' A').replace('B', ' B').replace('C', ' C')} - {value.area} m²
                  </option>
                ))}
              </select>
            </div>
            {/* Floor Level Selection */}
            <div className="input-group">
              <label htmlFor="floor-level">Floor Level</label>
              <select id="floor-level" value={floorLevel} onChange={(e) => setFloorLevel(e.target.value)}>
                <option value="1-5">Floors 1-5 (Base Price)</option>
                <option value="6-12">Floors 6-12 (+5%)</option>
                <option value="13-18">Floors 13-18 (+10%)</option>
                <option value="19-24">Floors 19-24 (+15%)</option>
              </select>
            </div>
            {/* Payment Plan Selection (currently static) */}
            <div className="input-group">
              <label htmlFor="payment-plan">Payment Plan</label>
              <select id="payment-plan">
                <option value="construction">Construction Linked</option>
                <option value="possession">On Possession</option>
                <option value="flexi">Flexi Payment</option>
              </select>
            </div>
          </div>
          {/* Results section displaying price breakdown and EMI calculator */}
          <div className="calculator-results">
            <h3>Your Investment</h3>
            {/* Price breakdown details */}
            <div className="price-breakdown">
              <div className="price-item">
                <span>Base Price</span>
                <span id="base-price">₹{basePrice.toLocaleString()}</span>
              </div>
              <div className="price-item">
                <span>Floor Premium</span>
                <span id="floor-premium">₹{floorPremium.toLocaleString()}</span>
              </div>
              <div className="price-item">
                <span>GST (5%)</span>
                <span id="gst">₹{gst.toLocaleString()}</span>
              </div>
              <div className="price-item total">
                <span>Total Price</span>
                <span id="total-price">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            {/* EMI Calculator section */}
            <div className="emi-calculator">
              <h4>EMI Calculator</h4>
              {/* Loan Amount Input */}
              <div className="input-group">
                <label htmlFor="loan-amount">Loan Amount (₹)</label>
                <input type="number" id="loan-amount" placeholder="Enter loan amount" value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))} />
              </div>
              {/* Interest Rate Input */}
              <div className="input-group">
                <label htmlFor="interest-rate">Interest Rate (%)</label>
                <input type="number" id="interest-rate" value={interestRate} step="0.1" onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
              </div>
              {/* Loan Tenure Input */}
              <div className="input-group">
                <label htmlFor="loan-tenure">Loan Tenure (Years)</label>
                <input type="number" id="loan-tenure" value={loanTenure} onChange={(e) => setLoanTenure(parseFloat(e.target.value))} />
              </div>
              {/* EMI Result Display */}
              <div className="emi-result">
                <div className="emi-amount">
                  <span>Monthly EMI</span>
                  <span id="emi-amount">₹{emiAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
