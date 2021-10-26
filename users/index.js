import as from '@lightbend/akkaserverless-javascript-sdk';
import entity from './users.js';
import view from './users-views.js';
import adview from './admin-views.js.js';

const server = new as.AkkaServerless();
server.addComponent(entity);
server.addComponent(adview);
server.addComponent(view);
server.start({bindAddress: '0.0.0.0', bindPort: '8080'});
