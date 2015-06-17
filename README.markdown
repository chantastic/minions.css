## minions

WIP

### Concepts

* single-purpose classes in the spirit of Atomic CSS
* media-queries use same class names inside data attributes
* unopinionated about units: supports em, rem, and px

### Example

    <div
     data-style="c-y"
     data-style-sm="c-r"
     data-style-md="c-g"
     data-style-lg="c-b">
      {Whatever} First
    </div>

### Syntax
    {property-shortand}-{value-shorthand}

### lexicon
    d  = display
    f  = float
    m  = margin
    b  = border
    p  = padding
    c  = color
    bc = background-color

### Measurement

    m-0   = { margin: 0 }
    m-1   = { margin: 1px }
    m-2   = { margin: 2px }
    m-3   = { margin: 3px }
    m-20  = { margin: 20px }
    m-1x  = { margin: 1em }
    m-2x  = { margin: 2em }
    m-1xr = { margin: 1rem }
    m-2xr = { margin: 2rem }
