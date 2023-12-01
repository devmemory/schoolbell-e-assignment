# How to test

## Assignment1
1. npm i or yarn install
2. npm run test or yarn test

## Assignment2
- open index.html in browser(double click index.html in folder)

## Assignment3
1. npm i or yarn install
2. npm run dev or yarn dev

### environment
- Language: TypeScript, HTML, CSS(modules)
- View Library: React
- Bundler: Vite
- State management: basic hooks

## Folder structure
### src/hooks
- useUserEditor: business logic

### models
- userModel: interface {name, password, error}

### routes
- main: index, components
1. components/UserBox: entire box
2. components/UserBtn: Add User, Confirm
3. components/UserInput: input inside of UserBox
4. components/UserResult: component after confirming

### utils
- constants: user input enum and type
