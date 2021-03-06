import { set, toggle } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';
import { sequence } from 'cerebral';

import * as       feed from 'aultfarms-lib/feed/module/sequences';
import * as     trello from 'aultfarms-lib/trello/module/sequences';
import * as windowSize from 'aultfarms-lib/windowSize/module/sequences';

export const init = sequence('init', [
  windowSize.init,
  trello.authorize,
  feed.fetch,
  set(state`recordsValid`, true),
]);

export const drawerToggle = sequence('drawerToggle', [ 
  toggle(state`page.drawer.open`) 
]);

export const changeGroup = sequence('changeGroup', [ 
  set(state`invoicegroupss.curgroup`, props`group`) 
]);


