//// Under oe-flow, ‘about/about.config.js’ describes the project as a whole, not the ‘about’ feature itself. 
//// The project can run with only the ‘about’ feature present, but it will not run without it.
//// The global `Config` object is defined here. Other features add to it, eg `Config.foobar = { ... }`. 

Config = {
    about: {
        name:         'Desoot'
      , slug:         'desoot' // equivalent to the `'name'` field in ‘package.json’ 
      , initials:     'dst'
      , description:  'A Looptopian desert, surrounded by impassable mountains.' // no more than 255 characters
      , keywords:     'Brighton, art, music, immersive, app, game, cooperative, party, festival'
      , scripts: {
            test:     'echo \'Error: no test specified\' && exit 1'
        }
      , organization: 'Loop.Coop'
      , author:       'Rich Plastow <info@loop.coop>'
      , webmaster:    'info@loop.coop'
      , year:         '2014'
      , license:      'GPL v2'
      , type:         'website' // http://ogp.me/#types
      , url:          'http://looptopia.loop.coop/desoot'
      , contributors: [
            'Beth Walker <info@loop.coop>'
        ]

      , widgets: {} // can be filled with widget areas, eg 'footer-left'

      , changelog: [
            '+                  Initial commit'
          , '+ desoot@0.0.1-1   paste ‘Workflow’ and ‘Changelog’ from looptopia@0.2.16 to ‘README.md’;  \n' +
            '                   paste ‘.gitignore’ from looptopia@0.2.16;  \n' +
            '                   `$ git flow init -d` to install git flow with default branch names;  \n' +
            '                   `$ mrt create tmp/desoot` to install Meteor;  \n' +
            '                   `$ mv tmp/desoot/.[!.]* tmp/desoot/* ./` to move Meteor files to top level;  \n' +
            '                   `$ rm -rf tmp; rm desoot.*` to remove unnecessary files;  \n' +
            '                   change ‘.meteor/release’ from `METEOR@0.9.0.1` to `0.8.3`;  \n' +
            '                   `$ mrt add iron-router`;  \n' +
            '                   `$ mrt add handlebars-helpers` to allow Templates to use `{{$...}}`;  \n' +
            '                   `$ mrt add less`;  \n' +
            '                   paste ‘about.config.js’ from looptopia@0.2.16 and edit data;  \n' +
            '                   paste ‘about.helper.js’ from looptopia@0.2.16 and cut most code;  \n' +
            '                   paste ‘about.less’ from looptopia@0.2.16;  \n' +
            '                   paste ‘about.not-found.html’ from looptopia@0.2.16; '
          , '+ desoot@0.0.1-2   ‘about.not-found.html’ only lists project meta in the development environment; '
          , '+ desoot@0.0.1-3   `$ git push --set-upstream origin develop` to set up pushing the ‘develop’ branch; '
          , '+ desoot@0.1.0     initial holding site; '
          , '+ desoot@0.1.1-1   `$ mrt add x3dom`; '
          , '+ desoot@0.1.2     similar to, but better than 20140720-desoot-v0.1.9; '
          , '+ desoot@0.1.4     bigger terrain; start facing south'
          , '+ desoot@0.1.6     viewpoint@0.0.4 amends: correct cursor when hovering over sky and distant ground; '
          , '+ desoot@0.1.8     viewpoint@0.0.6 various UX improvements to movement; '
          , '+ desoot@0.1.10    only show `viewpointRotation` in ‘development’ environment; '
          , '+ desoot@0.1.11-1  initial ‘flora’ feature; '
          , '+ desoot@0.1.12    stone-circle patterns are visual and audio; '
          , '+ desoot@0.1.14    choose either 44.1kHz or 48kHz to match users sound-card (fixes audio glitch);  \n' +
            '                   `Config.audio.gain` and `.ldc-toggle-mute`; '
          , '+ desoot@0.1.16    Flora look and sound more complete; can solo Flora; '
          , '+ desoot@0.1.18    Temporarily disable the deep kick drum, which has a glitchy-sounding spike; '
          , '+ desoot@0.1.20    fix drag-to-look-around by removing `speed` attribute from `<navigationinfo>`; '
          , '+ desoot@0.1.21-1  initial ‘track’ feature; '
          , '+ desoot@0.1.22    basic Tracks functionality; '
          , '+ desoot@0.1.24    hide Tracks functionality, for now; '
        ] , version: '0.1.24'
    }
};

//// 'development' on localhost, 'production' on modulus.
if (Meteor.isServer && 'object' === typeof process && process.env) {
    Config.about.env = process.env.NODE_ENV; // @todo is this ever used?
} else if (Meteor.isClient && window && window.location) {
    Config.about.env = '127.0.0.1' === window.location.hostname || 'localhost' === window.location.hostname ? 'development' : 'production'; // @todo make sure this agrees with serverside `Config.about.env` ... Meteor method?
    if ('??' === window.location.search) { Config.about.env = 'development'; } // @todo only allow signed-in admins to override `Config.about.env` like this
}


Router.configure({
    notFoundTemplate: 'about.not-found' // catchall 404 https://github.com/EventedMind/iron-router#route-options
});

