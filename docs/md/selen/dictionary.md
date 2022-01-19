# Dictionary

```Dictionary``` class is a utility class for [```Selen.Pages.Base```](#/md/selen/pages/base) and child classes.  
```Dictionary``` class will be only internally used in ```selenium-pages``` so the users do not have to learn it.

``` mermaid
classDiagram

class Dictionary {
  #DictionaryKeyValue data
  +constructor(data: DictionaryKeyValue)
  +add(key: string, value: string) Dictionary
  +get(key: string) string
  +renew(data: DictionaryKeyValue) Dictionary
}

class DictionaryKeyValue {
  +string [key]
}

Dictionary -- DictionaryKeyValue
<<type>> DictionaryKeyValue
```

``` typescript
import { Dictionary } from "selenium-pages";

const dictionary = new Dictionary();
dictionary
  .add("one", "1")
  .add("two", "2");
console.log(dictionary.get("one")); // 1
console.log(dictionary.get("two")); // 2
console.log(dictionary.get("three")); // three
```

``` typescript
improt { Dictionary } from "selenium-pages";

const dictionary = new Dictionary();
dictionary.renew({
  nine: "9",
  eight: "8"
});

console.log(dictionary.get("nine")); // 9
console.log(dictionary.get("eight")); // 8
console.log(dictionary.get("seven")); // seven
```
