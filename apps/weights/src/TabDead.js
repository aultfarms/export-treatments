import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import { extendMoment } from 'moment-range';
import Moment from 'moment';
const moment = extendMoment(Moment);

import {connect} from '@cerebral/react';
import {state} from 'cerebral/tags';

export default connect({
      deadRecords: state`dead.records`,
}, function TabDead(props) {

  const today = moment();
  const lastmonth = moment.range(today.clone().subtract(1,'months'),today);
  const lastthreemonths = moment.range(today.clone().subtract(3,'months'),today);
  const lastyear = moment.range(today.clone().subtract(1,'years'),today);

  const deadlastmonth       = _.filter(props.deadRecords, r => moment(r.date,'YYYY-MM-DD').within(lastmonth));
  const deadlastthreemonths = _.filter(props.deadRecords, r => moment(r.date,'YYYY-MM-DD').within(lastthreemonths));
  const deadlastyear        = _.filter(props.deadRecords, r => moment(r.date,'YYYY-MM-DD').within(lastyear));

  const totallastmonth       = _.reduce(deadlastmonth,       (sum,r) => sum+r.tags.length, 0);
  const totallastthreemonths = _.reduce(deadlastthreemonths, (sum,r) => sum+r.tags.length, 0);
  const totallastyear        = _.reduce(deadlastyear,        (sum,r) => sum+r.tags.length, 0);
  return (
    <div className="tabdead">
      <div className="tabdeadentry">
        Past month: {totallastmonth} dead ({numeral(totallastmonth/lastmonth.diff('days')).format('0.00')}/day)
      </div>
      <div className="tabdeadentry">
        Past 3 months: {totallastthreemonths} dead ({numeral(totallastthreemonths/lastthreemonths.diff('days')).format('0.00')}/day)
      </div>
      <div className="tabdeadentry">
        Past year: {totallastyear} dead ({numeral(totallastyear/lastyear.diff('days')).format('0.00')}/day)
      </div>
    </div>
  );
});

