from openpyxl import load_workbook
from selenium import webdriver
import unittest
import time


class leadspaceblock(unittest.TestCase):

    def setUp(self):
        global driver
        filepath = "URL_List\liburl.xlsx"
        wb = load_workbook(filepath)
        sheet = wb.active
        a1 = sheet['A1']
        print("URL  --> ", a1.value)
        driver = webdriver.Chrome()
        driver.get(a1.value)
        driver.maximize_window()
        time.sleep(3)

    def test_leadspcaeblock(self):
        parenthandle = driver.current_window_handle

        Click_LeadspaceBlock = driver.find_element_by_xpath("//span[contains(text(),'LeadSpaceBlock')]")
        Click_LeadspaceBlock.click()
        print("Selected Leadspace Block patter")
        time.sleep(2)

        Heading = driver.find_element_by_xpath("//textarea[@id='Heading (required)_LeadSpaceBlock']")
        Heading.clear()
        Heading.send_keys("Innovate like a startup and scale for the enterprise  Innovate like a startup and scale for the enterprise ")
        print("Text is entered in heading field")
        time.sleep(2)

        Click_Full_Screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
        Click_Full_Screen.click()
        print("Pattern opened in new tab")
        time.sleep(2)

        handles = driver.window_handles
        for handle in handles:
            if handle not in parenthandle:
                driver.switch_to.window(handle)

                image = driver.find_element_by_xpath("//img[@class='bx--image__img']")
                if image.is_displayed():
                    print("Image is present")
                else:
                    print("Image is not present")

                Spacing = driver.find_element_by_xpath("//h2[@class='bx--content-block__heading']").value_of_css_property('margin-bottom')
                print("Spacing between heading and copy text :" + Spacing)

                Spacing2 = driver.find_element_by_xpath("//div[@class='bx--link-list']").value_of_css_property('padding-top')
                print("Spacing between image and linklist is :" + Spacing2)

                Spacing3 = driver.find_element_by_xpath("//div[@class='bx--link-list']").value_of_css_property('padding-bottom')
                print("Spacing between linklist and CTA copy button :" + Spacing3)

                Click_LinkList = driver.find_element_by_xpath("//li[1]//div[1]//div[1]")
                Click_LinkList.click()
                print("Clicked on linklist link")
                time.sleep(3)
                driver.execute_script("window.history.go(-1)")
                time.sleep(3)

                Click_CTA_Button = driver.find_element_by_xpath("//a[@class='bx--btn bx--btn--primary']")
                Click_CTA_Button.click()
                print("Clicked on cta copy button")
                time.sleep(3)

                driver.execute_script("window.history.go(-1)")
                time.sleep(3)
                driver.close()
                break
        driver.switch_to.window(parenthandle)
        time.sleep(3)

        Media_Type = driver.find_element_by_xpath("//select[@name='mediaType (optional)_LeadSpaceBlock']/option[text()='video']")
        Media_Type.click()
        print("Selected video as media type")
        time.sleep(3)

        Click_Full_Screen = driver.find_element_by_xpath("//*[contains(@title, 'Open canvas in new tab')]")
        Click_Full_Screen.click()
        print("Pattern opened in new tab")
        time.sleep(2)

        handles = driver.window_handles
        for handle in handles:
            if handle not in parenthandle:
                driver.switch_to.window(handle)

                Video = driver.find_element_by_xpath("//div[@id='bx--video-player__video-0_uka1msg4']")
                if Video.is_displayed():
                    print(" Video is present")
                else:
                    print("Video is not visible")

                Spacing = driver.find_element_by_xpath(
                    "//h2[@class='bx--content-block__heading']").value_of_css_property('margin-bottom')
                print("Spacing between heading and copy text :" + Spacing)

                Spacing2 = driver.find_element_by_xpath("//div[@class='bx--link-list']").value_of_css_property(
                    'padding-top')
                print("Spacing between video and linklist is :" + Spacing2)

                Spacing3 = driver.find_element_by_xpath("//div[@class='bx--link-list']").value_of_css_property(
                    'padding-bottom')
                print("Spacing between linklist and CTA copy button :" + Spacing3)

                Click_LinkList = driver.find_element_by_xpath("//li[1]//div[1]//div[1]")
                Click_LinkList.click()
                print("Clicked on linklist link")
                time.sleep(3)
                driver.execute_script("window.history.go(-1)")
                time.sleep(3)

                Click_CTA_Button = driver.find_element_by_xpath("//a[@class='bx--btn bx--btn--primary']")
                Click_CTA_Button.click()
                print("Clicked on cta copy button")
                time.sleep(3)

                driver.execute_script("window.history.go(-1)")
                time.sleep(3)


    def tearDown(self):
        driver.quit()
