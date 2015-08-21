/**
 * nodeEvents
 * Created by dcorns on 8/20/15.
 * This code demonstrates adding custom events and using readline (note: readline was unstable at the time of this crafting)
 */
'use strict';
var EventEmitter = require('events').EventEmitter,
  readline = require('readline');
var Counter = function(num){
  this.increment = function(){
    num++;
    this.emit('incremented', num);
  }
};
Counter.prototype = new EventEmitter();
var counter = new Counter(1);
var cb = function(count){
  console.log(count);
};

counter.addListener('incremented', cb);
Counter.prototype.hello = function(str){
  console.log('Hello' + str);
};




counter.increment();
counter.increment();
counter.increment();
counter.hello('Dale');
counter.increment();
