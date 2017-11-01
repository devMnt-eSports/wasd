const gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del");

gulp.task("hello", () => {
  console.log("howdy");
});

//remove emacs backups that clutter the folders:
gulp.task("cleanmacs", () => {
  del("**/*~").then(p => {
    console.log("deleted:\n " + p.join("\n"));
  });
  del("**/#*#").then(p => {
    console.log("deleted:\n " + p.join("\n"));
  });
});

gulp.task("sass", () => {
  return gulp
    .src("react-ui/src/react-css/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("react-ui/src/react-css/react-css"));
});

gulp.task("watch", () => {
  gulp.watch("react-ui/**/*.scss", ["sass"]);
});
