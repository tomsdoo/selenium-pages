# Selen.Pages.Base

```Selen.Pages.Base``` is an abstract class for operating the browsers.  
You have to inherit the ```Selen.Pages.Base``` when you are to customize the page classes.

``` mermaid
classDiagram

class Base~Options extends Selen.Options~ {
  +Dictionary styleDictionary
  +Key Key
  #WebDriver driver
  #Options options
  +constructor(driver: WebDriver, options: Options)
  +executeScript(script: string) Promise~any~
  +getCurrentUrl() Promise~string~
  +getTitle() Promise~string~
  +goHome() Promise~void~
  +goTo(urlOrPath?: string) Promise~void~
  +isUrlValid() Promise~boolean~
  +querySelector(selector: string) Promise~WebElementEx~
  +querySelectorAll(selector: string) Promise~array_of_WebElementEx~
  +wait(milliseconds: number) Promise~void~
  #initializeStyleDictionary()
}
<<abstract>> Base
```

## Constructor
|#|name|description|
|--:|:--|:--|
|1|driver|WebDriver of ```selenium-webdriver```|
|2|options|the information of page class. see also [Sele.Options](#/md/selen/options)|

## methods
public methods are below.

### executeScript()
```executeScript()``` executes the script that is provided as the parameter.

#### parameters
The parameters are below.

|#|name|required|description|
|--:|:--|:--|:--|
|1|script|Yes|script text that can be executed on the browser|

#### returns
It returns ```Promise``` that will be resolved as any.

``` typescript
await page.executeScript(`
  document.querySelector("button.what.you.need").click();
`);
```

### getCurrentUrl()
```getCurrentUrl()``` returns a ```Promise``` for the url of current page that the browser driver is displaying.

#### returns
It returns ```Promise``` that will be resolved as the url string.

``` typescript
console.log(await page.getCurrentUrl());
```

### getTitle()
```getTitle()``` returns a ```Promise``` for the page title.

#### returns
It returns ```Promise``` that will be resolved as the title string.

### goHome()
```goHome()``` navigates the web driver browser to the url defined as ```options.homePath``` or ```options.origin``` of the instance options.

### returns
It returns ```Promise``` that will be resolved as void.

``` typescript
await page.goHome();
```

### goTo()
```goTo()``` navigates the web driver browser to the url provided as the parameter.

#### parameters
The parameters are below.

|#|name|required|description|
|--:|:--|:--|:--|
|1|urlOrPath|Yes|url to be navigated to|

``` typescript
await page.goTo("/path/to/page");
```

### isUrlValid()
```isUrlValid()``` returns a ```Promise``` for boolean value what indicates that the current url is valid for the page class instance.  
The ```isUrlValid()``` method of Base class returns the ```Promise``` what will be resolved as true, at any time.  
The customized page class can rewrite ```isUrlValid()``` using the instance state and variables.

``` typescript
console.log(await page.isUrlValid());
```

### querySelector()
```querySelector()``` returns a ```Promise``` for [```WebElementEx```](#/md/selen/webelementex) that matches the selector provided.


#### parameters
The parameters are below.

|#|name|required|description|
|--:|:--|:--|:--|
|1|selector|Yes|css selector|

``` typescript
await page.querySelector("div.test button.whatever")
  .then(button => button.click());
```

### querySelectorAll()
```querySelectorAll()``` returns a ```Promise``` for the array of [```WebElementEx```](#/md/selen/webelementex) that match the selector provided.

#### parameters
The parameters are below.

|#|name|required|description|
|--:|:--|:--|:--|
|1|selector|Yes|css selector|

``` typescript
await page.querySelectorAll("div.test input[type='text']")
  .then(textBoxes => {
    for(textBox in textBoxes){
      await textBox.sendKeys("test");
    }
  });
```

### wait()
```wait()``` returns a ```Promise``` that resolves as nothing when the time provided millisecods has passed.

``` typescript
await page.wait(2000);
// now, 2 seconds passed
```

### initializeStyleDictionary()
```initializeStyleDictionary()``` initializes the instance member variable ```styleDictionary```.  
It will be called from the constructor of the instance.  
You can customize ```styleDictionary``` by rewriting ```initializeStyleDictionary()``` when you define the customized page class.  
```styleDictionary``` is an instance of [```Dictionary```](#/md/selen/dictionary).

``` typescript
class Custom extends Selen.Pages.Base {
  protected initializeStyleDictionary(){
    super.initializeStyleDictionary();
    this.styleDictionary.merge({
      // ready for use later
      someButton: "form button.some"

    });
  }

  public async work(){
    // now you can use "someButton" instead of "form button.some"
    await this.querySelector("someButton")
      .then(button => button.click());
  }
}
```
