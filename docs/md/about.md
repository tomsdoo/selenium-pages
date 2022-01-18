# selenium-pages

```selenium-pages``` is a package for you who want to use selenium and manage some pages with your own classes simply.

- [Getting started](#/md/getting_started)
- [Selen](#/md/selen/)

``` mermaid
classDiagram

Selen o-- Pages
Pages o-- Any
Pages o-- Base~Options~

Base~Options~ <|-- Any

Options <-- Base~Options~

link Selen "https://inner.link.dummy/md/selen/"
link Pages "https://inner.link.dummy/md/selen/pages/"
link Any "https://inner.link.dummy/md/selen/pages/any"
link Base "https://inner.link.dummy/md/selen/pages/base"
link Options "https://inner.link.dummy/md/selen/options"
```
