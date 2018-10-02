import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icons/'
import Rating from '../interactive/Rating'

import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'


const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource = {
	beginDrag(props) {
		const toReturn = {
			id: props.id,
			key: props.key,
			index: props.index,
		}
		return toReturn
	},
}

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index
		const id = monitor.getItem().id

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(id, hoverIndex, dragIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
	drop(props, monitor) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index
		const id = monitor.getItem().id
		const key = monitor.getItem().key
		
		props.dropCard(id, hoverIndex, dragIndex)
	},
}

class DraggableQueveItem extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		moveCard: PropTypes.func.isRequired,
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

	render() {
		const props = this.props;
		const {
			className,
			isDragging,
			connectDragSource,
			connectDropTarget,
			connectDragPreview,
			monthlyFragrances,
		} = props;
		const opacity = isDragging ? 0 : 1
		let customStyle = {}
		if (isDragging) {
			customStyle = { border: '2px dashed #ccc' }
		}

		let queveItemClass = className
		//queveItemClass += isDragging ? ' queve-item--dragged' : ''

		let dynamicClassRow = "queve-item__wrapper";
		let dynamicIcons = props.actions && props.actions.map(item => {
			if (monthlyFragrances && monthlyFragrances > (Number(props.index)) && item.icon.type === "burger") {
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
						onClick={item.icon.type === "burger" ? null : (e) => {

							props.queveAction();
							e.currentTarget.style.visibility = "hidden";

						}}>
						<Icon className="queve-item__action-icon" {...item.icon} />
					</span>)
			}

		}
		);

		return connectDragPreview(
			//connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
			connectDropTarget(<div className={`queve-item ${queveItemClass}`}>
				<span className="queve-item__position">{this.isNumeric(props.position) ? props.position + 1 : ''}</span>

				<div className={dynamicClassRow} style={customStyle}>
					{props.image && <img className="queve-item__image" src={props.image} style={{ opacity }} />}
					<span className="queve-item__name" style={{ opacity }}>{props.name}</span>
					<span className="queve-item__type" style={{ opacity }}>{props.type}</span>
					<div className="queve-item__rating" style={{ opacity }}>
						{props.ratingHead && <span className="queve-item__rating-head">{props.ratingHead}</span>}
						{props.rating && <Rating {...props.rating} />}
					</div>
					<div className="queve-item__date" style={{ opacity }}>
						{props.failure_details ? null : props.status && props.status === 'planned' ? "Waiting on Queue" : props.date}
						{props.failure_details}
						{props.dateInfo && <span className="queve-item__date-info">({props.dateInfo})</span>}
					</div>
					{connectDragSource(
						<div className="queve-item__action" style={{ opacity }}>
							{dynamicIcons}
						</div>
					)}

				</div>
				<div className="queve-item__state">

				</div>
			</div>),
		)
	}
}


export default flow(
	DragSource('DraggableQueveItem', cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	})),
	DropTarget('DraggableQueveItem', cardTarget, connect => ({
		connectDropTarget: connect.dropTarget(),
	}))
)(DraggableQueveItem);