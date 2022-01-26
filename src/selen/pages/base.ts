import { By, until, Key, WebDriver, WebElement } from "selenium-webdriver";

export class WebElementEx extends WebElement {
  protected styleDictionary: Dictionary;
  constructor(original: WebElement, styleDictionary: Dictionary){
    super(original.getDriver(), original.getId());
    this.styleDictionary = styleDictionary;
  }
  public async querySelector(css: string){
    return this.findElement(By.css(this.styleDictionary.get(css)))
      .then(webele => new WebElementEx(webele, this.styleDictionary));
  }
  public async querySelectorAll(css: string){
    return Array
      .from(await this.findElements(By.css(this.styleDictionary.get(css))))
      .map(webele => new WebElementEx(webele, this.styleDictionary));
  }
}

export type SelenOptions = {
  origin: string;
  homePath?: string;
  maxWaitMs?: number;
};

export type DictionaryKeyValue = {
  [key: string]: string;
};

export class Dictionary {
  protected data: DictionaryKeyValue;
  constructor(data?: DictionaryKeyValue){
    this.data = data  || {};
  }
  public add(key: string, value: string){
    this.data[key] = value;
    return this;
  }
  public get(key: string){
    return key in this.data ? this.data[key] : key;
  }
  public merge(data: DictionaryKeyValue){
    this.data = {
      ...this.data,
      ...data
    };
    return this;
  }
  public renew(data: DictionaryKeyValue){
    this.data = data;
    return this;
  }
}

export abstract class PageBase<Options extends SelenOptions = SelenOptions> {
  public Key: typeof Key;
  protected driver: WebDriver;
  protected options: Options;
  public styleDictionary: Dictionary;
  constructor(driver: WebDriver, options: Options){
    this.driver = driver;
    this.options = {
      maxWaitMs: 10000,
      ...options
    };
    this.styleDictionary = new Dictionary();
    this.initializeStyleDictionary();
    this.Key = Key;
  }
  protected initializeStyleDictionary(){
    // nop, inherits should override if needed
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
    await this.goTo(this.options.homePath);
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
      until.elementLocated(By.css(this.styleDictionary.get(css))),
      this.options.maxWaitMs
    )
    .then(webele => new WebElementEx(webele, this.styleDictionary));
  }

  public async querySelectorAll(css: string){
    await this.querySelector(css);
    return Array.from(
      await this.driver.findElements(By.css(this.styleDictionary.get(css)))
    )
    .map(webele => new WebElementEx(webele, this.styleDictionary));
  }

  public async wait(milliseconds: number){
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
