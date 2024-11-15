/**
 *  npmインストールコマンド
 *  各種ライブラリ
 *
 * npm init -y
 * npm install --save-dev gulp gulp-dart-sass gulp-sourcemaps gulp-notify gulp-plumber gulp-postcss postcss-cssnext gulp-clean-css gulp-rename css-mqpacker gulp-autoprefixer gulp-sass-glob
 * npm install --save-dev @babel/core @babel/preset-env gulp-babel gulp-uglify
 *  npm install --save-dev gulp-imagemin@7 imagemin-mozjpeg@7 imagemin-pngquant@7 imagemin-svgo@7
 * npm install --save-dev browser-sync
 *
 * 起動コマンド  gulp
 */

/*
src 参照元を指定
dest 出力さきを指定
watch ファイル監視
series(直列処理)とparallel(並列処理)
*/
const { src, dest, watch, series, parallel } = require("gulp");

//scss
const sass = require("gulp-dart-sass"); //公式推奨のdart-sassを使う
const sassGlob = require("gulp-sass-glob"); //@use @forの記述を楽にする
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const postcss = require("gulp-postcss"); // PostCSS利用
const cssnext = require("postcss-cssnext"); // CSSNext利用
const cleanCSS = require("gulp-clean-css"); // 圧縮
const autoprefixer = require("gulp-autoprefixer"); //自動プレフィックスを付ける
const rename = require("gulp-rename"); // ファイル名変更
const sourcemaps = require("gulp-sourcemaps"); // ソースマップ作成
const mqpacker = require("css-mqpacker"); //メディアクエリをまとめる
const htmlmin = require("gulp-htmlmin");

//js babel
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

//画像圧縮
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
//ブラウザリロード
const browserSync = require("browser-sync");

//postcss-cssnext ブラウザ対応条件 prefix 自動付与
const browsers = [
  "last 2 versions",
  "> 5%",
  "ie = 11",
  "not ie <= 10",
  "ios >= 8",
  "and_chr >= 5",
  "Android >= 5",
];

//参照元パス
const srcPath = {
  css: "src/assets/scss/**/**.scss",
  js: "src/assets/js/*.js",
  img: "src/assets/images/**/*",
  html: "src/**/*.html",
  php: "src/**/*.php",
};

//出力先パス
const destPath = {
  css: "dist/assets/css/",
  js: "dist/assets/js/",
  img: "dist/assets/images/",
  html: "dist/",
  php: "dist/",
};

//sass
const cssSass = () => {
  return src(srcPath.css) //コンパイル元
    .pipe(sourcemaps.init()) //gulp-sourcemapsを初期化
    .pipe(
      plumber(
        //エラーが出ても処理を止めない
        {
          errorHandler: notify.onError("Error:<%= error.message %>"),
          //エラー出力設定
        }
      )
    )
    .pipe(sassGlob())
    .pipe(
      sass
        .sync({
          includePaths: ["node_modules", "src/sass"], //パスを指定
          outputStyle: "expanded",
        })
        .on("error", sass.logError)
    )
    .pipe(sass({ outputStyle: "expanded" }))

    .pipe(autoprefixer())
    .pipe(postcss([mqpacker()])) // メディアクエリを圧縮
    .pipe(postcss([cssnext(browsers)])) //cssnext
    .pipe(sourcemaps.write("/maps")) //ソースマップの出力
    .pipe(cleanCSS()) // CSS圧縮
    .pipe(
      rename({
        extname: ".min.css", //.min.cssの拡張子にする
      })
    )
    .pipe(dest(destPath.css)) //コンパイル先
    .pipe(browserSync.stream());
};

// babelのトランスパイル、jsの圧縮
const jsBabel = () => {
  return src(srcPath.js)
    .pipe(
      plumber(
        //エラーが出ても処理を止めない
        {
          errorHandler: notify.onError("Error: <%= error.message %>"),
        }
      )
    )
    .pipe(
      babel({
        presets: ["@babel/preset-env"], // gulp-babelでトランスパイル
      })
    )
    .pipe(dest(destPath.js))
    .pipe(uglify()) // js圧縮
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(destPath.js));
};

//画像圧縮（デフォルトの設定）
const imgImagemin = () => {
  return src(srcPath.img)
    .pipe(
      imagemin(
        [
          imageminMozjpeg({
            quality: 80,
          }),
          imageminPngquant(),
          imageminSvgo({
            plugins: [
              {
                removeViewbox: false,
              },
            ],
          }),
        ],
        {
          verbose: true,
        }
      )
    )
    // .pipe(
    //   webp({
    //     quality: 65,
    //     method: 6,
    //   })
    // )
    .pipe(dest(destPath.img));
};
//htmlコンパイル＆圧縮
const htmlFunc = () => {
  return src(srcPath.html)
    .pipe(
      htmlmin({
        // HTMLコメントを除去する
        removeComments: true,
      })
    )
    .pipe(
      plumber({
        errorHandler: notify.onError("Error:<%= error.message %>"),
      })
    )
    .pipe(dest(destPath.html));
};
const phpFunc = () => {
  return src(srcPath.php)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error:<%= error.message %>"),
      })
    )
    .pipe(dest(destPath.php));
};

const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};

const browserSyncOption = {
  server: destPath.html,
};

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

/**
 *
 * ファイル監視 ファイルの変更を検知したら、browserSyncReloadでreloadメソッドを呼び出す
 * series 順番に実行
 * watch('監視するファイル',処理)
 */
const watchFiles = () => {
  watch(srcPath.css, series(cssSass, browserSyncReload));
  watch(srcPath.js, series(jsBabel, browserSyncReload));
  watch(srcPath.img, series(imgImagemin, browserSyncReload));
  watch(srcPath.html, series(htmlFunc, browserSyncReload));
  watch(srcPath.php, series(phpFunc, browserSyncReload));
};

exports.default = series(
  series(cssSass, jsBabel, imgImagemin, htmlFunc, phpFunc),
  parallel(watchFiles, browserSyncFunc)
);
