from selenium import webdriver
from dotenv import load_dotenv
load_dotenv()
import unittest
import time
import os

# Setup Driver
url = os.environ.get('SELENIUM_URL') or "https://ibmdotcom-react-canary.mybluemix.net/"
driver = webdriver.Chrome()
driver.maximize_window()
driver.refresh()
driver.get(url)
time.sleep(3)

parenthandle = driver.current_window_handle

Locale_Modal = driver.find_element_by_xpath("//span[contains(text(),'Locale Modal')]")
Locale_Modal.click()

#Default_Locale_Modal = driver.find_element_by_xpath("//span[contains(text(),'Default')]")
#Default_Locale_Modal.click()

Full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
Full_screen.click()
time.sleep(5)

#driver.switch_to.frame("storybook-preview-iframe")
#time.sleep(2)
handles = driver.window_handles
for handle in handles:

    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Click_Region = driver.find_element_by_xpath("//h3[contains(text(),'Americas')]")
        Click_Region.click()
        time.sleep(2)

        Selected_Region = driver.find_element_by_xpath("//p[@class='bx--modal-header__heading bx--type-beta']")
        print("\n Selected region is :" + Selected_Region.text)

        Enter_Region = driver.find_element_by_xpath("//input[@id='bx--locale-modal__filter']")
        Enter_Region.send_keys("Canada")

        Select_Country = driver.find_element_by_xpath("//a[@class='bx--locale-modal__locales']//div[@class='bx--locale-modal__locales__name']"
                                                  "[contains(text(),'French')]")
        Select_Country.click()
        time.sleep(5)

        Page_Title = driver.title
        print(" Page ttitle is :" +Page_Title)

        driver.execute_script("window.history.go(-1)")
        time.sleep(5)

driver.quit()
