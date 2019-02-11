from selenium import webdriver
import pyperclip


browser = webdriver.Firefox(firefox_profile='/home/amiya/.mozilla/firefox/siae7aef.default', firefox_binary="/usr/bin/firefox", executable_path=r"geckodriver/geckodriver")
browser.get('http://localhost:8000')
assert 'Thesauri' in browser.title
pyperclip.copy("Thesauri")
while True:
    art = browser.find_element_by_id('article')
    art.send_keys(pyperclip.paste())
    data = input("Press any Key")
    art.clear()

    