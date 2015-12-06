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
var check = Package.check.check;
var Match = Package.check.Match;
var Template = Package.templating.Template;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ECMAScript = Package.ecmascript.ECMAScript;
var Random = Package.random.Random;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var BlazeComponent = Package['peerlibrary:blaze-components'].BlazeComponent;
var BlazeComponentDebug = Package['peerlibrary:blaze-components'].BlazeComponentDebug;
var EasySearch = Package['easysearch:core'].EasySearch;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var BaseComponent, SingleIndexComponent, EasySearch;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/base.js                                                              //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The BaseComponent holds the base logic for EasySearch Components.                                       //
 *                                                                                                         //
 * @type {BaseComponent}                                                                                   //
 */                                                                                                        //
BaseComponent = (function (_BlazeComponent) {                                                              // 6
  babelHelpers.inherits(BaseComponent, _BlazeComponent);                                                   //
                                                                                                           //
  function BaseComponent() {                                                                               //
    babelHelpers.classCallCheck(this, BaseComponent);                                                      //
                                                                                                           //
    _BlazeComponent.apply(this, arguments);                                                                //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Setup component on created.                                                                           //
   */                                                                                                      //
                                                                                                           //
  BaseComponent.prototype.onCreated = (function () {                                                       // 6
    function onCreated() {                                                                                 // 28
      var _ref;                                                                                            //
                                                                                                           //
      var index = this.getData().index,                                                                    // 29
          indexes = [index];                                                                               //
                                                                                                           //
      if (!index) {                                                                                        // 32
        indexes = this.getData().indexes;                                                                  // 33
      }                                                                                                    //
                                                                                                           //
      if (_.isEmpty(indexes)) {                                                                            // 36
        throw new Meteor.Error('no-index', 'Please provide an index for your component');                  // 37
      }                                                                                                    //
                                                                                                           //
      if (indexes.filter(function (index) {                                                                // 40
        return index instanceof EasySearch.Index;                                                          //
      }).length != indexes.length) {                                                                       //
        throw new Meteor.Error('invalid-configuration', 'Did not receive an index or an array of indexes: "' + indexes.toString() + '"');
      }                                                                                                    //
                                                                                                           //
      this.indexes = indexes;                                                                              // 47
      this.options = _.defaults({}, (_ref = _).omit.apply(_ref, [this.getData()].concat(BaseComponent.reserveredProperties)), this.defaultOptions);
                                                                                                           //
      check(this.name, Match.Optional(String));                                                            // 50
      check(this.options, Object);                                                                         // 51
                                                                                                           //
      this.eachIndex(function (index, name) {                                                              // 53
        if (!index.getComponentDict(name)) {                                                               // 54
          index.registerComponent(name);                                                                   // 55
        }                                                                                                  //
      });                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return onCreated;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the default options.                                                                           //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  /**                                                                                                      //
   * Search the component.                                                                                 //
   *                                                                                                       //
   * @param {String} searchString String to search for                                                     //
   */                                                                                                      //
                                                                                                           //
  BaseComponent.prototype.search = (function () {                                                          // 6
    function search(searchString) {                                                                        // 74
      check(searchString, String);                                                                         // 75
                                                                                                           //
      this.eachIndex(function (index, name) {                                                              // 77
        index.getComponentMethods(name).search(searchString);                                              // 78
      });                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return search;                                                                                         //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the data.                                                                                      //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  BaseComponent.prototype.getData = (function () {                                                         // 6
    function getData() {                                                                                   // 87
      return this.data() || {};                                                                            // 88
    }                                                                                                      //
                                                                                                           //
    return getData;                                                                                        //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the dictionaries.                                                                              //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  /**                                                                                                      //
   * Loop through each index and apply a function                                                          //
   *                                                                                                       //
   * @param {Function} func   Function to run                                                              //
   * @param {String}   method Lodash method name                                                           //
   *                                                                                                       //
   * @return mixed                                                                                         //
   */                                                                                                      //
                                                                                                           //
  BaseComponent.prototype.eachIndex = (function () {                                                       // 6
    function eachIndex(func) {                                                                             // 110
      var method = arguments.length <= 1 || arguments[1] === undefined ? 'each' : arguments[1];            //
                                                                                                           //
      var componentScope = this,                                                                           // 111
          logic = this.getData().logic;                                                                    //
                                                                                                           //
      if (!_.isEmpty(logic)) {                                                                             // 114
        method = 'OR' === logic ? 'some' : 'every';                                                        // 115
      }                                                                                                    //
                                                                                                           //
      return _[method](this.indexes, function (index) {                                                    // 118
        return func.apply(this, [index, componentScope.name]);                                             // 119
      });                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return eachIndex;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  babelHelpers.createClass(BaseComponent, [{                                                               //
    key: 'name',                                                                                           //
                                                                                                           //
    /**                                                                                                    //
     * Return the name of the component.                                                                   //
     *                                                                                                     //
     * @returns {String}                                                                                   //
     */                                                                                                    //
    get: function () {                                                                                     //
      return this.getData().name;                                                                          // 13
    }                                                                                                      //
                                                                                                           //
    /**                                                                                                    //
     * Return an array of properties that are reserved to the base component.                              //
     *                                                                                                     //
     * @returns {String[]}                                                                                 //
     */                                                                                                    //
  }, {                                                                                                     //
    key: 'defaultOptions',                                                                                 //
    get: function () {                                                                                     //
      return {};                                                                                           // 66
    }                                                                                                      //
  }, {                                                                                                     //
    key: 'dicts',                                                                                          //
    get: function () {                                                                                     //
      return this.eachIndex(function (index, name) {                                                       // 97
        return index.getComponentDict(name);                                                               // 98
      }, 'map');                                                                                           //
    }                                                                                                      //
  }], [{                                                                                                   //
    key: 'reserveredProperties',                                                                           //
    get: function () {                                                                                     //
      return ['index', 'indexes', 'name', 'attributes'];                                                   // 22
    }                                                                                                      //
  }]);                                                                                                     //
  return BaseComponent;                                                                                    //
})(BlazeComponent);                                                                                        //
                                                                                                           //
EasySearch.BaseComponent = BaseComponent;                                                                  // 124
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/single-index.js                                                      //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The SingleIndexComponent holds logic for components that only can use one index.                        //
 *                                                                                                         //
 * @type {SingleIndexComponent}                                                                            //
 */                                                                                                        //
SingleIndexComponent = (function (_BaseComponent) {                                                        // 6
  babelHelpers.inherits(SingleIndexComponent, _BaseComponent);                                             //
                                                                                                           //
  function SingleIndexComponent() {                                                                        //
    babelHelpers.classCallCheck(this, SingleIndexComponent);                                               //
                                                                                                           //
    _BaseComponent.apply(this, arguments);                                                                 //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Setup component on created.                                                                           //
   */                                                                                                      //
                                                                                                           //
  SingleIndexComponent.prototype.onCreated = (function () {                                                // 6
    function onCreated() {                                                                                 // 10
      _BaseComponent.prototype.onCreated.call(this);                                                       // 11
                                                                                                           //
      if (this.indexes.length > 1) {                                                                       // 13
        throw new Meteor.Error('only-single-index', 'Can only specify one index');                         // 14
      }                                                                                                    //
    }                                                                                                      //
                                                                                                           //
    return onCreated;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the index                                                                                      //
   *                                                                                                       //
   * @returns {Index}                                                                                      //
   */                                                                                                      //
  babelHelpers.createClass(SingleIndexComponent, [{                                                        //
    key: 'index',                                                                                          //
    get: function () {                                                                                     //
      return _.first(this.indexes);                                                                        // 24
    }                                                                                                      //
                                                                                                           //
    /**                                                                                                    //
     * Return the dictionary.                                                                              //
     *                                                                                                     //
     * @returns {Object}                                                                                   //
     */                                                                                                    //
  }, {                                                                                                     //
    key: 'dict',                                                                                           //
    get: function () {                                                                                     //
      return _.first(this.dicts);                                                                          // 33
    }                                                                                                      //
  }]);                                                                                                     //
  return SingleIndexComponent;                                                                             //
})(BaseComponent);                                                                                         //
                                                                                                           //
EasySearch.SingleIndexComponent = SingleIndexComponent;                                                    // 37
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/component-methods.js                                                 //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
EasySearch._getComponentMethods = function (dict, index) {                                                 // 1
  return {                                                                                                 // 2
    /**                                                                                                    //
     * Search a component for the given search string.                                                     //
     *                                                                                                     //
     * @param {Object|String} searchDefinition Search definition                                           //
     */                                                                                                    //
    search: function (searchDefinition) {                                                                  // 8
      dict.set('searchOptions', {                                                                          // 9
        props: (dict.get('searchOptions') || {}).props                                                     // 10
      });                                                                                                  //
                                                                                                           //
      dict.set('searchDefinition', searchDefinition);                                                      // 13
      dict.set('stopPublication', true);                                                                   // 14
    },                                                                                                     //
    /**                                                                                                    //
     * Return the EasySearch.Cursor for the current search.                                                //
     *                                                                                                     //
     * @returns {Cursor}                                                                                   //
     */                                                                                                    //
    getCursor: function () {                                                                               // 21
      var searchDefinition = dict.get('searchDefinition') || '',                                           // 22
          options = dict.get('searchOptions');                                                             //
                                                                                                           //
      check(options, Match.Optional(Object));                                                              // 25
                                                                                                           //
      var cursor = index.search(searchDefinition, options),                                                // 27
          searchOptions = index._getSearchOptions(options);                                                //
                                                                                                           //
      dict.set('count', cursor.count());                                                                   // 30
      dict.set('searching', !cursor.isReady());                                                            // 31
      dict.set('limit', searchOptions.limit);                                                              // 32
      dict.set('skip', searchOptions.skip);                                                                // 33
      dict.set('currentCount', cursor.mongoCursor.count());                                                // 34
      dict.set('stopPublication', false);                                                                  // 35
                                                                                                           //
      return cursor;                                                                                       // 37
    },                                                                                                     //
    /**                                                                                                    //
     * Return true if the current search string is empty.                                                  //
     *                                                                                                     //
     * @returns {boolean}                                                                                  //
     */                                                                                                    //
    searchIsEmpty: function () {                                                                           // 44
      var searchDefinition = dict.get('searchDefinition');                                                 // 45
                                                                                                           //
      return !searchDefinition || _.isString(searchDefinition) && 0 === searchDefinition.trim().length;    // 47
    },                                                                                                     //
    /**                                                                                                    //
     * Return true if the component has no results.                                                        //
     *                                                                                                     //
     * @returns {boolean}                                                                                  //
     */                                                                                                    //
    hasNoResults: function () {                                                                            // 54
      var count = dict.get('count');                                                                       // 55
                                                                                                           //
      return !_.isNumber(count) || 0 === count;                                                            // 57
    },                                                                                                     //
    /**                                                                                                    //
     * Return true if the component is being searched.                                                     //
     *                                                                                                     //
     * @returns {boolean}                                                                                  //
     */                                                                                                    //
    isSearching: function () {                                                                             // 64
      return !!dict.get('searching');                                                                      // 65
    },                                                                                                     //
    /**                                                                                                    //
     * Return true if the component has more documents than displayed right now.                           //
     *                                                                                                     //
     * @returns {boolean}                                                                                  //
     */                                                                                                    //
    hasMoreDocuments: function () {                                                                        // 72
      return dict.get('currentCount') < dict.get('count');                                                 // 73
    },                                                                                                     //
    /**                                                                                                    //
     * Load more documents for the component.                                                              //
     *                                                                                                     //
     * @param {Number} count Count of docs                                                                 //
     */                                                                                                    //
    loadMore: function (count) {                                                                           // 80
      check(count, Number);                                                                                // 81
                                                                                                           //
      var currentCount = dict.get('currentCount'),                                                         // 83
          options = dict.get('searchOptions') || {};                                                       //
                                                                                                           //
      options.limit = currentCount + count;                                                                // 86
      dict.set('searchOptions', options);                                                                  // 87
    },                                                                                                     //
    /**                                                                                                    //
     * Paginate through documents for the given page.                                                      //
     *                                                                                                     //
     * @param {Number} page Page number                                                                    //
     */                                                                                                    //
    paginate: function (page) {                                                                            // 94
      check(page, Number);                                                                                 // 95
                                                                                                           //
      var options = dict.get('searchOptions') || {},                                                       // 97
          limit = dict.get('limit');                                                                       //
                                                                                                           //
      options.skip = limit * (page - 1);                                                                   // 100
      dict.set('searchOptions', options);                                                                  // 101
      dict.set('stopPublication', true);                                                                   // 102
    },                                                                                                     //
    /**                                                                                                    //
     * Add custom properties for search.                                                                   //
     */                                                                                                    //
    addProps: function () {                                                                                // 107
      var options = dict.get('searchOptions') || {};                                                       // 108
                                                                                                           //
      options.props = options.props || {};                                                                 // 110
                                                                                                           //
      if (_.isObject(arguments[0])) {                                                                      // 112
        options.props = _.extend(options.props, arguments[0]);                                             // 113
      } else if (_.isString(arguments[0]) && _.isString(arguments[1])) {                                   //
        options.props[arguments[0]] = arguments[1];                                                        // 115
      }                                                                                                    //
                                                                                                           //
      dict.set('searchOptions', options);                                                                  // 118
    },                                                                                                     //
    /**                                                                                                    //
     * Remove custom properties for search.                                                                //
     */                                                                                                    //
    removeProps: function () {                                                                             // 123
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {               //
        args[_key] = arguments[_key];                                                                      // 123
      }                                                                                                    //
                                                                                                           //
      var options = dict.get('searchOptions') || {};                                                       // 124
                                                                                                           //
      if (!_.isEmpty(args)) {                                                                              // 126
        options.props = _.omit(options.props, args) || {};                                                 // 127
      } else {                                                                                             //
        options.props = {};                                                                                // 129
      }                                                                                                    //
                                                                                                           //
      dict.set('searchOptions', options);                                                                  // 132
    }                                                                                                      //
  };                                                                                                       //
};                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/core.js                                                              //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * Extend EasySearch.Index with component functionality.                                                   //
 *                                                                                                         //
 * @type {Index}                                                                                           //
 */                                                                                                        //
EasySearch.Index = (function (_EasySearch$Index) {                                                         // 6
  babelHelpers.inherits(Index, _EasySearch$Index);                                                         //
                                                                                                           //
  /**                                                                                                      //
   * Constructor.                                                                                          //
   */                                                                                                      //
                                                                                                           //
  function Index() {                                                                                       // 10
    babelHelpers.classCallCheck(this, Index);                                                              //
                                                                                                           //
    _EasySearch$Index.apply(this, arguments);                                                              // 11
    this.components = {};                                                                                  // 12
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Return static default name for components.                                                            //
   *                                                                                                       //
   * @returns {String}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  /**                                                                                                      //
   * Register a component on the index.                                                                    //
   *                                                                                                       //
   * @param {String} componentName Optional name of the component                                          //
   */                                                                                                      //
                                                                                                           //
  Index.prototype.registerComponent = (function () {                                                       // 6
    function registerComponent() {                                                                         // 29
      var componentName = arguments.length <= 0 || arguments[0] === undefined ? EasySearch.Index.COMPONENT_DEFAULT_NAME : arguments[0];
                                                                                                           //
      this.components[componentName] = new ReactiveDict('easySearchComponent_' + this.config.name + '_' + componentName + '_' + Random.id());
    }                                                                                                      //
                                                                                                           //
    return registerComponent;                                                                              //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Get the reactive dictionary for a component.                                                          //
   *                                                                                                       //
   * @param {String} componentName Optional name of the component                                          //
   */                                                                                                      //
                                                                                                           //
  Index.prototype.getComponentDict = (function () {                                                        // 6
    function getComponentDict() {                                                                          // 38
      var componentName = arguments.length <= 0 || arguments[0] === undefined ? EasySearch.Index.COMPONENT_DEFAULT_NAME : arguments[0];
                                                                                                           //
      return this.components[componentName];                                                               // 39
    }                                                                                                      //
                                                                                                           //
    return getComponentDict;                                                                               //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Get component methods that are useful for implementing search behaviour.                              //
   *                                                                                                       //
   * @param componentName                                                                                  //
   */                                                                                                      //
                                                                                                           //
  Index.prototype.getComponentMethods = (function () {                                                     // 6
    function getComponentMethods() {                                                                       // 47
      var componentName = arguments.length <= 0 || arguments[0] === undefined ? EasySearch.Index.COMPONENT_DEFAULT_NAME : arguments[0];
                                                                                                           //
      var dict = this.getComponentDict(componentName);                                                     // 48
                                                                                                           //
      if (!dict) {                                                                                         // 50
        throw new Meteor.Error('no-component', 'Component with name \'' + componentName + '\' not found');
      }                                                                                                    //
                                                                                                           //
      return EasySearch._getComponentMethods(dict, this);                                                  // 54
    }                                                                                                      //
                                                                                                           //
    return getComponentMethods;                                                                            //
  })();                                                                                                    //
                                                                                                           //
  babelHelpers.createClass(Index, null, [{                                                                 //
    key: 'COMPONENT_DEFAULT_NAME',                                                                         //
    get: function () {                                                                                     //
      return '__default';                                                                                  // 21
    }                                                                                                      //
  }]);                                                                                                     //
  return Index;                                                                                            //
})(EasySearch.Index);                                                                                      //
                                                                                                           //
/**                                                                                                        //
 * Return true if the current page is valid.                                                               //
 *                                                                                                         //
 * @param {Number} totalPagesLength Count of all pages available                                           //
 * @param {Number} currentPage      Current page to check                                                  //
 *                                                                                                         //
 * @returns {boolean}                                                                                      //
 */                                                                                                        //
function isValidPage(totalPagesLength, currentPage) {                                                      // 66
  return currentPage <= totalPagesLength && currentPage > 0;                                               // 67
}                                                                                                          //
                                                                                                           //
/**                                                                                                        //
 * Helper method to get the pages for pagination as an array.                                              //
 *                                                                                                         //
 * @param totalCount   Total count of results                                                              //
 * @param pageCount    Count of results per page                                                           //
 * @param currentPage  Current page                                                                        //
 * @param prevAndNext  True if Next and Previous buttons should appear                                     //
 * @param maxPages     Maximum count of pages to show                                                      //
 *                                                                                                         //
 * @private                                                                                                //
 *                                                                                                         //
 * @returns {Array}                                                                                        //
 */                                                                                                        //
EasySearch._getPagesForPagination = function (_ref) {                                                      // 83
  var totalCount = _ref.totalCount;                                                                        //
  var pageCount = _ref.pageCount;                                                                          //
  var currentPage = _ref.currentPage;                                                                      //
  var prevAndNext = _ref.prevAndNext;                                                                      //
  var maxPages = _ref.maxPages;                                                                            //
                                                                                                           //
  var pages = _.range(1, Math.ceil(totalCount / pageCount) + 1),                                           // 84
      pagesLength = pages.length;                                                                          //
                                                                                                           //
  if (!isValidPage(pagesLength, currentPage)) {                                                            // 87
    throw new Meteor.Error('invalid-page', 'Current page is not in valid range');                          // 88
  }                                                                                                        //
                                                                                                           //
  if (maxPages) {                                                                                          // 91
    var startSlice = currentPage > maxPages / 2 ? currentPage - 1 - Math.floor(maxPages / 2) : 0,          // 92
        endSlice = startSlice + maxPages;                                                                  //
                                                                                                           //
    if (endSlice > pagesLength) {                                                                          // 95
      pages = pages.slice(-maxPages);                                                                      // 96
    } else {                                                                                               //
      pages = pages.slice(startSlice, startSlice + maxPages);                                              // 98
    }                                                                                                      //
  }                                                                                                        //
                                                                                                           //
  var pageData = _.map(pages, function (page) {                                                            // 102
    var isCurrentPage = page === currentPage;                                                              // 103
    return { page: page, content: page.toString(), current: isCurrentPage, disabled: isCurrentPage };      // 104
  });                                                                                                      //
                                                                                                           //
  if (prevAndNext) {                                                                                       // 107
    // Previous                                                                                            //
    var prevPage = isValidPage(pagesLength, currentPage - 1) ? currentPage - 1 : null;                     // 109
    pageData.unshift({ page: prevPage, content: 'Prev', current: false, disabled: 1 === currentPage });    // 110
    // Next                                                                                                //
    var nextPage = isValidPage(pagesLength, currentPage + 1) ? currentPage + 1 : null;                     // 112
    pageData.push({ page: nextPage, content: 'Next', current: false, disabled: null == nextPage || pagesLength + 1 === currentPage });
  }                                                                                                        //
                                                                                                           //
  return pageData;                                                                                         // 118
};                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/input/template.input.js                                              //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.Input");                                                                  // 2
Template["EasySearch.Input"] = new Template("Template.EasySearch.Input", (function() {                     // 3
  var view = this;                                                                                         // 4
  return HTML.INPUT(HTML.Attrs(function() {                                                                // 5
    return Spacebars.attrMustache(view.lookup("inputAttributes"));                                         // 6
  }));                                                                                                     // 7
}));                                                                                                       // 8
                                                                                                           // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/input/input.js                                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The InputComponent lets you search through configured indexes.                                          //
 *                                                                                                         //
 * @type {InputComponent}                                                                                  //
 */                                                                                                        //
EasySearch.InputComponent = (function (_BaseComponent) {                                                   // 6
  babelHelpers.inherits(InputComponent, _BaseComponent);                                                   //
                                                                                                           //
  function InputComponent() {                                                                              //
    babelHelpers.classCallCheck(this, InputComponent);                                                     //
                                                                                                           //
    _BaseComponent.apply(this, arguments);                                                                 //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Setup input onCreated.                                                                                //
   */                                                                                                      //
                                                                                                           //
  InputComponent.prototype.onCreated = (function () {                                                      // 6
    function onCreated() {                                                                                 // 10
      var _BaseComponent$prototype$onCreated,                                                              //
          _this = this;                                                                                    //
                                                                                                           //
      var cursorHandle = undefined;                                                                        // 11
                                                                                                           //
      (_BaseComponent$prototype$onCreated = _BaseComponent.prototype.onCreated).call.apply(_BaseComponent$prototype$onCreated, [this].concat(babelHelpers.slice.call(arguments)));
                                                                                                           //
      this.search(this.inputAttributes().value);                                                           // 15
                                                                                                           //
      // create a reactive dependency to the cursor                                                        //
      Tracker.autorun(function () {                                                                        // 18
        _this.eachIndex(function (index, name) {                                                           // 19
          if (cursorHandle) {                                                                              // 20
            cursorHandle.stop();                                                                           // 21
          }                                                                                                //
                                                                                                           //
          cursorHandle = index.getComponentMethods(name).getCursor();                                      // 24
        });                                                                                                //
      });                                                                                                  //
                                                                                                           //
      this.debouncedSearch = _.debounce(function (searchString) {                                          // 28
        searchString = searchString.trim();                                                                // 29
                                                                                                           //
        if (_this.searchString !== searchString) {                                                         // 31
          _this.searchString = searchString;                                                               // 32
                                                                                                           //
          _this.eachIndex(function (index, name) {                                                         // 34
            index.getComponentDict(name).set('currentPage', 1);                                            // 35
          });                                                                                              //
                                                                                                           //
          _this.search(searchString);                                                                      // 38
        }                                                                                                  //
      }, this.options.timeout);                                                                            //
    }                                                                                                      //
                                                                                                           //
    return onCreated;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Event map.                                                                                            //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  InputComponent.prototype.events = (function () {                                                         // 6
    function events() {                                                                                    // 49
      return [{                                                                                            // 50
        'keyup input': function (e) {                                                                      // 51
          if ('enter' == this.getData().event && e.keyCode != 13) {                                        // 52
            return;                                                                                        // 53
          }                                                                                                //
                                                                                                           //
          this.debouncedSearch($(e.target).val());                                                         // 56
        }                                                                                                  //
      }];                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return events;                                                                                         //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the attributes to set on the input (class, id).                                                //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  InputComponent.prototype.inputAttributes = (function () {                                                // 6
    function inputAttributes() {                                                                           // 66
      return _.defaults({}, this.getData().attributes, InputComponent.defaultAttributes);                  // 67
    }                                                                                                      //
                                                                                                           //
    return inputAttributes;                                                                                //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the default attributes.                                                                        //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
  babelHelpers.createClass(InputComponent, [{                                                              //
    key: 'defaultOptions',                                                                                 //
                                                                                                           //
    /**                                                                                                    //
     * Return the default options.                                                                         //
     *                                                                                                     //
     * @returns {Object}                                                                                   //
     */                                                                                                    //
    get: function () {                                                                                     //
      return {                                                                                             // 88
        timeout: 50                                                                                        // 89
      };                                                                                                   //
    }                                                                                                      //
  }], [{                                                                                                   //
    key: 'defaultAttributes',                                                                              //
    get: function () {                                                                                     //
      return {                                                                                             // 76
        type: 'text',                                                                                      // 77
        value: ''                                                                                          // 78
      };                                                                                                   //
    }                                                                                                      //
  }]);                                                                                                     //
  return InputComponent;                                                                                   //
})(BaseComponent);                                                                                         //
                                                                                                           //
EasySearch.InputComponent.register('EasySearch.Input');                                                    // 94
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/field-input/template.field-input.js                                  //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.FieldInput");                                                             // 2
Template["EasySearch.FieldInput"] = new Template("Template.EasySearch.FieldInput", (function() {           // 3
  var view = this;                                                                                         // 4
  return HTML.INPUT(HTML.Attrs(function() {                                                                // 5
    return Spacebars.attrMustache(view.lookup("inputAttributes"));                                         // 6
  }));                                                                                                     // 7
}));                                                                                                       // 8
                                                                                                           // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/field-input/field-input.js                                           //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The FieldInputComponent lets you search through configured indexes for a specified fild.                //
 *                                                                                                         //
 * @type {FieldInputComponent}                                                                             //
 */                                                                                                        //
EasySearch.FieldInputComponent = (function (_EasySearch$InputComponent) {                                  // 6
  babelHelpers.inherits(FieldInputComponent, _EasySearch$InputComponent);                                  //
                                                                                                           //
  function FieldInputComponent() {                                                                         //
    babelHelpers.classCallCheck(this, FieldInputComponent);                                                //
                                                                                                           //
    _EasySearch$InputComponent.apply(this, arguments);                                                     //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Setup component on created.                                                                           //
   */                                                                                                      //
                                                                                                           //
  FieldInputComponent.prototype.onCreated = (function () {                                                 // 6
    function onCreated() {                                                                                 // 10
      _EasySearch$InputComponent.prototype.onCreated.call(this);                                           // 11
                                                                                                           //
      if (_.isEmpty(this.getData().field)) {                                                               // 13
        throw new Meteor.Error('no-field', 'Please provide a field for your field input component');       // 14
      }                                                                                                    //
    }                                                                                                      //
                                                                                                           //
    return onCreated;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Search the component.                                                                                 //
   *                                                                                                       //
   * @param {String} searchString String to search for                                                     //
   */                                                                                                      //
                                                                                                           //
  FieldInputComponent.prototype.search = (function () {                                                    // 6
    function search(searchString) {                                                                        // 23
      var _this = this;                                                                                    //
                                                                                                           //
      check(searchString, String);                                                                         // 24
                                                                                                           //
      this.eachIndex(function (index, name) {                                                              // 26
        var searchDefinition = index.getComponentDict(name).get('searchDefinition') || {};                 // 27
                                                                                                           //
        if (_.isString(searchDefinition)) {                                                                // 29
          throw new Meteor.Error('You can either EasySearch.FieldInput or EasySearch.Input');              // 30
        }                                                                                                  //
                                                                                                           //
        if (_this.options.field) {                                                                         // 33
          searchDefinition[_this.options.field] = searchString;                                            // 34
          index.getComponentMethods(name).search(searchDefinition);                                        // 35
        }                                                                                                  //
      });                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return search;                                                                                         //
  })();                                                                                                    //
                                                                                                           //
  return FieldInputComponent;                                                                              //
})(EasySearch.InputComponent);                                                                             //
                                                                                                           //
EasySearch.FieldInputComponent.register('EasySearch.FieldInput');                                          // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/each/template.each.js                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.Each");                                                                   // 2
Template["EasySearch.Each"] = new Template("Template.EasySearch.Each", (function() {                       // 3
  var view = this;                                                                                         // 4
  return Blaze.Each(function() {                                                                           // 5
    return Spacebars.call(view.lookup("doc"));                                                             // 6
  }, function() {                                                                                          // 7
    return [ "\n      ", Blaze._InOuterTemplateScope(view, function() {                                    // 8
      return Blaze._TemplateWith(function() {                                                              // 9
        return Spacebars.call(view.lookup("."));                                                           // 10
      }, function() {                                                                                      // 11
        return Spacebars.include(function() {                                                              // 12
          return Spacebars.call(view.templateContentBlock);                                                // 13
        });                                                                                                // 14
      });                                                                                                  // 15
    }), "\n    " ];                                                                                        // 16
  });                                                                                                      // 17
}));                                                                                                       // 18
                                                                                                           // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/each/each.js                                                         //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The EachComponent allows to loop through the search results found with the InputComponent.              //
 *                                                                                                         //
 * @type {EachComponent}                                                                                   //
 */                                                                                                        //
EasySearch.EachComponent = (function (_SingleIndexComponent) {                                             // 6
  babelHelpers.inherits(EachComponent, _SingleIndexComponent);                                             //
                                                                                                           //
  function EachComponent() {                                                                               //
    babelHelpers.classCallCheck(this, EachComponent);                                                      //
                                                                                                           //
    _SingleIndexComponent.apply(this, arguments);                                                          //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Return the mongo cursor for the search.                                                               //
   *                                                                                                       //
   * @returns {Mongo.Cursor}                                                                               //
   */                                                                                                      //
                                                                                                           //
  EachComponent.prototype.doc = (function () {                                                             // 6
    function doc() {                                                                                       // 12
      var stopPublication = this.index.getComponentDict(this.name).get('stopPublication');                 // 13
                                                                                                           //
      this.cursor && stopPublication && this.cursor.stop();                                                // 18
                                                                                                           //
      this.cursor = this.index.getComponentMethods(this.name).getCursor();                                 // 20
                                                                                                           //
      return this.cursor.mongoCursor;                                                                      // 25
    }                                                                                                      //
                                                                                                           //
    return doc;                                                                                            //
  })();                                                                                                    //
                                                                                                           //
  return EachComponent;                                                                                    //
})(SingleIndexComponent);                                                                                  //
                                                                                                           //
EasySearch.EachComponent.register('EasySearch.Each');                                                      // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/if-input-empty/template.if-input-empty.js                            //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.IfInputEmpty");                                                           // 2
Template["EasySearch.IfInputEmpty"] = new Template("Template.EasySearch.IfInputEmpty", (function() {       // 3
  var view = this;                                                                                         // 4
  return Blaze.If(function() {                                                                             // 5
    return Spacebars.call(view.lookup("inputEmpty"));                                                      // 6
  }, function() {                                                                                          // 7
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {                                  // 8
      return Spacebars.include(function() {                                                                // 9
        return Spacebars.call(view.templateContentBlock);                                                  // 10
      });                                                                                                  // 11
    }), "\n    " ];                                                                                        // 12
  }, function() {                                                                                          // 13
    return [ "\n        ", Blaze.If(function() {                                                           // 14
      return Spacebars.call(view.templateElseBlock);                                                       // 15
    }, function() {                                                                                        // 16
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {                            // 17
        return Spacebars.include(function() {                                                              // 18
          return Spacebars.call(view.templateElseBlock);                                                   // 19
        });                                                                                                // 20
      }), "\n        " ];                                                                                  // 21
    }), "\n    " ];                                                                                        // 22
  });                                                                                                      // 23
}));                                                                                                       // 24
                                                                                                           // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/if-input-empty/if-input-empty.js                                     //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The IfInputEmptyComponent lets you display content when the input is empty.                             //
 *                                                                                                         //
 * @type {IfInputEmptyComponent}                                                                           //
 */                                                                                                        //
EasySearch.IfInputEmptyComponent = (function (_BaseComponent) {                                            // 6
  babelHelpers.inherits(IfInputEmptyComponent, _BaseComponent);                                            //
                                                                                                           //
  function IfInputEmptyComponent() {                                                                       //
    babelHelpers.classCallCheck(this, IfInputEmptyComponent);                                              //
                                                                                                           //
    _BaseComponent.apply(this, arguments);                                                                 //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Return true if the input is empty.                                                                    //
   *                                                                                                       //
   * @returns {boolean}                                                                                    //
   */                                                                                                      //
                                                                                                           //
  IfInputEmptyComponent.prototype.inputEmpty = (function () {                                              // 6
    function inputEmpty() {                                                                                // 12
      return !!this.eachIndex(function (index, name) {                                                     // 13
        return index.getComponentMethods(name).searchIsEmpty();                                            // 14
      }, 'every');                                                                                         //
    }                                                                                                      //
                                                                                                           //
    return inputEmpty;                                                                                     //
  })();                                                                                                    //
                                                                                                           //
  return IfInputEmptyComponent;                                                                            //
})(BaseComponent);                                                                                         //
                                                                                                           //
EasySearch.IfInputEmptyComponent.register('EasySearch.IfInputEmpty');                                      // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/if-no-results/template.if-no-results.js                              //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.IfNoResults");                                                            // 2
Template["EasySearch.IfNoResults"] = new Template("Template.EasySearch.IfNoResults", (function() {         // 3
  var view = this;                                                                                         // 4
  return Blaze.If(function() {                                                                             // 5
    return Spacebars.call(view.lookup("noResults"));                                                       // 6
  }, function() {                                                                                          // 7
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {                                  // 8
      return Spacebars.include(function() {                                                                // 9
        return Spacebars.call(view.templateContentBlock);                                                  // 10
      });                                                                                                  // 11
    }), "\n    " ];                                                                                        // 12
  }, function() {                                                                                          // 13
    return [ "\n        ", Blaze.If(function() {                                                           // 14
      return Spacebars.call(view.templateElseBlock);                                                       // 15
    }, function() {                                                                                        // 16
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {                            // 17
        return Spacebars.include(function() {                                                              // 18
          return Spacebars.call(view.templateElseBlock);                                                   // 19
        });                                                                                                // 20
      }), "\n        " ];                                                                                  // 21
    }), "\n    " ];                                                                                        // 22
  });                                                                                                      // 23
}));                                                                                                       // 24
                                                                                                           // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/if-no-results/if-no-results.js                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The IfNoResultsComponent lets you display content when there are no results.                            //
 *                                                                                                         //
 * @type {IfNoResultsComponent}                                                                            //
 */                                                                                                        //
EasySearch.IfNoResultsComponent = (function (_BaseComponent) {                                             // 6
  babelHelpers.inherits(IfNoResultsComponent, _BaseComponent);                                             //
                                                                                                           //
  function IfNoResultsComponent() {                                                                        //
    babelHelpers.classCallCheck(this, IfNoResultsComponent);                                               //
                                                                                                           //
    _BaseComponent.apply(this, arguments);                                                                 //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Return true if there are no results.                                                                  //
   *                                                                                                       //
   * @returns {boolean}                                                                                    //
   */                                                                                                      //
                                                                                                           //
  IfNoResultsComponent.prototype.noResults = (function () {                                                // 6
    function noResults() {                                                                                 // 12
      return !!this.eachIndex(function (index, name) {                                                     // 13
        return index.getComponentMethods(name).hasNoResults();                                             // 14
      }, 'every');                                                                                         //
    }                                                                                                      //
                                                                                                           //
    return noResults;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  return IfNoResultsComponent;                                                                             //
})(BaseComponent);                                                                                         //
                                                                                                           //
EasySearch.IfNoResultsComponent.register('EasySearch.IfNoResults');                                        // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/if-searching/template.if-searching.js                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.IfSearching");                                                            // 2
Template["EasySearch.IfSearching"] = new Template("Template.EasySearch.IfSearching", (function() {         // 3
  var view = this;                                                                                         // 4
  return Blaze.If(function() {                                                                             // 5
    return Spacebars.call(view.lookup("searching"));                                                       // 6
  }, function() {                                                                                          // 7
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {                                  // 8
      return Spacebars.include(function() {                                                                // 9
        return Spacebars.call(view.templateContentBlock);                                                  // 10
      });                                                                                                  // 11
    }), "\n    " ];                                                                                        // 12
  }, function() {                                                                                          // 13
    return [ "\n        ", Blaze.If(function() {                                                           // 14
      return Spacebars.call(view.templateElseBlock);                                                       // 15
    }, function() {                                                                                        // 16
      return [ "\n            ", Blaze._InOuterTemplateScope(view, function() {                            // 17
        return Spacebars.include(function() {                                                              // 18
          return Spacebars.call(view.templateElseBlock);                                                   // 19
        });                                                                                                // 20
      }), "\n        " ];                                                                                  // 21
    }), "\n    " ];                                                                                        // 22
  });                                                                                                      // 23
}));                                                                                                       // 24
                                                                                                           // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/if-searching/if-searching.js                                         //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The IfSearchingComponent lets you display content when the component is being searched.                 //
 *                                                                                                         //
 * @type {IfSearchingComponent}                                                                            //
 */                                                                                                        //
EasySearch.IfSearchingComponent = (function (_BaseComponent) {                                             // 6
  babelHelpers.inherits(IfSearchingComponent, _BaseComponent);                                             //
                                                                                                           //
  function IfSearchingComponent() {                                                                        //
    babelHelpers.classCallCheck(this, IfSearchingComponent);                                               //
                                                                                                           //
    _BaseComponent.apply(this, arguments);                                                                 //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Return true if the component is being searched.                                                       //
   *                                                                                                       //
   * @returns {boolean}                                                                                    //
   */                                                                                                      //
                                                                                                           //
  IfSearchingComponent.prototype.searching = (function () {                                                // 6
    function searching() {                                                                                 // 12
      return !!this.eachIndex(function (index, name) {                                                     // 13
        return index.getComponentMethods(name).isSearching();                                              // 14
      }, 'every');                                                                                         //
    }                                                                                                      //
                                                                                                           //
    return searching;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  return IfSearchingComponent;                                                                             //
})(BaseComponent);                                                                                         //
                                                                                                           //
EasySearch.IfSearchingComponent.register('EasySearch.IfSearching');                                        // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/load-more/template.load-more.js                                      //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.LoadMore");                                                               // 2
Template["EasySearch.LoadMore"] = new Template("Template.EasySearch.LoadMore", (function() {               // 3
  var view = this;                                                                                         // 4
  return Blaze.If(function() {                                                                             // 5
    return Spacebars.call(view.lookup("moreDocuments"));                                                   // 6
  }, function() {                                                                                          // 7
    return [ "\n        ", HTML.BUTTON(HTML.Attrs(function() {                                             // 8
      return Spacebars.attrMustache(view.lookup("attributes"));                                            // 9
    }), Blaze.View("lookup:content", function() {                                                          // 10
      return Spacebars.mustache(view.lookup("content"));                                                   // 11
    })), "\n    " ];                                                                                       // 12
  });                                                                                                      // 13
}));                                                                                                       // 14
                                                                                                           // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/load-more/load-more.js                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The LoadMoreComponent lets you load more documents through a button.                                    //
 *                                                                                                         //
 * @type {LoadMoreComponent}                                                                               //
 */                                                                                                        //
EasySearch.LoadMoreComponent = (function (_SingleIndexComponent) {                                         // 6
  babelHelpers.inherits(LoadMoreComponent, _SingleIndexComponent);                                         //
                                                                                                           //
  function LoadMoreComponent() {                                                                           //
    babelHelpers.classCallCheck(this, LoadMoreComponent);                                                  //
                                                                                                           //
    _SingleIndexComponent.apply(this, arguments);                                                          //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Load more documents.                                                                                  //
   */                                                                                                      //
                                                                                                           //
  LoadMoreComponent.prototype.loadMore = (function () {                                                    // 6
    function loadMore() {                                                                                  // 10
      this.index.getComponentMethods(this.name).loadMore(this.options.count);                              // 11
    }                                                                                                      //
                                                                                                           //
    return loadMore;                                                                                       //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Content of the component.                                                                             //
   *                                                                                                       //
   * @returns string                                                                                       //
   */                                                                                                      //
                                                                                                           //
  LoadMoreComponent.prototype.content = (function () {                                                     // 6
    function content() {                                                                                   // 22
      return this.options.content;                                                                         // 23
    }                                                                                                      //
                                                                                                           //
    return content;                                                                                        //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Attributes of the component.                                                                          //
   *                                                                                                       //
   * @returns string                                                                                       //
   */                                                                                                      //
                                                                                                           //
  LoadMoreComponent.prototype.attributes = (function () {                                                  // 6
    function attributes() {                                                                                // 31
      return this.getData().attributes || {};                                                              // 32
    }                                                                                                      //
                                                                                                           //
    return attributes;                                                                                     //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return true if there are more documents to load.                                                      //
   *                                                                                                       //
   * @returns {Boolean}                                                                                    //
   */                                                                                                      //
                                                                                                           //
  LoadMoreComponent.prototype.moreDocuments = (function () {                                               // 6
    function moreDocuments() {                                                                             // 40
      return this.index.getComponentMethods(this.name).hasMoreDocuments();                                 // 41
    }                                                                                                      //
                                                                                                           //
    return moreDocuments;                                                                                  //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Event map.                                                                                            //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  LoadMoreComponent.prototype.events = (function () {                                                      // 6
    function events() {                                                                                    // 49
      return [{                                                                                            // 50
        'click button': function () {                                                                      // 51
          this.loadMore();                                                                                 // 52
        }                                                                                                  //
      }];                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return events;                                                                                         //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the default options.                                                                           //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
  babelHelpers.createClass(LoadMoreComponent, [{                                                           //
    key: 'defaultOptions',                                                                                 //
    get: function () {                                                                                     //
      return {                                                                                             // 63
        content: 'Load more',                                                                              // 64
        count: 10                                                                                          // 65
      };                                                                                                   //
    }                                                                                                      //
  }]);                                                                                                     //
  return LoadMoreComponent;                                                                                //
})(SingleIndexComponent);                                                                                  //
                                                                                                           //
EasySearch.LoadMoreComponent.register('EasySearch.LoadMore');                                              // 70
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/pagination/template.pagination.js                                    //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("EasySearch.Pagination");                                                             // 2
Template["EasySearch.Pagination"] = new Template("Template.EasySearch.Pagination", (function() {           // 3
  var view = this;                                                                                         // 4
  return Blaze.If(function() {                                                                             // 5
    return Spacebars.call(view.lookup("moreDocuments"));                                                   // 6
  }, function() {                                                                                          // 7
    return [ "\n        ", Blaze.If(function() {                                                           // 8
      return Spacebars.call(view.lookup("customRenderPagination"));                                        // 9
    }, function() {                                                                                        // 10
      return [ "\n            ", Blaze._TemplateWith(function() {                                          // 11
        return {                                                                                           // 12
          template: Spacebars.call(view.lookup("customRenderPagination"))                                  // 13
        };                                                                                                 // 14
      }, function() {                                                                                      // 15
        return Spacebars.include(function() {                                                              // 16
          return Spacebars.call(Template.__dynamic);                                                       // 17
        });                                                                                                // 18
      }), "\n        " ];                                                                                  // 19
    }, function() {                                                                                        // 20
      return [ "\n            ", HTML.UL({                                                                 // 21
        "class": "pagination"                                                                              // 22
      }, "\n                ", Blaze.Each(function() {                                                     // 23
        return Spacebars.call(view.lookup("page"));                                                        // 24
      }, function() {                                                                                      // 25
        return [ "\n                    ", HTML.LI({                                                       // 26
          "class": function() {                                                                            // 27
            return [ "page ", Spacebars.mustache(view.lookup("pageClasses"), view.lookup(".")) ];          // 28
          }                                                                                                // 29
        }, "\n                        ", Blaze.View("lookup:content", function() {                         // 30
          return Spacebars.mustache(view.lookup("content"));                                               // 31
        }), "\n                    "), "\n                " ];                                             // 32
      }), "\n            "), "\n        " ];                                                               // 33
    }), "\n    " ];                                                                                        // 34
  });                                                                                                      // 35
}));                                                                                                       // 36
                                                                                                           // 37
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/easysearch_components/lib/pagination/pagination.js                                             //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        //
 * The PaginationComponent lets you paginate through documents.                                            //
 *                                                                                                         //
 * @type {PaginationComponent}                                                                             //
 */                                                                                                        //
EasySearch.PaginationComponent = (function (_SingleIndexComponent) {                                       // 6
  babelHelpers.inherits(PaginationComponent, _SingleIndexComponent);                                       //
                                                                                                           //
  function PaginationComponent() {                                                                         //
    babelHelpers.classCallCheck(this, PaginationComponent);                                                //
                                                                                                           //
    _SingleIndexComponent.apply(this, arguments);                                                          //
  }                                                                                                        //
                                                                                                           //
  /**                                                                                                      //
   * Setup component on created.                                                                           //
   */                                                                                                      //
                                                                                                           //
  PaginationComponent.prototype.onCreated = (function () {                                                 // 6
    function onCreated() {                                                                                 // 10
      _SingleIndexComponent.prototype.onCreated.call(this);                                                // 11
      this.dict.set('currentPage', 1);                                                                     // 12
    }                                                                                                      //
                                                                                                           //
    return onCreated;                                                                                      //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Get pages for displaying the pagination.                                                              //
   *                                                                                                       //
   * @returns {Array}                                                                                      //
   */                                                                                                      //
                                                                                                           //
  PaginationComponent.prototype.page = (function () {                                                      // 6
    function page() {                                                                                      // 20
      var totalCount = this.dict.get('count'),                                                             // 21
          pageCount = this.dict.get('limit'),                                                              //
          currentPage = this.dict.get('currentPage'),                                                      //
          maxPages = this.options.maxPages,                                                                //
          prevAndNext = this.options.prevAndNext;                                                          //
                                                                                                           //
      if (!pageCount || !totalCount) {                                                                     // 27
        return [];                                                                                         // 28
      }                                                                                                    //
                                                                                                           //
      return this.options.transformPages(EasySearch._getPagesForPagination({ totalCount: totalCount, pageCount: pageCount, currentPage: currentPage, maxPages: maxPages, prevAndNext: prevAndNext }));
    }                                                                                                      //
                                                                                                           //
    return page;                                                                                           //
  })();                                                                                                    //
                                                                                                           //
  PaginationComponent.prototype.customRenderPagination = (function () {                                    // 6
    function customRenderPagination() {                                                                    // 36
      return this.getData().renderPagination;                                                              // 37
    }                                                                                                      //
                                                                                                           //
    return customRenderPagination;                                                                         //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Paginate documents.                                                                                   //
   */                                                                                                      //
                                                                                                           //
  PaginationComponent.prototype.paginate = (function () {                                                  // 6
    function paginate(page) {                                                                              // 43
      check(page, Number);                                                                                 // 44
                                                                                                           //
      this.index.getComponentMethods(this.name).paginate(page);                                            // 46
    }                                                                                                      //
                                                                                                           //
    return paginate;                                                                                       //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return page classes.                                                                                  //
   *                                                                                                       //
   * @param {Object} data Data for the current page                                                        //
   *                                                                                                       //
   * @returns {String}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  PaginationComponent.prototype.pageClasses = (function () {                                               // 6
    function pageClasses(data) {                                                                           // 56
      return ((data.disabled ? 'disabled' : '') + ' ' + (data.current ? 'current' : '')).trim();           // 57
    }                                                                                                      //
                                                                                                           //
    return pageClasses;                                                                                    //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return true if there are more documents to load.                                                      //
   *                                                                                                       //
   * @returns {Boolean}                                                                                    //
   */                                                                                                      //
                                                                                                           //
  PaginationComponent.prototype.moreDocuments = (function () {                                             // 6
    function moreDocuments() {                                                                             // 65
      return this.index.getComponentMethods(this.name).hasMoreDocuments();                                 // 66
    }                                                                                                      //
                                                                                                           //
    return moreDocuments;                                                                                  //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Event map.                                                                                            //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
                                                                                                           //
  PaginationComponent.prototype.events = (function () {                                                    // 6
    function events() {                                                                                    // 74
      return [{                                                                                            // 75
        'click .page:not(.disabled)': function (e) {                                                       // 76
          var currentPage = this.currentData().page;                                                       // 77
          this.dict.set('currentPage', currentPage);                                                       // 78
          this.paginate(currentPage);                                                                      // 79
                                                                                                           //
          e.preventDefault();                                                                              // 81
        }                                                                                                  //
      }];                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return events;                                                                                         //
  })();                                                                                                    //
                                                                                                           //
  /**                                                                                                      //
   * Return the default options.                                                                           //
   *                                                                                                       //
   * @returns {Object}                                                                                     //
   */                                                                                                      //
  babelHelpers.createClass(PaginationComponent, [{                                                         //
    key: 'defaultOptions',                                                                                 //
    get: function () {                                                                                     //
      return {                                                                                             // 92
        prevAndNext: true,                                                                                 // 93
        maxPages: null,                                                                                    // 94
        transformPages: function (pages) {                                                                 // 95
          return pages;                                                                                    //
        }                                                                                                  //
      };                                                                                                   //
    }                                                                                                      //
  }]);                                                                                                     //
  return PaginationComponent;                                                                              //
})(SingleIndexComponent);                                                                                  //
                                                                                                           //
EasySearch.PaginationComponent.register('EasySearch.Pagination');                                          // 100
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['easysearch:components'] = {
  EasySearch: EasySearch
};

})();
