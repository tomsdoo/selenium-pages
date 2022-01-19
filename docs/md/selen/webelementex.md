# WebElementEx

```WebElementEx``` class is a child class of [WebElement in "selenium-webdriver"](https://www.selenium.dev/documentation/webdriver/elements/);

```querySelector()``` and ```querySelectorAll()``` methods are added.

``` mermaid
classDiagram

WebElement <|-- WebElementEx

class WebElementEx {
  #Dictionary styleDictionary
  +constructor(original: WebElement, styleDictionary: Dictionary)
  +querySelector(selector: string) Promise~WebElementEx~
  +querySelectorAll(selector: string) Promise~array_of_WebElementEx~
}
```

``` typescript
class MyPage extends Selen.Pages.Base {
  public async workSome(){
    this.querySelector("body div:nth-child(1)")
      .then(div => div.querySelector("form"))
      .then(form => form.querySelector("button"))
      .then(button => button.click());
  }
}
```
