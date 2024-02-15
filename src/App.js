// App.js
import React from "react";
import MyComponent from "./MyComponent";
import "./App.css"; // Import the main stylesheet
import ProjectInfo from "./ProjectInfo";

function App() {
  return (
    <div className="app">
      <div className="left-half">
        <ProjectInfo />
      </div>
      <div className="right-half">
        <div className="info-container">
          <div id="container">
            <h1>Welcome to Customer Churn Prediction!</h1>
            <p>
              Discover the likelihood of customer churn with our real time live
              modeling tool. To get started, simply fill out the form on the
              right. Your inputs will help us provide personalized insights into
              potential churn.
            </p>

            <p>
              <strong>Instructions:</strong>
            </p>
            <ol>
              <li>
                Complete the fields on the right with accurate customer
                information.
              </li>
              <li>
                Click "Submit" to receive your personalized churn prediction.
              </li>
            </ol>

            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>Gain quick insights into potential customer churn.</li>
              <li>
                Make informed decisions to enhance customer retention
                strategies.
              </li>
            </ul>

            <p>
              Your data is secure, and our predictive analysis is designed to
              provide valuable insights for your business.
            </p>
          </div>
        </div>
        <MyComponent />
      </div>
      <div className="footer">
        <strong>&copy; 2024 Akshit Miglani </strong>(akshit.miglani09@gmail.com)
      </div>
    </div>
  );
}

export default App;
