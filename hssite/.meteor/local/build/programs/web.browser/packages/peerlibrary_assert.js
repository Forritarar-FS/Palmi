//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var assert;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/peerlibrary_assert/packages/peerlibrary_assert.js                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
(function () {                                                                          // 1
                                                                                        // 2
///////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                               //     // 4
// packages/peerlibrary:assert/client/assert.js                                  //     // 5
//                                                                               //     // 6
///////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                 //     // 8
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0                                // 1   // 9
//                                                                               // 2   // 10
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!                             // 3   // 11
//                                                                               // 4   // 12
// Copyright (c) 2011 Jxck                                                       // 5   // 13
//                                                                               // 6   // 14
// Originally from node.js (http://nodejs.org)                                   // 7   // 15
// Copyright Joyent, Inc.                                                        // 8   // 16
//                                                                               // 9   // 17
// Permission is hereby granted, free of charge, to any person obtaining a copy  // 10  // 18
// of this software and associated documentation files (the 'Software'), to      // 11  // 19
// deal in the Software without restriction, including without limitation the    // 12  // 20
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or   // 13  // 21
// sell copies of the Software, and to permit persons to whom the Software is    // 14  // 22
// furnished to do so, subject to the following conditions:                      // 15  // 23
//                                                                               // 16  // 24
// The above copyright notice and this permission notice shall be included in    // 17  // 25
// all copies or substantial portions of the Software.                           // 18  // 26
//                                                                               // 19  // 27
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR    // 20  // 28
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,      // 21  // 29
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE   // 22  // 30
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN    // 23  // 31
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION  // 24  // 32
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.               // 25  // 33
                                                                                 // 26  // 34
(function(global) {                                                              // 27  // 35
                                                                                 // 28  // 36
// Object.create compatible in IE                                                // 29  // 37
var create = Object.create || function(p) {                                      // 30  // 38
  if (!p) throw Error('no type');                                                // 31  // 39
  function f() {};                                                               // 32  // 40
  f.prototype = p;                                                               // 33  // 41
  return new f();                                                                // 34  // 42
};                                                                               // 35  // 43
                                                                                 // 36  // 44
// UTILITY                                                                       // 37  // 45
var util = {                                                                     // 38  // 46
  inherits: function(ctor, superCtor) {                                          // 39  // 47
    ctor.super_ = superCtor;                                                     // 40  // 48
    ctor.prototype = create(superCtor.prototype, {                               // 41  // 49
      constructor: {                                                             // 42  // 50
        value: ctor,                                                             // 43  // 51
        enumerable: false,                                                       // 44  // 52
        writable: true,                                                          // 45  // 53
        configurable: true                                                       // 46  // 54
      }                                                                          // 47  // 55
    });                                                                          // 48  // 56
  },                                                                             // 49  // 57
  isArray: function(ar) {                                                        // 50  // 58
    return Array.isArray(ar);                                                    // 51  // 59
  },                                                                             // 52  // 60
  isBoolean: function(arg) {                                                     // 53  // 61
    return typeof arg === 'boolean';                                             // 54  // 62
  },                                                                             // 55  // 63
  isNull: function(arg) {                                                        // 56  // 64
    return arg === null;                                                         // 57  // 65
  },                                                                             // 58  // 66
  isNullOrUndefined: function(arg) {                                             // 59  // 67
    return arg == null;                                                          // 60  // 68
  },                                                                             // 61  // 69
  isNumber: function(arg) {                                                      // 62  // 70
    return typeof arg === 'number';                                              // 63  // 71
  },                                                                             // 64  // 72
  isString: function(arg) {                                                      // 65  // 73
    return typeof arg === 'string';                                              // 66  // 74
  },                                                                             // 67  // 75
  isSymbol: function(arg) {                                                      // 68  // 76
    return typeof arg === 'symbol';                                              // 69  // 77
  },                                                                             // 70  // 78
  isUndefined: function(arg) {                                                   // 71  // 79
    return arg === void 0;                                                       // 72  // 80
  },                                                                             // 73  // 81
  isRegExp: function(re) {                                                       // 74  // 82
    return util.isObject(re) && util.objectToString(re) === '[object RegExp]';   // 75  // 83
  },                                                                             // 76  // 84
  isObject: function(arg) {                                                      // 77  // 85
    return typeof arg === 'object' && arg !== null;                              // 78  // 86
  },                                                                             // 79  // 87
  isDate: function(d) {                                                          // 80  // 88
    return util.isObject(d) && util.objectToString(d) === '[object Date]';       // 81  // 89
  },                                                                             // 82  // 90
  isError: function(e) {                                                         // 83  // 91
    return isObject(e) &&                                                        // 84  // 92
      (objectToString(e) === '[object Error]' || e instanceof Error);            // 85  // 93
  },                                                                             // 86  // 94
  isFunction: function(arg) {                                                    // 87  // 95
    return typeof arg === 'function';                                            // 88  // 96
  },                                                                             // 89  // 97
  isPrimitive: function(arg) {                                                   // 90  // 98
    return arg === null ||                                                       // 91  // 99
      typeof arg === 'boolean' ||                                                // 92  // 100
      typeof arg === 'number' ||                                                 // 93  // 101
      typeof arg === 'string' ||                                                 // 94  // 102
      typeof arg === 'symbol' ||  // ES6 symbol                                  // 95  // 103
      typeof arg === 'undefined';                                                // 96  // 104
  },                                                                             // 97  // 105
  objectToString: function(o) {                                                  // 98  // 106
    return Object.prototype.toString.call(o);                                    // 99  // 107
  }                                                                              // 100
};                                                                               // 101
                                                                                 // 102
var pSlice = Array.prototype.slice;                                              // 103
                                                                                 // 104
// from https://github.com/substack/node-deep-equal                              // 105
var Object_keys = typeof Object.keys === 'function'                              // 106
    ? Object.keys                                                                // 107
    : function (obj) {                                                           // 108
        var keys = [];                                                           // 109
        for (var key in obj) keys.push(key);                                     // 110
        return keys;                                                             // 111
    }                                                                            // 112
;                                                                                // 113
                                                                                 // 114
// 1. The assert module provides functions that throw                            // 115
// AssertionError's when particular conditions are not met. The                  // 116
// assert module must conform to the following interface.                        // 117
                                                                                 // 118
var assert = ok;                                                                 // 119
                                                                                 // 120
global['assert'] = assert;                                                       // 121
                                                                                 // 122
if (typeof module === 'object' && typeof module.exports === 'object') {          // 123
  module.exports = assert;                                                       // 124
};                                                                               // 125
                                                                                 // 126
// 2. The AssertionError is defined in assert.                                   // 127
// new assert.AssertionError({ message: message,                                 // 128
//                             actual: actual,                                   // 129
//                             expected: expected })                             // 130
                                                                                 // 131
assert.AssertionError = function AssertionError(options) {                       // 132
  this.name = 'AssertionError';                                                  // 133
  this.actual = options.actual;                                                  // 134
  this.expected = options.expected;                                              // 135
  this.operator = options.operator;                                              // 136
  if (options.message) {                                                         // 137
    this.message = options.message;                                              // 138
    this.generatedMessage = false;                                               // 139
  } else {                                                                       // 140
    this.message = getMessage(this);                                             // 141
    this.generatedMessage = true;                                                // 142
  }                                                                              // 143
  var stackStartFunction = options.stackStartFunction || fail;                   // 144
                                                                                 // 145
  if (Error.captureStackTrace) {                                                 // 146
    Error.captureStackTrace(this, stackStartFunction);                           // 147
  } else {                                                                       // 148
    // try to throw an error now, and from the stack property                    // 149
    // work out the line that called in to assert.js.                            // 150
    try {                                                                        // 151
      this.stack = (new Error).stack.toString();                                 // 152
    } catch (e) {}                                                               // 153
  }                                                                              // 154
};                                                                               // 155
                                                                                 // 156
// assert.AssertionError instanceof Error                                        // 157
util.inherits(assert.AssertionError, Error);                                     // 158
                                                                                 // 159
function replacer(key, value) {                                                  // 160
  if (util.isUndefined(value)) {                                                 // 161
    return '' + value;                                                           // 162
  }                                                                              // 163
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {              // 164
    return value.toString();                                                     // 165
  }                                                                              // 166
  if (util.isFunction(value) || util.isRegExp(value)) {                          // 167
    return value.toString();                                                     // 168
  }                                                                              // 169
  return value;                                                                  // 170
}                                                                                // 171
                                                                                 // 172
function truncate(s, n) {                                                        // 173
  if (util.isString(s)) {                                                        // 174
    return s.length < n ? s : s.slice(0, n);                                     // 175
  } else {                                                                       // 176
    return s;                                                                    // 177
  }                                                                              // 178
}                                                                                // 179
                                                                                 // 180
function getMessage(self) {                                                      // 181
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +            // 182
         self.operator + ' ' +                                                   // 183
         truncate(JSON.stringify(self.expected, replacer), 128);                 // 184
}                                                                                // 185
                                                                                 // 186
// At present only the three keys mentioned above are used and                   // 187
// understood by the spec. Implementations or sub modules can pass               // 188
// other keys to the AssertionError's constructor - they will be                 // 189
// ignored.                                                                      // 190
                                                                                 // 191
// 3. All of the following functions must throw an AssertionError                // 192
// when a corresponding condition is not met, with a message that                // 193
// may be undefined if not provided.  All assertion methods provide              // 194
// both the actual and expected values to the assertion error for                // 195
// display purposes.                                                             // 196
                                                                                 // 197
function fail(actual, expected, message, operator, stackStartFunction) {         // 198
  throw new assert.AssertionError({                                              // 199
    message: message,                                                            // 200
    actual: actual,                                                              // 201
    expected: expected,                                                          // 202
    operator: operator,                                                          // 203
    stackStartFunction: stackStartFunction                                       // 204
  });                                                                            // 205
}                                                                                // 206
                                                                                 // 207
// EXTENSION! allows for well behaved errors defined elsewhere.                  // 208
assert.fail = fail;                                                              // 209
                                                                                 // 210
// 4. Pure assertion tests whether a value is truthy, as determined              // 211
// by !!guard.                                                                   // 212
// assert.ok(guard, message_opt);                                                // 213
// This statement is equivalent to assert.equal(true, !!guard,                   // 214
// message_opt);. To test strictly for the value true, use                       // 215
// assert.strictEqual(true, guard, message_opt);.                                // 216
                                                                                 // 217
function ok(value, message) {                                                    // 218
  if (!value) fail(value, true, message, '==', assert.ok);                       // 219
}                                                                                // 220
assert.ok = ok;                                                                  // 221
                                                                                 // 222
// 5. The equality assertion tests shallow, coercive equality with               // 223
// ==.                                                                           // 224
// assert.equal(actual, expected, message_opt);                                  // 225
                                                                                 // 226
assert.equal = function equal(actual, expected, message) {                       // 227
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);   // 228
};                                                                               // 229
                                                                                 // 230
// 6. The non-equality assertion tests for whether two objects are not equal     // 231
// with != assert.notEqual(actual, expected, message_opt);                       // 232
                                                                                 // 233
assert.notEqual = function notEqual(actual, expected, message) {                 // 234
  if (actual == expected) {                                                      // 235
    fail(actual, expected, message, '!=', assert.notEqual);                      // 236
  }                                                                              // 237
};                                                                               // 238
                                                                                 // 239
// 7. The equivalence assertion tests a deep equality relation.                  // 240
// assert.deepEqual(actual, expected, message_opt);                              // 241
                                                                                 // 242
assert.deepEqual = function deepEqual(actual, expected, message) {               // 243
  if (!_deepEqual(actual, expected)) {                                           // 244
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);              // 245
  }                                                                              // 246
};                                                                               // 247
                                                                                 // 248
function _deepEqual(actual, expected) {                                          // 249
  // 7.1. All identical values are equivalent, as determined by ===.             // 250
  if (actual === expected) {                                                     // 251
    return true;                                                                 // 252
                                                                                 // 253
  // } else if (util.isBuffer(actual) && util.isBuffer(expected)) {              // 254
  //   if (actual.length != expected.length) return false;                       // 255
  //                                                                             // 256
  //   for (var i = 0; i < actual.length; i++) {                                 // 257
  //     if (actual[i] !== expected[i]) return false;                            // 258
  //   }                                                                         // 259
  //                                                                             // 260
  //   return true;                                                              // 261
                                                                                 // 262
  // 7.2. If the expected value is a Date object, the actual value is            // 263
  // equivalent if it is also a Date object that refers to the same time.        // 264
  } else if (util.isDate(actual) && util.isDate(expected)) {                     // 265
    return actual.getTime() === expected.getTime();                              // 266
                                                                                 // 267
  // 7.3 If the expected value is a RegExp object, the actual value is           // 268
  // equivalent if it is also a RegExp object with the same source and           // 269
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).              // 270
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {                 // 271
    return actual.source === expected.source &&                                  // 272
           actual.global === expected.global &&                                  // 273
           actual.multiline === expected.multiline &&                            // 274
           actual.lastIndex === expected.lastIndex &&                            // 275
           actual.ignoreCase === expected.ignoreCase;                            // 276
                                                                                 // 277
  // 7.4. Other pairs that do not both pass typeof value == 'object',            // 278
  // equivalence is determined by ==.                                            // 279
  } else if (!util.isObject(actual) && !util.isObject(expected)) {               // 280
    return actual == expected;                                                   // 281
                                                                                 // 282
  // 7.5 For all other Object pairs, including Array objects, equivalence is     // 283
  // determined by having the same number of owned properties (as verified       // 284
  // with Object.prototype.hasOwnProperty.call), the same set of keys            // 285
  // (although not necessarily the same order), equivalent values for every      // 286
  // corresponding key, and an identical 'prototype' property. Note: this        // 287
  // accounts for both named and indexed properties on Arrays.                   // 288
  } else {                                                                       // 289
    return objEquiv(actual, expected);                                           // 290
  }                                                                              // 291
}                                                                                // 292
                                                                                 // 293
function isArguments(object) {                                                   // 294
  return Object.prototype.toString.call(object) == '[object Arguments]';         // 295
}                                                                                // 296
                                                                                 // 297
function objEquiv(a, b) {                                                        // 298
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))                    // 299
    return false;                                                                // 300
  // an identical 'prototype' property.                                          // 301
  if (a.prototype !== b.prototype) return false;                                 // 302
  //~~~I've managed to break Object.keys through screwy arguments passing.       // 303
  //   Converting to array solves the problem.                                   // 304
  if (isArguments(a)) {                                                          // 305
    if (!isArguments(b)) {                                                       // 306
      return false;                                                              // 307
    }                                                                            // 308
    a = pSlice.call(a);                                                          // 309
    b = pSlice.call(b);                                                          // 310
    return _deepEqual(a, b);                                                     // 311
  }                                                                              // 312
  try {                                                                          // 313
    var ka = Object_keys(a),                                                     // 314
        kb = Object_keys(b),                                                     // 315
        key, i;                                                                  // 316
  } catch (e) {//happens when one is a string literal and the other isn't        // 317
    return false;                                                                // 318
  }                                                                              // 319
  // having the same number of owned properties (keys incorporates               // 320
  // hasOwnProperty)                                                             // 321
  if (ka.length != kb.length)                                                    // 322
    return false;                                                                // 323
  //the same set of keys (although not necessarily the same order),              // 324
  ka.sort();                                                                     // 325
  kb.sort();                                                                     // 326
  //~~~cheap key test                                                            // 327
  for (i = ka.length - 1; i >= 0; i--) {                                         // 328
    if (ka[i] != kb[i])                                                          // 329
      return false;                                                              // 330
  }                                                                              // 331
  //equivalent values for every corresponding key, and                           // 332
  //~~~possibly expensive deep test                                              // 333
  for (i = ka.length - 1; i >= 0; i--) {                                         // 334
    key = ka[i];                                                                 // 335
    if (!_deepEqual(a[key], b[key])) return false;                               // 336
  }                                                                              // 337
  return true;                                                                   // 338
}                                                                                // 339
                                                                                 // 340
// 8. The non-equivalence assertion tests for any deep inequality.               // 341
// assert.notDeepEqual(actual, expected, message_opt);                           // 342
                                                                                 // 343
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {         // 344
  if (_deepEqual(actual, expected)) {                                            // 345
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);        // 346
  }                                                                              // 347
};                                                                               // 348
                                                                                 // 349
// 9. The strict equality assertion tests strict equality, as determined by ===. // 350
// assert.strictEqual(actual, expected, message_opt);                            // 351
                                                                                 // 352
assert.strictEqual = function strictEqual(actual, expected, message) {           // 353
  if (actual !== expected) {                                                     // 354
    fail(actual, expected, message, '===', assert.strictEqual);                  // 355
  }                                                                              // 356
};                                                                               // 357
                                                                                 // 358
// 10. The strict non-equality assertion tests for strict inequality, as         // 359
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);     // 360
                                                                                 // 361
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {     // 362
  if (actual === expected) {                                                     // 363
    fail(actual, expected, message, '!==', assert.notStrictEqual);               // 364
  }                                                                              // 365
};                                                                               // 366
                                                                                 // 367
function expectedException(actual, expected) {                                   // 368
  if (!actual || !expected) {                                                    // 369
    return false;                                                                // 370
  }                                                                              // 371
                                                                                 // 372
  if (Object.prototype.toString.call(expected) == '[object RegExp]') {           // 373
    return expected.test(actual);                                                // 374
  } else if (actual instanceof expected) {                                       // 375
    return true;                                                                 // 376
  } else if (expected.call({}, actual) === true) {                               // 377
    return true;                                                                 // 378
  }                                                                              // 379
                                                                                 // 380
  return false;                                                                  // 381
}                                                                                // 382
                                                                                 // 383
function _throws(shouldThrow, block, expected, message) {                        // 384
  var actual;                                                                    // 385
                                                                                 // 386
  if (util.isString(expected)) {                                                 // 387
    message = expected;                                                          // 388
    expected = null;                                                             // 389
  }                                                                              // 390
                                                                                 // 391
  try {                                                                          // 392
    block();                                                                     // 393
  } catch (e) {                                                                  // 394
    actual = e;                                                                  // 395
  }                                                                              // 396
                                                                                 // 397
  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +    // 398
            (message ? ' ' + message : '.');                                     // 399
                                                                                 // 400
  if (shouldThrow && !actual) {                                                  // 401
    fail(actual, expected, 'Missing expected exception' + message);              // 402
  }                                                                              // 403
                                                                                 // 404
  if (!shouldThrow && expectedException(actual, expected)) {                     // 405
    fail(actual, expected, 'Got unwanted exception' + message);                  // 406
  }                                                                              // 407
                                                                                 // 408
  if ((shouldThrow && actual && expected &&                                      // 409
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {       // 410
    throw actual;                                                                // 411
  }                                                                              // 412
}                                                                                // 413
                                                                                 // 414
// 11. Expected to throw an error:                                               // 415
// assert.throws(block, Error_opt, message_opt);                                 // 416
                                                                                 // 417
assert.throws = function(block, /*optional*/error, /*optional*/message) {        // 418
  _throws.apply(this, [true].concat(pSlice.call(arguments)));                    // 419
};                                                                               // 420
                                                                                 // 421
// EXTENSION! This is annoying to write outside this module.                     // 422
assert.doesNotThrow = function(block, /*optional*/message) {                     // 423
  _throws.apply(this, [false].concat(pSlice.call(arguments)));                   // 424
};                                                                               // 425
                                                                                 // 426
assert.ifError = function(err) { if (err) {throw err;}};                         // 427
                                                                                 // 428
if (typeof define === 'function' && define.amd) {                                // 429
  define('assert', function () {                                                 // 430
    return assert;                                                               // 431
  });                                                                            // 432
}                                                                                // 433
                                                                                 // 434
})(this);                                                                        // 435
                                                                                 // 436
                                                                                 // 437
///////////////////////////////////////////////////////////////////////////////////     // 446
                                                                                        // 447
}).call(this);                                                                          // 448
                                                                                        // 449
                                                                                        // 450
                                                                                        // 451
                                                                                        // 452
                                                                                        // 453
                                                                                        // 454
(function () {                                                                          // 455
                                                                                        // 456
///////////////////////////////////////////////////////////////////////////////////     // 457
//                                                                               //     // 458
// packages/peerlibrary:assert/export-assert.js                                  //     // 459
//                                                                               //     // 460
///////////////////////////////////////////////////////////////////////////////////     // 461
                                                                                 //     // 462
assert = this.assert;                                                            // 1   // 463
///////////////////////////////////////////////////////////////////////////////////     // 464
                                                                                        // 465
}).call(this);                                                                          // 466
                                                                                        // 467
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['peerlibrary:assert'] = {
  assert: assert
};

})();
