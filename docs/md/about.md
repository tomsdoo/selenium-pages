# selenium-pages

```selenium-pages``` is a package for you who want to use selenium and manage some pages with your own classes simply.

- [Getting started](//inner.link.dummy/md/getting_started.md)
- [Selen](//inner.link.dummy/md/selen/index.md)

``` mermaid
classDiagram

Selen o-- Pages
Pages o-- Any
Pages o-- Base~Options~

Base~Options~ <|-- Any

Options <-- Base~Options~

link Selen "https://inner.link.dummy/md/selen/index.md"
link Pages "https://inner.link.dummy/md/selen/pages/index.md"
link Any "https://inner.link.dummy/md/selen/pages/any.md"
link Base "https://inner.link.dummy/md/selen/pages/base.md"
link Options "https://inner.link.dummy/md/selen/options.md"
```
