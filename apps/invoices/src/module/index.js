import { Module } from 'cerebral';

import       feedModule from 'aultfarms-lib/feed/module';
import     trelloModule from 'aultfarms-lib/trello/module';
import windowSizeModule from 'aultfarms-lib/windowSize/module';

import     trelloProvider from 'aultfarms-lib/trello/provider';
import windowSizeProvider from 'aultfarms-lib/windowSize/provider';

import * as signals from './sequences';

export default Module({
  signals,
  state: { 
    invoicegroups: {
      curgroup: '',
    },
    page: {
      name: 'invoices', // invoices, payments, trucking
      drawer: {
        open: false,
      },
    },
  },
  modules: {
          feed: feedModule,
        trello: trelloModule,
    windowSize: windowSizeModule,
  },
  providers: {
        trello: trelloProvider,
    windowSize: windowSizeProvider,
  },
});
