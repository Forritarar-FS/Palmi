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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package.templating.Template;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var EJSON = Package.ejson.EJSON;
var Spacebars = Package.spacebars.Spacebars;
var BaseComponent = Package['peerlibrary:base-component'].BaseComponent;
var BaseComponentDebug = Package['peerlibrary:base-component'].BaseComponentDebug;
var assert = Package['peerlibrary:assert'].assert;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare, BlazeComponent, BlazeComponentDebug;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/peerlibrary_blaze-components/packages/peerlibrary_blaze-components.js                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
(function () {                                                                                                        // 1
                                                                                                                      // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/peerlibrary:blaze-components/lookup.js                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/* This file is a direct copy of Blaze lookup.js with modifications described                                      // 1
   in this pull request: https://github.com/meteor/meteor/pull/4036                                                // 2
                                                                                                                   // 3
   TODO: Remove this file once the pull request is merged in.                                                      // 4
 */                                                                                                                // 5
                                                                                                                   // 6
// If `x` is a function, binds the value of `this` for that function                                               // 7
// to the current data context.                                                                                    // 8
var bindDataContext = function (x) {                                                                               // 9
  if (typeof x === 'function') {                                                                                   // 10
    return function () {                                                                                           // 11
      var data = Blaze.getData();                                                                                  // 12
      if (data == null)                                                                                            // 13
        data = {};                                                                                                 // 14
      return x.apply(data, arguments);                                                                             // 15
    };                                                                                                             // 16
  }                                                                                                                // 17
  return x;                                                                                                        // 18
};                                                                                                                 // 19
                                                                                                                   // 20
Blaze._getTemplateHelper = function (template, name, templateInstance) {                                           // 21
  // XXX COMPAT WITH 0.9.3                                                                                         // 22
  var isKnownOldStyleHelper = false;                                                                               // 23
                                                                                                                   // 24
  if (template.__helpers.has(name)) {                                                                              // 25
    var helper = template.__helpers.get(name);                                                                     // 26
    if (helper === Blaze._OLDSTYLE_HELPER) {                                                                       // 27
      isKnownOldStyleHelper = true;                                                                                // 28
    } else if (helper != null) {                                                                                   // 29
      return wrapHelper(bindDataContext(helper), templateInstance);                                                // 30
    } else {                                                                                                       // 31
      return null;                                                                                                 // 32
    }                                                                                                              // 33
  }                                                                                                                // 34
                                                                                                                   // 35
  // old-style helper                                                                                              // 36
  if (name in template) {                                                                                          // 37
    // Only warn once per helper                                                                                   // 38
    if (! isKnownOldStyleHelper) {                                                                                 // 39
      template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);                                                        // 40
      if (! template._NOWARN_OLDSTYLE_HELPERS) {                                                                   // 41
        Blaze._warn('Assigning helper with `' + template.viewName + '.' +                                          // 42
                    name + ' = ...` is deprecated.  Use `' + template.viewName +                                   // 43
                    '.helpers(...)` instead.');                                                                    // 44
      }                                                                                                            // 45
    }                                                                                                              // 46
    if (template[name] != null) {                                                                                  // 47
      return wrapHelper(bindDataContext(template[name]), templateInstance);                                        // 48
    }                                                                                                              // 49
  }                                                                                                                // 50
                                                                                                                   // 51
  return null;                                                                                                     // 52
};                                                                                                                 // 53
                                                                                                                   // 54
var wrapHelper = function (f, templateFunc) {                                                                      // 55
  // XXX COMPAT WITH METEOR 1.0.3.2                                                                                // 56
  if (! Blaze.Template._withTemplateInstanceFunc) {                                                                // 57
    return Blaze._wrapCatchingExceptions(f, 'template helper');                                                    // 58
  }                                                                                                                // 59
                                                                                                                   // 60
  if (typeof f !== "function") {                                                                                   // 61
    return f;                                                                                                      // 62
  }                                                                                                                // 63
                                                                                                                   // 64
  return function () {                                                                                             // 65
    var self = this;                                                                                               // 66
    var args = arguments;                                                                                          // 67
                                                                                                                   // 68
    return Blaze.Template._withTemplateInstanceFunc(templateFunc, function () {                                    // 69
      return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);                                // 70
    });                                                                                                            // 71
  };                                                                                                               // 72
};                                                                                                                 // 73
                                                                                                                   // 74
// templateInstance argument is provided to be available for possible                                              // 75
// alternative implementations of this function by 3rd party packages.                                             // 76
Blaze._getTemplate = function (name, templateInstance) {                                                           // 77
  if ((name in Blaze.Template) && (Blaze.Template[name] instanceof Blaze.Template)) {                              // 78
    return Blaze.Template[name];                                                                                   // 79
  }                                                                                                                // 80
  return null;                                                                                                     // 81
};                                                                                                                 // 82
                                                                                                                   // 83
Blaze.View.prototype.lookup = function (name, _options) {                                                          // 84
  var template = this.template;                                                                                    // 85
  var lookupTemplate = _options && _options.template;                                                              // 86
  var helper;                                                                                                      // 87
  var boundTmplInstance;                                                                                           // 88
  var foundTemplate;                                                                                               // 89
                                                                                                                   // 90
  if (this.templateInstance) {                                                                                     // 91
    boundTmplInstance = _.bind(this.templateInstance, this);                                                       // 92
  }                                                                                                                // 93
                                                                                                                   // 94
  if (/^\./.test(name)) {                                                                                          // 95
    // starts with a dot. must be a series of dots which maps to an                                                // 96
    // ancestor of the appropriate height.                                                                         // 97
    if (!/^(\.)+$/.test(name))                                                                                     // 98
      throw new Error("id starting with dot must be a series of dots");                                            // 99
                                                                                                                   // 100
    return Blaze._parentData(name.length - 1, true /*_functionWrapped*/);                                          // 101
                                                                                                                   // 102
  } else if (template &&                                                                                           // 103
             ((helper = Blaze._getTemplateHelper(template, name, boundTmplInstance)) != null)) {                   // 104
    return helper;                                                                                                 // 105
  } else if (lookupTemplate &&                                                                                     // 106
             ((foundTemplate = Blaze._getTemplate(name, boundTmplInstance)) != null)) {                            // 107
    return foundTemplate;                                                                                          // 108
  } else if (Blaze._globalHelpers[name] != null) {                                                                 // 109
    return wrapHelper(bindDataContext(Blaze._globalHelpers[name]),                                                 // 110
      boundTmplInstance);                                                                                          // 111
  } else {                                                                                                         // 112
    return function () {                                                                                           // 113
      var isCalledAsFunction = (arguments.length > 0);                                                             // 114
      var data = Blaze.getData();                                                                                  // 115
      if (lookupTemplate && ! (data && data[name])) {                                                              // 116
        throw new Error("No such template: " + name);                                                              // 117
      }                                                                                                            // 118
      if (isCalledAsFunction && ! (data && data[name])) {                                                          // 119
        throw new Error("No such function: " + name);                                                              // 120
      }                                                                                                            // 121
      if (! data)                                                                                                  // 122
        return null;                                                                                               // 123
      var x = data[name];                                                                                          // 124
      if (typeof x !== 'function') {                                                                               // 125
        if (isCalledAsFunction) {                                                                                  // 126
          throw new Error("Can't call non-function: " + x);                                                        // 127
        }                                                                                                          // 128
        return x;                                                                                                  // 129
      }                                                                                                            // 130
      return x.apply(data, arguments);                                                                             // 131
    };                                                                                                             // 132
  }                                                                                                                // 133
  return null;                                                                                                     // 134
};                                                                                                                 // 135
                                                                                                                   // 136
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      // 146
}).call(this);                                                                                                        // 147
                                                                                                                      // 148
                                                                                                                      // 149
                                                                                                                      // 150
                                                                                                                      // 151
                                                                                                                      // 152
                                                                                                                      // 153
(function () {                                                                                                        // 154
                                                                                                                      // 155
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/peerlibrary:blaze-components/lib.coffee.js                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ComponentsNamespaceReference, addEvents, bindComponent, bindDataContext, getTemplateInstance, getTemplateInstanceFunction, method, methodName, originalDot, originalGetTemplate, originalInclude, registerFirstCreatedHook, registerHooks, templateInstanceToComponent, wrapHelper, _fn, _ref,                
  __slice = [].slice,                                                                                                 // 164
  __hasProp = {}.hasOwnProperty,                                                                                      // 165
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
                                                                                                                      // 167
getTemplateInstance = function(view) {                                                                                // 168
  while (view && !view._templateInstance) {                                                                           // 169
    view = view.parentView;                                                                                           // 170
  }                                                                                                                   // 171
  return view != null ? view._templateInstance : void 0;                                                              // 172
};                                                                                                                    // 173
                                                                                                                      // 174
templateInstanceToComponent = function(templateInstanceFunc) {                                                        // 175
  var templateInstance;                                                                                               // 176
  templateInstance = typeof templateInstanceFunc === "function" ? templateInstanceFunc() : void 0;                    // 177
  templateInstance = getTemplateInstance(templateInstance != null ? templateInstance.view : void 0);                  // 178
  while (templateInstance) {                                                                                          // 179
    if ('component' in templateInstance) {                                                                            // 180
      return templateInstance.component;                                                                              // 181
    }                                                                                                                 // 182
    templateInstance = getTemplateInstance(templateInstance.view.parentView);                                         // 183
  }                                                                                                                   // 184
  return null;                                                                                                        // 185
};                                                                                                                    // 186
                                                                                                                      // 187
getTemplateInstanceFunction = function(view) {                                                                        // 188
  var templateInstance;                                                                                               // 189
  templateInstance = getTemplateInstance(view);                                                                       // 190
  return function() {                                                                                                 // 191
    return templateInstance;                                                                                          // 192
  };                                                                                                                  // 193
};                                                                                                                    // 194
                                                                                                                      // 195
ComponentsNamespaceReference = (function() {                                                                          // 196
  function ComponentsNamespaceReference(namespace, templateInstance) {                                                // 197
    this.namespace = namespace;                                                                                       // 198
    this.templateInstance = templateInstance;                                                                         // 199
  }                                                                                                                   // 200
                                                                                                                      // 201
  return ComponentsNamespaceReference;                                                                                // 202
                                                                                                                      // 203
})();                                                                                                                 // 204
                                                                                                                      // 205
originalDot = Spacebars.dot;                                                                                          // 206
                                                                                                                      // 207
Spacebars.dot = function() {                                                                                          // 208
  var args, value;                                                                                                    // 209
  value = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];                               // 210
  if (value instanceof ComponentsNamespaceReference) {                                                                // 211
    return Blaze._getTemplate("" + value.namespace + "." + (args.join('.')), value.templateInstance);                 // 212
  }                                                                                                                   // 213
  return originalDot.apply(null, [value].concat(__slice.call(args)));                                                 // 214
};                                                                                                                    // 215
                                                                                                                      // 216
originalInclude = Spacebars.include;                                                                                  // 217
                                                                                                                      // 218
Spacebars.include = function() {                                                                                      // 219
  var args, templateOrFunction;                                                                                       // 220
  templateOrFunction = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];                  // 221
  if (templateOrFunction instanceof ComponentsNamespaceReference) {                                                   // 222
    templateOrFunction = Blaze._getTemplate(templateOrFunction.namespace, templateOrFunction.templateInstance);       // 223
  }                                                                                                                   // 224
  return originalInclude.apply(null, [templateOrFunction].concat(__slice.call(args)));                                // 225
};                                                                                                                    // 226
                                                                                                                      // 227
Blaze._getTemplateHelper = function(template, name, templateInstance) {                                               // 228
  var component, helper, isKnownOldStyleHelper, mixinOrComponent, _ref;                                               // 229
  isKnownOldStyleHelper = false;                                                                                      // 230
  if (template.__helpers.has(name)) {                                                                                 // 231
    helper = template.__helpers.get(name);                                                                            // 232
    if (helper === Blaze._OLDSTYLE_HELPER) {                                                                          // 233
      isKnownOldStyleHelper = true;                                                                                   // 234
    } else if (helper != null) {                                                                                      // 235
      return wrapHelper(bindDataContext(helper), templateInstance);                                                   // 236
    } else {                                                                                                          // 237
      return null;                                                                                                    // 238
    }                                                                                                                 // 239
  }                                                                                                                   // 240
  if (name in template) {                                                                                             // 241
    if (!isKnownOldStyleHelper) {                                                                                     // 242
      template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);                                                           // 243
      if (!template._NOWARN_OLDSTYLE_HELPERS) {                                                                       // 244
        Blaze._warn("Assigning helper with `" + template.viewName + "." + name + " = ...` is deprecated.  Use `" + template.viewName + ".helpers(...)` instead.");
      }                                                                                                               // 246
    }                                                                                                                 // 247
    if (template[name] != null) {                                                                                     // 248
      return wrapHelper(bindDataContext(template[name]), templateInstance);                                           // 249
    } else {                                                                                                          // 250
      return null;                                                                                                    // 251
    }                                                                                                                 // 252
  }                                                                                                                   // 253
  if (!templateInstance) {                                                                                            // 254
    return null;                                                                                                      // 255
  }                                                                                                                   // 256
  if ((_ref = template.viewName) === 'Template.__dynamicWithDataContext' || _ref === 'Template.__dynamic') {          // 257
    return null;                                                                                                      // 258
  }                                                                                                                   // 259
  component = Tracker.nonreactive(function() {                                                                        // 260
    return templateInstanceToComponent(templateInstance);                                                             // 261
  });                                                                                                                 // 262
  if (component) {                                                                                                    // 263
    if (mixinOrComponent = component.getFirstWith(null, name)) {                                                      // 264
      return wrapHelper(bindComponent(mixinOrComponent, mixinOrComponent[name]), templateInstance);                   // 265
    }                                                                                                                 // 266
  }                                                                                                                   // 267
  if (name && name in BlazeComponent.components) {                                                                    // 268
    return new ComponentsNamespaceReference(name, templateInstance);                                                  // 269
  }                                                                                                                   // 270
  return null;                                                                                                        // 271
};                                                                                                                    // 272
                                                                                                                      // 273
bindComponent = function(component, helper) {                                                                         // 274
  if (_.isFunction(helper)) {                                                                                         // 275
    return _.bind(helper, component);                                                                                 // 276
  } else {                                                                                                            // 277
    return helper;                                                                                                    // 278
  }                                                                                                                   // 279
};                                                                                                                    // 280
                                                                                                                      // 281
bindDataContext = function(helper) {                                                                                  // 282
  if (_.isFunction(helper)) {                                                                                         // 283
    return function() {                                                                                               // 284
      var data;                                                                                                       // 285
      data = Blaze.getData();                                                                                         // 286
      if (data == null) {                                                                                             // 287
        data = {};                                                                                                    // 288
      }                                                                                                               // 289
      return helper.apply(data, arguments);                                                                           // 290
    };                                                                                                                // 291
  } else {                                                                                                            // 292
    return helper;                                                                                                    // 293
  }                                                                                                                   // 294
};                                                                                                                    // 295
                                                                                                                      // 296
wrapHelper = function(f, templateFunc) {                                                                              // 297
  if (!Blaze.Template._withTemplateInstanceFunc) {                                                                    // 298
    return Blaze._wrapCatchingExceptions(f, 'template helper');                                                       // 299
  }                                                                                                                   // 300
  if (!_.isFunction(f)) {                                                                                             // 301
    return f;                                                                                                         // 302
  }                                                                                                                   // 303
  return function() {                                                                                                 // 304
    var args, self;                                                                                                   // 305
    self = this;                                                                                                      // 306
    args = arguments;                                                                                                 // 307
    return Blaze.Template._withTemplateInstanceFunc(templateFunc, function() {                                        // 308
      return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);                                   // 309
    });                                                                                                               // 310
  };                                                                                                                  // 311
};                                                                                                                    // 312
                                                                                                                      // 313
addEvents = function(view, component) {                                                                               // 314
  var eventMap, events, eventsList, handler, spec, _fn, _i, _len;                                                     // 315
  eventsList = component.events();                                                                                    // 316
  if (!_.isArray(eventsList)) {                                                                                       // 317
    throw new Error("'events' method from the component '" + (component.componentName() || 'unnamed') + "' did not return a list of event maps.");
  }                                                                                                                   // 319
  for (_i = 0, _len = eventsList.length; _i < _len; _i++) {                                                           // 320
    events = eventsList[_i];                                                                                          // 321
    eventMap = {};                                                                                                    // 322
    _fn = function(spec, handler) {                                                                                   // 323
      return eventMap[spec] = function() {                                                                            // 324
        var args, currentView, event, templateInstance, withTemplateInstanceFunc;                                     // 325
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];                                               // 326
        event = args[0];                                                                                              // 327
        currentView = Blaze.getView(event.currentTarget);                                                             // 328
        templateInstance = getTemplateInstanceFunction(currentView);                                                  // 329
        if (Template._withTemplateInstanceFunc) {                                                                     // 330
          withTemplateInstanceFunc = Template._withTemplateInstanceFunc;                                              // 331
        } else {                                                                                                      // 332
          withTemplateInstanceFunc = function(templateInstance, f) {                                                  // 333
            return f();                                                                                               // 334
          };                                                                                                          // 335
        }                                                                                                             // 336
        withTemplateInstanceFunc(templateInstance, function() {                                                       // 337
          return Blaze._withCurrentView(currentView, function() {                                                     // 338
            return handler.apply(component, args);                                                                    // 339
          });                                                                                                         // 340
        });                                                                                                           // 341
      };                                                                                                              // 342
    };                                                                                                                // 343
    for (spec in events) {                                                                                            // 344
      handler = events[spec];                                                                                         // 345
      _fn(spec, handler);                                                                                             // 346
    }                                                                                                                 // 347
    Blaze._addEventMap(view, eventMap);                                                                               // 348
  }                                                                                                                   // 349
};                                                                                                                    // 350
                                                                                                                      // 351
originalGetTemplate = Blaze._getTemplate;                                                                             // 352
                                                                                                                      // 353
Blaze._getTemplate = function(name, templateInstance) {                                                               // 354
  var template;                                                                                                       // 355
  template = Tracker.nonreactive(function() {                                                                         // 356
    var componentParent, _ref;                                                                                        // 357
    componentParent = templateInstanceToComponent(templateInstance);                                                  // 358
    return (_ref = BlazeComponent.getComponent(name)) != null ? _ref.renderComponent(componentParent) : void 0;       // 359
  });                                                                                                                 // 360
  if (template && (template instanceof Blaze.Template || _.isFunction(template))) {                                   // 361
    return template;                                                                                                  // 362
  }                                                                                                                   // 363
  return originalGetTemplate(name);                                                                                   // 364
};                                                                                                                    // 365
                                                                                                                      // 366
registerHooks = function(template, hooks) {                                                                           // 367
  if (template.onCreated) {                                                                                           // 368
    template.onCreated(hooks.onCreated);                                                                              // 369
    template.onRendered(hooks.onRendered);                                                                            // 370
    return template.onDestroyed(hooks.onDestroyed);                                                                   // 371
  } else {                                                                                                            // 372
    template.created = hooks.onCreated;                                                                               // 373
    template.rendered = hooks.onRendered;                                                                             // 374
    return template.destroyed = hooks.onDestroyed;                                                                    // 375
  }                                                                                                                   // 376
};                                                                                                                    // 377
                                                                                                                      // 378
registerFirstCreatedHook = function(template, onCreated) {                                                            // 379
  var oldCreated;                                                                                                     // 380
  if (template._callbacks) {                                                                                          // 381
    return template._callbacks.created.unshift(onCreated);                                                            // 382
  } else {                                                                                                            // 383
    oldCreated = template.created;                                                                                    // 384
    return template.created = function() {                                                                            // 385
      onCreated.call(this);                                                                                           // 386
      return oldCreated != null ? oldCreated.call(this) : void 0;                                                     // 387
    };                                                                                                                // 388
  }                                                                                                                   // 389
};                                                                                                                    // 390
                                                                                                                      // 391
BlazeComponent = (function(_super) {                                                                                  // 392
  __extends(BlazeComponent, _super);                                                                                  // 393
                                                                                                                      // 394
  function BlazeComponent() {                                                                                         // 395
    return BlazeComponent.__super__.constructor.apply(this, arguments);                                               // 396
  }                                                                                                                   // 397
                                                                                                                      // 398
  BlazeComponent.getComponentForElement = function(domElement) {                                                      // 399
    if (!domElement) {                                                                                                // 400
      return null;                                                                                                    // 401
    }                                                                                                                 // 402
    if (domElement.nodeType !== Node.ELEMENT_NODE) {                                                                  // 403
      throw new Error("Expected DOM element.");                                                                       // 404
    }                                                                                                                 // 405
    return templateInstanceToComponent((function(_this) {                                                             // 406
      return function() {                                                                                             // 407
        return getTemplateInstance(Blaze.getView(domElement));                                                        // 408
      };                                                                                                              // 409
    })(this));                                                                                                        // 410
  };                                                                                                                  // 411
                                                                                                                      // 412
  BlazeComponent.prototype.mixins = function() {                                                                      // 413
    return [];                                                                                                        // 414
  };                                                                                                                  // 415
                                                                                                                      // 416
  BlazeComponent.prototype.mixinParent = function(mixinParent) {                                                      // 417
    if (this._componentInternals == null) {                                                                           // 418
      this._componentInternals = {};                                                                                  // 419
    }                                                                                                                 // 420
    if (mixinParent) {                                                                                                // 421
      this._componentInternals.mixinParent = mixinParent;                                                             // 422
      return this;                                                                                                    // 423
    }                                                                                                                 // 424
    return this._componentInternals.mixinParent || null;                                                              // 425
  };                                                                                                                  // 426
                                                                                                                      // 427
  BlazeComponent.prototype.requireMixin = function(nameOrMixin) {                                                     // 428
    var mixinInstance, mixinInstanceComponent, _ref, _ref1, _ref2, _ref3;                                             // 429
    assert((_ref = this._componentInternals) != null ? _ref.mixins : void 0);                                         // 430
    if (this.getMixin(nameOrMixin)) {                                                                                 // 431
      return this;                                                                                                    // 432
    }                                                                                                                 // 433
    if (_.isString(nameOrMixin)) {                                                                                    // 434
      if (this.constructor.getComponent) {                                                                            // 435
        mixinInstanceComponent = this.constructor.getComponent(nameOrMixin);                                          // 436
      } else {                                                                                                        // 437
        mixinInstanceComponent = BlazeComponent.getComponent(nameOrMixin);                                            // 438
      }                                                                                                               // 439
      if (!mixinInstanceComponent) {                                                                                  // 440
        throw new Error("Unknown mixin '" + nameOrMixin + "'.");                                                      // 441
      }                                                                                                               // 442
      mixinInstance = new mixinInstanceComponent();                                                                   // 443
    } else if (_.isFunction(nameOrMixin)) {                                                                           // 444
      mixinInstance = new nameOrMixin();                                                                              // 445
    } else {                                                                                                          // 446
      mixinInstance = nameOrMixin;                                                                                    // 447
    }                                                                                                                 // 448
    this._componentInternals.mixins.push(mixinInstance);                                                              // 449
    if (mixinInstance.mixinParent) {                                                                                  // 450
      mixinInstance.mixinParent(this);                                                                                // 451
      assert.equal(mixinInstance.mixinParent(), this);                                                                // 452
    }                                                                                                                 // 453
    if (typeof mixinInstance.createMixins === "function") {                                                           // 454
      mixinInstance.createMixins();                                                                                   // 455
    }                                                                                                                 // 456
    if (!((_ref1 = this._componentInternals.templateInstance) != null ? _ref1.view.isDestroyed : void 0)) {           // 457
      if (!this._componentInternals.inOnCreated && ((_ref2 = this._componentInternals.templateInstance) != null ? _ref2.view.isCreated : void 0)) {
        if (typeof mixinInstance.onCreated === "function") {                                                          // 459
          mixinInstance.onCreated();                                                                                  // 460
        }                                                                                                             // 461
      }                                                                                                               // 462
      if (!this._componentInternals.inOnRendered && ((_ref3 = this._componentInternals.templateInstance) != null ? _ref3.view.isRendered : void 0)) {
        if (typeof mixinInstance.onRendered === "function") {                                                         // 464
          mixinInstance.onRendered();                                                                                 // 465
        }                                                                                                             // 466
      }                                                                                                               // 467
    }                                                                                                                 // 468
    return this;                                                                                                      // 469
  };                                                                                                                  // 470
                                                                                                                      // 471
  BlazeComponent.prototype.createMixins = function() {                                                                // 472
    var mixin, _i, _len, _ref;                                                                                        // 473
    if (this._componentInternals == null) {                                                                           // 474
      this._componentInternals = {};                                                                                  // 475
    }                                                                                                                 // 476
    if (this._componentInternals.mixins) {                                                                            // 477
      return;                                                                                                         // 478
    }                                                                                                                 // 479
    this._componentInternals.mixins = [];                                                                             // 480
    _ref = this.mixins();                                                                                             // 481
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                               // 482
      mixin = _ref[_i];                                                                                               // 483
      this.requireMixin(mixin);                                                                                       // 484
    }                                                                                                                 // 485
    return this;                                                                                                      // 486
  };                                                                                                                  // 487
                                                                                                                      // 488
  BlazeComponent.prototype.getMixin = function(nameOrMixin) {                                                         // 489
    var mixin, mixinComponentName, _i, _j, _len, _len1, _ref, _ref1, _ref2;                                           // 490
    assert((_ref = this._componentInternals) != null ? _ref.mixins : void 0);                                         // 491
    if (_.isString(nameOrMixin)) {                                                                                    // 492
      _ref1 = this._componentInternals.mixins;                                                                        // 493
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {                                                            // 494
        mixin = _ref1[_i];                                                                                            // 495
        mixinComponentName = (typeof mixin.componentName === "function" ? mixin.componentName() : void 0) || null;    // 496
        if (mixinComponentName && mixinComponentName === nameOrMixin) {                                               // 497
          return mixin;                                                                                               // 498
        }                                                                                                             // 499
      }                                                                                                               // 500
    } else {                                                                                                          // 501
      _ref2 = this._componentInternals.mixins;                                                                        // 502
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {                                                          // 503
        mixin = _ref2[_j];                                                                                            // 504
        if (mixin.constructor === nameOrMixin) {                                                                      // 505
          return mixin;                                                                                               // 506
        } else if (mixin === nameOrMixin) {                                                                           // 507
          return mixin;                                                                                               // 508
        }                                                                                                             // 509
      }                                                                                                               // 510
    }                                                                                                                 // 511
    return null;                                                                                                      // 512
  };                                                                                                                  // 513
                                                                                                                      // 514
  BlazeComponent.prototype.callFirstWith = function() {                                                               // 515
    var afterComponentOrMixin, args, mixin, propertyName;                                                             // 516
    afterComponentOrMixin = arguments[0], propertyName = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    mixin = this.getFirstWith(afterComponentOrMixin, propertyName);                                                   // 518
    if (!mixin) {                                                                                                     // 519
      return;                                                                                                         // 520
    }                                                                                                                 // 521
    if (_.isFunction(mixin[propertyName])) {                                                                          // 522
      return mixin[propertyName].apply(mixin, args);                                                                  // 523
    } else {                                                                                                          // 524
      return mixin[propertyName];                                                                                     // 525
    }                                                                                                                 // 526
  };                                                                                                                  // 527
                                                                                                                      // 528
  BlazeComponent.prototype.getFirstWith = function(afterComponentOrMixin, propertyName) {                             // 529
    var found, mixin, _i, _len, _ref, _ref1;                                                                          // 530
    assert((_ref = this._componentInternals) != null ? _ref.mixins : void 0);                                         // 531
    if (!afterComponentOrMixin) {                                                                                     // 532
      if (propertyName in this) {                                                                                     // 533
        return this;                                                                                                  // 534
      }                                                                                                               // 535
      found = true;                                                                                                   // 536
    } else if (afterComponentOrMixin && afterComponentOrMixin === this) {                                             // 537
      found = true;                                                                                                   // 538
    } else {                                                                                                          // 539
      found = false;                                                                                                  // 540
    }                                                                                                                 // 541
    _ref1 = this._componentInternals.mixins;                                                                          // 542
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {                                                              // 543
      mixin = _ref1[_i];                                                                                              // 544
      if (found && propertyName in mixin) {                                                                           // 545
        return mixin;                                                                                                 // 546
      }                                                                                                               // 547
      if (mixin === afterComponentOrMixin) {                                                                          // 548
        found = true;                                                                                                 // 549
      }                                                                                                               // 550
    }                                                                                                                 // 551
    return null;                                                                                                      // 552
  };                                                                                                                  // 553
                                                                                                                      // 554
  BlazeComponent.renderComponent = function(componentParent) {                                                        // 555
    return Tracker.nonreactive((function(_this) {                                                                     // 556
      return function() {                                                                                             // 557
        var component, componentClass, data, error;                                                                   // 558
        componentClass = _this;                                                                                       // 559
        try {                                                                                                         // 560
          data = Template.currentData();                                                                              // 561
        } catch (_error) {                                                                                            // 562
          error = _error;                                                                                             // 563
          data = null;                                                                                                // 564
        }                                                                                                             // 565
        if ((data != null ? data.constructor : void 0) !== share.argumentsConstructor) {                              // 566
          component = new componentClass();                                                                           // 567
          return component.renderComponent(componentParent);                                                          // 568
        }                                                                                                             // 569
        return function() {                                                                                           // 570
          var currentWith, reactiveArguments, template;                                                               // 571
          currentWith = Blaze.getView('with');                                                                        // 572
          reactiveArguments = new ReactiveVar([], EJSON.equals);                                                      // 573
          assert(Tracker.active);                                                                                     // 574
          Tracker.autorun(function(computation) {                                                                     // 575
            data = currentWith.dataVar.get();                                                                         // 576
            assert.equal(data != null ? data.constructor : void 0, share.argumentsConstructor);                       // 577
            return reactiveArguments.set(data._arguments);                                                            // 578
          });                                                                                                         // 579
          component = (function(func, args, ctor) {                                                                   // 580
            ctor.prototype = func.prototype;                                                                          // 581
            var child = new ctor, result = func.apply(child, args);                                                   // 582
            return Object(result) === result ? result : child;                                                        // 583
          })(componentClass, reactiveArguments.get(), function(){});                                                  // 584
          template = component.renderComponent(componentParent);                                                      // 585
          registerFirstCreatedHook(template, function() {                                                             // 586
            this.view.originalParentView = this.view.parentView;                                                      // 587
            return this.view.parentView = this.view.parentView.parentView.parentView;                                 // 588
          });                                                                                                         // 589
          return template;                                                                                            // 590
        };                                                                                                            // 591
      };                                                                                                              // 592
    })(this));                                                                                                        // 593
  };                                                                                                                  // 594
                                                                                                                      // 595
  BlazeComponent.prototype.renderComponent = function(componentParent) {                                              // 596
    return Tracker.nonreactive((function(_this) {                                                                     // 597
      return function() {                                                                                             // 598
        var component, componentTemplate, template, templateBase, _base;                                              // 599
        component = _this;                                                                                            // 600
        component.createMixins();                                                                                     // 601
        componentTemplate = component.template();                                                                     // 602
        if (_.isString(componentTemplate)) {                                                                          // 603
          templateBase = Template[componentTemplate];                                                                 // 604
          if (!templateBase) {                                                                                        // 605
            throw new Error("Template '" + componentTemplate + "' cannot be found.");                                 // 606
          }                                                                                                           // 607
        } else if (componentTemplate) {                                                                               // 608
          templateBase = componentTemplate;                                                                           // 609
        } else {                                                                                                      // 610
          throw new Error("Template for the component '" + (component.componentName() || 'unnamed') + "' not provided.");
        }                                                                                                             // 612
        template = new Blaze.Template("BlazeComponent." + (component.componentName() || 'unnamed'), templateBase.renderFunction);
        if ((_base = _this.component)._componentInternals == null) {                                                  // 614
          _base._componentInternals = {};                                                                             // 615
        }                                                                                                             // 616
        registerHooks(template, {                                                                                     // 617
          onCreated: function() {                                                                                     // 618
            var componentOrMixin, _base1, _base2, _base3;                                                             // 619
            if (componentParent) {                                                                                    // 620
              Tracker.nonreactive((function(_this) {                                                                  // 621
                return function() {                                                                                   // 622
                  assert(!component.componentParent());                                                               // 623
                  component.componentParent(componentParent);                                                         // 624
                  return componentParent.addComponentChild(component);                                                // 625
                };                                                                                                    // 626
              })(this));                                                                                              // 627
            }                                                                                                         // 628
            this.view._onViewRendered((function(_this) {                                                              // 629
              return function() {                                                                                     // 630
                var componentOrMixin, _results;                                                                       // 631
                if (_this.view.renderCount !== 1) {                                                                   // 632
                  return;                                                                                             // 633
                }                                                                                                     // 634
                componentOrMixin = null;                                                                              // 635
                _results = [];                                                                                        // 636
                while (componentOrMixin = _this.component.getFirstWith(componentOrMixin, 'events')) {                 // 637
                  _results.push(addEvents(_this.view, componentOrMixin));                                             // 638
                }                                                                                                     // 639
                return _results;                                                                                      // 640
              };                                                                                                      // 641
            })(this));                                                                                                // 642
            this.component = component;                                                                               // 643
            assert(!this.component._componentInternals.templateInstance);                                             // 644
            this.component._componentInternals.templateInstance = this;                                               // 645
            try {                                                                                                     // 646
              this.component._componentInternals.inOnCreated = true;                                                  // 647
              componentOrMixin = null;                                                                                // 648
              while (componentOrMixin = this.component.getFirstWith(componentOrMixin, 'onCreated')) {                 // 649
                componentOrMixin.onCreated();                                                                         // 650
              }                                                                                                       // 651
            } finally {                                                                                               // 652
              delete this.component._componentInternals.inOnCreated;                                                  // 653
            }                                                                                                         // 654
            if ((_base1 = this.component._componentInternals).isCreated == null) {                                    // 655
              _base1.isCreated = new ReactiveVar(true);                                                               // 656
            }                                                                                                         // 657
            this.component._componentInternals.isCreated.set(true);                                                   // 658
            if ((_base2 = this.component._componentInternals).isRendered == null) {                                   // 659
              _base2.isRendered = new ReactiveVar(false);                                                             // 660
            }                                                                                                         // 661
            this.component._componentInternals.isRendered.set(false);                                                 // 662
            if ((_base3 = this.component._componentInternals).isDestroyed == null) {                                  // 663
              _base3.isDestroyed = new ReactiveVar(false);                                                            // 664
            }                                                                                                         // 665
            return this.component._componentInternals.isDestroyed.set(false);                                         // 666
          },                                                                                                          // 667
          onRendered: function() {                                                                                    // 668
            var componentOrMixin, _base1;                                                                             // 669
            try {                                                                                                     // 670
              this.component._componentInternals.inOnRendered = true;                                                 // 671
              componentOrMixin = null;                                                                                // 672
              while (componentOrMixin = this.component.getFirstWith(componentOrMixin, 'onRendered')) {                // 673
                componentOrMixin.onRendered();                                                                        // 674
              }                                                                                                       // 675
            } finally {                                                                                               // 676
              delete this.component._componentInternals.inOnRendered;                                                 // 677
            }                                                                                                         // 678
            if ((_base1 = this.component._componentInternals).isRendered == null) {                                   // 679
              _base1.isRendered = new ReactiveVar(true);                                                              // 680
            }                                                                                                         // 681
            this.component._componentInternals.isRendered.set(true);                                                  // 682
            return Tracker.nonreactive((function(_this) {                                                             // 683
              return function() {                                                                                     // 684
                return assert.equal(_this.component._componentInternals.isCreated.get(), true);                       // 685
              };                                                                                                      // 686
            })(this));                                                                                                // 687
          },                                                                                                          // 688
          onDestroyed: function() {                                                                                   // 689
            return this.autorun((function(_this) {                                                                    // 690
              return function(computation) {                                                                          // 691
                var componentOrMixin, _base1, _base2;                                                                 // 692
                if (_this.component.componentChildren().length) {                                                     // 693
                  return;                                                                                             // 694
                }                                                                                                     // 695
                computation.stop();                                                                                   // 696
                Tracker.nonreactive(function() {                                                                      // 697
                  return assert.equal(_this.component._componentInternals.isCreated.get(), true);                     // 698
                });                                                                                                   // 699
                _this.component._componentInternals.isCreated.set(false);                                             // 700
                if ((_base1 = _this.component._componentInternals).isRendered == null) {                              // 701
                  _base1.isRendered = new ReactiveVar(false);                                                         // 702
                }                                                                                                     // 703
                _this.component._componentInternals.isRendered.set(false);                                            // 704
                if ((_base2 = _this.component._componentInternals).isDestroyed == null) {                             // 705
                  _base2.isDestroyed = new ReactiveVar(true);                                                         // 706
                }                                                                                                     // 707
                _this.component._componentInternals.isDestroyed.set(true);                                            // 708
                componentOrMixin = null;                                                                              // 709
                while (componentOrMixin = _this.component.getFirstWith(componentOrMixin, 'onDestroyed')) {            // 710
                  componentOrMixin.onDestroyed();                                                                     // 711
                }                                                                                                     // 712
                if (componentParent) {                                                                                // 713
                  component.componentParent(null);                                                                    // 714
                  componentParent.removeComponentChild(component);                                                    // 715
                }                                                                                                     // 716
                return delete _this.component._componentInternals.templateInstance;                                   // 717
              };                                                                                                      // 718
            })(this));                                                                                                // 719
          }                                                                                                           // 720
        });                                                                                                           // 721
        return template;                                                                                              // 722
      };                                                                                                              // 723
    })(this));                                                                                                        // 724
  };                                                                                                                  // 725
                                                                                                                      // 726
  BlazeComponent.prototype.template = function() {                                                                    // 727
    return this.callFirstWith(this, 'template') || this.constructor.componentName();                                  // 728
  };                                                                                                                  // 729
                                                                                                                      // 730
  BlazeComponent.prototype.onCreated = function() {};                                                                 // 731
                                                                                                                      // 732
  BlazeComponent.prototype.onRendered = function() {};                                                                // 733
                                                                                                                      // 734
  BlazeComponent.prototype.onDestroyed = function() {};                                                               // 735
                                                                                                                      // 736
  BlazeComponent.prototype.isCreated = function() {                                                                   // 737
    var _base;                                                                                                        // 738
    if (this._componentInternals == null) {                                                                           // 739
      this._componentInternals = {};                                                                                  // 740
    }                                                                                                                 // 741
    if ((_base = this._componentInternals).isCreated == null) {                                                       // 742
      _base.isCreated = new ReactiveVar(false);                                                                       // 743
    }                                                                                                                 // 744
    return this._componentInternals.isCreated.get();                                                                  // 745
  };                                                                                                                  // 746
                                                                                                                      // 747
  BlazeComponent.prototype.isRendered = function() {                                                                  // 748
    var _base;                                                                                                        // 749
    if (this._componentInternals == null) {                                                                           // 750
      this._componentInternals = {};                                                                                  // 751
    }                                                                                                                 // 752
    if ((_base = this._componentInternals).isRendered == null) {                                                      // 753
      _base.isRendered = new ReactiveVar(false);                                                                      // 754
    }                                                                                                                 // 755
    return this._componentInternals.isRendered.get();                                                                 // 756
  };                                                                                                                  // 757
                                                                                                                      // 758
  BlazeComponent.prototype.isDestroyed = function() {                                                                 // 759
    var _base;                                                                                                        // 760
    if (this._componentInternals == null) {                                                                           // 761
      this._componentInternals = {};                                                                                  // 762
    }                                                                                                                 // 763
    if ((_base = this._componentInternals).isDestroyed == null) {                                                     // 764
      _base.isDestroyed = new ReactiveVar(false);                                                                     // 765
    }                                                                                                                 // 766
    return this._componentInternals.isDestroyed.get();                                                                // 767
  };                                                                                                                  // 768
                                                                                                                      // 769
  BlazeComponent.prototype.insertDOMElement = function(parent, node, before) {                                        // 770
    if (before == null) {                                                                                             // 771
      before = null;                                                                                                  // 772
    }                                                                                                                 // 773
    if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {                              // 774
      parent.insertBefore(node, before);                                                                              // 775
    }                                                                                                                 // 776
  };                                                                                                                  // 777
                                                                                                                      // 778
  BlazeComponent.prototype.moveDOMElement = function(parent, node, before) {                                          // 779
    if (before == null) {                                                                                             // 780
      before = null;                                                                                                  // 781
    }                                                                                                                 // 782
    if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {                              // 783
      parent.insertBefore(node, before);                                                                              // 784
    }                                                                                                                 // 785
  };                                                                                                                  // 786
                                                                                                                      // 787
  BlazeComponent.prototype.removeDOMElement = function(parent, node) {                                                // 788
    if (parent && node && node.parentNode === parent) {                                                               // 789
      parent.removeChild(node);                                                                                       // 790
    }                                                                                                                 // 791
  };                                                                                                                  // 792
                                                                                                                      // 793
  BlazeComponent.prototype.events = function() {                                                                      // 794
    return [];                                                                                                        // 795
  };                                                                                                                  // 796
                                                                                                                      // 797
  BlazeComponent.prototype.data = function() {                                                                        // 798
    var _ref, _ref1;                                                                                                  // 799
    if ((_ref = this._componentInternals) != null ? (_ref1 = _ref.templateInstance) != null ? _ref1.view : void 0 : void 0) {
      return Blaze.getData(this._componentInternals.templateInstance.view);                                           // 801
    }                                                                                                                 // 802
    return void 0;                                                                                                    // 803
  };                                                                                                                  // 804
                                                                                                                      // 805
  BlazeComponent.currentData = function() {                                                                           // 806
    return Blaze.getData();                                                                                           // 807
  };                                                                                                                  // 808
                                                                                                                      // 809
  BlazeComponent.prototype.currentData = function() {                                                                 // 810
    return this.constructor.currentData();                                                                            // 811
  };                                                                                                                  // 812
                                                                                                                      // 813
  BlazeComponent.prototype.component = function() {                                                                   // 814
    return this;                                                                                                      // 815
  };                                                                                                                  // 816
                                                                                                                      // 817
  BlazeComponent.currentComponent = function() {                                                                      // 818
    return Tracker.nonreactive((function(_this) {                                                                     // 819
      return function() {                                                                                             // 820
        return templateInstanceToComponent(Template.instance);                                                        // 821
      };                                                                                                              // 822
    })(this));                                                                                                        // 823
  };                                                                                                                  // 824
                                                                                                                      // 825
  BlazeComponent.prototype.currentComponent = function() {                                                            // 826
    return this.constructor.currentComponent();                                                                       // 827
  };                                                                                                                  // 828
                                                                                                                      // 829
  BlazeComponent.prototype.firstNode = function() {                                                                   // 830
    var view;                                                                                                         // 831
    view = this._componentInternals.templateInstance.view;                                                            // 832
    if (view._domrange && !view.isDestroyed) {                                                                        // 833
      return view._domrange.firstNode();                                                                              // 834
    } else {                                                                                                          // 835
      return null;                                                                                                    // 836
    }                                                                                                                 // 837
  };                                                                                                                  // 838
                                                                                                                      // 839
  BlazeComponent.prototype.lastNode = function() {                                                                    // 840
    var view;                                                                                                         // 841
    view = this._componentInternals.templateInstance.view;                                                            // 842
    if (view._domrange && !view.isDestroyed) {                                                                        // 843
      return view._domrange.lastNode();                                                                               // 844
    } else {                                                                                                          // 845
      return null;                                                                                                    // 846
    }                                                                                                                 // 847
  };                                                                                                                  // 848
                                                                                                                      // 849
  return BlazeComponent;                                                                                              // 850
                                                                                                                      // 851
})(BaseComponent);                                                                                                    // 852
                                                                                                                      // 853
_ref = Blaze.TemplateInstance.prototype;                                                                              // 854
_fn = function(methodName, method) {                                                                                  // 855
  return BlazeComponent.prototype[methodName] = function() {                                                          // 856
    var args, _ref1;                                                                                                  // 857
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];                                                   // 858
    return (_ref1 = this._componentInternals.templateInstance)[methodName].apply(_ref1, args);                        // 859
  };                                                                                                                  // 860
};                                                                                                                    // 861
for (methodName in _ref) {                                                                                            // 862
  method = _ref[methodName];                                                                                          // 863
  _fn(methodName, method);                                                                                            // 864
}                                                                                                                     // 865
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      // 867
}).call(this);                                                                                                        // 868
                                                                                                                      // 869
                                                                                                                      // 870
                                                                                                                      // 871
                                                                                                                      // 872
                                                                                                                      // 873
                                                                                                                      // 874
(function () {                                                                                                        // 875
                                                                                                                      // 876
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/peerlibrary:blaze-components/debug.coffee.js                                                           //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                                                                                                                   // 884
  __hasProp = {}.hasOwnProperty,                                                                                      // 885
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                                      // 888
BlazeComponentDebug = (function(_super) {                                                                             // 889
  __extends(BlazeComponentDebug, _super);                                                                             // 890
                                                                                                                      // 891
  function BlazeComponentDebug() {                                                                                    // 892
    return BlazeComponentDebug.__super__.constructor.apply(this, arguments);                                          // 893
  }                                                                                                                   // 894
                                                                                                                      // 895
  BlazeComponentDebug.startComponent = function(component) {                                                          // 896
    BlazeComponentDebug.__super__.constructor.startComponent.apply(this, arguments);                                  // 897
    return console.log(component.data());                                                                             // 898
  };                                                                                                                  // 899
                                                                                                                      // 900
  BlazeComponentDebug.startMarkedComponent = function(component) {                                                    // 901
    BlazeComponentDebug.__super__.constructor.startMarkedComponent.apply(this, arguments);                            // 902
    return console.log(component.data());                                                                             // 903
  };                                                                                                                  // 904
                                                                                                                      // 905
  BlazeComponentDebug.dumpComponentSubtree = function(rootComponentOrElement) {                                       // 906
    if (rootComponentOrElement.nodeType === Node.ELEMENT_NODE) {                                                      // 907
      rootComponentOrElement = BlazeComponent.getComponentForElement(rootComponentOrElement);                         // 908
    }                                                                                                                 // 909
    return BlazeComponentDebug.__super__.constructor.dumpComponentSubtree.apply(this, arguments);                     // 910
  };                                                                                                                  // 911
                                                                                                                      // 912
  BlazeComponentDebug.dumpComponentTree = function(rootComponentOrElement) {                                          // 913
    if (rootComponentOrElement.nodeType === Node.ELEMENT_NODE) {                                                      // 914
      rootComponentOrElement = BlazeComponent.getComponentForElement(rootComponentOrElement);                         // 915
    }                                                                                                                 // 916
    return BlazeComponentDebug.__super__.constructor.dumpComponentTree.apply(this, arguments);                        // 917
  };                                                                                                                  // 918
                                                                                                                      // 919
  BlazeComponentDebug.dumpAllComponents = function() {                                                                // 920
    var allRootComponents, rootComponent, _i, _len;                                                                   // 921
    allRootComponents = [];                                                                                           // 922
    $('*').each((function(_this) {                                                                                    // 923
      return function(i, element) {                                                                                   // 924
        var component, rootComponent;                                                                                 // 925
        component = BlazeComponent.getComponentForElement(element);                                                   // 926
        if (!component) {                                                                                             // 927
          return;                                                                                                     // 928
        }                                                                                                             // 929
        rootComponent = _this.componentRoot(component);                                                               // 930
        if (__indexOf.call(allRootComponents, rootComponent) < 0) {                                                   // 931
          return allRootComponents.push(rootComponent);                                                               // 932
        }                                                                                                             // 933
      };                                                                                                              // 934
    })(this));                                                                                                        // 935
    for (_i = 0, _len = allRootComponents.length; _i < _len; _i++) {                                                  // 936
      rootComponent = allRootComponents[_i];                                                                          // 937
      this.dumpComponentSubtree(rootComponent);                                                                       // 938
    }                                                                                                                 // 939
  };                                                                                                                  // 940
                                                                                                                      // 941
  return BlazeComponentDebug;                                                                                         // 942
                                                                                                                      // 943
})(BaseComponentDebug);                                                                                               // 944
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      // 946
}).call(this);                                                                                                        // 947
                                                                                                                      // 948
                                                                                                                      // 949
                                                                                                                      // 950
                                                                                                                      // 951
                                                                                                                      // 952
                                                                                                                      // 953
(function () {                                                                                                        // 954
                                                                                                                      // 955
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/peerlibrary:blaze-components/client.coffee.js                                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var createUIHooks, originalDOMRangeAttach;                                                                            // 963
                                                                                                                      // 964
createUIHooks = function(component, parentNode) {                                                                     // 965
  return {                                                                                                            // 966
    insertElement: (function(_this) {                                                                                 // 967
      return function(node, before) {                                                                                 // 968
        if (node._uihooks == null) {                                                                                  // 969
          node._uihooks = createUIHooks(component, node);                                                             // 970
        }                                                                                                             // 971
        return component.insertDOMElement(parentNode, node, before);                                                  // 972
      };                                                                                                              // 973
    })(this),                                                                                                         // 974
    moveElement: (function(_this) {                                                                                   // 975
      return function(node, before) {                                                                                 // 976
        if (node._uihooks == null) {                                                                                  // 977
          node._uihooks = createUIHooks(component, node);                                                             // 978
        }                                                                                                             // 979
        return component.moveDOMElement(parentNode, node, before);                                                    // 980
      };                                                                                                              // 981
    })(this),                                                                                                         // 982
    removeElement: (function(_this) {                                                                                 // 983
      return function(node) {                                                                                         // 984
        if (node._uihooks == null) {                                                                                  // 985
          node._uihooks = createUIHooks(component, node);                                                             // 986
        }                                                                                                             // 987
        return component.removeDOMElement(node.parentNode, node);                                                     // 988
      };                                                                                                              // 989
    })(this)                                                                                                          // 990
  };                                                                                                                  // 991
};                                                                                                                    // 992
                                                                                                                      // 993
originalDOMRangeAttach = Blaze._DOMRange.prototype.attach;                                                            // 994
                                                                                                                      // 995
Blaze._DOMRange.prototype.attach = function(parentElement, nextNode, _isMove, _isReplace) {                           // 996
  var component, oldUIHooks, _ref;                                                                                    // 997
  if (component = (_ref = this.view._templateInstance) != null ? _ref.component : void 0) {                           // 998
    oldUIHooks = parentElement._uihooks;                                                                              // 999
    try {                                                                                                             // 1000
      parentElement._uihooks = createUIHooks(component, parentElement);                                               // 1001
      return originalDOMRangeAttach.apply(this, arguments);                                                           // 1002
    } finally {                                                                                                       // 1003
      if (oldUIHooks) {                                                                                               // 1004
        parentElement._uihooks = oldUIHooks;                                                                          // 1005
      }                                                                                                               // 1006
    }                                                                                                                 // 1007
  }                                                                                                                   // 1008
  return originalDOMRangeAttach.apply(this, arguments);                                                               // 1009
};                                                                                                                    // 1010
                                                                                                                      // 1011
share.argumentsConstructor = function() {                                                                             // 1012
  return assert(false);                                                                                               // 1013
};                                                                                                                    // 1014
                                                                                                                      // 1015
Template.registerHelper('args', function() {                                                                          // 1016
  var obj;                                                                                                            // 1017
  obj = {};                                                                                                           // 1018
  obj.constructor = share.argumentsConstructor;                                                                       // 1019
  obj._arguments = arguments;                                                                                         // 1020
  return obj;                                                                                                         // 1021
});                                                                                                                   // 1022
                                                                                                                      // 1023
Template.__dynamicWithDataContext.__helpers.set('chooseTemplate', function(name) {                                    // 1024
  return Blaze._getTemplate(name, (function(_this) {                                                                  // 1025
    return function() {                                                                                               // 1026
      return Template.instance();                                                                                     // 1027
    };                                                                                                                // 1028
  })(this));                                                                                                          // 1029
});                                                                                                                   // 1030
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      // 1032
}).call(this);                                                                                                        // 1033
                                                                                                                      // 1034
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['peerlibrary:blaze-components'] = {
  BlazeComponent: BlazeComponent,
  BlazeComponentDebug: BlazeComponentDebug
};

})();
