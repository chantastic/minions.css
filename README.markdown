# minions

Evil, friendly, and obedient immutable CSS class selectors.

```html
<div class="p-1"> This element has 1em of padding</div>
<div class="b-1p"> This element has a 1px border</div>
<div class="m-1r"> This element has 1rem margin</div>
<div class="p_05">
  <div> Every direct child of this element has .5em of padding</div>
  <div class="p-0!"> ...but not this one. It's been reset to 0 </div>
</div>
```

## goals

* "immutable", single-purpose classes
* predictable class names with an unambiguous naming scheme

## why?

That's a great question.

I've come to believe that the biggest problem with CSS is that you have to name things to do anything. People suck at naming things and only the best people go back to reconsider their first attempt at a name.

This approach allows you to defer naming thing... maybe indefinitely.

## syntax
    {property-shortand}-{value-shorthand}

#### property-shorthand

In the majority of cases, properties get shortened to a single charactor per word.

    margin = m
    padding = p

Properties with two words (separated by a dash) will have two characters.

    bc = border-color

Where there is a conflit, the rules should still apply. `background-color` is an example where another shorthand is needed, to avoid conflicts with `border-color.

    bc = border-color
    gc = background-color

Sadly, these exceptions just have to be memorized and internalized. Fortunately, there aren't many of them.

#### value-shorthand

In the majority of cases, values get shortened to a single character per word.

    1px = 1p
    hidden = h
    inline-block = ib

`em` is used for measurement shorthand. I prefer the flexibility of `em`s. At some point I'll likely variations of this library with othe defaults.

    1px = 1p
    1rem = 1r
    1em = 1

#### measurements

There is no additional abstraction between measurement values and class selectors:

    1em = 1
    .5em = 05
    .25em = 025

    1rem = 1r
    .5rem = 05r
    .25rem = 025r

I could see this feeling cumbersome to some. I'll likely add some abstracted values (e.g., `xs`, `sm`, `md`, `lg`) as an option.

#### opacity/luminosty

For values of opacity and lightness, the unsuffixed value is the default value and those suffixed with a number represent a point value.

    .c-w   { color: hsl(0, 0%, 100%)
    .c-w.5 { color: hsl(0, 0%,  50%)
    .c-w.0 { color: hsl(0, 0%,   0%)

    .o   { opacity: 1 }
    .o.5 { opacity: .5 }
    .o.0 { opacity: 0 }

Out of the box, only classes for 10ths are provided. But This can easily be extended to fit your needs.

    .c-w.42 { color: hsl(0, 0%, 52%) }
    .c-w.13 { color: hsl(0, 0%, 13%) }

    .o.42 { opacity: .42 }
    .o.13 { opacity: .13 }

#### negative

There is only one number prefix. `n` may be used to prefix a numer as `negative`. I'm avoiding the use of `-` to prevent confusion with OOCSS-style classes that use the `--` (double-dash) delimiter as a modifier.

    .o-1  { order: 1 }
    .o-n1 { order: -1 }

## lexicon
    d   = display
    v   = visibility
    o   = opacity, overflow, order
    f   = float, flex
    fd  = flex-direction
    gc  = background-color
    m   = margin
    b   = border (border-width shorthand)
    bc  = border-color
    p   = padding, position
    c   = color

`border` and `background-color` are outliers. I wanted border to be a single character to match it's box-model friends. `gc` is better than `bgc` for background-color. These are obviously my opnion but this is my library. So I'm still sleeping well at night.

### attributes

Attributes are hi-level modifiers to certain low-level classes.

    .fd-r.-row-gutter-1    = a 1em horizontal gutter between flex rows
    .fd-c.-column-gutter-1 = a 1em vertical gutter between flex columns

### Measurement

```css
/* 0 */
p-0 { padding: 0 }

/* px */
p-1p { padding: 1px }
p-2p { padding: 2px }
p-3p { padding: 3px }
p-4p { padding: 4px }

/* em */
p-025 { padding: .25em }
p-05  { padding: .5em }
p-1   { padding: 1em }
p-2   { padding: 2em }

/* rem */
p-025r { padding: .25em }
p-05r  { padding: .5em }
p-1r   { padding: 1em }
p-2r   { padding: 2em }
```

## Padding

Padding has a few extra rules. It does so to minimize the need for negative margin. I really hate negative margin.

Where `_` is used as a delimiter, all rules are applied to direct children.

Those children can override these rules with a `!` suffix. This makes it clear when a child is acting outside of it's parents requests. Enough bangs and it might be time to change the parent's mind.

```html

<div class="p_0">
  <div> all direct children have 0 padding </div>
</div>

<div class="p_1">
  <div> all direct children have 1em padding </div>
</div>

<div class="p_1p">
  <div> all direct children have 1px padding </div>
</div>

<div class="p_1r">
  <div> all direct children have 1rem padding </div>
</div>
```

The inner elements can force their padding rules to override their parents:

```html
<div class="p_1">
  <div> all direct children have 1em padding </div>
  <div> this one two </div>
  <div class="p-0!"> this one has reset to 0 </div>
</div>
```
