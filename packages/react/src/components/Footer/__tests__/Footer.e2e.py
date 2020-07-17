from selenium import webdriver
from dotenv import load_dotenv
load_dotenv()
import unittest
import time
import os
from selenium.common.exceptions import NoSuchElementException

# Setup Driver
url = os.environ.get('SELENIUM_URL') or "https://ibmdotcom-react-canary.mybluemix.net/"
driver = webdriver.Chrome()
driver.maximize_window()
driver.refresh()
driver.get(url)
time.sleep(3)

Footer = driver.find_element_by_xpath("//span[contains(text(),'Footer')]")
Footer.click()
time.sleep(2)


Click_FullScreen = driver.find_element_by_xpath("//*[contains(@title, 'Go full screen')]").click()
time.sleep(2)

driver.switch_to.frame("storybook-preview-iframe")
time.sleep(2)

try:
    Footer_Logo = driver.find_element_by_css_selector(".bx--footer-logo__link")
    if Footer_Logo.is_displayed():
        print("IBM logo is present in footer section")

except NoSuchElementException:
    print("IBM logo in footer is missing")

try:
    Locale_Selector = driver.find_element_by_xpath("//button[@aria-label='Select region']")
    if Locale_Selector.is_displayed():
        print("Locale selector element is present")
except NoSuchElementException:
    print("Locale selector is missing in footer section")

try:
    Footer_Nav_Links = driver.find_element_by_css_selector(".bx--footer-nav")
    if Footer_Nav_Links.is_displayed():
        print("Navigation links in footer section are present" + Footer_Nav_Links.text )
        time.sleep(3)
except NoSuchElementException:
    print("No Navigation links are present.")

time.sleep(3)

Click_Locale_Selector = driver.find_element_by_xpath("//button[@aria-label='Select region']")
Click_Locale_Selector.click()
print("Clicked on select region")
time.sleep(2)

Select_Region = driver.find_element_by_xpath("//div[@class='bx--card__wrapper'][contains(.,'Americas')]")
Select_Region.click()
time.sleep(2)

Back_To_Select_Region = driver.find_element_by_css_selector(".bx--modal-header__label")
Back_To_Select_Region.click()
time.sleep(2)

Click_CloseButton = driver.find_element_by_xpath("//button[@class='bx--modal-close']")
Click_CloseButton.click()
time.sleep(2)

Click_IBM_Logo = driver.find_element_by_css_selector(".bx--footer-logo__link")
Click_IBM_Logo.click()
print("Clicked on IBM logo in footer")
time.sleep(5)

#driver.execute_script("window.history.go(-1)")
#time.sleep(8)

driver.quit()

















