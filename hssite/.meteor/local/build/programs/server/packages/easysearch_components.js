(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ECMAScript = Package.ecmascript.ECMAScript;
var Random = Package.random.Random;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var BlazeComponent = Package['peerlibrary:blaze-components'].BlazeComponent;
var BlazeComponentDebug = Package['peerlibrary:blaze-components'].BlazeComponentDebug;
var EasySearch = Package['easysearch:core'].EasySearch;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var EasySearch;



/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['easysearch:components'] = {
  EasySearch: EasySearch
};

})();

//# sourceMappingURL=easysearch_components.js.map
