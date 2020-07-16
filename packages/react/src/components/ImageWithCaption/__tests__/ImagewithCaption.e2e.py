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
time.sleep(5)

parenthandle = driver.current_window_handle

Click_ImagewithCaption = driver.find_element_by_xpath("//span[contains(text(),'ImageWithCaption')]")
Click_ImagewithCaption.click()
print("Clicked on ImagewithCaption in component section")
time.sleep(2)

Click_Full_Screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
Click_Full_Screen.click()
print("Opened in new tab")
time.sleep(2)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Click_Image = driver.find_element_by_xpath("//div[@class='bx--image-with-caption']")
        Click_Image.click()
        print("Clicked on image")
        time.sleep(3)

        Click_CloseIcon = driver.find_element_by_xpath("//button[@class='bx--modal-close']")
        Click_CloseIcon.click()
        time.sleep(2)


driver.quit()
