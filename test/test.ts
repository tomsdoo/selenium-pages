import { WebDriver } from "selenium-webdriver";
import { describe, it, before, after } from "mocha";
import { Selen } from "../src/selen/";
import { strict as assert } from "assert";

/*
Install chromedriver and define PATH to chromedriver before testing
*/

let driver: WebDriver;

const pageOptions: Selen.Options = {
  origin: "https://www.google.com",
  homePath: "/"
};

describe("testing", () => {
  before(async () => {
    driver = await Selen.build("chrome");
  });

  after(async () => {
    await driver.quit();
  });

  it("getCurrentUrl()", async () => {
    const page = new Selen.Pages.Any(
      driver,
      pageOptions
    );

    await page.goHome();

    assert.equal(
      await page.getCurrentUrl(),
      "https://www.google.com/"
    );
  });

  it("goHome()", async () => {
    const page = new Selen.Pages.Any(
      driver,
      pageOptions
    );

    await page.goHome();

    assert.equal(
      await page.getTitle(),
      "Google"
    );
  });

  it("goTo()", async () => {
    const page = new Selen.Pages.Any(
      driver,
      pageOptions
    );

    await page.goTo();

    assert.equal(
      await page.getTitle(),
      "Google"
    );
  });

  it("ad hoc page class", async () => {
    class Test extends Selen.Pages.Base {
      async workSome(){
        await this.executeScript(`
          const div = document.body.appendChild(document.createElement('div'));
          div.style.position = 'fixed';
          div.style.background = 'rgba(255,100,100,0.3)';
          div.style.top = 0;
          div.style.left = 0;
          div.style.width = '100vw';
          div.style.height = '100vh';
        `);
      }
    }

    const testPage = new Test(
      driver,
      pageOptions
    );
    await testPage.workSome();
  });

  it("querySelector()", async () => {
    const page = new Selen.Pages.Any(
      driver,
      pageOptions
    );
    await page.goTo("/search?q=test");
    const body = await page
      .querySelector("body");
    const titles = await body
      .querySelectorAll("div.g h3")
      .then(
        eles => Promise.all(
          eles.map(
            ele => ele.getText()
          )
        )
      );

    assert(
      titles.every(title => typeof title === "string")
    );
  });

  it("styleDictionary", async () => {
    class Custom extends Selen.Pages.Base {
      initializeStyleDictionary(){
        this.styleDictionary.renew({
          body: "body",
          qbox: "input[name='q']",
          nextPageLink: "#pnnext"
        });
      }
      async searchSome(){
        await this.querySelector("body")
          .then(body => body.querySelector("qbox"))
          .then(box => box.sendKeys("test", this.Key.ENTER));
      }
    }

    class MyPages extends Selen.Pages {
      public static Custom = Custom;
    }

    const custom = new MyPages.Custom(
      driver,
      pageOptions
    );
    await custom.goHome();
    await custom.searchSome();

    assert(
      custom.getCurrentUrl()
        .then(url => url.match(/^https:\/\/www\.google\.com\/.*?q=test.*/i))
    );
  });

  it("customized options", async () => {
    type MyOptions = Selen.Options & {
      keyword: string;
    };

    class Custom extends Selen.Pages.Base<MyOptions> {
      public async test(){
        await this.goTo(`/search?q=${this.options.keyword}`);
      }
    }

    const custom = new Custom(
      driver,
      {
        ...pageOptions,
        keyword: "selenium"
      }
    );

    await custom.test();

    assert(
      await custom.getCurrentUrl()
        .then(url => url.match(
          /^https:\/\/www\.google\.com\/search\?q=selenium/i
        ))
    );
  });

  it("Options.homePath", async () => {
    const weatherPage = new Selen.Pages.Any(
      driver,
      {
        origin: "https://www.yahoo.com",
        homePath: "/news/weather/"
      }
    );

    await weatherPage.goHome();

    assert.equal(
      await weatherPage.getCurrentUrl(),
      "https://www.yahoo.com/news/weather/"
    );
  });
});
