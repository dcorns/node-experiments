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


var r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Survey = function(questions){
  this.questions = questions || [];
  this.answers = [];
  this.r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  this.ask = function(q){
    var ctx = this;
    this.r.question(q, function(data){
      ctx.answers.push(data);
      ctx.r.close();
      ctx.emit('answered', ctx.answers);
    });
  }
};

Survey.prototype = new EventEmitter();

//Survey.prototype.ask = function(q){
//  var ctx = this;
//  this.r.question(q, function(data){
//    ctx.answers.push(data);
//    ctx.r.close();
//    this.emit('answered', ctx.answers);
//  });
//};

Survey.prototype.run = function(){
  this.ask(this.questions[0] + '? ');
  console.log(this.answers);
};


var survey = new Survey(['Name', 'Gender', 'Date of Birth']);
survey.on('answered', function(data){
  console.dir(data + ' answered');
  survey.ask();
});
survey.run();


//survey.questions.forEach(function(q){
//  console.log(q);
//});
//var a = [];
//function ask(cb){
//  r.question('What is your Name? ', function(data){
//    a.push(data);
//    r.question('dob? ', function(data){
//      a.push(data);
//      cb();
//    });
//  });
//
//}



//ask(function(){
//  console.log('Hello ' + a);
//  r.close();
//});









//counter.increment();
//counter.increment();
//counter.increment();
//counter.hello('Dale');
//counter.increment();
