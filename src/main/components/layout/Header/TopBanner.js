import React, { Component, PropTypes } from 'react'

class TopBanner extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="topBanner">
                <h4 style={{
                    color: '#fff',
                    fontWeight: 700,
                }}> &nbsp; Use code <span style={{ color: '#18cea0', }}>25FORYOU</span> for 25% off </h4>
            </div>

        )
    }
}

export default TopBanner
