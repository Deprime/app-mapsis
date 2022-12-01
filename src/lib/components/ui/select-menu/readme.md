# SelectMenu component

## Description

Pretty cute mobile menu to replace base html select with animation support.

## Compound components

* ```SelectMenu```
* ```SelectMenuItem```

## Props

**visible**: ```boolean``` - menu visibility state

**placeholder**: ```string``` - base placeholder when menu item not selected.

**item**: ```ISelectmenuItem | null``` - current active menu item

## Slots

### Fefault slot

This slot is used for menu items list

### Button slot

This slot is used for menu toggle button.

```html
<button slot="button">
  New toggler
</button>
```

### Chevron slot

This slot is used for menu toggle button.

```html
<span slot="chevron">
  ->
</span>
```

### Prefix slot

This slot is used for menu toggle button.

```html
<svelte:fragment slot="prefix">
  The value is: 
</svelte:fragment>
```
