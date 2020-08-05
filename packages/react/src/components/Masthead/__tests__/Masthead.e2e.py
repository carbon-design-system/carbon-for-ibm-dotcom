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

parenthandle = driver.current_window_handle
Masthead = driver.find_element_by_xpath("//span[contains(.,'Masthead')]")
Masthead.click()
print("Clicked on Masthead component")
time.sleep(2)

#Masthead_Default = driver.find_element_by_xpath("//span[contains(.,'Default')]")
#Masthead_Default.click()
#print("Clicked on Masthead default component ")
#time.sleep(2)

full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
full_screen.click()
print("Masthead component opened in new tab")
time.sleep(4)

handles = driver.window_handles
for handle in handles:

    if handle not in parenthandle:
        driver.switch_to.window(handle)


        try:
            Masthead_Logo = driver.find_element_by_xpath("//a[@data-autoid='dds--masthead-logo__link']")
            if Masthead_Logo.is_displayed():
                print("IBM Logo is present")


        except NoSuchElementException:
            print(" ")

        try:
            Search_Icon = driver.find_element_by_css_selector(".bx--header__search--search")
            if Search_Icon.is_displayed():
                print("Search Icon is present")
                #Search_Icon.click()
                time.sleep(3)

        except NoSuchElementException:
            print("No such element found on page")

        try:
            Profile_Icon = driver.find_element_by_xpath("//*[@data-autoid='dds--masthead__profile']")
            if Profile_Icon.is_displayed():
                print("Profile icon is present")

        except NoSuchElementException:
            print("No such element is present")


        Masthead_Logo = driver.find_element_by_xpath("//a[@data-autoid='dds--masthead-logo__link']")
        Masthead_Logo.click()
        print("Clicked on Mathead IBM logo")
        time.sleep(4)
        if "IBM - India" ==driver.title:
            print("Page title is :" + driver.title)
        time.sleep(2)

        driver.execute_script("window.history.go(-1)")
        time.sleep(8)

        ProfileIcon1 = driver.find_element_by_xpath("//button[@class='bx--header__action bx--overflow-menu']").click()
        print("CLicked on user profile icon")
        time.sleep(3)

        ProfileIcon = driver.find_element_by_css_selector("li.bx--overflow-menu-options__option:nth-child(1)").value_of_css_property("height")
        print("User profile dropdown menu height in pixel is :" + ProfileIcon)

        Navigation = driver.find_element_by_xpath("//a[contains(text(),'Products')]")
        Navigation.click()
        time.sleep(2)

        Navigation_Item = driver.find_element_by_css_selector("li.bx--header__submenu:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)").value_of_css_property("height")
        print("Navigation item height in pixel is :" + Navigation_Item)

        Click_NavigationLink = driver.find_element_by_xpath("//div[contains(@class,'bx--header__search')]//li[1]//ul[1]//li[4]//a[1]")
        Click_NavigationLink.click()
        time.sleep(5)

        driver.execute_script("window.history.go(-1)")
        time.sleep(8)

        print("With browser window set to 672px")
        driver.set_window_size(682,450)
        time.sleep(2)

        Hamburger_Icon = driver.find_element_by_css_selector(".bx--header__menu-trigger")
        Hamburger_Icon.click()
        print("Clicked on hamburger menu icon")
        time.sleep(2)

        Click_NavgLink = driver.find_element_by_xpath("//span[contains(text(),'Developers')]")
        Click_NavgLink.click()
        time.sleep(1)

        Click_Back = driver.find_element_by_css_selector("li.bx--side-nav__item:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)")
        Click_Back.click()
        time.sleep(5)

        Click_CloseIcon = driver.find_element_by_css_selector(".bx--header__menu-trigger")
        Click_CloseIcon.click()
        time.sleep(1)

        Search_Icon = driver.find_element_by_css_selector(".bx--header__search--search")
        Search_Icon.click()
        print("Search icon clicked")
        time.sleep(3)

        Search_Keyword = driver.find_element_by_xpath("//input[@name='q']")
        Search_Keyword.send_keys("IBM")
        Search_Keyword.submit()
        print("Search keyword is entered")
        time.sleep(5)
        print("Search Page Title is :" + driver.title)

driver.quit()
