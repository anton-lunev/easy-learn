import './app.css';
import 'images/app-icon.svg';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import LocalStorageModule from 'angular-local-storage';
import uiRouter from 'angular-ui-router';

import db from './common/db';
import route from './app.route';
import config from './app.config';
import sidebar from './sidebar/sidebar';
import list from './list/list';

const deps = [
    // ngAnimate,
    LocalStorageModule,
    uiRouter,
    sidebar.name,
    list.name,
    db.name
];

angular.module('easy-learn', deps)
    .config(route)
    .config(config);

//TODO make auto translate (by google and yandex)
//TODO add statistics of showed words
//TODO improve performance of long list
//TODO add edit of collections name and description
//TODO add indicator to current playing collection
//TODO add extra info from google translate to each word (sentences example, link to kirilloid.com)
//TODO refactoring markup to BEM, flexbox and svg
//TODO fix markup for windows
//TODO add user settings
//TODO add sorting and grouping words
//TODO add ability to backup collections to some online databases
//TODO add download button (export to ...)
//TODO add import from ...(?)(ability to add bundle of words)
//TODO try to make tray(background) state of application
//TODO add cross collection playing
//TODO add quiz(test)
