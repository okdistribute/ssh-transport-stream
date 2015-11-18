# ssh-transport-stream

Run a command on the other side of an ssh connection and get back results.

## cli

#### Install
```
npm install -g ssh-transport-stream
```

#### `ssh-transport-stream [url] [command]`


```
$ ssh-transport-stream ssh://me:password@localhost:~ ls
Applications/
Documents/
Downloads/
dev/
```

## JS API

See cli.js for example.

```
npm install ssh-transport-stream
```

#### `ssh-transport-stream(url, command)`

```js
var ssh = require('ssh-transport-stream')
var stream = ssh(url, cmd)
stream.on('data', function (data) {
  console.log(data.toString())
})
```
