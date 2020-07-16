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


LinkList = driver.find_element_by_xpath("//span[contains(.,'LinkList')]")
LinkList.click()
print("Selected LinkList default")
time.sleep(2)

full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
full_screen.click()
print("Opened in new tab")
time.sleep(3)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Link = driver.find_element_by_xpath("//li[@class='bx--link-list__list__CTA bx--link-list__list--local']")
        Link.click()
        print("Clicked on link")
        time.sleep(3)

        driver.execute_script("window.history.go(-1)")
        time.sleep(3)

        Video_Link = driver.find_element_by_xpath("//p[contains(text(),'Folgers Coffee (1:00)')]")
        Video_Link.click()
        time.sleep(8)
        driver.execute_script("window.history.go(-1)")
        time.sleep(2)
        driver.close()
        break

driver.switch_to.window(parenthandle)
time.sleep(3)

LinkList_Horizontal = driver.find_element_by_xpath("//div[@id='components-linklist--horizontal']//span[contains(text(),'Horizontal')]")
LinkList_Horizontal.click()
print("Selected LinkList Horizontal")
time.sleep(1)

full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
full_screen.click()
time.sleep(3)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Diff = driver.find_element_by_css_selector("li.bx--link-list__list__CTA:nth-child(1)").value_of_css_property("padding-right")
        print("Spacing between two links is :" + Diff)

        driver.close()
        break

driver.switch_to.window(parenthandle)
time.sleep(3)

LinkList_Vertical = driver.find_element_by_xpath(
    "//div[@id='components-linklist--vertical']//span[contains(text(),'Vertical')]")
LinkList_Vertical.click()
print("Selected LinkList Vertical")
time.sleep(1)

full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
full_screen.click()
time.sleep(3)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Diff1 = driver.find_element_by_css_selector("li.bx--link-list__list__CTA:nth-child(1)").value_of_css_property("padding-bottom")
        print("Difference between two links in vertical is : " + Diff1)

        #Heading = driver.find_element_by_xpath("//h4[@class='bx--link-list__heading']")
        #print("Heading of Linklist is : " + Heading.text)

        #Heading = driver.find_element_by_css_selector(".bx--link-list__heading")
        #print("Heading of list is : " + Heading.text)

        driver.close()
        break

driver.switch_to.window(parenthandle)
time.sleep(3)

LinkList_VerticalWithCards = driver.find_element_by_xpath("//span[contains(text(),'Vertical With Cards')]")
LinkList_VerticalWithCards.click()
print("Selected Linklist vertical with cards")
time.sleep(2)

full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
full_screen.click()
time.sleep(2)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Difference = driver.find_element_by_css_selector("div.bx--link-list:nth-child(1)").value_of_css_property('padding-bottom')
        print("Spacing at difference between you sections is : " + Difference)

        print("Set window to medium size 672px")
        driver.set_window_size(688,440)
        time.sleep(3)

        Diff2 = driver.find_element_by_css_selector("div.bx--link-list:nth-child(1)").value_of_css_property('padding-bottom')
        print("Spacing at difference between you sections is : " + Diff2)

driver.quit()




