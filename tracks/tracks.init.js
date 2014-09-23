if (Meteor.isServer) {

    Meteor.startup(function () {
        // Tracks.remove({});

        //// The first time the app starts, generate two initial sample Tracks and record them into the `Tracks` collection.
        if ( 0 === Tracks.find().count() ) {
            console.log('The ‘Tracks’ collection is empty...');

            //// Create a Track with eight markers.
            generateTrack(8, Config.viewpoint.spawnX, Config.viewpoint.spawnZ + 10); // we start a little South of the spawn-point, and head Southwards from there

            //// Create a Track with six markers, to the west of the first Track.
            generateTrack(8, Config.viewpoint.spawnX + 10, Config.viewpoint.spawnZ + 10); // we start a little South of the spawn-point, and head Southwards from there
        }

    });

    //// Xx.
    var generateTrack = function (l, x, z) {
        var i
          , r = 'nesw'.charAt(  Math.floor( Math.random() * 4 )  ) // Math.random() * 2 * Math.PI
          , start = x + r + z + 'bq' // @todo where a track already starts at this `xrz`, append unique characters
          , xmin = 99999
          , xmax = -99999
          , zmin = 99999
          , zmax = -99999
          , markers = []
        ;

        //// Xx.
        for (i=l; i>0; i--) {

            //// Add the marker, which is either the 'start' marker, or a marker which uses values generated during the previous `for ...` step.
            markers.push ( (i % 4) + 1 + ' ' + x + ' ' + r + ' ' + z ); // space-delimited marker type (`1|2|3|4`), x-position, z-position, and rotation

            //// Semi-randomize the x-position, z-position and rotation, ready for the next `for ...` step.
            x += Math.floor( Math.random() * 10 - 5 ); // veer East and West
            z += Math.floor( Math.random() * 10     ); // always head South
            r = 'nesw'.charAt(  Math.floor( Math.random() * 4 )  ); // Math.random() * 2 * Math.PI;

            //// Each ‘Track’ contains boundary markers, which help speed up searches for nearby Tracks.
            xmin = Math.min(xmin, x);
            xmax = Math.max(xmax, x);
            zmin = Math.min(zmin, z);
            zmax = Math.max(zmax, z);
        }

    console.log(-2,xmin,xmax,zmin,zmax,markers);

        //// Record to the `Tracks` collection.
        Tracks.insert({
            user:    'red-cat' // signifies generated by the server
          , start:   start
          , markers: markers
          , xmin:    xmin
          , xmax:    xmax
          , zmin:    zmin
          , zmax:    zmax
        });

    };

}