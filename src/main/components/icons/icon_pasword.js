import React from 'react'

const IconPassword = (props) =>
  <object className={`inlineVector ${props.className}`}>
    <svg className="inlineVector__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="14px" height="16px" viewBox="0 0 14 16">
      <g className="inlineVector__shape" fill={props.fill}>
        <path d="M7,8c1.104,0,2,0.896,2,2s-0.896,2-2,2s-2-0.896-2-2S5.896,8,7,8z M12,6H2v8h10V6z
          M7,2C5.896,2,5,2.896,5,4h4C9,2.896,8.104,2,7,2z M12,16H2c-1.104,0-2-0.896-2-2V6c0-1.104,0.896-2,2-2h1c0-2.209,1.791-4,4-4
          s4,1.791,4,4h1c1.104,0,2,0.896,2,2v8C14,15.104,13.104,16,12,16z"/>
      </g>
    </svg>
  </object>

IconPassword.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
}

IconPassword.defaultProps = {
  className: '',
  fill: '#BBBBBB',
}

export default IconPassword
