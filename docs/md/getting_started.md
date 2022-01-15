# Getting started

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

You can use ```Selen.Pages.Any``` class for getting started or lightly use.
``` typescript
import { Selen } from "selenium-pages";

const pageOptions: Selen.Options = {
  origin: "https://www.google.com" // home page origin
};

(async () => {
///

const driver = await Selen.build("chrome");

const page = new Selen.Pages.Any(driver, pageOptions);

await page.goHome();

console.log(await page.getCurrentUrl());

await driver.quit();

///
})();
```
