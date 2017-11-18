<div align="center">
  <h1>Automatic Styles Loader</h1>
  <p>A loader for webpack that automatic add styles to imported file</p>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev auto-styles-loader
```

<h2 align="center">Usage</h2>

The `auto-styles-loader` will try to load styles file if it exists in requested file's directory.

Use the loader either via your webpack config, CLI or inline.

### Example config

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'auto-styles-loader'
        options: {
          files: ['index.css'],
          tryFilename: true
        }
      }
    ]
  }
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`files`](#files)**|`{String|Array(String)}`|`['styles.css', 'style.css', 'main.css']`| Files which should be tried to load|
|**[`tryFilename`](#tryFilename)**|`{Boolean|String|Array(String)}`|`false`|Should it try to load styles file based on requested file name|

### `files`
List of files which loader should try to load from requested file path.

#### Example
**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'auto-styles-loader'
        options: {
          files: ['index.css', 'main.css']
        }
      }
    ]
  }
}
```
```js
const file = require('./path/to/fileName.js');
```
Will try to load `./path/to/index.css` first, and if it doesn't exist `./path/to/main.css`

### `tryFilename`

Tries to also load './[requested_file].css' if set to `true`.
When string is set it will be used as extension. It could be also be array of strings to try multiple files.

#### Examples
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'auto-styles-loader'
        options: {
          tryFilename: true,
          files: ['index.css', 'main.css']
        }
      }
    ]
  }
}
```
```js
const file = require('./path/to/fileName.js');
```
Will try to load `./path/to/fileName.css` first, and then fallback to [`files`](#files) rule.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'auto-styles-loader'
        options: {
          tryFilename: ['.scss', '.css']
        }
      }
    ]
  }
}
```
```js
const file = require('./path/to/fileName.js');
```
Will try to load `./path/to/fileName.scss` first, and if it doesn't exist `./path/to/fileName.css`. After that it will fallback to [`files`](#files) rule.
