import React from 'react'

const IconSwitch = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="59.5px" height="54.5px" viewBox="0 0 59.5 54.5">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M37.02,11c0-0.337-0.166-0.635-0.421-0.816l-9.892-9.891C26.52,0.105,26.266,0,26,0H11
          c-0.266,0-0.52,0.105-0.707,0.293l-10,10c0,0-0.001,0.001-0.001,0.002c-0.084,0.084-0.145,0.182-0.193,0.286
          c-0.014,0.03-0.022,0.062-0.033,0.094c-0.03,0.086-0.048,0.174-0.053,0.265C0.011,10.96,0,10.978,0,11v27.5c0,0.552,0.448,1,1,1h15
          c0.553,0,1-0.448,1-1s-0.447-1-1-1H2V12h33v4c0,0.552,0.447,1,1,1s1-0.448,1-1v-4.903C37.003,11.063,37.02,11.034,37.02,11z
          M11.414,2h5.336v8H3.414L11.414,2z M18.75,10V2h6.836l8,8H18.75z"/>
        <path d="M59.5,24.75c0-0.552-0.447-1-1-1s-1,0.448-1,1v4.665c-3.351-4.841-9.297-8.165-15.25-8.165
          c-7.013,0-13.42,4.789-15.942,11.917c-0.185,0.521,0.088,1.092,0.608,1.276c0.522,0.186,1.094-0.089,1.276-0.609
          c2.241-6.33,7.891-10.583,14.058-10.583c6.091,0,12.168,3.894,14.742,9.25H49.75c-0.553,0-1,0.448-1,1s0.447,1,1,1h8.747
          c0.001,0,0.002,0,0.003,0c0.111,0,0.224-0.019,0.334-0.058c0.01-0.003,0.016-0.011,0.024-0.015c0.072-0.028,0.131-0.073,0.194-0.116
          c0.045-0.031,0.097-0.054,0.136-0.092c0.048-0.045,0.079-0.104,0.116-0.158c0.036-0.051,0.078-0.096,0.104-0.153
          c0.023-0.052,0.028-0.111,0.043-0.167c0.019-0.071,0.041-0.139,0.043-0.212c0-0.011,0.006-0.019,0.006-0.029V24.75z"/>
        <path d="M58.834,41.307c-0.522-0.185-1.094,0.088-1.276,0.609C55.316,48.247,49.667,52.5,43.5,52.5
          c-6.092,0-12.169-3.894-14.742-9.25H36c0.553,0,1-0.448,1-1s-0.447-1-1-1h-8.75c-0.06,0-0.112,0.024-0.169,0.034
          c-0.056,0.01-0.11,0.004-0.165,0.023c-0.01,0.003-0.016,0.011-0.024,0.015c-0.071,0.028-0.13,0.073-0.192,0.115
          c-0.047,0.031-0.098,0.055-0.138,0.093c-0.047,0.045-0.077,0.102-0.115,0.156c-0.036,0.052-0.079,0.098-0.104,0.155
          c-0.023,0.052-0.028,0.11-0.043,0.167c-0.018,0.071-0.041,0.139-0.043,0.213c0,0.01-0.006,0.019-0.006,0.029V51c0,0.553,0.447,1,1,1
          s1-0.447,1-1v-4.664c3.35,4.84,9.297,8.164,15.25,8.164c7.013,0,13.42-4.789,15.942-11.917
          C59.627,42.063,59.354,41.492,58.834,41.307z"/>
      </g>
    </svg>
  </object>

IconSwitch.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconSwitch.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconSwitch
