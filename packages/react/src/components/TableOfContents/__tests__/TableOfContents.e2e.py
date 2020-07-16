from selenium import webdriver
from dotenv import load_dotenv
load_dotenv()
import unittest
import time
import os
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import Select


# Setup Driver
url = os.environ.get('SELENIUM_URL') or "https://ibmdotcom-react-canary.mybluemix.net/"
driver = webdriver.Chrome()
driver.maximize_window()
driver.refresh()
driver.get(url)
element = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.XPATH,'//span[contains(text(),"Table of Contents")]')))


parenthandle = driver.current_window_handle

element = driver.find_element_by_xpath("//span[contains(text(),'Table of Contents')]")
driver.execute_script("arguments[0].scrollIntoView();", element)
time.sleep(3)

Table_of_Content = driver.find_element_by_xpath("//span[contains(text(),'Table of Contents')]")
Table_of_Content.click()
time.sleep(2)


#Theme = driver.find_element_by_xpath("//select[@name='theme']/option[text()='g100']").click()
#time.sleep(2)

Full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
Full_screen.click()
time.sleep(3)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        CssValue = driver.find_element_by_css_selector(".bx--tableofcontents__desktop").value_of_css_property(
            'margin-top')

        CssValue1 = driver.find_element_by_css_selector(".bx--tableofcontents__desktop").value_of_css_property(
            'padding-top')

        Pixel = int(CssValue[0:2]) + int(CssValue1[0:2])
        print("Value in pixel before scroll:" + str(Pixel)+'px')

        Click_Title = driver.find_element_by_xpath("//a[contains(text(),'Integer non scelerisque')]")
        Click_Title.click()
        time.sleep(2)

        CssValue1 = driver.find_element_by_css_selector(".bx--tableofcontents__desktop").value_of_css_property(
            'padding-top')
        print("Pixel value after scroll:" + CssValue1)

        print("\nSetting browser window size to 672px\n")
        driver.set_window_size(674,450)
        time.sleep(2)

        Jump_to_Icon = driver.find_element_by_css_selector(".bx--tableofcontents__mobile__select__icon").value_of_css_property('width')
        print("Width of icon :" + Jump_to_Icon)

        Jump_to_Icon1 = driver.find_element_by_css_selector(".bx--tableofcontents__mobile__select__icon").value_of_css_property('height')
        print("Height of icon :" + Jump_to_Icon1)


        Select_Option = Select(driver.find_element_by_css_selector(".bx--tableofcontents__mobile__select"))
        Select_Option.select_by_value("8")
        time.sleep(2)

        Select_Option1 = Select(driver.find_element_by_css_selector(".bx--tableofcontents__mobile__select"))
        Select_Option1.select_by_value("14")
        time.sleep(2)

        driver.close()
        break

driver.switch_to.window(parenthandle)
time.sleep(3)
driver.set_window_size(1534,780)

TOC_Selection = driver.find_element_by_xpath("//span[contains(text(),'With Heading Content')]")
TOC_Selection.click()
print("Heading COntent selected ")
time.sleep(2)

Full_Screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
Full_Screen.click()
print("Opened in full screen view")
time.sleep(2)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Children_Element = driver.find_element_by_xpath("//div[@class='bx--tableofcontents__desktop__children']//div")
        if Children_Element.is_displayed():
            print("Children Element is present")
        else:
            print("No such element is present")

        Click_Title = driver.find_element_by_xpath("//a[contains(text(),'Integer non scelerisque')]")
        Click_Title.click()
        time.sleep(2)

        Click_Title1 = driver.find_element_by_xpath("//a[contains(text(),'Cras molestie condimentum')]")
        Click_Title1.click()
        time.sleep(2)

driver.quit()
