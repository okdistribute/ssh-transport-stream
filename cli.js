#!/usr/bin/env node
var ssh = require('./')
var args = process.argv.slice(2)
var url = args[0]
var cmd = args[1]

if (!url || !cmd) {
  console.error('ssh-transport-stream [url] [command]')
  process.exit(1)
}

var stream = ssh(url, cmd)
stream.on('data', function (data) {
  console.log(data.toString())
})
stream.on('error', function (err) {
  if (err.level === 'client-authentication') return console.error(err.message)
  if (err.code === 'ENOTFOUND') return console.error('Could not connect to that url.')
  throw err
})
