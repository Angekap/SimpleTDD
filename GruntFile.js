(function() {
  module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
        files: ["*.js", "src/routes/*.js"],
        options: {
          esnext: true,
          globals: {
            jQuery: true
          }
        }
      },

      // for production build only
      preprocess: {
        options: {
          inline: true,
          context: {
            DEBUG: true
          }
        },
        js: { //dev
          src:['src/src_assets/js/*.js']
        }
      },

      copy: {
        "all": {
          files: [{
            expand: true,
            dest: 'src/public/assets',
            cwd: 'src/src_assets',
            src: '**',
            flatten: false
          }]
        }
      },

      less: {
        "dev": {
          options: {
            compressed: false
          },
          files: {
            "src/public/assets/css/test-private.css" : "src/less/test/includes-test.less"
          }
        }
      },

      uglify: {
        "prod": {
          options: {
            banner: "/*! Grunt minif */\n",
            compress: {
              drop_console: true
            }
          },
          files: [{
            extDot: 'last',
            src: [
              '*.js',
              '**/*.js'
            ],
            dest: 'src/public/assets/js/',
            cwd: 'src/src_assets/js/',
            ext: '.js',
            flatten: false,
            expand: true
          }]
        }
      },

      clean: {
        css: ['src/public/assets/css/test-private.css']
      },

      watch: {
        "dev": {
          files: ['less/**/*.less', 'src/routes/*.js', 'src/src_assets/js/*.js', '*.js'],
          tasks: ['clean:css', 'preprocess:js', 'copy:all', 'less:dev']
        }
      }
    });

    grunt.registerTask("dev", ['clean:css', 'jshint', 'preprocess:js', 'copy:all', 'less:dev', 'watch:dev']);
  };
}).call(this);
