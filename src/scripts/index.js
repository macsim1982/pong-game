/** @jsx dom */

import '../styles/index.scss';

import {pongInit} from './game/pong.js';


(function () {
    'use strict';

    if (module.hot) {
        module.hot.accept();
    }

    window.addEventListener('load', function () {
      // ---------------------------------------------------------------------
      pongInit();
      console.log('pongInit');

    });
}());
