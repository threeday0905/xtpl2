xtpl2
=================
a bundle module for xtpl & xtemplate

### Feature 1 

If we want to use `xtpl`, we also need to install `xtemplate` independent on package.json. `xtpl2` just wrap both modules in one package.

### Feature 2

Support `koa` in another way, like

    var app = koa();
    app.context.render = require('xtpl2').koaRender();
    app.use(function*() {
        this.render('view', {});
    });
    
---

actually xtpl is a awesome module. this module just for neat freak user, like me : ).
