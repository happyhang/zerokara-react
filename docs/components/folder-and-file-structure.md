# Folder & File Structure

## Front End Entry Point

All the codes resides in `./src`.

`App.tsx` would be the main component of the app.

## Structures

Feature based folder is adopted in this project. The folders are separated by its business features.

## Special Folders

There are some special folders which serve specific purposes.

All the folders except `styles` are aliased so you can import them directly without specifying their relative path.

```jsx
import Something from `common/components/Something`;
```

|Folder|Purpose|
|---|---|
|`common`|Common components and codes that are used in multiple places.|
|`context`|Codes and logics that spans over the whole app, instead of specific page. Their state normally resides on `context`.|
|`styles`|Global CSS declarations and mixins.|
|`assets`|Place all your static assets (eg. images) here.|
