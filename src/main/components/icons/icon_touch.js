import React from 'react'

const IconTouch = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="39.5px" height="59.5px" viewBox="0 0 39.5 59.5">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M34.75,59.5h-20c-0.334,0-0.646-0.167-0.832-0.445l-10-15c-0.866-1.321-1.335-3.547-0.506-5.081
          C3.925,38.023,4.844,37.5,6,37.5c2.68,0,5.119,1.141,9,6.51V19.75c0-2.619,2.131-4.75,4.75-4.75s4.75,2.131,4.75,4.75v14.283
          l10.366,3.52c3.091,0.994,4.033,4.486,3.358,7.421l-2.491,13.705C35.647,59.154,35.233,59.5,34.75,59.5z M15.285,57.5h18.63
          l2.352-12.929c0.468-2.04-0.091-4.496-2.027-5.119l-11.061-3.755C22.772,35.56,22.5,35.179,22.5,34.75v-15
          c0-1.517-1.233-2.75-2.75-2.75C18.259,17,17,18.259,17,19.75v27.5c0,0.443-0.292,0.833-0.716,0.959
          c-0.426,0.125-0.881-0.043-1.123-0.414C10.192,40.141,7.911,39.5,6,39.5c-0.528,0-0.715,0.215-0.829,0.425
          c-0.378,0.699-0.184,2.113,0.415,3.027L15.285,57.5z"/>
        <path d="M38.5,18.75H31c-0.553,0-1-0.448-1-1s0.447-1,1-1h7.5c0.553,0,1,0.448,1,1S39.053,18.75,38.5,18.75z"/>
        <path d="M28.5,12c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l5-5 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-5,5C29.012,11.902,28.756,12,28.5,12z"/>
        <path d="M20.75,9.5c-0.552,0-1-0.448-1-1V1c0-0.552,0.448-1,1-1c0.553,0,1,0.448,1,1v7.5 C21.75,9.052,21.303,9.5,20.75,9.5z"/>
        <path d="M11,12c-0.256,0-0.512-0.098-0.707-0.293l-5-5c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l5,5 c0.391,0.391,0.391,1.023,0,1.414C11.512,11.902,11.256,12,11,12z"/>>
        <path d="M8.5,18.75H1c-0.552,0-1-0.448-1-1s0.448-1,1-1h7.5c0.552,0,1,0.448,1,1S9.052,18.75,8.5,18.75z"/>
      </g>
    </svg>
  </object>

IconTouch.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconTouch.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconTouch