import React from 'react'

const IconMagnet = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="56.708px" height="56.707px" viewBox="0 0 56.708 56.707">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M56.415,29.334l-6.837-6.839c-0.188-0.188-0.441-0.293-0.707-0.293s-0.52,0.105-0.707,0.293L30.223,40.439
          c-1.866,1.865-4.347,2.892-6.984,2.892c-2.637,0-5.116-1.027-6.981-2.892s-2.893-4.344-2.893-6.982s1.027-5.117,2.893-6.982
          L34.201,8.532c0.188-0.188,0.293-0.442,0.293-0.707s-0.105-0.52-0.293-0.707l-6.837-6.837c-0.375-0.375-1.039-0.375-1.414,0
          L6.298,19.934C-2.1,28.333-2.1,42,6.298,50.398c4.069,4.068,9.479,6.309,15.234,6.309s11.164-2.24,15.23-6.309l19.652-19.65
          C56.806,30.358,56.806,29.725,56.415,29.334z M26.657,2.402l5.423,5.423l-3.713,3.713l-5.423-5.423L26.657,2.402z M35.349,48.984
          c-3.689,3.69-8.596,5.723-13.816,5.723s-10.129-2.032-13.82-5.723c-7.617-7.619-7.617-20.017,0-27.637L21.53,7.529l5.423,5.423
          l-12.11,12.109c-2.243,2.242-3.479,5.224-3.479,8.396s1.235,6.154,3.479,8.396c2.242,2.243,5.225,3.478,8.396,3.478
          c3.172,0,6.154-1.235,8.398-3.478l12.107-12.109l5.424,5.422L35.349,48.984z M50.582,33.752l-5.424-5.422l3.713-3.713l5.423,5.425
          L50.582,33.752z"/>
      </g>
    </svg>
  </object>

IconMagnet.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconMagnet.defaultProps = {
  className: '',
  fill: '#18CEA0',
}

export default IconMagnet