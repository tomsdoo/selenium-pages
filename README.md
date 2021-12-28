# selenium-pages

![npm](https://img.shields.io/npm/v/selenium-pages)
![NPM](https://img.shields.io/npm/l/selenium-pages)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/selenium-pages)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/selenium-pages)
![Maintenance](https://img.shields.io/maintenance/yes/2021)
![depends on selenium-webdriver](https://img.shields.io/badge/depends%20on-selenium--webdriver-informational)

selenium-pages is a package for you who want to use selenium and manage some pages with your own classes simply.

Let's just get started and learn little by little, if needed.

## Installation
``` shell
npm install selenium-pages
```

for TypeScript, below line may be good too
``` shell
npm install -D @types/selenium-webdriver
```

## Prerequisites
Web drivers are installed and the paths for the drivers are ready.

## Usage

#### Basics
You can use Page.Any class for getting started or lightly use.
``` typescript
import { Selen, SelenOptions } from "selenium-pages";

const pageOptions: SelenOptions = {
  origin: "https://www.google.com" // home page origin
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

#### How to extend the base class
You can extend the base class for your own use.
``` typescript
import { Selen, SelenOptions } from "selenium-pages";

const pageOptions: SelenOptions = {
  origin: "https://www.google.com"
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

// customized Pages class definition
class MyPages extends Selen.Pages {
  public static Test = Test;
}

const driver = await Selen.Build("chrome");

const testPage = new MyPages.Test(driver, pageOptions);
await testPage.goHome();

await testPage.workSome();

///
})();
```

#### How to use customized options
You can extend SelenOptions and use it in your class instance methods.
``` typescript
import { Selen, SelenOptions } from "selenium-pages";

type CustomOptions = SelenOptions & {
  some: string;
};

class Custom extends Selen.Pages.Base<CustomOptions> {
  public workSome(){
    console.log(this.options.some);
  }
}

const customPage = new Custom(driver, {
  origin: "https://...",
  some: "thing"
});
```

#### How to use style dictionary
styleDictionary is ready for you to name the selector strings.
``` typescript
import { Selen } from "selenium-pages";

class Custom extends Selen.Pages.Base {
  protected initializeStyleDictionary(){
    this.styleDictionary.renew({
      inputBox: "div form input[name='some']",
      button: "div form button[type='submit']"
    });
  }
}

(async () => {
///

const customPage = new Custom(driver, someOptions);
await customPage.querySelector("inputBox")
  .then(box => box.sendKeys("hello"));
await customPage.querySelector("button")
  .then(button => button.click());

///
})();
```

#### How to bundle customized pages your own
``` typescript
import { Selen } from "selenium-pages";

// define your own classes
class Custom1 extends Selen.Pages.Base {
  public sayHello(){
    console.log("hi");
  }
}

class Custom2 extends Selen.Pages.Base {
  public sayBye(){
    console.log("bye");
  }
}

// bundle your classes
class MyPages extends Selen.Pages {
  public static Custom1 = Custom1;
  public static Custom2 = Custom2;
}

// then you can use page classes from MyPages
const customPage1 = new MyPages.Custom1(driver, options);
const customPage2 = new MyPages.Custom2(driver, options);

// and the classes defined in base class(Selen.Pages) can be accessed
const anyPage = new MyPages.Any(driver, options);
```
