// MyComponent.js
import React, { useState } from "react";
import "./MyComponent.css";

/*
State Management:
The useState hook is used to create a state variable named customerInfo. This state variable is an object that holds various pieces of information 
about the customer, such as gender, senior citizen status, partner status, dependents, phone service, streaming movies, multiple lines, and tenure.
*/
function MyComponent({ onCustomerInfoSubmit }) {
  const [customerInfo, setCustomerInfo] = useState({
    gender: "female",
    seniorcitizen: 0,
    partner: "yes",
    dependents: "no",
    phoneservice: "no",
    multiplelines: "no_phone_service",
    internetservice: "dsl",
    onlinesecurity: "no",
    onlinebackup: "yes",
    deviceprotection: "no",
    techsupport: "no",
    streamingtv: "no",
    streamingmovies: "no",
    contract: "month-to-month",
    paperlessbilling: "yes",
    paymentmethod: "electronic_check",
    tenure: 1,
    monthlycharges: 29.85,
    totalcharges: 24 * 29.85,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ prediction: null, error: null });

  /*
  Handling Input Changes:
  The handleInputChange function is responsible for updating the customerInfo state whenever there is a change in the input fields. 
  It uses the spread operator (...) to create a copy of the existing customerInfo state and updates the specific field based on the 
  name attribute of the input field
  */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  /*
  Form Submission:
The form has an onSubmit event handler (handleSubmit function) that prevents the default form submission behavior (e.preventDefault();). 
Instead, it invokes the onCustomerInfoSubmit prop, passing the customerInfo state as an argument.

The onCustomerInfoSubmit prop is expected to be a function passed from the parent component (where MyComponent is used), 
which will handle the submission of the customer information.
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending request to server..."); // Log a message before sending the request
      const response = await fetch("http://3.142.164.197:9696/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerInfo),
      });

      if (response.ok) {
        console.log("Received response from server:", response); // Log the response object if request is successful

        const result = await response.json();
        console.log("Received response from server:", result);
        if (result.churn_probability) {
          setResult({ prediction: result.churn_probability, error: null });
        } else {
          setResult({ prediction: null, error: "Empty prediction received" });
        }
      } else {
        setResult({
          prediction: null,
          error: "Error submitting customer info",
        });
      }
    } catch (error) {
      setResult({ prediction: null, error: "non server error" });
      console.error("non server error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="horizontal-container">
          <div className="form-container-subgroup">
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={customerInfo.gender}
                onChange={handleInputChange}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div className="form-group">
              <label>Senior Citizen</label>
              <select
                name="seniorcitizen"
                value={customerInfo.seniorcitizen}
                onChange={handleInputChange}
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Partner</label>
              <select
                name="partner"
                value={customerInfo.partner}
                onChange={handleInputChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Dependents</label>
              <select
                name="dependents"
                value={customerInfo.dependents}
                onChange={handleInputChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          <div className="form-container-subgroup">
            <div className="form-group">
              <label>Phone Service</label>
              <select
                name="phoneservice"
                value={customerInfo.phoneservice}
                onChange={handleInputChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Streaming Movies</label>
              <select
                name="streamingmovies"
                value={customerInfo.streamingmovies}
                onChange={handleInputChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Multiple Lines</label>
              <select
                name="multiplelines"
                value={customerInfo.multiplelines}
                onChange={handleInputChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tenure (months)</label>
              <input
                type="number"
                name="tenure"
                value={customerInfo.tenure}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
        </div>
        <div className="horizontal-container">
          <div className="result-container">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div className="result-container text-container">
            {result.prediction !== null && (
              <p>Churn Probability: {(result.prediction * 100).toFixed(2)}%</p>
            )}
            {result.error && <p className="error">{result.error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default MyComponent;

/*
the customer information is saved in the customerInfo state and submitted to the parent component via the onCustomerInfoSubmit 
prop when the form is submitted. The final handling and processing of the submitted information would occur in the parent 
component or wherever the MyComponent is used.
*/
