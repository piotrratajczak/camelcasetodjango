# CamelCaseToDjango
This package was created as I needed a simple helper to switch json props notation type between front/backend.
It takes JS object and changes it recursively from camel case notation (someName) to lowdash notation (some_name).

example:
```
var camelCaseToDjango = require('camelcasetodjango')
var obj = {
    camelCase: 1,
    camelCaseObject: {
        camelCaseInside: 'test'
    }
}
var result  = camelCaseToDjango(obj)
/*
result is equal to:
{
    camel_case: 1,
    camel_case_object: {
        camel_case_inside: 'test'
    }
}
*/
```

# Installation:
```sh
$ npm install -camelcasetodjango
```

# Testing:
There are few simple tests in 'test' folder. If you want to run it, you need to have Mocha and Chai installed.
```sh
$ cd node_modules/camelcasetodjango
$ npm install
$ npm run test
```

# Options:
```
camelCaseToDjango(obj, sign)
```
Sing parameter has a default value of "_" , so it is not required, but can pass it to the function if you want to use any other value. In test there is a case with sign = '+'.
These feature was NOT deeply tested so, please verify expected result and let me know if you find any issues.

License
----

MIT
