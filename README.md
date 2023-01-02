# selenium-pages

![npm](https://img.shields.io/npm/v/selenium-pages)
![NPM](https://img.shields.io/npm/l/selenium-pages)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/selenium-pages)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/selenium-pages)
![Maintenance](https://img.shields.io/maintenance/yes/2023)
![depends on selenium-webdriver](https://img.shields.io/badge/depends%20on-selenium--webdriver-informational)

```selenium-pages``` is a package for you who want to use selenium and manage some pages with your own classes simply.

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
You can use ```Selen.Pages.Any``` class for getting started or lightly use.
``` typescript
import { Selen } from "selenium-pages";

const pageOptions: Selen.Options = {
  origin: "https://www.google.com", // origin
  homePath: "/" // path of page home
};

(async () => {
///

const driver = await Selen.build("chrome");

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

see https://selenium-pages.netlify.app/  for more.

#### How to extend the base class
You can extend ```Selen.Pages.Base``` class for your own use.
``` typescript
import { Selen } from "selenium-pages";

const pageOptions: Selen.Options = {
  origin: "https://www.google.com",
  homePath: "/"
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

const testPage = new Test(
  await Selen.build("chrome"),
  pageOptions
);

await testPage.goHome();

await testPage.workSome();

///
})();
```

#### How to use customized options
You can extend ```Selen.Options``` and use it in your class instance methods.
``` typescript
import { Selen } from "selenium-pages";

type CustomOptions = Selen.Options & {
  some: string;
  testUrl: string;
};

class Custom extends Selen.Pages.Base<CustomOptions> {
  public async workSome(){
    // your options can be accessed with this.options
    console.log(this.options.some);

    // WebDriver can be accessed with this.driver
    await this.driver.get(this.options.testUrl);
  }
}

const customPage = new Custom(driver, {
  origin: "https://...",
  homePath: "/",
  some: "thing",
  testUrl: "https://.."
});
```

#### How to use style dictionary
```styleDictionary``` is ready for you to name the selector strings.
``` typescript
import { Selen } from "selenium-pages";

class Custom extends Selen.Pages.Base {
  protected initializeStyleDictionary(){
    super.initializeStyleDictionary();
    this.styleDictionary.merge({
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

### Key can be accessed from ```Selen.Pages.Base``` instance as ```this.Key```
``` typescript
import { Selen } from "selenium-pages";

(async () => {
///
class MyPage extends Selen.Pages.Base {
  public async workSome(text: string){
    await this.querySelector("input[name='something']")
      .then(box => box.sendKeys(text, this.Key.ENTER));
  }
}
///
})();

```

#### How to bundle customized pages your own
You can extend ```Selen.Pages``` for your own classes to be bundled
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

### Utilities

#### building WebDriver
```Selen.build()``` returns a Promise for WebDriver instance.

``` typescript
const driver = await Selen.build("chrome");
```

#### setting environment variable PATH
```Selen.addPath()``` adds the string into PATH variable.

``` typescript
Selen.addPath("/path/to/driver");
```
