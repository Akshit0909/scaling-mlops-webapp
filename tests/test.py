import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class WebAppTestCase(unittest.TestCase):

    def setUp(self):
        # Initialize Selenium WebDriver
        self.driver = webdriver.Chrome()

    def tearDown(self):
        # Quit Selenium WebDriver after each test
        self.driver.quit()

    def test_home_page_loads(self):
        # Open the home page
        self.driver.get("http://localhost:3000/")
        # Verify that the page title is correct
        self.assertIn("Churn Prediction Web App", self.driver.title)

    def test_prediction_form(self):
        # Open the home page
        self.driver.get("http://localhost:3000/")
        # Find the input fields for the prediction form
        gender_input = self.driver.find_element_by_name("gender")
        seniorcitizen_input = self.driver.find_element_by_name("seniorcitizen")
        partner_input = self.driver.find_element_by_name("partner")
        dependents_input = self.driver.find_element_by_name("dependents")
        # Fill out the form
        gender_input.send_keys("female")
        seniorcitizen_input.send_keys("0")
        partner_input.send_keys("yes")
        dependents_input.send_keys("no")
        # Submit the form
        dependents_input.send_keys(Keys.RETURN)
        # Wait for the page to reload
        self.driver.implicitly_wait(3)
        # Verify that the prediction result is displayed
        result_element = self.driver.find_element_by_id("prediction-result")
        self.assertIn("Churn Prediction Result:", result_element.text)

if __name__ == '__main__':
    unittest.main()
