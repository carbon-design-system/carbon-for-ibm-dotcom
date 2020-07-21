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

CalloutQuote= driver.find_element_by_xpath("//span[contains(text(),'CalloutQuote')]")
CalloutQuote.click()
print("Clicked on CallOutQoute Pattern")

# Click_Default = driver.find_element_by_xpath("//span[contains(text(),'Default')]")
#Click_Default.click()
#print("Clicked on default calloutquote")
time.sleep(2)

QuoteCopy_Field = driver.find_element_by_xpath("//textarea[@id='Quote (copy): ']")
QuoteCopy_Field.clear()
copy = os.environ.get('SELENIUM_QUOTE_COPY') or ""
QuoteCopy_Field.send_keys(copy)
print("Entered text in QuoteCopy filed")
time.sleep(3)

Full_screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
Full_screen.click()
print("Pattern opened in new tab")
time.sleep(3)

handles = driver.window_handles
for handle in handles:
    if handle not in parenthandle:
        driver.switch_to.window(handle)

        Quote_CopyText = driver.find_element_by_css_selector(".bx--callout__content").value_of_css_property("padding-top")
        print("Pixel diff between top of page and copy text :" + Quote_CopyText)

        Quote_SourceHeading = driver.find_element_by_css_selector(".bx--quote__copy").value_of_css_property("padding-bottom")
        print("Pixel diff between copy text and source heading :" + Quote_SourceHeading)

        CalloutQuote_BottomPage = driver.find_element_by_css_selector(".bx--callout__content").value_of_css_property("padding-bottom")
        print("Pixel value at bottom of page is :" + CalloutQuote_BottomPage)

        Click_Link = driver.find_element_by_xpath("//a[@class='bx--link bx--link-with-icon']")
        Click_Link.click()
        print("Clicked on link")
        time.sleep(3)
        driver.execute_script("window.history.go(-1)")
        time.sleep(3)

        print("Setting browser window to 320px")

        driver.set_window_size(320,315)
        time.sleep(5)
        Quote_CopyText1 = driver.find_element_by_css_selector(".bx--callout__content").value_of_css_property(
            "padding-top")
        print("Pixel diff between top of page and copy text :" + Quote_CopyText1)

        Quote_SourceHeading1 = driver.find_element_by_css_selector(".bx--quote__copy").value_of_css_property(
            "padding-bottom")
        print("Pixel diff between copy text and source heading :" + Quote_SourceHeading1)

        CalloutQuote_BottomPage1 = driver.find_element_by_css_selector(".bx--callout__content").value_of_css_property(
            "padding-bottom")
        print("Pixel value at bottom of page is :" + CalloutQuote_BottomPage1)

        print("Setting browser window to 1056px")

        driver.set_window_size(1058, 515)
        time.sleep(5)

        Quote_CopyText1 = driver.find_element_by_css_selector(".bx--callout__content").value_of_css_property(
            "padding-top")
        print("Pixel diff between top of page and copy text :" + Quote_CopyText1)

        Quote_SourceHeading1 = driver.find_element_by_css_selector(".bx--quote__copy").value_of_css_property(
            "padding-bottom")
        print("Pixel diff between copy text and source heading :" + Quote_SourceHeading1)

        CalloutQuote_BottomPage1 = driver.find_element_by_css_selector(
            ".bx--callout__content").value_of_css_property(
            "padding-bottom")
        print("Pixel value at bottom of page is :" + CalloutQuote_BottomPage1)

driver.quit()
