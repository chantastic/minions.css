# minions.<%= packageName %>
<%= mod.description %>

## Module
name: `minions.<%= mod.name %>`  
version: `<%= mod.version %>`  
main/style: `<%= mod.style %>`  

## Installation
npm:
```bash
npm install minions.<%= packageName %>@<%= mod.version %>
```

browser:
```html
<link rel="stylesheet" href="https://unpkg.com/minions.<%= packageName %>@<%= mod.version %>" />
```

## Code
```css
<%= code %>
```

## Source and issues

<%= mod.repository %>/tree/v<%= mod.version %>/packages/<%= packageName %>
https://github.com/chantastic/minions.css/tree/v0.0.4-alpha-14/packages/align-content

## License

The MIT License (MIT)
Copyright (c) 2016 Michael Chan
