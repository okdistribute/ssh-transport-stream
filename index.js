var url = require('url')
var exec = require('ssh-exec')

module.exports = function (transport, cmd) {
  var u = url.parse(transport)
  var protocolName = u.protocol ? u.protocol.slice(0, -1) : 'unknown'
  if (protocolName === 'ssh') return ssh(u, transport, cmd)
  throw new Error('Unsupported protocol.')
}

function ssh (u, transport, cmd) {
  var cwd = transport.slice(6).split('@').pop().split(':')[1] || ''
  cmd = 'PATH="$PATH:/usr/local/bin" ' + cmd
  if (cwd) cmd = 'cd ' + JSON.stringify(cwd) + '; ' + cmd
  var username = u.auth && u.auth.split(':')[0] || process.env.USER
  var password = u.auth && u.auth.split(':')[1] || undefined
  return exec(cmd, {user: username, password: password, host: u.host})
}
