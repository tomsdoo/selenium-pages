# selenium-pages

## Installation
``` shell
npm install selenium-pages
```

## Requisition
Web drivers are installed and the paths for the drivers are ready.

## Usage
``` typescript
import { Selen } from "selenium-pages";

const pageOptions = {
  origin: "https://www.google.com",
  maxWaitMs: 10000
};

(async () => {
///

const driver = await Selen.Build("chrome");

const page = new Selen.Pages.Any(driver, pageOptions);

await page.goHome();

console.log(await page.getCurrentUrl());

console.log(await page.getTitle());

await page.goTo("/search?q=test");

console.log(
  await page
    .querySelectorAll("div.g h3")
    .then(
      elements => Promise.all(elements.map(
        element => element.getText()
      ))
    )
);

await driver.quit();

///
})();
```

``` typescript
import { Selen } from "selenium-pages";

const pageOptions = {
  origin: "https://www.google.com",
  maxWaitMs: 10000
};

(async () => {
///

// customized page class definition
class Test extends Selen.Pages.Base {
  async workSome(){
    await this.executeScript(`
      document.body.appendChild(document.createElement('div')).innerHTML = "test";
    `);
  }
}

// registration
Selen.Pages.add(Test);

const driver = await Selen.Build("chrome");

// you can new Selen.Pages[your customized class name]
const testPage = new Selen.Pages.Test(driver, pageOptions);
await testPage.goHome();

// you can use your methods
await testPage.workSome();

///
})();
```
