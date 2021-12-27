import { WebDriver } from "selenium-webdriver";
import { SelenOptions, PageBase } from "./base";
export { SelenOptions, PageBase, WebElementEx, Dictionary } from "./base";
import { Any } from "./any";
export { Any } from "./any";

export class Pages {
  public static Any = Any;
  public static Base = PageBase;
  public static add(classdef: any){
    // @ts-ignore
    Pages[classdef.name] = classdef;
    return Pages;
  }
}
