import { Page, ElementHandle } from "puppeteer";
import { O365Base } from "./o365.base";
import { environmentConfiguration } from "../Configurations/environment.config";

let o365Base: O365Base = new O365Base();
let page: Page;

describe('Office 365', () => {
    beforeAll(async () => {
        page = await o365Base.buildPage();
    }, 16000);
    test("Should login", async () => {
        let value: string = await page.evaluate(() => {
            return document.querySelector("#O365_MeFlexPane_ButtonID").textContent;
        });
        expect(value).toContain("MOD Administrator");
    }, 30000);
    test("Page exists", async () => {
        await page.goto(`${environmentConfiguration.url}/Pages/Forms/AllItems.aspx`);
        let value: boolean = await page.evaluate(() => {
            let isExist: boolean = false;
            Array.from(document.querySelectorAll(".ms-listlink")).forEach((element: Element, index: number) => {
                if (element.getAttribute("href").indexOf("Default.aspx") != -1) {
                    isExist = true;
                }
            });
            return isExist;
        });
        expect(value).toBeTruthy();
    }, 30000);
});
