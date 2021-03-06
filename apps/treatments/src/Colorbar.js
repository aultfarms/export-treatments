import React from 'react';
import _ from 'lodash';

import {connect} from '@cerebral/react';
import {state,signal} from 'cerebral/tags';

import './Colorbar.css';

export default connect({
  record: state`record`,
  colors: state`treatments.colors`,
  changeRecord: signal`changeRecord`,
}, class Colorbar extends React.Component {

  keypressed(evt) {
    let color = '';
    switch(evt.key) {
      case 'y': color = 'YELLOW'; break;
      case 'g': color = 'GREEN'; break;
      case 'b': color = 'BLUE'; break;
      case 'r': color = 'RED'; break;
      case 'p': color = 'PURPLE'; break;
      case 'w': color = 'WHITE'; break;
      case 'n': color = 'NOTAG'; break;
      default: return;
    }
    evt.preventDefault();
    this.props.changeRecord({tag: { color: color } });
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressed.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressed.bind(this));
  }

  colorButtonClicked(color) { 
    const props = this.props;
    return evt => {
      evt.preventDefault();
      props.changeRecord({tag: { color: color } });
    };
  }

  render() {
    return (
      <div className="colorbar">
        {_.keys(this.props.colors).map((c,k) => 
            <div key={'color'+c} 
                 className="colorbutton"
                 onClick={this.colorButtonClicked(c)} 
                 style={{backgroundColor: this.props.colors[c] }}>
            </div>
         )}
         <div key={'colorNOTAG'}
              className="colorbutton"
              onClick={this.colorButtonClicked('NOTAG')}
              style={{backgroundColor: '#CCCCCC'}}>
          N
        </div>
      </div>
    );
  }

});

