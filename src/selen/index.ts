import { Builder, WebDriver } from "selenium-webdriver";
import { Pages, SelenOptions } from "./pages/";
export { Pages, SelenOptions, SelenOptions as PageOptions, WebElementEx, Dictionary } from "./pages/";

export class Selen {
  public static Pages = Pages;
  public static setPath(path: string){
    console.warn("Selen.setPath() is depreciated. Use Selen.addPath() instead.");
    Selen.addPath(path);
  }
  public static addPath(path: string){
    const sep = process.platform == "win32" ? ";" : ":";
    process.env.PATH += `${sep}${path}`;
  }
  public static async Build(browser: string){
    console.warn("Selen.Build() is depreciated. Use Selen.build() instead.");
    return this.build(browser);
  }
  public static async build(browser: string){
    return new Builder().forBrowser(browser).build();
  }
}

export namespace Selen {
  export type Options = SelenOptions;
}
