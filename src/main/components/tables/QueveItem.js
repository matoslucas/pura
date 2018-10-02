import React, { Component, PropTypes } from 'react'

import Icon from '../icons/'
import Rating from '../interactive/Rating'


class QueveItem extends Component {

  static propTypes = {
    action: PropTypes.object,
    className: PropTypes.string,
    date: PropTypes.string,
    dateInfo: PropTypes.string,
    iconState: PropTypes.object,
    image: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.number,
    rating: PropTypes.object,
    ratingHead: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    position: '',
    image: '',
    name: '',
    type: '',
    rating: null,
    ratingHead: '',
    date: '',
    dateInfo: '',
    actions: [
      {
        icon: {
          type: 'burger',
        },
      },
      {
        icon: {
          type: 'remove',
        },
      },
    ],
    queveAction: () => { },
    iconState: null,
  }

  isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

  render(){
    const {
      className
    } = this.props

  
  
  
    let queveItemClass = className
    //queveItemClass += isDragging ? ' queve-item--dragged' : ''
  
    let dynamicClassRow = "queve-item__wrapper";
  
    if (this.props && this.props.status === 'fulfilled') {
      dynamicClassRow = "queve-item__green-box";
    }
  
    if (this.props && this.props.status === 'unfulfilled' || this.props.status === "processing") {
      dynamicClassRow = "queve-item__green-box";
    }
  
    if (this.props && this.props.status === 'planned') {
      dynamicClassRow = "queve-item__wrapper";
    }
  
    if (this.props && this.props.status === 'failure') {
      dynamicClassRow = "queve-item__red-box";
    }
  
    let dynamicIcons = this.props &&  this.props.actions && this.props.actions.map(item => {
      if (this.props.type === "Device" && item.icon.type === "burger") {
        return (<span className="queve-item__action-trigger">
          <svg width="30px" viewBox="0 0 52 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="03-MaketPlace" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="7.1.1-Basket-Premium-1" transform="translate(-162.000000, -282.000000)">
                <g id="Claim" transform="translate(72.000000, 282.000000)">
                  <g id="Basket-Icon" transform="translate(90.000000, 0.000000)">
                    <path d="M50.7983158,30.7687609 L46.5557895,29.6191087 L46.5557895,35.453 C46.5557895,35.4665652 46.56,35.4826739 46.56,35.4962391 C46.56,35.5115 46.5557895,35.525913 46.5557895,35.5411739 L46.5557895,35.9735652 L46.5018947,36.0803913 C46.3705263,36.9858696 45.9536842,37.7938478 45.3313684,38.4008913 L45.3052632,38.4526087 L33.8534737,48.4900217 L33.8290526,48.4951087 C33.3507368,48.9758261 32.6964211,49.2793478 31.9663158,49.2793478 C31.6488421,49.2793478 31.3524211,49.2081304 31.0694737,49.1046957 L30.9970526,49.1199565 L10.6298947,42.3076739 L10.6054737,42.2771522 C9.56547368,41.9354783 8.79915789,41.0105 8.68042105,39.8803478 L8.64336842,39.8337174 L8.64336842,33.9141957 L4,32.4661087 L8.68378947,20.2803043 L10.0749474,20.822913 L8.81852632,20.1539783 L26.2450526,11 L46.5145263,17.1416522 L46.576,17.1255435 L50.7983158,30.7687609 L50.7983158,30.7687609 Z M48.4538947,28.3982391 L46.5557895,22.5270435 L46.5557895,27.8717391 L48.4538947,28.3982391 L48.4538947,28.3982391 Z M10.3242105,40.1948913 L31.3818947,47.2030217 L31.3818947,30.5 L28.8303158,40.2084565 L10.3242105,34.4381522 L10.3242105,40.1948913 L10.3242105,40.1948913 Z M25.4837895,13.0542826 L12.0412632,19.9962826 L25.4837895,23.387587 L25.4837895,13.0542826 L25.4837895,13.0542826 Z M10.9431579,21.3663696 L10.8842105,21.2527609 L10.2096842,20.8941304 L6.16757895,31.4105652 L27.68,38.1185652 L30.5827368,27.0747826 L10.9431579,21.3663696 L10.9431579,21.3663696 Z M27.1772632,12.8525 L27.1772632,23.9446087 L31.8467368,25.4800217 L43.9056842,17.6537391 L27.1772632,12.8525 L27.1772632,12.8525 Z M44.8488421,19.2858043 L33.0618947,26.8848696 L33.0618947,46.9817391 L44.8488421,36.2482609 L44.8488421,19.2858043 L44.8488421,19.2858043 Z"
                      id="Imported-Layers" fill="#18cea0">
                    </path>
                    <g id="lines" stroke="#18cea0" stroke-linecap="square">
                      <path d="M4.5,15.5 L0.92113185,12.0083381" id="Line"></path>
                      <path d="M15.5,8.5 L13.302231,0.807808419" id="Line"></path>
                      <path d="M30.5,6.5 L31.2905694,1.77121499" id="Line"></path>
                      <path d="M46.5,11.5 L50.9376016,4.84359765" id="Line"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>)
      } else {
        if (!this.props.queueStatus) {
          return (<span className="queve-item__action-trigger" onClick={(e)=>{

            console.info('remove line 109');

            this.props.queveAction();
             e.currentTarget.style.visibility = "hidden";

          }}>
            <Icon className="queve-item__action-icon" {...item.icon} />
          </span>)
        } else {
          if (item.icon.type === 'remove') {
            return (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={(e)=>{

                console.info('click line 122');
  
                // this.props.queveAction();
                 e.currentTarget.style.visibility = "hidden";

              }}>
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="#18cea0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            )
          } else {
            return null
          }
        }
  
  
      }
    }
    );
  
    if (this.props && this.props.status === 'fulfilled') {
  
      if (this.props.tracking_details) {
        dynamicIcons = (<div className="queve-item__state">
          {this.props.iconState && <a href={this.props.tracking_details.tracking_url} target="_blank"><Icon className="queve-item__state-icon" {...this.props.iconState} /></a>}
        </div>)
      } else {
  
        dynamicIcons = this.props && this.props.actions && this.props.actions.map(item => {
          if (monthlyFragrances && monthlyFragrances > (Number(this.props.index)) && item.icon.type === "burger") {
            return (<span className="queve-item__action-trigger">
              <svg width="30px" viewBox="0 0 52 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="03-MaketPlace" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="7.1.1-Basket-Premium-1" transform="translate(-162.000000, -282.000000)">
                    <g id="Claim" transform="translate(72.000000, 282.000000)">
                      <g id="Basket-Icon" transform="translate(90.000000, 0.000000)">
                        <path d="M50.7983158,30.7687609 L46.5557895,29.6191087 L46.5557895,35.453 C46.5557895,35.4665652 46.56,35.4826739 46.56,35.4962391 C46.56,35.5115 46.5557895,35.525913 46.5557895,35.5411739 L46.5557895,35.9735652 L46.5018947,36.0803913 C46.3705263,36.9858696 45.9536842,37.7938478 45.3313684,38.4008913 L45.3052632,38.4526087 L33.8534737,48.4900217 L33.8290526,48.4951087 C33.3507368,48.9758261 32.6964211,49.2793478 31.9663158,49.2793478 C31.6488421,49.2793478 31.3524211,49.2081304 31.0694737,49.1046957 L30.9970526,49.1199565 L10.6298947,42.3076739 L10.6054737,42.2771522 C9.56547368,41.9354783 8.79915789,41.0105 8.68042105,39.8803478 L8.64336842,39.8337174 L8.64336842,33.9141957 L4,32.4661087 L8.68378947,20.2803043 L10.0749474,20.822913 L8.81852632,20.1539783 L26.2450526,11 L46.5145263,17.1416522 L46.576,17.1255435 L50.7983158,30.7687609 L50.7983158,30.7687609 Z M48.4538947,28.3982391 L46.5557895,22.5270435 L46.5557895,27.8717391 L48.4538947,28.3982391 L48.4538947,28.3982391 Z M10.3242105,40.1948913 L31.3818947,47.2030217 L31.3818947,30.5 L28.8303158,40.2084565 L10.3242105,34.4381522 L10.3242105,40.1948913 L10.3242105,40.1948913 Z M25.4837895,13.0542826 L12.0412632,19.9962826 L25.4837895,23.387587 L25.4837895,13.0542826 L25.4837895,13.0542826 Z M10.9431579,21.3663696 L10.8842105,21.2527609 L10.2096842,20.8941304 L6.16757895,31.4105652 L27.68,38.1185652 L30.5827368,27.0747826 L10.9431579,21.3663696 L10.9431579,21.3663696 Z M27.1772632,12.8525 L27.1772632,23.9446087 L31.8467368,25.4800217 L43.9056842,17.6537391 L27.1772632,12.8525 L27.1772632,12.8525 Z M44.8488421,19.2858043 L33.0618947,26.8848696 L33.0618947,46.9817391 L44.8488421,36.2482609 L44.8488421,19.2858043 L44.8488421,19.2858043 Z"
                          id="Imported-Layers" fill="#18cea0">
                        </path>
                        <g id="lines" stroke="#18cea0" stroke-linecap="square">
                          <path d="M4.5,15.5 L0.92113185,12.0083381" id="Line"></path>
                          <path d="M15.5,8.5 L13.302231,0.807808419" id="Line"></path>
                          <path d="M30.5,6.5 L31.2905694,1.77121499" id="Line"></path>
                          <path d="M46.5,11.5 L50.9376016,4.84359765" id="Line"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>)
          } else {
            return (
              <span className="queve-item__action-trigger"
                style={item.icon.type === "burger" ? { cursor: 'move' } : null}
                onClick={item.icon.type === "remove" ? null : (e) => {

                  console.info('click line 179');
  
                 // this.props.queveAction();
                  e.currentTarget.style.visibility = "hidden";
  
                }}>
                <Icon className="queve-item__action-icon" {...item.icon} />
              </span>)
          }
  
        }
        );
  
      }
  
    }
  
    if (this.props && this.props.status === 'unfulfilled' || this.props.status === "processing") {
      dynamicIcons = (<div className="queve-item__state">
        <svg width="48px" viewBox="0 0 53 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="03-MaketPlace" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="7.1.1-Basket-Premium-2" transform="translate(-159.000000, -281.000000)">
              <g id="Claim" transform="translate(72.000000, 281.000000)">
                <g id="Package" transform="translate(87.000000, 0.767500)">
                  <path d="M49.3157447,35.224087 C49.3157447,35.2376522 49.32,35.2537609 49.32,35.2673261 C49.32,35.282587 49.3157447,35.297 49.3157447,35.3122609 L49.3157447,35.7446522 L49.2604255,35.8514783 C49.1285106,36.7569565 48.707234,37.5649348 48.0782979,38.1719783 L48.0519149,38.2236957 L36.4782979,48.2611087 L36.453617,48.2661957 C35.9702128,48.746913 35.3089362,49.0504348 34.5710638,49.0504348 C34.2502128,49.0504348 33.9506383,48.9792174 33.6646809,48.8757826 L33.5914894,48.8910435 L13.0076596,42.0787609 L12.9829787,42.0482391 C11.9319149,41.7065652 11.1574468,40.781587 11.0374468,39.6514348 L11,39.6048043 L11,21.3765435 L11.0178723,21.3451739 C11.053617,20.5685652 11.4570213,19.8928478 12.0604255,19.477413 L12.0689362,19.4621522 L12.1251064,19.4324783 C12.2485106,19.3536304 12.3787234,19.2858043 12.5157447,19.2298478 L27.5404255,11.4196739 L27.5685106,11.4171304 C28.0076596,11.156 28.5165957,11 29.0646809,11 C29.3897872,11 29.7012766,11.0551087 29.9940426,11.1526087 L30.0425532,11.1466739 L48.0255319,16.5388478 L48.0876596,16.6126087 C48.7838298,16.7499565 49.3191489,17.3332609 49.3191489,18.0674783 C49.3191489,18.0725652 49.3157447,18.0801957 49.3157447,18.0869783 L49.3157447,35.224087 L49.3157447,35.224087 Z M12.6987234,39.9659783 L33.9804255,46.9741087 L33.9804255,27.0781739 L12.6987234,20.9577174 L12.6987234,39.9659783 L12.6987234,39.9659783 Z M14.4340426,19.7673696 L34.4502128,25.2511087 L39.867234,21.7868913 L21.3421277,16.231087 L14.4340426,19.7673696 L14.4340426,19.7673696 Z M28.8170213,12.404 L23.0748936,15.3442609 L41.4161702,20.7957826 L46.5480851,17.5138478 L28.8170213,12.404 L28.8170213,12.404 Z M47.5906383,19.0568913 L35.6782979,26.6559565 L35.6782979,46.7528261 L47.5906383,36.0193478 L47.5906383,19.0568913 L47.5906383,19.0568913 Z M26.6034043,31.6691522 L18.9787234,29.4012174 C18.5319149,29.2816739 18.267234,28.8246957 18.387234,28.379587 C18.506383,27.9353261 18.9651064,27.6716522 19.4119149,27.7903478 L27.0365957,30.0582826 C27.4825532,30.1778261 27.7480851,30.6348043 27.6280851,31.079913 C27.5089362,31.5241739 27.0493617,31.7878478 26.6034043,31.6691522 L26.6034043,31.6691522 Z"
                    id="Imported-Layers" fill="#18cea0">
                  </path>
                  <g id="STARS" stroke="#18cea0" stroke-linecap="square">
                    <path d="M0.5,9.5 L8.5,9.5" id="Line"></path>
                    <path d="M46,5 L52,5" id="Line-Copy-2"></path>
                    <path d="M4.5,5.5 L4.5,13.5" id="Line"></path>
                    <path d="M49,2 L49,8" id="Line-Copy-3"></path>
                    <path d="M24.5,2.5 L28.5,2.5" id="Line"></path>
                    <path d="M26.5,0.5 L26.5,4.5" id="Line"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>)
    }
  
    if (this.props && this.props.status === 'failure') {
      dynamicIcons = (<div className="queve-item__state" style={{ cursor: "pointer" }} onClick={() => {
        console.info('click', this.props);
      }}>
        <svg fill="#ff7272" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      </div>)
    }
  
  
  
    return (
      <div className={`queve-item ${queveItemClass}`}>
        <span className="queve-item__position">{this.isNumeric(this.props.position) ? this.props.position + 1 : ''}</span>
  
        <div className={dynamicClassRow}>
          {this.props.image && <img className="queve-item__image" src={this.props.image} />}
          <span className="queve-item__name">{this.props.name}</span>
          <span className="queve-item__type">{this.props.type}</span>
          <div className="queve-item__rating">
            {this.props.ratingHead && <span className="queve-item__rating-head">{this.props.ratingHead}</span>}
            {this.props.rating && <Rating {...this.props.rating} />}
          </div>
          <div className="queve-item__date">
            {this.props.failure_details ? null : this.props && this.props.status === 'planned' ? "Waiting on Queue" : this.props.date}
            {this.props.failure_details}
            {this.props.dateInfo && <span className="queve-item__date-info">({this.props.dateInfo})</span>}
          </div>
          <div className="queve-item__action">
            {dynamicIcons}
          </div>
        </div>
        <div className="queve-item__state">
  
        </div>
      </div>
    )
  }


}

export default QueveItem
