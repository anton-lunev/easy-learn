'use strict';

import ListFormController from './list-form.ctrl';

let listForm = {
    template: require('./list-form.tpl.html'),
    bindings: {
        addToCollection: '<'
    },
    controller: ListFormController
};

export default listForm;
