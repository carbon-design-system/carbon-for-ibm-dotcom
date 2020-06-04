from selenium import webdriver
import time
import unittest



class FeatureCard(unittest.TestCase):
    def test_featureCard(self):
        driver = webdriver.Chrome('C:\Sel_chrome\chromedriver.exe')
        driver.maximize_window()
        driver.refresh()
        driver.get("https://ibmdotcom-react-staging.mybluemix.net/")
        time.sleep(11)
        element = driver.find_element_by_id("patterns-blocks-featurecardblockmedium")
        driver.execute_script("arguments[0].scrollIntoView();", element)
        element.click()
        print("Feature card selected")
        time.sleep(4)
        #driver.find_element_by_xpath("//div[@id='patterns-blocks-featurecard--default']").click()
        #print("feature card clicked")
        #time.sleep(4)
        driver.find_element_by_xpath("//*[contains(@title, 'Go full screen')]").click()
        print("full screen")
        driver.switch_to_frame("storybook-preview-iframe")
        time.sleep(2)
        featureCard_topSpacing = driver.find_element_by_css_selector(".bx--content-group").value_of_css_property("margin-top")
        print("Pixel value at top is :" + featureCard_topSpacing)
        featureCard_bottomSpacing = driver.find_element_by_css_selector(".bx--content-group").value_of_css_property("margin-bottom")
        print("Pixel value at top is :" + featureCard_bottomSpacing)
        heading_FC_spacing = driver.find_element_by_css_selector(".bx--content-group__title").value_of_css_property("margin-bottom")
        print("Pixel value between heading & FC is :" + heading_FC_spacing)
        time.sleep(2)
        #driver.find_element_by_xpath("//div[@data-autoid='dds--content-group__children']").click()
        driver.find_element_by_xpath("//div[@class='bx--card__wrapper']").click()
        print("clicked on FC")
        time.sleep(2)

