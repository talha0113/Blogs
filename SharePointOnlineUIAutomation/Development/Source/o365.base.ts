import { Browser, launch, Page, ElementHandle } from "puppeteer";
import { environmentConfiguration } from "../Configurations/environment.config";

export class O365Base {
    private readonly width: number = 1920;
    private readonly height: number = 1080;

    public async buildPage(): Promise<Page> {
        let page: Page = await <Page>(((<any>global).__BROWSER__).newPage());
        await page.goto(environmentConfiguration.url);
        await page.waitForSelector("input[name=loginfmt]");
        await page.type("input[name=loginfmt]", environmentConfiguration.userName, { delay: 20 });
        await page.keyboard.press("Enter");
        await page.waitForSelector("#idBtn_Back");
        await (new Promise(resolve => setTimeout(resolve, 1000)));
        await page.type("input[name=passwd]", environmentConfiguration.password, { delay: 40 });
        await page.focus("#idSIButton9");
        await page.keyboard.press("Enter");
        await page.waitForSelector("#KmsiCheckboxField");
        await page.click("#idBtn_Back");
        await page.waitForNavigation({ timeout: 30000, waitUntil: "domcontentloaded" });
        await page.waitForSelector("#O365_MeFlexPane_ButtonID");

        return page;
    }
}