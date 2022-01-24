# Selen

```Selen``` is the name of the class what is the entry point of the libraries.

``` mermaid
classDiagram

class Selen {
  +Builder Builder$
  +Pages Pages$
  +addPath(path: string)$
  +build(browser: string)$ Promise~WebDriver~
}
```

## Selen.Pages

[```Selen.Pages```](#/md/selen/pages/) is a class what bundles the children.  
You can access the concrete page classes or the base class through it.

## Selen.Builder

```Selen.Builder``` is [```selenium-webdriver.Builder```](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html).

``` typescript
driver = await new Selen.Builder().forBrowser("chrome").build();
// the below line is same as above
driver = await Selen.build("chrome");
```

## Selen.addPath()

```Selen.addPath()``` is a method what adds the environment variable ```PATH```.

``` typescript
import { Selen } from "selenium-pages";

Selen.addPath("/path/to/driver");
```

## Selen.build()

```Selen.build()``` is a method what returns a Promise that will be resolved as WebDriver.

``` typescript
import { Selen } from "selenium-pages";

Selen.build("chrome")
  .then(driver => console.log(driver));
```

## Selen.Options
[```Selen.Options```](#/md/selen/options) is a type for TypeScript.
to customize the page class.
