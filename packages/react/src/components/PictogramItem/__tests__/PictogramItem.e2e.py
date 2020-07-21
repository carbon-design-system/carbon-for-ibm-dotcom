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
element = driver.find_element_by_xpath("//span[contains(.,'PictogramItem')]")

driver.execute_script("arguments[0].scrollIntoView();", element)
time.sleep(3)

Pictogram_Item = driver.find_element_by_xpath("//span[contains(.,'PictogramItem')]")
Pictogram_Item.click()
time.sleep(2)

#Select_Default = driver.find_element_by_xpath(
    #"//div[@id='patterns-sub-patterns-pictogramitem--default']//span[contains(text(),'Default')]")
#Select_Default.click()
#time.sleep(2)

full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
full_screen.click()
time.sleep(2)

#driver.switch_to.frame("storybook-preview-iframe")
#time.sleep(3)
handles = driver.window_handles
for handle in handles:

    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Pictogram_Top_Spacing = driver.find_element_by_css_selector(
            ".bx--pictogram-item__pictogram").value_of_css_property('margin-top')
        print( "\nPixel value at top is :" + Pictogram_Top_Spacing)

        Pictogram_Item_Height = driver.find_element_by_css_selector(
            ".bx--pictogram-item__pictogram").value_of_css_property('height')
        print("\nHeight of item in pixel is : " + Pictogram_Item_Height)

        Pictogram_Item_Width = driver.find_element_by_css_selector(
            ".bx--pictogram-item__pictogram").value_of_css_property('width')
        print("\nWidth of item in pixel is :" + Pictogram_Item_Width)


        print("\n******* Setting browser size to 1056 ***********")

        driver.set_window_size(1056,450)
        time.sleep(2)
        Pictogram_Top_Spacing = driver.find_element_by_css_selector(
            ".bx--pictogram-item__pictogram").value_of_css_property('margin-top')
        print("\nPixel value at top is :" + Pictogram_Top_Spacing)


        Click_Link = driver.find_element_by_xpath("//*[@data-autoid='dds--link-with-icon']")
        Click_Link.click()
        print("\nClicked on link")
        time.sleep(3)

        driver.execute_script("window.history.go(-1)")
        time.sleep(3)

driver.quit()







