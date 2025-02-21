# Button Component Documentation

## Overview

The Button component is a flexible, customizable button implementation that supports multiple variants, styles, and props. It leverages Tailwind CSS for styling and supports icon integration.

## Props

- `primary`: Blue variant
- `secondary`: Gray/Black variant
- `success`: Green variant
- `warning`: Yellow variant
- `danger`: Red variant
- `outline`: Outlined style with transparent background
- `rounded`: Rounded corners style
- `children`: Content to be rendered inside the button
- `...rest`: All standard HTML button attributes (className, onClick, disabled, etc.)

## Core Features

### 1. Style Variants

The component supports five main color variants:

```jsx
<Button primary>Primary Button</Button>
<Button secondary>Secondary Button</Button>
<Button success>Success Button</Button>
<Button warning>Warning Button</Button>
<Button danger>Danger Button</Button>
```

### 2. Outline Style

Each variant can be rendered in an outline style:

```jsx
<Button primary outline>Outlined Primary</Button>
<Button success outline>Outlined Success</Button>
```

### 3. Rounded Style

Any variant can be rendered with rounded corners:

```jsx
<Button primary rounded>Rounded Primary</Button>
<Button success outline rounded>Rounded Outlined Success</Button>
```

### 4. Icon Integration

The component supports icons with automatic right margin:

```jsx
<Button primary>
  <GoBell />
  Notifications
</Button>
```

### 5. Custom Class Names

Additional classes can be passed via className prop:

```jsx
<Button primary className="mb-5">
  Custom Margin
</Button>
```

## Library Usage Explanation

### 1. classnames Library

The `classnames` library is used for conditional class name generation. It simplifies the process of combining multiple class names based on conditions:

```javascript
className({
  "border-blue-500 bg-blue-500 text-white": primary,
  "bg-white": outline,
  "text-blue-500": outline && primary,
});
```

Benefits:

- Cleaner conditional class handling
- Automatic falsy value filtering
- Better readability than ternary operators
- Supports arrays, objects, and nested structures

### 2. tailwind-merge Library

The `twMerge` function from `tailwind-merge` is used to resolve Tailwind CSS class conflicts:

```javascript
const classes = twMerge(
  className(rest.className, "flex items-center px-3 py-1.5 border", {
    // variant classes
  })
);
```

Benefits:

- Resolves conflicting Tailwind classes
- Maintains the last conflicting class instead of both
- Preserves non-conflicting classes
- Handles complex class combinations efficiently

### 3. Rest Props Pattern

The `...rest` syntax in the component serves multiple purposes:

```javascript
function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  // ... component logic
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
```

Benefits:

- Forwards all standard HTML button attributes
- Enables event handling (onClick, onFocus, etc.)
- Allows accessibility attributes (aria-\*, role, etc.)
- Supports data attributes (data-\*)
- Maintains component flexibility

Example using rest props:

```jsx
<Button
  primary
  onClick={() => console.log("clicked")}
  disabled={true}
  aria-label="Submit form"
  data-testid="submit-button"
>
  Submit
</Button>
```

## Best Practices

1. Always provide a single variant prop (primary, secondary, success, warning, or danger)
2. Combine with outline and rounded props as needed
3. Include descriptive text when using icons
4. Pass additional classes via className prop
5. Use appropriate semantic HTML attributes via rest props

## Complete Examples

```jsx
// Basic usage
<Button primary>Click Me</Button>

// With icon and outline
<Button primary outline>
  <GoBell />
  Notifications
</Button>

// Rounded with custom class
<Button success rounded className="mb-5">
  Submit
</Button>

// With event handling
<Button danger onClick={() => handleDelete()}>
  <GoBug />
  Delete
</Button>

// With accessibility attributes
<Button
  secondary
  aria-label="Close modal"
  role="button"
  disabled={isLoading}
>
  Close
</Button>
```
