# Creating a Screen

You can create a screen using any way you prefer as long as you understand the convention and relationship. Refer to the `File Name & Simple Conventions` section for a brief explaination of each file.

## Boilerplate

There is a boilerplate you find in `./example` folder that is able to speed up creation of a new screen.

### Quick Start

1. Create a new folder for the screen.
2. Copy all files from `./example` to the new folder.
3. Rename all the files to appropriate name respective to your screen (remember to preserve the casing of each file).
    - For example, `ExamplePage.jsx` -> `ChangePasswordPage.jsx`.
    - If you are using macOS, make use of the [batch rename](https://www.imore.com/how-rename-multiple-files-once-mac#search) feature in `Finder`.
4. Look into each file in the new folder, search and replace.
5. Look into the `Actions` file, rename the variable and action prefix.
6. (Optional) Delete files that you do not need to use (eg. Mapper, Validation).
7. Start coding!

## File Name & Simple Conventions

### Entry Point

- `index.js`
- Entry point for the component.
- Export necessary items to outside.

### React component

- `ExamplePage.jsx`
- Pascal case
- Ends with `.jsx`
- You can create subcomponents in separate file(s), with the same convention applied.

### SCSS Module

- `examplePage.module.scss`
- camel Case
- Ends with `module.scss` (if not it won't work)

### Slice

- `examplePageSlice.js`
- camel Case
- Put Redux Toolkit slice (reducer & action creators) here.
- Optional until redux is used.

### Saga

- `examplePageSaga.js`
- camel Case
- Put all saga logics in here.
- Optional until saga is used.

### Module

- `examplePageModule.js`
- camel Case
- Declares the reducer and saga used for the screen.
- Follows the schema `redux-dynamic-modules` use.
- Prefer `retained` option to remain `true`.
- Optional until reducer or saga is needed.

### Mapper

- `examplePageMapper.js`
- camel Case
- Used for mapping data from/to remote service.
- Prefers named export.
- Optional. Use when needed.
- If the mapping logic is small enough (less than 5 fields) can put it directly in the consumer too).
