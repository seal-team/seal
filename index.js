var fis = module.exports =  require('fis3');
//fis.require.prefixes.unshift('nm');
fis.require.prefixes = ['seal', 'fis', 'fis3'];
fis.cli.help.commands = ['server'];
fis.cli.name = 'seal';
fis.cli.info = require('./package.json');
fis.cli.version = require('./version.js');

fis.hook('module', {
  mode: 'cmd' // 模块化支持 amd 规范，适应 require.js
});


fis.match('*.js', {
  optimizer: fis.plugin('uglify-js',{
    mangle: {
        except: 'exports, module, require, define, seal'
    },
    compress : {
        drop_console: false
    },
    sourceMap:false,
    output : {
        ascii_only : true,
        space_colon : false
    }
    
  }),
  lint: fis.plugin('jshint')
})


.match('*.png', {
  optimizer: fis.plugin('png-compressor',{
    type : 'pngquant'
  })
})
.match('*.php', {
    loaderLang: 'html'
})
.match('*.less', {
    rExt: '.css'
    parser: fis.plugin('less-2.x'),
    useSprite: true,
    optimizer: fis.plugin('clean-css',{
        'keepBreaks': false
    })
})
.match('*.{css,less}', {
    useSprite: true,
    optimizer: fis.plugin('clean-css',{
        'keepBreaks': false
    })
})
.match('::package', {
  spriter: fis.plugin('csssprites')
})
.match('*.html:js', {
    optimizer: fis.plugin('uglify-js')
})
.match('*.html:css', {
    optimizer: fis.plugin('clean-css')
})
.match('build/**', {
    release: false
})
.match('seal_config/**', {
    release: false
})
.match('*.(json)', {
    release: false
});