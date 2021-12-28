const { Selen } = require("../dist/cjs/");
const assert = require("assert");

/*
Install chromedriver and define PATH to chromedriver before testing
*/

let driver;

const googleOptions = {
  origin: "https://www.google.com",
  maxWaitMs: 10000
};

describe("testing", () => {
  before(async () => {
    driver = await Selen.Build("chrome");
  });

  after(async () => {
    await driver.quit();
  });

  it("getCurrentUrl()", async () => {
    const google = new Selen.Pages.Any(driver, googleOptions);

    await google.goHome();

    assert.equal(
      await google.getCurrentUrl(),
      "https://www.google.com/"
    );
  });

  it("goHome()", async () => {
    const google = new Selen.Pages.Any(driver, googleOptions);

    await google.goHome();

    assert.equal(
      await google.getTitle(),
      "Google"
    );
  });

  it("goTo()", async () => {
    const google = new Selen.Pages.Any(driver, googleOptions);

    await google.goTo();

    assert.equal(
      await google.getTitle(),
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
    Selen.Pages.add(Test);

    const testPage = new Selen.Pages.Test(driver, googleOptions);
    await testPage.workSome();
  });

  it("querySelector()", async () => {
    const google = new Selen.Pages.Any(driver, googleOptions);
    await google.goTo("/search?q=test");
    const body = await google
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
          .then(box => box.sendKeys("test", require("selenium-webdriver").Key.ENTER));
        await this.querySelector("nextPageLink")
          .then(link => link.click());
        await this.querySelector("div.g a")
          .then(link => link.click());
      }
    }
    Selen.Pages.add(Custom);

    const custom = new Selen.Pages.Custom(driver, googleOptions);
    await custom.goHome();
    await custom.searchSome();
  });
});
