import React from 'react';

import BrowseMixin from './BrowseMixin';
import sketchfabSDK from '../lib/sketchfab.js';

let Staffpicks = React.createClass({

    mixins: [BrowseMixin],

    getStorageKey() {
        return 'browse/staffpicks';
    },

    fetchData() {
        sketchfabSDK.Models.staffpicks(this.state.offset).then(this.onDataSuccess);
    },

});

module.exports = Staffpicks;
