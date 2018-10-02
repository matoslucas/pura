import React from 'react'

const IconCancel = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="59.5px" height="59.5px" viewBox="0 0 59.5 59.5">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M41,22.5c-10.201,0-18.5,8.299-18.5,18.5S30.799,59.5,41,59.5S59.5,51.201,59.5,41S51.201,22.5,41,22.5z
          M41,24.5c4.189,0,8.008,1.583,10.921,4.165L28.665,51.921C26.083,49.008,24.5,45.189,24.5,41C24.5,31.902,31.902,24.5,41,24.5z
          M41,57.5c-4.189,0-8.008-1.583-10.921-4.165l23.256-23.256C55.917,32.992,57.5,36.81,57.5,41C57.5,50.098,50.098,57.5,41,57.5z"/>
        <path d="M37.02,11c0-0.337-0.166-0.635-0.421-0.816l-9.892-9.891C26.52,0.105,26.266,0,26,0H11
          c-0.266,0-0.52,0.105-0.707,0.293l-9.999,10c-0.002,0.001-0.003,0.003-0.004,0.005c-0.083,0.083-0.144,0.18-0.19,0.283
          c-0.015,0.03-0.022,0.062-0.034,0.094c-0.03,0.086-0.048,0.174-0.054,0.266C0.011,10.96,0,10.979,0,11v27.5c0,0.552,0.447,1,1,1h15
          c0.553,0,1-0.448,1-1s-0.447-1-1-1H2V12h33v4c0,0.552,0.447,1,1,1s1-0.448,1-1v-4.903C37.003,11.063,37.02,11.034,37.02,11z
          M11.414,2h5.336v8H3.414L11.414,2z M18.75,10V2h6.836l8,8H18.75z"/>
      </g>
    </svg>
  </object>

IconCancel.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconCancel.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconCancel
