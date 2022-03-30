const gulp = require('gulp');
// const webpack = require('webpack-stream');
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sass = require('gulp-sass')(require('sass'));
const chalk = require("chalk");
const { execSync } = require("child_process");

// 环境变量区分
const env = process.env.NODE_ENV

const task = () => ({
  build: () => {
    let errMsg = "";
    execSync(`yarn build:es`, (error) => {
      if (error) {
        errMsg = error;
        // eslint-disable-next-line no-console
        console.log(chalk.red(error));
      }
    });
    if (errMsg) {
      errMsg = "";
    } else {
      // eslint-disable-next-line no-console
      console.log(chalk.green(`yarn build:es success`));
    }
  },
  buildCjs: () => {
    let errMsg = "";
    execSync(`yarn build:cjs`, (error) => {
      if (error) {
        errMsg = error;
        // eslint-disable-next-line no-console
        console.log(chalk.red(error));
      }
    });
    if (errMsg) {
      errMsg = "";
    } else {
      // eslint-disable-next-line no-console
      console.log(chalk.green(`yarn build:cjs success`));
    }
  },
  buildCss: () => {
    gulp.src('./src/styles/index.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/styles'));
  },
  buildSeperateCss: () => {
    gulp.src('./src/styles/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/styles'));
  }
})

function build(cb) {
  task().build()
  cb()
}
function buildCjs(cb) {
  task().buildCjs()
  cb()
}
function buildCss(cb) {
  task().buildCss()
  cb()
}
function buildSeperateCss(cb) {
  task().buildSeperateCss()
  cb()
}

function watch() {
  const watcher = gulp.watch(['./src/**/*.js', './src/**/*.vue', './src/**/*.scss']);
  // eslint-disable-next-line no-console
  console.log('Enable listening for file modifications...');

  watcher.on('change', filePath => {
    // eslint-disable-next-line no-console
    console.log(`File ${filePath} was changed, running tasks...`);
    task().build()
    task().buildCjs()
    task().buildCss()
    task().buildSeperateCss()
  });
}

if (env === 'production') {
  exports.default = gulp.series(build, buildCjs, buildCss, buildSeperateCss);
} else {
  exports.default = gulp.series(build, buildCjs, buildCss, buildSeperateCss, watch);
}
