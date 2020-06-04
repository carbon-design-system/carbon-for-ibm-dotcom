from selenium import webdriver
import time
import unittest


class FeatureCard(unittest.TestCase):
    def test_featureCard(self):
        # Opening browser
        driver = webdriver.Chrome('C:\Sel_chrome\chromedriver.exe')
        driver.maximize_window()
        driver.refresh()
        driver.get("https://ibmdotcom-react-staging.mybluemix.net/")
        time.sleep(11)
        # Selecting Feature Card
        FeatureCard_Select = driver.find_element_by_id("patterns-blocks-featurecardblockmedium")
        driver.execute_script("arguments[0].scrollIntoView();", FeatureCard_Select)
        FeatureCard_Select.click()
        print("Feature card selected")
        time.sleep(4)
        driver.switch_to_frame("storybook-preview-iframe")
        time.sleep(2)
        # Pixel values between sections
        featureCard_topSpacing = driver.find_element_by_css_selector(".bx--content-group").value_of_css_property("margin-top")
        print("Pixel value at top is :" + featureCard_topSpacing)
        featureCard_bottomSpacing = driver.find_element_by_css_selector(".bx--content-group").value_of_css_property("margin-bottom")
        print("Pixel value at top is :" + featureCard_bottomSpacing)
        heading_FC_spacing = driver.find_element_by_css_selector(".bx--content-group__title").value_of_css_property("margin-bottom")
        print("Pixel value between heading & FC is :" + heading_FC_spacing)
        time.sleep(4)
        driver.switch_to_default_content()
        driver.find_element_by_xpath("//button[contains(.,'Knobs')]").click()
        CardHeading_Update = driver.find_element_by_xpath("//textarea[@id='Card Heading:']")
        CardHeading_Update.clear()
        CardHeading_Update.send_keys("Explore AI use cases in all industries Curabitur malesuada varius mi eu posuere")
        time.sleep(2)
        driver.switch_to_default_content()
        Go_Full_Screen = driver.find_element_by_xpath("//*[contains(@title, 'Go full screen')]")
        Go_Full_Screen.click()
        driver.switch_to_frame("storybook-preview-iframe")
        time.sleep(2)
        Updated_Heading = driver.find_element_by_xpath("//h3[@class='bx--card__heading']")
        print ("Updated card heading is " + Updated_Heading.text)
        time.sleep(2)
        Card_click = driver.find_element_by_xpath("//div[@class='bx--card__wrapper']")
        Card_click.click()
        print("clicked on FC")
        time.sleep(2)
        driver.quit()
