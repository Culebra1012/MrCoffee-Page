const { src, dest, watch, series, parallel } = require ('gulp');

//CSS Y SASSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


const imagemin = require('gulp-imagemin');

function css( done ) {
    src ('src/scss/app.scss')

        .pipe( sass() )
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe( dest('build/css'))


    done()
}

function imagenes (){
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3}) )
        .pipe(dest('build/img'))

  
}

function dev(){
    watch('src/scss/**/*.scss', css );
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);

// Series . se inicia una tarea, y hasta que se finaliza, inicia la siguiente
// parallel -  todas inician al mismo tiempo