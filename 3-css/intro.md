# CSS - Introduction

## History of CSS

- **1994** – Håkon Wium Lie proposed CSS while working at CERN alongside Tim Berners-Lee.
- **1996** – **CSS1** was published as a W3C Recommendation. It covered fonts, colors, text alignment, margins, borders, and basic positioning.
- **1998** – **CSS2** was released, adding support for media types, absolute/relative/fixed positioning, z-index, and the concept of the box model.
- **2011** – **CSS2.1** became a Recommendation, fixing errors and aligning the spec with real browser behavior.
- **2012 onwards** – **CSS3** was introduced as a collection of independent modules (Flexbox, Grid, Animations, Transitions, Media Queries, etc.) instead of a single monolithic specification. Each module evolves independently.
- **Today** – There is no "CSS4." New features continue to ship as individual modules (e.g., Container Queries, Cascade Layers, Subgrid).

---

## What is CSS?

CSS stands for **Cascading Style Sheets**. It is a stylesheet language used to describe the presentation (look and formatting) of a document written in HTML or XML.

CSS separates **content** (HTML) from **presentation** (styling), making websites easier to maintain and more flexible across devices.

---

## What is "Cascading"?

The word **cascading** refers to the way CSS determines which styles are applied when multiple rules target the same element. The cascade resolves conflicts using three key factors (in order of priority):

1. **Origin & Importance**
   - User-agent (browser default) styles
   - Author (developer) styles
   - User styles
   - `!important` declarations reverse the priority order

2. **Specificity**
   - Inline styles > ID selectors > Class/attribute/pseudo-class selectors > Element/pseudo-element selectors
   - More specific selectors override less specific ones.

3. **Source Order**
   - When origin and specificity are equal, the rule that appears **last** in the source code wins.

---

## Types of CSS (Ways to Apply CSS)

### 1. Inline CSS

Styles applied directly on an HTML element using the `style` attribute.

```html
<p style="color: red; font-size: 16px;">Hello World</p>
```

- Highest specificity (overrides other styles).
- Hard to maintain; not reusable.

### 2. Internal (Embedded) CSS

Styles written inside a `<style>` tag within the `<head>` section of the HTML document.

```html
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
```

- Useful for single-page styling.
- Not reusable across multiple pages.

### 3. External CSS

Styles written in a separate `.css` file and linked to the HTML document using the `<link>` tag.

```html
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

- Best practice for real projects.
- Reusable across multiple pages.
- Keeps HTML clean and maintainable.
- Cached by the browser for better performance.

---

## CSS Syntax

```css
selector {
  property: value;
}
```

**Example:**

```css
h1 {
  color: navy;
  font-size: 24px;
}
```

---

## Summary

| Concept   | Key Point                                                          |
| --------- | ------------------------------------------------------------------ |
| CSS       | Stylesheet language for presentation                               |
| Cascading | Rules for resolving style conflicts (origin → specificity → order) |
| Inline    | `style` attribute on element                                       |
| Internal  | `<style>` tag in `<head>`                                          |
| External  | Separate `.css` file linked via `<link>`                           |
