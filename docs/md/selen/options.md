# Selen.Options

```Selen.Options``` is a type for initialization of the page classes.  
And the options can be used in the page classes.

``` mermaid
erDiagram
Options {
  string origin
}
```

``` typescript
import { Selen } from "selenium-pages";

const options: Selen.Options = {
  origin: "https://your.site"
};
```

## Customized Options

You can use the customized options for your own.

``` typescript

// extend Selen.Options
type MyOptions = Selen.Options & {
  some: string;
};

// define the method using extended options
class MyPage extends Selen.Pages.Base<MyOptions> {
  public work(){
    console.log(this.options.some);
  }
}

// it will work likewise below
const page = new MyPage(driver, options);
page.work();
```
