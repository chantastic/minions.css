# minions
Evil micro-classes.

## WIP
This project is undergoing a pretty big transition.
I've removed the aspirational documentation to prevent confusion.

If for some reason your using this, you're likely on `v0.0.3` and it's very different.
I recommend looking at the documentation for that tag.

# What is this?
This library is the practice of a naming convention I've been working out for human readable, low-conlfict micro-class.

I think that the naming conventions are solid.
They're intended to be very literal.
So, the practice is repeatable, library on not.

The library exists mostly to suss out shortcomings and areas of conflict.

# A simple example
```html
<div class="p-1r bw-1p bc-cC mx-2r ff-sans">
  This element has 1rem of padding, a 1px border (set to currentColor), a top/bottom margin of 2rem, and the font-family is sans.
</div>
```

## prior art
* [tachyons](http://tachyons.io/) - This is the first library I'd seen that went completely down the rabbit-hole of micro-classes with media-queries.
* [gravitons](http://jxnblk.com/gravitons/) - Brent's projects are some of my favorite on the internet. Gravitons and [basscss](http://www.basscss.com/) make an elegant and minimal framework.

### experimentation
There are a few guiding principles that I find absent from those other libraries.
This isn't a problem; they're not omissions.
But I find in my work, with my team, I wanted a more literal translation between classname and rule.

### guiding principles

#### "guessable" class names (highly literal)
I want class names that are internally consistent and very literal.
I want virtually 0 abstraction between a rule I'd type in CSS and a micro-class selector.

#### whatever-first. mobile-first, wearable-first, mega-widescreen-first, toaster-first, who cares?
Support for legacy apps - "Mobile first" isn't possible in 10-year old app.
It's already been "firsted."
I want media-query classes that aren't opinionated about the starting line.

## Why?
That's a great question.

I've come to believe that the biggest problem with CSS is that you have to name selectors to do anything. People suck at naming things and only the best people go back to reconsider.

This approach allows you to defer naming thing... maybe indefinitely.

## Syntax
`{property-shortand}-{value-shorthand}`

### Property shorthand
In the majority of cases, properties get shortened to a single character per word.

    display  = d
    overflow = o
    margin   = m
    padding  = p

Properties with two words (separated by a dash) will have two characters.

    border-color = bc
    border-width = bw

Likewise specific properties get a character for each dash-delimited word.

    border-top-width    = btw
    border-right-width  = brw
    border-bottom-width = bbw
    border-left-width   = blw

`x` and `y` have been added as aliases for `right & left` and `top & bottom`, respectively, for box-model properties.

    border-top-width && border-bottom-width = byw
    border-right-width && border-left-width = bxw

#### Value shorthand

Value shorthand follows the same rules as Property shortand.
Values get shortened to a single character per word.
This includes measurement values.

    4px = 4p
    1rem = 1r
    hidden = h
    inline-block = ib

#### measurements
There is no additional abstraction between measurement values and class selectors:

    1em = 1e
    .5em = .5e
    .25em = .25e

    1rem = 1e
    .5rem = .5e
    .25rem = .25e

### Conflicts
There will be conflicts; I have two methods for resolving them.

#### Verbosity
Where two classes share the same selector, but one is less likely to be used, I attempt to make a more verbose version available.

`.o-1` is a problematic selector.
It can mean `{opacity: 1}` or `{order: 1}`.

I use `opacity` more than `order` and therefor use the verbose version of `order` to resolve the conflict:

`.order-1`

#### Alternate
Where two classes share might share the same selector and they are both popular, I chose a second character.

This isn't very common but the conflict exists in a pretty big way: `background-color` and `border-color`.

I've used `gc` for `background-color`.

    bc = border-color
    gc = background-color

Sadly, this exceptions is one that needs to be memorized and internalized.

#### Negative
There is only one number prefix.
`n` may be used to prefix a number as `negative`.
I'm avoiding the use of `-` to prevent confusion with OOCSS-style classes that use the `--` (double-dash) delimiter as a modifier.

```css
.o-1  { order: 1 }
.o-n1 { order: -1 }
```

#### Theming
The ability to theme minions is important.
There's a simple convention for theme-able values.
If the value side of the `-` isn't abbreviated, it's theme-able.
Everything else is static.
Here's an example:

```css
.c-r   /* static, don't touch this */
.c-red /* variable. theme the shit out of it */
```

## Property lexicon
    ac  = align-content
    ai  = align-items
    as  = align-self
    ad  = animation-delay *
          animation-direction
          animation-duration *
    aic = animation-iteration-count

    aps = animation-play-state
    atf = animation-timing-function
    ba  = background-attachment
    bbw = border-bottom-width
    b   = bottom
    bc  = background-clip
          border-collapse
    blw = border-left-width
    bo  = background-origin
    bp  = background-position
    br  = background-repeat
    brw = border-right-width
    bs  = background-size
          border-style
    btw = border-top-width
    bw  = border-width
    bxw = border-x-width
    byw = border-y-width
    bs  = box-sizing

    c   = clear
          cursor
    cc  = column-count

    d   = display

    f   = flex
          float
    fb  = flex-basis
    fd  = flex-direction
    ff  = flex-flow
          font-family
    fg  = flex-grow
    fs  = flex-shrink
          flex-size
          font-style
    fv  = font-variant
    fw  = flex-wrap
          font-weight

    h   = height

    jc  = justify-content

    l   = left
    lh  = line-height
    ls  = letter-spacing
    lsp = list-style-position
    lst = list-style-type

    nh  = min-height *
    nw  = min-width *

    m   = margin
    mb  = margin-bottom
    ml  = margin-left
    mr  = margin-right
    mt  = margin-top
    mx  = margin-x
    my  = margin-y
    mbm = mix-blend-mode

    o   = opacity
          order
          overflow
    os  = outline-style
    ow  = outline-width
          outline-wrap
    ox  = outline-x
    oy  = outline-y

    p   = padding
          position
    pe  = pointer-events

    r   = resize
          right

    t   = top
    ta  = text-align
    td  = text-decoration
          transition-duration *
          transition-delay *
    ti  = text-indent
    to  = text-overflow
    tp  = transition-property
    tt  = text-transform
    ttf = transition-timing-function

    v   = visibility
    va  = vertical-align

    w   = width
    wb  = word-break
    wc  = will-change
    ws  = white-space
          word-spacing

    xh  = max-height *
    xw  = max-width *

    zi  = z-index

`*` indicates alternative naming do to conflict

### Measurement
In cases of measurements, `0`, `1`, `2`, `3`, and `4` are available.

There `em` and `rem` and additional values for 1/2 and 1/4.

```css
/* 0 */
p-0 { padding: 0 }

/* px */
p-1p { padding: 1px }
p-2p { padding: 2px }
p-3p { padding: 3px }
p-4p { padding: 4px }

/* em */
p-\.25e { padding: .25em }
p-\.5e  { padding: .5em }
p-1e   { padding: 1em }
p-2e   { padding: 2em }
p-3e   { padding: 3em }

/* rem */
p-\.25r { padding: .25em }
p-\.5r  { padding: .5em }
p-1r   { padding: 1em }
p-2r   { padding: 2em }
p-3r   { padding: 3em }
```

## Coming eventually

__THIS SECTION IS THE EXPERIMENTAL BIT THAT IS ONLY PARTIALLY IMPLEMENTED__

### `_` delimiter
The `_` delimiter indicates that the selector enacts on all direct children, not the element the selector is on.

```html
<div class="p-1r">This element has 1rem padding.</div>

<div class="p_1r">
  <div>These elements</div>
  <div>have 1rem padding.</div>
</div>
```

### `!` suffix
The `!` suffix forces a rule by appending `!important`.

```html
<ul class="p_1">
  <li>all direct children have 1em padding</li>
  <li>this one two</li>
  <li class="p-0!">this one has reset to 0</li>
</ul>
```

### `:h`, `:a` suffixes and others
The `:h` and `:a` suffix can be applied to classes to apply their styles on browser events.

```html
<a href="#" class="bw-1p bw-2p:h bw-3p:a">hover me</a>
```

Any other pseudo classes and elements can be written this way as well, e.g.,
`:fc`, `:lc`, `:b`, `:a`, `:n(even)` etc.

### `^` selector
The `^` is a way for denoting an ancestor as the event target.
It's like a look-back selector.

```html
<div class="^">
  <div>
    <div>
      <div class="bw-2p:^h">This element will get hover-effect on great-grandparent hover</div>
    </div>
  </div>
</div>
```


## Media Queries
The primary advantage that these classes provide over inline-styles is there ability to leverage media-queries.

Breakpoint-specific classes are suffixed with an `@`-symbol, followed by the two-character shorthand for the breakpoint (i.e., `mn`, `sm`, `md`, `lg`, `xl`).

```html
<p class="w-10%@mn w-20%@xs w-40%@sm w-60%@md w-80%@lg w-100%@xl">
  The wider the screen gets, the wider I get.
</p>
```

### Matching Logic
With the right matching logic,
this library can support legacy apps with a "whatever-first" approach.

#### Overriding (up)
```css
@media (min-width: 768px) {
  .p-1r\@md {}
}
```  

#### Overriding (down)
```css
@media (max-width: 767px) {
  .p-1r\@\!md {}
}

/*
 * alternatively,
 * not could be used to use the same value and be measurement agnostic
 */
@media not all and (max-width: 768px) {}
```

#### Exact match (and)
```css
@media (min-width: 768px) and (max-width: 991px) {
  .p-1r\@\=md {}
}

/*
 * alternatively,
 * not could be used to use the same value and be measurement agnostic
 */
```

#### Exact exclude (or)
```css
@media (max-width: 767px), (min-width: 992px){
  .p-1r@!=sm {}
}
```
