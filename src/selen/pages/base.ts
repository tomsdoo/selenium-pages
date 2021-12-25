import { By, until, Key, WebDriver, WebElement } from "selenium-webdriver";

class WebElementEx extends WebElement {
  constructor(original: WebElement){
    super(original.getDriver(), original.getId());
  }
  public async querySelector(css: string){
    return this.findElement(By.css(css))
      .then(webele => new WebElementEx(webele));
  }
  public async querySelectorAll(css: string){
    return Array
      .from(await this.findElements(By.css(css)))
      .map(webele => new WebElementEx(webele));
  }
}

export type SelenOptions = {
  origin: string;
  maxWaitMs: number;
  [key: string]: any;
};

export abstract class PageBase {
  protected driver: WebDriver;
  protected options: SelenOptions;
  constructor(driver: WebDriver, options: SelenOptions){
    this.driver = driver;
    this.options = options;
  }

  public async executeScript(script: string){
    return this.driver.executeScript(script);
  }

  public async getCurrentUrl(){
    return this.driver.getCurrentUrl();
  }

  public async getTitle(){
    return this.driver.getTitle();
  }

  public async goHome(){
    await this.goTo();
  }

  public async goTo(urlOrPath?: string){
    await this.driver.get(
      urlOrPath
        ? (
          urlOrPath.match(/^http/i)
            ? urlOrPath
            : `${this.options.origin}${urlOrPath}`
        ) : this.options.origin
    );
  }

  public async isUrlValid(){
    return true;
  }

  public async querySelector(css: string){
    return this.driver.wait(
      until.elementLocated(By.css(css)),
      this.options.maxWaitMs
    )
    .then(webele => new WebElementEx(webele));
  }

  public async querySelectorAll(css: string){
    await this.querySelector(css);
    return Array.from(
      await this.driver.findElements(By.css(css))
    )
    .map(webele => new WebElementEx(webele));
  }
}
