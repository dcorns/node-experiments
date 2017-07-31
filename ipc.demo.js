/**
 * ipc-demo
 * Created by dcorns on 7/31/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Demonstrates intercepting inter process comunication by running an infinte loop repying to process signals sent by 'kill' with a console log
 * CTRL-C is also intercepted
 */
'use strict';
setInterval(() => {console.log('Hello Dave')},10000);
console.log(`PID = ${process.pid}`);
process.on('SIGUSR1', () => {
  console.dir('USR1 recieved');
});
process.on('SIGHUP',() => {
  console.dir('HUP recieved');
});
process.on('SIGINT', () => { //CTRL-C
  console.dir('I can\'t do that Dave!');
});
process.on('SIGWINCH', () => { //terminal resized
  console.dir('WINCH called');
});
process.on('SIGQUIT', () => {
  console.log('QUIT recieved');
});
// process.on('SIGSTOP', () => {
//   console.log('STOP recieved');
// }); Dont use this one,