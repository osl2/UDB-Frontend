# upowdb

## Prerequisite

Download and install Node.js https://nodejs.org/en/download/

Download and install Yarn https://yarnpkg.com/lang/en/docs/install/

Alternatively, if yarn does not work for you, you can try npm instead, which is compatible with yarn.



## Project setup
```
yarn install
```
## Use MockApi
During development you may want to use MockApi if original API backend is not running.
This can be done src/store.ts. Replace DefaultApi with MockApi
```javascript
import Vuex from 'vuex';
import SQLExecutor from "@/controller/SQLExecutor";
import {MockApi} from "@/api/MockApi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: new MockApi(),
    sqlExecutor: new SQLExecutor(),
  },
  mutations: {},
  actions: {},
  getters: {
    api: (state) => {
      return state.api;
    },
    sqlExecutor: (state) => {
      return state.sqlExecutor;
    },
  },
});
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
