/**
 * nodeEvents
 * Created by dcorns on 8/20/15.
 * This code demonstrates adding custom events and using readline (note: readline was unstable at the time of this crafting)
 * It is a trivial survey program that takes in an array of question and then collects an array of answers.
 * The survey can only be run once per instantiation.
 */
'use strict';
//require dependencies
var EventEmitter = require('events').EventEmitter,
  readline = require('readline'),

Survey = function(questions){
  this.questions = questions || [];
  this.answers = [];
  this.idx = 0;
  //the readline interface is created when instantiated so when it is closed, it will no longer work
  this.r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  //a recursive function that handles processing of all the questions/answers then sends answers to original caller
  this.ask = function(cb){
    var ctx = this;
    if(this.questions.length > this.idx){
      this.r.question(this.questions[this.idx++] + ' ? ', function(data){
        ctx.answers.push(data);
        ctx.emit('answered', data); //the custom emitter notify when a question has been answered
        ctx.ask(cb); //the recursive call
      });
    }
    else{
      this.r.close(); //Once close the survey will not be able to run again
      cb(this.answers);
    }

  }
};

Survey.prototype = new EventEmitter(); //This is where we get our custom events

var survey = new Survey(['Name', 'Gender', 'Date of Birth']);

survey.on('answered', function(data){ //nothing important here except it demonstrates the use of the custom emitter.
  console.log(data);
});

survey.ask(function(data){
  console.log(data);
});
