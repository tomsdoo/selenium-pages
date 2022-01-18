# Selen.Pages

```Selen.Pages``` is a class what bundles children page classes.

``` mermaid
classDiagram

class Pages {
  +Any Any
  +Base Base
  +add(childClass: any)$ Pages
}
```

## Selen.Pages.Any

[```Any``` class](#/md/selen/pages/any) is a concrete page class that extends [```Base``` class](#/md/selen/pages/base).  
It is handy when you want to just touch ```selenium-pages``` or lightly use it.

``` typescript
import { Selen } from "selenium-pages";

Selen.build("chrome")
  .then(driver => new Selen.Pages.Any(
    driver,
    { origin: "https://www.google.com" }
  ))
  .then(async page => {
    await page.goHome();
    console.log(await page.getTitle());
  });
```

## Selen.Pages.Base

[```Base``` class](#/md/selen/pages/base) is an abstract page class that the other page classes extends.

``` typescript
import { Selen } from "selenium-pages";

class Custom extends Selen.Pages.Base {
  public async countImages(){
    await this.querySelectorAll("img")
      .then(elements => {
        console.log(`There are ${elements.length} image tags.`);
      });
  }
}
```

## Base and Any and else children

All page classes should extend [```Base``` class](#/md/selen/pages/base), including your custom page classes.  
[```Any``` class](#/md/selen/pages/any) is a default prepared child class that you can feel free to use one.

``` mermaid
classDiagram

Base <|-- Any
Base <|-- Custom

<<abstract>> Base
link Any "https://inner.link.dummy/md/selen/pages/any"
link Base "https://inner.link.dummy/md/selen/pages/base"
```
