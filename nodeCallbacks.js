/**
 * nodeCallbacks
 * Created by dcorns on 8/20/15.
 */
'use strict';
/**
 * callbacks
 * Created by dcorns on 8/23/15.
 * Demonstrates nested callbacks and taming asynchronous
 */
'use strict';

function run(){
  f1(); f2(); f3();
}

function runWithCb(){
  f1(function(){
    f2(function(){
      f3(function(){
        console.log('the end');
      });
    });
  });
}

//Note that since setTimeout uses a callback as well the call back in f1 and f2 must be fired in the scope the that callback as well
function f1(cb){
  setTimeout(function(){
    console.log('f1');
    if(cb) cb();
  },1000);


}

function f2(cb){
  setTimeout(function(){
    console.log('f2');
    if(cb) cb();
  }, 500);


}
function f3(cb){
  console.log('f3');
  if(cb) cb();
}

//Everybody on the event loop gets logged as soon as they are ready
run();

//Using callbacks the functions are forced to fire in order
runWithCb();
