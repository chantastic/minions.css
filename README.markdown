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
    d   = display
    v   = visibility
    o   = opacity
    o   = overflow (no conflicts with opacity )
    f   = float
    m   = margin
    b   = border (border-width shorthand)
    bc  = border-color
    p   = padding
    c   = color
    bgc = background-color

needs

    cf  = clearfix
    fb  = flexbox ( could be `f` if no collisions )
    bw  = border-width


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

    m-0   = { margin: 0 }
    m-1   = { margin: 1px }
    m-xs  = { margin: .25em }
    m-sm  = { margin: .5em }
    m-md  = { margin: 1em }
    m-lg  = { margin: 2em }

### Defaults

#### colors

`g` and `o` have duplicates. The single-character version is what I imagine the
expectation to be.

Duplicates use the first and last character:
  `gy` = `gray`
  `oe` = `olive`

black and white have 5 shades. There are only 5 to enforce a11y contrast
recommendations.

#### borders

`border` rules include `border-style: solid". Feel absolutely free to add your
own classes for style. It's just not something I do enough to justify a class.

`.b` is a shorthand for `border-width`. With styles assumed, width is the only
property needed to show some type of border.

`borders` values are pixels.

#### overflow

`opacity` and `overflow` don't have any conflicts. so they are both `o`
prefixed.

#### margin / padding

`margin` and `padding` are calculated relative to font-size. It's hard to imagine a general
case where you would want a 1px margin.

`x` is for `em`. think `1 x font-size`
`xr` is for `rem`. think `1 x root-font-size`
