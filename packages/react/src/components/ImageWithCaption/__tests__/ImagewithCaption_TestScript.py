from openpyxl import load_workbook
from selenium import webdriver
import unittest
import time

class imagewithcaption(unittest.TestCase):

    def setUp(self):
        global driver
        filepath = "C:/Users/ChetanKanakeri/Desktop/liburl.xlsx"
        wb = load_workbook(filepath)
        sheet = wb.active
        a1 = sheet['A1']
        print("URL  --> ", a1.value)
        driver = webdriver.Chrome()
        driver.get(a1.value)
        driver.maximize_window()
        time.sleep(5)


    def test_imagewithcaption(self):
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

    def tearDown(self):
         driver.quit()
