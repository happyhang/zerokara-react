# Redux & Saga & Global State

We are using `redux` to store and maintain our global application state, with help of `redux-saga` to perform certain logic or coordinations (the most usual thing is to run the code to call API).

## Action Name Conventions

The following convention is set for the action names:

- Use upper case with underscore `THIS_IS_AN_ACTION` for action name constants.
- Use _camelCase_ `thisIsAnAction` for action creators.
  - The action creator name **must** match the action name exactly.
- **DO NOT** reuse the same action to perform logic on saga **AND** set something on reducer (except on some edge cases).
  - Because you cannot guarantee saga will run first or new state will update first.
  - Also it makes code harder to read.
- Use `SET_` prefix on an action to indicate this action is used to set something on reducer.
  - It is highly encouraged to name the action **exactly the same** as the reducer property name.
    - eg. `SET_IS_LOADING` will set the `isLoading` field.
  - It is highly encourgaged that one action **only** sets one field on reducer.
  - Consider using fixed special action with name `SET_INITIAL_STATE` that resets the reducer state to its default.
  - _Notes on performance_: Some basic observations show that in most cases putting multiple actions would still result in a single render from React. But this might not be true, read on [this](https://redux.js.org/faq/performance#how-can-i-reduce-the-number-of-store-update-events) for more information about this and possible ways to overcome this (eg. [`redux-batch`](https://github.com/manaflair/redux-batch)).
- Anything other than the fixed prefix indicates that this action would be captured by saga to perform code logics.

For simple examples can refer to `src/auth/SignUp/signUpActions` file.

## Dynamic Saga Reducer Loader

This project is using [`redux-dynamic-modules`](https://github.com/microsoft/redux-dynamic-modules) library to dynamically loads/combine reducers and sagas when a page is loaded.

The main reason to do this is to more couple the reducer and saga to the screen itself (hence easier to read/maintain and to reduce the need to declare stuffs in centralized manner (eg. in `sagas.js` or `reducers.js`). In future this can help in doing code splitting too as it makes the saga and reducer can be lazy loaded.

Doing it this way in most cases will have no impact on how you write codes. Just make sure that you **do not directly reference** the state of other screens (it is not advisable to do that anyway).

On how to add a new saga/reducer that is associated to a screen, please refer to `src/home/homePageModule`.
