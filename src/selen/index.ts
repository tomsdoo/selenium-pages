import { Builder, WebDriver } from "selenium-webdriver";
import { Pages, SelenOptions } from "./pages/";
export { Pages, SelenOptions } from "./pages/";

export class Selen {
  public static Pages = Pages;
  public static setPath(path: string){
    const sep = process.platform == "win32" ? ";" : ":";
    process.env.PATH += `${sep}${path}`;
  }
  public static async Build(browser: string){
    return new Builder().forBrowser(browser).build();
  }
}
