import { Builder, WebDriver } from "selenium-webdriver";
import { Pages, SelenOptions } from "./pages/";
export { Pages, SelenOptions, SelenOptions as PageOptions, WebElementEx, Dictionary } from "./pages/";

export class Selen {
  public static Builder = Builder;
  public static Pages = Pages;
  public static addPath(path: string){
    const sep = process.platform == "win32" ? ";" : ":";
    process.env.PATH += `${sep}${path}`;
  }
  public static async build(browser: string){
    return new Builder().forBrowser(browser).build();
  }
}

export namespace Selen {
  export type Options = SelenOptions;
}
