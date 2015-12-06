(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var _ = Package.underscore._;
var assert = Package['peerlibrary:assert'].assert;

/* Package-scope variables */
var __coffeescriptShare, BaseComponent, BaseComponentDebug;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/peerlibrary_base-component/packages/peerlibrary_base-component.js                                      //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
(function () {                                                                                                     // 1
                                                                                                                   // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/peerlibrary:base-component/lib.coffee.js                                                            //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ComponentsNamespace, arrayReferenceEquals, createNamespace, getComponent, getNamespace, getPathAndName, isolateValue, setComponent,               
  __hasProp = {}.hasOwnProperty;                                                                                   // 11
                                                                                                                   // 12
arrayReferenceEquals = function(a, b) {                                                                            // 13
  var i, _i, _ref;                                                                                                 // 14
  if (a.length !== b.length) {                                                                                     // 15
    return false;                                                                                                  // 16
  }                                                                                                                // 17
  for (i = _i = 0, _ref = a.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {              // 18
    if (a[i] !== b[i]) {                                                                                           // 19
      return false;                                                                                                // 20
    }                                                                                                              // 21
  }                                                                                                                // 22
  return true;                                                                                                     // 23
};                                                                                                                 // 24
                                                                                                                   // 25
isolateValue = function(fn) {                                                                                      // 26
  var dependency, lastValue;                                                                                       // 27
  if (!Tracker.active) {                                                                                           // 28
    return fn();                                                                                                   // 29
  }                                                                                                                // 30
  lastValue = null;                                                                                                // 31
  dependency = new Tracker.Dependency();                                                                           // 32
  Tracker.autorun(function(computation) {                                                                          // 33
    var value;                                                                                                     // 34
    value = fn();                                                                                                  // 35
    if (computation.firstRun) {                                                                                    // 36
      return lastValue = value;                                                                                    // 37
    } else {                                                                                                       // 38
      if (!arrayReferenceEquals(value, lastValue)) {                                                               // 39
        return dependency.changed();                                                                               // 40
      }                                                                                                            // 41
    }                                                                                                              // 42
  });                                                                                                              // 43
  dependency.depend();                                                                                             // 44
  return lastValue;                                                                                                // 45
};                                                                                                                 // 46
                                                                                                                   // 47
ComponentsNamespace = (function() {                                                                                // 48
  function ComponentsNamespace() {}                                                                                // 49
                                                                                                                   // 50
  ComponentsNamespace.COMPONENTS_FIELD = '';                                                                       // 51
                                                                                                                   // 52
  return ComponentsNamespace;                                                                                      // 53
                                                                                                                   // 54
})();                                                                                                              // 55
                                                                                                                   // 56
getPathAndName = function(name) {                                                                                  // 57
  var path;                                                                                                        // 58
  assert(name);                                                                                                    // 59
  path = name.split('.');                                                                                          // 60
  name = path.pop();                                                                                               // 61
  assert(name);                                                                                                    // 62
  return {                                                                                                         // 63
    path: path,                                                                                                    // 64
    name: name                                                                                                     // 65
  };                                                                                                               // 66
};                                                                                                                 // 67
                                                                                                                   // 68
getNamespace = function(components, path) {                                                                        // 69
  var match, segment;                                                                                              // 70
  assert(_.isObject(components));                                                                                  // 71
  assert(_.isArray(path));                                                                                         // 72
  match = components;                                                                                              // 73
  while ((segment = path.shift()) != null) {                                                                       // 74
    match = match[segment];                                                                                        // 75
    if (!_.isObject(match)) {                                                                                      // 76
      return null;                                                                                                 // 77
    }                                                                                                              // 78
  }                                                                                                                // 79
  if (!_.isObject(match)) {                                                                                        // 80
    return null;                                                                                                   // 81
  }                                                                                                                // 82
  return match || null;                                                                                            // 83
};                                                                                                                 // 84
                                                                                                                   // 85
createNamespace = function(components, path) {                                                                     // 86
  var match, segment;                                                                                              // 87
  assert(_.isObject(components));                                                                                  // 88
  assert(_.isArray(path));                                                                                         // 89
  match = components;                                                                                              // 90
  while ((segment = path.shift()) != null) {                                                                       // 91
    if (!(segment in match)) {                                                                                     // 92
      match[segment] = new components.constructor();                                                               // 93
    }                                                                                                              // 94
    match = match[segment];                                                                                        // 95
    assert(_.isObject(match));                                                                                     // 96
  }                                                                                                                // 97
  assert(_.isObject(match));                                                                                       // 98
  return match;                                                                                                    // 99
};                                                                                                                 // 100
                                                                                                                   // 101
getComponent = function(components, name) {                                                                        // 102
  var namespace, path, _ref, _ref1;                                                                                // 103
  assert(_.isObject(components));                                                                                  // 104
  if (!name) {                                                                                                     // 105
    return null;                                                                                                   // 106
  }                                                                                                                // 107
  _ref = getPathAndName(name), path = _ref.path, name = _ref.name;                                                 // 108
  namespace = getNamespace(components, path);                                                                      // 109
  if (!namespace) {                                                                                                // 110
    return null;                                                                                                   // 111
  }                                                                                                                // 112
  return ((_ref1 = namespace[components.constructor.COMPONENTS_FIELD]) != null ? _ref1[name] : void 0) || null;    // 113
};                                                                                                                 // 114
                                                                                                                   // 115
setComponent = function(components, name, component) {                                                             // 116
  var namespace, path, _name, _ref;                                                                                // 117
  assert(_.isObject(components));                                                                                  // 118
  assert(name);                                                                                                    // 119
  assert(component);                                                                                               // 120
  _ref = getPathAndName(name), path = _ref.path, name = _ref.name;                                                 // 121
  namespace = createNamespace(components, path);                                                                   // 122
  if (namespace[_name = components.constructor.COMPONENTS_FIELD] == null) {                                        // 123
    namespace[_name] = new components.constructor();                                                               // 124
  }                                                                                                                // 125
  assert(!(name in namespace[components.constructor.COMPONENTS_FIELD]));                                           // 126
  return namespace[components.constructor.COMPONENTS_FIELD][name] = component;                                     // 127
};                                                                                                                 // 128
                                                                                                                   // 129
BaseComponent = (function() {                                                                                      // 130
  function BaseComponent() {}                                                                                      // 131
                                                                                                                   // 132
  BaseComponent.components = new ComponentsNamespace();                                                            // 133
                                                                                                                   // 134
  BaseComponent.register = function(componentName, componentClass) {                                               // 135
    if (!componentName) {                                                                                          // 136
      throw new Error("Component name is required for registration.");                                             // 137
    }                                                                                                              // 138
    if (componentClass == null) {                                                                                  // 139
      componentClass = this;                                                                                       // 140
    }                                                                                                              // 141
    if (getComponent(this.components, componentName)) {                                                            // 142
      throw new Error("Component '" + componentName + "' already registered.");                                    // 143
    }                                                                                                              // 144
    if (componentClass.componentName() && componentClass.componentName() !== componentName && getComponent(this.components, componentClass.componentName()) === componentClass) {
      throw new Error("Component '" + componentName + "' already registered under the name '" + (componentClass.componentName()) + "'.");
    }                                                                                                              // 147
    componentClass.componentName(componentName);                                                                   // 148
    assert.equal(componentClass.componentName(), componentName);                                                   // 149
    setComponent(this.components, componentName, componentClass);                                                  // 150
    return this;                                                                                                   // 151
  };                                                                                                               // 152
                                                                                                                   // 153
  BaseComponent.getComponent = function(componentsNamespace, componentName) {                                      // 154
    if (!componentName) {                                                                                          // 155
      componentName = componentsNamespace;                                                                         // 156
      componentsNamespace = this.components;                                                                       // 157
    }                                                                                                              // 158
    if (!componentName) {                                                                                          // 159
      return null;                                                                                                 // 160
    }                                                                                                              // 161
    if (!_.isString(componentName)) {                                                                              // 162
      throw new Error("Component name '" + componentName + "' is not a string.");                                  // 163
    }                                                                                                              // 164
    return getComponent(componentsNamespace, componentName);                                                       // 165
  };                                                                                                               // 166
                                                                                                                   // 167
  BaseComponent.componentName = function(componentName) {                                                          // 168
    if (componentName) {                                                                                           // 169
      this._componentName = componentName;                                                                         // 170
      return this;                                                                                                 // 171
    }                                                                                                              // 172
    return this._componentName || null;                                                                            // 173
  };                                                                                                               // 174
                                                                                                                   // 175
  BaseComponent.prototype.componentName = function() {                                                             // 176
    return this.constructor.componentName();                                                                       // 177
  };                                                                                                               // 178
                                                                                                                   // 179
  BaseComponent.prototype.componentChildren = function(nameOrComponent) {                                          // 180
    var child, _base;                                                                                              // 181
    if (this._componentInternals == null) {                                                                        // 182
      this._componentInternals = {};                                                                               // 183
    }                                                                                                              // 184
    if ((_base = this._componentInternals).componentChildren == null) {                                            // 185
      _base.componentChildren = new ReactiveVar([], arrayReferenceEquals);                                         // 186
    }                                                                                                              // 187
    if (!nameOrComponent) {                                                                                        // 188
      return (function() {                                                                                         // 189
        var _i, _len, _ref, _results;                                                                              // 190
        _ref = this._componentInternals.componentChildren.get();                                                   // 191
        _results = [];                                                                                             // 192
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                        // 193
          child = _ref[_i];                                                                                        // 194
          _results.push(child);                                                                                    // 195
        }                                                                                                          // 196
        return _results;                                                                                           // 197
      }).call(this);                                                                                               // 198
    }                                                                                                              // 199
    if (_.isString(nameOrComponent)) {                                                                             // 200
      return this.componentChildrenWith((function(_this) {                                                         // 201
        return function(child, parent) {                                                                           // 202
          return child.componentName() === nameOrComponent;                                                        // 203
        };                                                                                                         // 204
      })(this));                                                                                                   // 205
    } else {                                                                                                       // 206
      return this.componentChildrenWith((function(_this) {                                                         // 207
        return function(child, parent) {                                                                           // 208
          if (child.constructor === nameOrComponent) {                                                             // 209
            return true;                                                                                           // 210
          }                                                                                                        // 211
          if (child === nameOrComponent) {                                                                         // 212
            return true;                                                                                           // 213
          }                                                                                                        // 214
          return false;                                                                                            // 215
        };                                                                                                         // 216
      })(this));                                                                                                   // 217
    }                                                                                                              // 218
  };                                                                                                               // 219
                                                                                                                   // 220
  BaseComponent.prototype.componentChildrenWith = function(propertyOrMatcherOrFunction) {                          // 221
    var matcher, property;                                                                                         // 222
    if (_.isString(propertyOrMatcherOrFunction)) {                                                                 // 223
      property = propertyOrMatcherOrFunction;                                                                      // 224
      propertyOrMatcherOrFunction = (function(_this) {                                                             // 225
        return function(child, parent) {                                                                           // 226
          return property in child;                                                                                // 227
        };                                                                                                         // 228
      })(this);                                                                                                    // 229
    } else if (!_.isFunction(propertyOrMatcherOrFunction)) {                                                       // 230
      assert(_.isObject(propertyOrMatcherOrFunction));                                                             // 231
      matcher = propertyOrMatcherOrFunction;                                                                       // 232
      propertyOrMatcherOrFunction = (function(_this) {                                                             // 233
        return function(child, parent) {                                                                           // 234
          var value;                                                                                               // 235
          for (property in matcher) {                                                                              // 236
            value = matcher[property];                                                                             // 237
            if (!(property in child)) {                                                                            // 238
              return false;                                                                                        // 239
            }                                                                                                      // 240
            if (_.isFunction(child[property])) {                                                                   // 241
              if (child[property]() !== value) {                                                                   // 242
                return false;                                                                                      // 243
              }                                                                                                    // 244
            } else {                                                                                               // 245
              if (child[property] !== value) {                                                                     // 246
                return false;                                                                                      // 247
              }                                                                                                    // 248
            }                                                                                                      // 249
          }                                                                                                        // 250
          return true;                                                                                             // 251
        };                                                                                                         // 252
      })(this);                                                                                                    // 253
    }                                                                                                              // 254
    return isolateValue((function(_this) {                                                                         // 255
      return function() {                                                                                          // 256
        var child, _i, _len, _ref, _results;                                                                       // 257
        _ref = _this.componentChildren();                                                                          // 258
        _results = [];                                                                                             // 259
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                        // 260
          child = _ref[_i];                                                                                        // 261
          if (propertyOrMatcherOrFunction.call(_this, child, _this)) {                                             // 262
            _results.push(child);                                                                                  // 263
          }                                                                                                        // 264
        }                                                                                                          // 265
        return _results;                                                                                           // 266
      };                                                                                                           // 267
    })(this));                                                                                                     // 268
  };                                                                                                               // 269
                                                                                                                   // 270
  BaseComponent.prototype.addComponentChild = function(componentChild) {                                           // 271
    var _base;                                                                                                     // 272
    if (this._componentInternals == null) {                                                                        // 273
      this._componentInternals = {};                                                                               // 274
    }                                                                                                              // 275
    if ((_base = this._componentInternals).componentChildren == null) {                                            // 276
      _base.componentChildren = new ReactiveVar([], arrayReferenceEquals);                                         // 277
    }                                                                                                              // 278
    this._componentInternals.componentChildren.set(Tracker.nonreactive((function(_this) {                          // 279
      return function() {                                                                                          // 280
        return _this._componentInternals.componentChildren.get().concat([componentChild]);                         // 281
      };                                                                                                           // 282
    })(this)));                                                                                                    // 283
    return this;                                                                                                   // 284
  };                                                                                                               // 285
                                                                                                                   // 286
  BaseComponent.prototype.removeComponentChild = function(componentChild) {                                        // 287
    var _base;                                                                                                     // 288
    if (this._componentInternals == null) {                                                                        // 289
      this._componentInternals = {};                                                                               // 290
    }                                                                                                              // 291
    if ((_base = this._componentInternals).componentChildren == null) {                                            // 292
      _base.componentChildren = new ReactiveVar([], arrayReferenceEquals);                                         // 293
    }                                                                                                              // 294
    this._componentInternals.componentChildren.set(Tracker.nonreactive((function(_this) {                          // 295
      return function() {                                                                                          // 296
        return _.without(_this._componentInternals.componentChildren.get(), componentChild);                       // 297
      };                                                                                                           // 298
    })(this)));                                                                                                    // 299
    return this;                                                                                                   // 300
  };                                                                                                               // 301
                                                                                                                   // 302
  BaseComponent.prototype.componentParent = function(componentParent) {                                            // 303
    var _base;                                                                                                     // 304
    if (this._componentInternals == null) {                                                                        // 305
      this._componentInternals = {};                                                                               // 306
    }                                                                                                              // 307
    if ((_base = this._componentInternals).componentParent == null) {                                              // 308
      _base.componentParent = new ReactiveVar(null, function(a, b) {                                               // 309
        return a === b;                                                                                            // 310
      });                                                                                                          // 311
    }                                                                                                              // 312
    if (!_.isUndefined(componentParent)) {                                                                         // 313
      this._componentInternals.componentParent.set(componentParent);                                               // 314
      return this;                                                                                                 // 315
    }                                                                                                              // 316
    return this._componentInternals.componentParent.get();                                                         // 317
  };                                                                                                               // 318
                                                                                                                   // 319
  BaseComponent.renderComponent = function(componentParent) {                                                      // 320
    throw new Error("Not implemented");                                                                            // 321
  };                                                                                                               // 322
                                                                                                                   // 323
  BaseComponent.prototype.renderComponent = function(componentParent) {                                            // 324
    throw new Error("Not implemented");                                                                            // 325
  };                                                                                                               // 326
                                                                                                                   // 327
  BaseComponent.extendComponent = function(constructor, methods) {                                                 // 328
    var currentClass, property, value, _ref;                                                                       // 329
    currentClass = this;                                                                                           // 330
    if (!_.isFunction(constructor)) {                                                                              // 331
      methods = constructor;                                                                                       // 332
      constructor = function() {                                                                                   // 333
        return constructor.__super__.constructor.apply(this, arguments);                                           // 334
      };                                                                                                           // 335
    }                                                                                                              // 336
    constructor.prototype = Object.create(currentClass.prototype);                                                 // 337
    constructor.prototype.constructor = constructor;                                                               // 338
    for (property in currentClass) {                                                                               // 339
      if (!__hasProp.call(currentClass, property)) continue;                                                       // 340
      value = currentClass[property];                                                                              // 341
      constructor[property] = value;                                                                               // 342
    }                                                                                                              // 343
    constructor.__super__ = currentClass.prototype;                                                                // 344
    _ref = methods || {};                                                                                          // 345
    for (property in _ref) {                                                                                       // 346
      if (!__hasProp.call(_ref, property)) continue;                                                               // 347
      value = _ref[property];                                                                                      // 348
      constructor.prototype[property] = value;                                                                     // 349
    }                                                                                                              // 350
    return constructor;                                                                                            // 351
  };                                                                                                               // 352
                                                                                                                   // 353
  return BaseComponent;                                                                                            // 354
                                                                                                                   // 355
})();                                                                                                              // 356
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   // 358
}).call(this);                                                                                                     // 359
                                                                                                                   // 360
                                                                                                                   // 361
                                                                                                                   // 362
                                                                                                                   // 363
                                                                                                                   // 364
                                                                                                                   // 365
(function () {                                                                                                     // 366
                                                                                                                   // 367
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/peerlibrary:base-component/debug.coffee.js                                                          //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                   // 375
                                                                                                                   // 376
BaseComponentDebug = (function() {                                                                                 // 377
  function BaseComponentDebug() {}                                                                                 // 378
                                                                                                                   // 379
  BaseComponentDebug.startComponent = function(component) {                                                        // 380
    var name;                                                                                                      // 381
    name = component.componentName() || 'unnamed';                                                                 // 382
    console.group(name);                                                                                           // 383
    return console.log('%o', component);                                                                           // 384
  };                                                                                                               // 385
                                                                                                                   // 386
  BaseComponentDebug.endComponent = function(component) {                                                          // 387
    return console.groupEnd();                                                                                     // 388
  };                                                                                                               // 389
                                                                                                                   // 390
  BaseComponentDebug.startMarkedComponent = function(component) {                                                  // 391
    var name;                                                                                                      // 392
    name = component.componentName() || 'unnamed';                                                                 // 393
    console.group('%c%s', 'text-decoration: underline', name);                                                     // 394
    return console.log('%o', component);                                                                           // 395
  };                                                                                                               // 396
                                                                                                                   // 397
  BaseComponentDebug.endMarkedComponent = function(component) {                                                    // 398
    return this.endComponent(component);                                                                           // 399
  };                                                                                                               // 400
                                                                                                                   // 401
  BaseComponentDebug.dumpComponentSubtree = function(rootComponent, _markComponent) {                              // 402
    var child, marked, _i, _len, _ref;                                                                             // 403
    if (_markComponent == null) {                                                                                  // 404
      _markComponent = (function() {});                                                                            // 405
    }                                                                                                              // 406
    if (!rootComponent) {                                                                                          // 407
      return;                                                                                                      // 408
    }                                                                                                              // 409
    marked = _markComponent(rootComponent);                                                                        // 410
    if (marked) {                                                                                                  // 411
      this.startMarkedComponent(rootComponent);                                                                    // 412
    } else {                                                                                                       // 413
      this.startComponent(rootComponent);                                                                          // 414
    }                                                                                                              // 415
    _ref = rootComponent.componentChildren();                                                                      // 416
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                            // 417
      child = _ref[_i];                                                                                            // 418
      this.dumpComponentSubtree(child, _markComponent);                                                            // 419
    }                                                                                                              // 420
    if (marked) {                                                                                                  // 421
      this.endMarkedComponent(rootComponent);                                                                      // 422
    } else {                                                                                                       // 423
      this.endComponent(rootComponent);                                                                            // 424
    }                                                                                                              // 425
  };                                                                                                               // 426
                                                                                                                   // 427
  BaseComponentDebug.componentRoot = function(component) {                                                         // 428
    var componentParent;                                                                                           // 429
    while (componentParent = component.componentParent()) {                                                        // 430
      component = componentParent;                                                                                 // 431
    }                                                                                                              // 432
    return component;                                                                                              // 433
  };                                                                                                               // 434
                                                                                                                   // 435
  BaseComponentDebug.dumpComponentTree = function(component) {                                                     // 436
    if (!component) {                                                                                              // 437
      return;                                                                                                      // 438
    }                                                                                                              // 439
    return this.dumpComponentSubtree(this.componentRoot(component), function(c) {                                  // 440
      return c === component;                                                                                      // 441
    });                                                                                                            // 442
  };                                                                                                               // 443
                                                                                                                   // 444
  return BaseComponentDebug;                                                                                       // 445
                                                                                                                   // 446
})();                                                                                                              // 447
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   // 449
}).call(this);                                                                                                     // 450
                                                                                                                   // 451
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['peerlibrary:base-component'] = {
  BaseComponent: BaseComponent,
  BaseComponentDebug: BaseComponentDebug
};

})();

//# sourceMappingURL=peerlibrary_base-component.js.map
