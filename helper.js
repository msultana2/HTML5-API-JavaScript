/*
    Kent State University
    CS 44105/54105 Web Programming I
    Fall 2017
    Assignment 3
    The World’s Hardest Game 2 Remake
    helper.js
    Author 1: Abdulkareem Alali, aalali1@kent.edu
    Author 2: Most Arjuman Sultana, msultana@kent.edu
*/

Function.prototype.construct = function(argArray) { 
    //Unpacks arrays into a constructor arguments
    var constr = this;
    var inst = Object.create(constr.prototype);
    constr.apply(inst, argArray);
    return inst;
};