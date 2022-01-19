# Selen.Pages.Any

```Selen.Pages.Any``` is a class that just inherit [```Selen.Page.Base``` class](#/md/selen/pages/base), with no customizations. See [```Selen.Pages.Base``` class](#/md/selen/pages/base) for the instance members.

``` mermaid
classDiagram

Base <|-- Any

link Base "https://inner.link.dummy/md/selen/pages/base"
```

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
