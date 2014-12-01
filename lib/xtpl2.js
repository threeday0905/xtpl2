'use strict';

var caller = require('caller-lookup'),
    path = require('path'),
    xtpl = require('xtpl');

/**
 * setup config into xtpl`s global config
 */
function setupConfig(config) {
    config = config || {};

    /* setup default xtemplate configs */
    config.views    = config.views || path.resolve('views');
    config.extname  = config.extname || '.xtpl';
    config.encoding = config.encoding || 'utf-8';

    /* assume node engine >= 0.11 */
    if (!path.isAbsolute(config.views)) {
        var callerDir = path.dirname( caller() );
        config.viewName = path.join(callerDir, config.views);
    }

    if (config.extname.charAt(0) === '.') {
        config.extname = config.extname.slice(1);
    }

    xtpl.config(config);
    return xtpl.config();
}

/**
 * generate view file path from option
 */
function getViewPath(viewName, option) {
    if (!path.extname(viewName)) {
        viewName += '.' + option.extname;
    }

    return path.join(option.views, viewName);
}

/**
 * assign runtimeOption property to runtimeOption
 */
/*function createOption(runtimeOption, globalConfig) {
    runtimeOption = runtimeOption || {};
    Object.keys(globalConfig).forEach(function(key) {
        if (runtimeOption[key] === undefined) {
            runtimeOption[key] = globalConfig[key];
        }
    });
    return runtimeOption;
}*/

/**
 * get the xtpl render method
 * @param  {String} viewPath - full xtpl file path
 * @param  {String} data     - data to render
 * @param  {String} options.extname
 * @param  {String} options.cache
 * @param  {String} options.encoding
 * @param  {String} options.strict
 * @param  {String} options.catchError
 */
function xtplRender(viewPath, data, options) {
    return function(done) {
        return xtpl.render(viewPath, data, options, done);
    };
}

/**
 * [koaRender description]
 * @param  {String} config.views - view path
 * @param  {String} config.extname - view extname
 * @return {[type]}         [description]
 */
function koaRender(config) {
    config = setupConfig(config);

    return function *render(view, data, option) {
        var viewPath = getViewPath(view, config),
            result   = yield xtplRender(viewPath, data, option || {});

        if (!option || option.write !== false) {
            this.type = 'html';
            this.body = result;
        }

        return result;
    };
}

function expressRender(config) {
    /* config arg is not necessary here,
        express user will setup via app.set('xxx') manually */

    if (config) {
        setupConfig(config);
    }

    /* xtpl wrapped the good method for expresss render*/
    return xtpl.__express;
}

module.exports = xtpl;
module.exports.expressRender = expressRender;
module.exports.xtplRender = xtplRender;
module.exports.koaRender = koaRender;
