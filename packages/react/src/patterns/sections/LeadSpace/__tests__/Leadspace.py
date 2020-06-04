from compiler.ast import Assert

from selenium import webdriver
import time
import unittest
from selenium.webdriver.support.select import Select


class leadspace(unittest.TestCase):
    def test_leadspace(self):
        driver = webdriver.Chrome('C:\\Users\\PraveenS\\PycharmProjects\\ibm'
                                  '-dotcom-library\packages\\react\\src\\patterns\\sections\\LeadSpace\\__tests__\\chromedriver.exe')
        driver.maximize_window()
        driver.refresh()
        driver.get("https://ibmdotcom-react-staging.mybluemix.net/")
        time.sleep(15)
        driver.find_element_by_xpath("//span[contains(.,'LeadSpace')]").click()
        driver.find_element_by_xpath("//span[contains(.,'Default with image')]").click()
        print("Leadspace opened")
        time.sleep(12)
        parenthandle = driver.current_window_handle
        Copy_Update = driver.find_element_by_xpath("//textarea[@id='copy']")
        Copy_Update.clear()
        Copy_Update.send_keys("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:")
        time.sleep(4)
        title_Update = driver.find_element_by_xpath("//textarea[@id='title']")
        title_Update.clear()
        title_Update.send_keys("Lead space title-Lorem ipsum dolor sit amet.")
        time.sleep(2)
        No_of_buttons = driver.find_element_by_xpath("//input[@class='css-bz34lt']")
        No_of_buttons.clear()
        No_of_buttons.send_keys("4")
        time.sleep(2)
        driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]").click()
        print("new tab opened")
        time.sleep(10)
        handles = driver.window_handles
        for handle in handles:
            if handle not in parenthandle:
                driver.switch_to.window(handle)
                Leadspace_button = driver.find_element_by_css_selector(".bx--leadspace--g100 .bx--buttongroup-item").value_of_css_property("padding-right")
                print("Pixel padding value btw buttons :" + Leadspace_button)
                leadspace_buttonTop = driver.find_element_by_css_selector(".bx--leadspace--g100 .bx--buttongroup-item").value_of_css_property("margin-top")
                print("Pixel top buttons spacing value :" + leadspace_buttonTop)
                time.sleep(2)
                driver.find_element_by_xpath("//a[@data-autoid='dds--button-group-1']").click()
                time.sleep(4)
                driver.execute_script("window.history.go(-1)")
                time.sleep(4)
                driver.find_element_by_xpath("//a[@data-autoid='dds--button-group-3']").click()
                print ("bro back")
                driver.close()
                break
        driver.switch_to.window(parenthandle)
        time.sleep(4)
        Sel_type = Select(driver.find_element_by_name('type'))
        Sel_type.select_by_visible_text("centered")
        time.sleep(2)
        Sel_theme = Select(driver.find_element_by_name('theme'))
        Sel_theme.select_by_visible_text("white")
        time.sleep(2)
        driver.find_element_by_xpath("//*[contains(@title, 'Go full screen')]").click()
        print("Go full screen")
        time.sleep(5)
        driver.switch_to_frame("storybook-preview-iframe")
        button_click = driver.find_element_by_xpath("//a[@data-autoid='dds--button-group-0']")
        button_click.click()
        print ("Clicked on button 1")
        time.sleep(2)
