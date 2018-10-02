import lodashFind from 'lodash/find'
import { cropShopifyImage } from 'common/utils/imageCrop'
import { formattDate } from 'common/utils/Intl'


import React, { PropTypes, Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// touch support for react dnd
import { default as TouchBackend } from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';

import QueveItem from './QueveItem'
import DraggableQueveItem from './DraggableQueveItem'

import QueveItemEmpty from './QueveItemEmpty'

import { Button } from '../../components/forms'
import config from '../../../config'

import update from 'immutability-helper'

const constructItem = (itemData, products) => {


  if (!itemData) { return null; }




  const product = lodashFind(
    products,
    item => item && item.data.id == itemData.id
  )
  if (itemData.status === 'failure') {
    console.info(itemData.status, itemData.failure_details, product);
  }


  if (product !== undefined) {
    return {
      id: itemData.id,
      key: itemData.key,
      // position: itemData.position,
      image: product.data.imageSrc
        ? cropShopifyImage(product.data.imageSrc, 50)
        : require('main/assets/img/products/product-placeholder.jpg'),
      name: product.data.heading,
      type: product.data.type,
      status: itemData.status,
      failure_details: itemData.status === 'failure' ? itemData.failure_details : null,
      tracking_details: itemData.tracking_details,
      rating: {
        rating: product.data.rating.value || 0,
      },
      date: itemData.status !== 'planned' || itemData.status !== 'failure' ? formattDate(itemData.date, { weekday: "short" }) : null,
      action: itemData.status === 'planned'
        ? {
          type: 'remove',
        }
        : null,
      iconState:
        itemData.status === 'fulfilled'
          ? {
            type: 'delivery',
          }
          : null,
    }
  }
}

class QueveTable extends Component {
  constructor(props) {
    super(props)

    this.state = { draggableQueue: [] };

    this.findItem = this.findItem.bind(this)
    this.moveCard = this.moveCard.bind(this)
    this.dropCard = this.dropCard.bind(this)
  }

  getDerivedStateFromProps(nextProps, prevState) {
    console.info('getDerivedStateFromProps ', nextProps, prevState);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.products.length > 0 && nextProps.queve && nextProps.queve.length > 0) {
      this.setState({
        draggableQueue:
          nextProps.queve
            .map((item) => {
              return constructItem(item, nextProps.products)
            })
            .filter((item) => {
              if (item) {
                return item.status === "planned" && item.type !== "Device"
              }

            })
      });
    }
  }

  findItem(key) {
    const { queve } = this.props
    const queveItem = queve.filter(c => c.key === key)[0]
    return {
      queveItem,
      index: queve.indexOf(queveItem),
    }
  }

  moveCard(id, hoverIndex, dragIndex) {
    // handle internal state

    const { draggableQueue } = this.state
    const dragCard = draggableQueue[dragIndex]

    this.setState(
      update(this.state, {
        draggableQueue: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  dropCard(id, hoverIndex, dragIndex) {
    this.props.moveItem(id, hoverIndex, dragIndex);
  }

  //sort by product type and queue status 
  /* TODO find a better way to solve this sort hell */
  sortByType(a, b) {
    // planed cases and type device
    if (a.status === "planned" && a.type === "Device" && b.status === "planned" && b.type === "Scent") {
      return -1;
    }

    if (a.status === "planned" && a.type === "Scent" && b.status === "planned" && b.type === "Device") {
      return 1;
    }
    // Scent - Unavailable
    if (a.status === "planned" && a.type === "Device" && b.status === "planned" && b.type === "Scent - Unavailable") {
      return -1;
    }

    if (a.status === "planned" && a.type === "Scent - Unavailable" && b.status === "planned" && b.type === "Device") {
      return 1;
    }

    return 0;
  }

  sortByStatus(a, b) {
    // fulfilled cases
    if (a.status === "fulfilled" && b.status === "unfulfilled") {
      return -1;
    }

    if (a.status === "fulfilled" && b.status === "planned") {
      return -1;
    }

    if (a.status === "fulfilled" && b.status === "failure") {
      return -1;
    }

    // unfulfilled cases
    if (a.status === "unfulfilled" && b.status === "fulfilled") {
      return 1;
    }

    if (a.status === "unfulfilled" && b.status === "planned") {
      return -1;
    }

    if (a.status === "unfulfilled" && b.status === "failure") {
      return -1;
    }

    // failure cases
    if (a.status === "failure" && b.status === "fulfilled") {
      return 1;
    }

    if (a.status === "failure" && b.status === "unfulfilled") {
      return 1;
    }

    if (a.status === "failure" && b.status === "planned") {
      return -1;
    }

    // planed cases
    if (a.status === "planned" && b.status === "failure") {
      return 1;
    }

    if (a.status === "planned" && b.status === "unfulfilled") {
      return 1;
    }

    if (a.status === "planned" && b.status === "fulfilled") {
      return 1;
    }

    return 0;
  }

  render() {


    let { tableHead, products, queve, queveAction, upgrade, devicesRequested, removeDevice } = this.props
    let autoGeneratedQueue = [];
    for (var i = 0; i < devicesRequested; i++) {
      autoGeneratedQueue.push(
        {
          key: "-device-" + i,
          position: 0,
          id: config.deviceId0,
          status: 'planned',
          failure_details: null,
          date: null,
          tracking_details: null,
        }
      );
    }

    queve = [...queve, ...autoGeneratedQueue];

    const onTheWayElements = [];
    let onTheWayQueue = [];
    if (products.length > 0 && queve && queve.length > 0) {
      onTheWayQueue = queve.filter((item) => {
        if (item) {
          return item.status !== "planned"
        }
      }).map((item) => {
        return constructItem(item, products)
      }).sort(this.sortByStatus);
    }

    const draggableElements = [];
    /*
    let draggableQueue = [];
    if (products.length > 0 && queve && queve.length > 0) {
      draggableQueue = queve.map((item) => {
        return constructItem(item, products)
      }).filter((item) => {
        if (item) {
          return item.status === "planned" && item.type !== "Device"
        }

      })
    }
    */

    const devicesElements = [];
    let devicesQueue = [];
    if (products.length > 0 && queve && queve.length > 0) {
      devicesQueue = queve.map((item) => {
        return constructItem(item, products)
      }).filter((item) => {
        if (item) {
          return item.status === "planned" && item.type === "Device"
        }
      })
    }

    return (
      <section className="queve-table">

        {upgrade && (
          <div className="queve-table__upgrade-action">
            <span className="queve-table__upgrade-info">To receive more than <span style={{ fontSize: 20, fontWeight: 700 }}>{upgrade.info} </span> fragrance vials every month, Upgrade your plan.</span>
            <Button
              className="btn--primary btn--shadow btn--no-margin"
              {...upgrade.action}
            />
          </div>
        )}

        <QueveItem {...tableHead} className="queve-item--table-head" />

        {queve.length < 1 && <QueveItemEmpty />}
        {queve.length > 1 && products.length < 1 && <QueveItemEmpty loading />}

        {onTheWayQueue.length > 0 &&
          onTheWayQueue.map((item, count) => {
            if (item && item.id) {
              onTheWayElements.push(
                <QueveItem
                  {...item}
                  interactive
                  position={count}
                  moveItem={this.props.moveItem}
                  findItem={this.findItem}
                  key={item.key}
                  queveAction={null}
                />
              )
            }

            return true
          })}
        <div>
          {onTheWayElements.length > 0 && onTheWayElements}
        </div>

        {devicesQueue.length > 0 &&
          devicesQueue.map((item, count) => {
            if (item && item.id) {
              devicesElements.push(
                <QueveItem
                  {...item}
                  interactive
                  moveItem={this.props.moveItem}
                  findItem={this.findItem}
                  queueStatus={false}
                  key={item.key}
                  queveAction={() => { removeDevice(devicesRequested) }}
                />
              )
            }

            return true
          })}

        <div>
          {devicesElements.length > 0 && devicesElements}
        </div>

        {this.state.draggableQueue.length > 0 &&
          this.state.draggableQueue.map((item, count) => {
            if (item && item.id) {

              /*
              * Evaluate queue status if the queue status is porcessing (true) then disable the drag and drop functionallity
              */

              if (this.props.queueStatus && this.props.queueStatus.processing) {

                draggableElements.push(
                  <QueveItem
                    {...item}
                    interactive
                    position={count}
                    moveItem={this.props.moveItem}
                    findItem={this.findItem}
                    queueStatus={true}
                    key={item.key}
                    queveAction={() => queveAction(item.key)}
                  />
                )
              } else {

                draggableElements.push(
                  <DraggableQueveItem
                    {...item}
                    id={item.key}
                    index={count}
                    position={count}
                    moveCard={this.moveCard}
                    dropCard={this.dropCard}
                    queveAction={() => queveAction(item.key)}
                    monthlyFragrances={upgrade ? upgrade.info : null}
                  />
                )
              }


            }

            return true
          })}
        <div>
          {draggableElements.length > 0 && draggableElements}
        </div>
        {upgrade && (
          <div className="queve-table__upgrade-action">
            <span className="queve-table__upgrade-info">To receive more than <span style={{ fontSize: 20, fontWeight: 700 }}>{upgrade.info} </span>  fragrance vials every month, Upgrade your plan.</span>
            <Button
              className="btn--primary btn--shadow btn--no-margin"
              {...upgrade.action}
            />
          </div>
        )}
      </section>
    )
  }
}

QueveTable.propTypes = {
  moveItem: PropTypes.func.isRequired,
  products: PropTypes.array,
  queve: PropTypes.array,
  queveAction: PropTypes.func.isRequired,
  tableHead: PropTypes.object,
  upgrade: PropTypes.object,
}

QueveTable.defaultProps = {
  products: [],
  queve: {},
  tableHead: {},
  upgrade: null,
}

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend, // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};

export default DragDropContext(MultiBackend(HTML5toTouch))(QueveTable)
