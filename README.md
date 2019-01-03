# react-native-tag-editor

Tag editor for React Native. Works on both ios and android.
TextInput with tag support (e.g. hashtag or mentions). Highlighting of mentions.

## Demo

![alt text](screens/screen1.gif "Screenshots")
![alt text](screens/screen2.gif "Screenshots")

## Installation

`yarn add react-native-tag-editor`
or
`npm install --save react-native-tag-editor`

## Usage

```js
import Editor from "react-native-tag-editor";

<Editor
  inputValue={this.state.value}
  trigger={["@"]}
  triggerMock={["NAME"]}
  triggerCallback={[this.mentionCallback]}
  suggestionsData={[this.state.mentions]}
  triggerLocation={"new-word-only"} // 'new-word-only', 'anywhere'
  onChange={this.onChange}
  MaxVisibleRowCount={3}
  fontSize={13}
  mentionColor="#ccc"
  borderColor="#ccc"
/>;
```

## Example

Check full example in the `sample` folder.

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Andriy Stabryn
