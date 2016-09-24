var gulp=require("gulp");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");
	gulp.task("yasuo",function(){
		gulp.src("js/classroom.js")
			.pipe(uglify())
			.pipe(rename({
				suffix:".min"
			}))
			.pipe(gulp.dest("js"));
	})
	gulp.task("default",function(){
		gulp.watch("js/*.js",["yasuo"]);
	})