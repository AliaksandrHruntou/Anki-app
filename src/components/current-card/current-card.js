import { Component } from "react";

import './current-card.css';

class CurrentCard extends Component {
    render() {
        let {eng, rus} = this.props;
        return (
            <div className="card-container">
                <div className="card">
                    <div className="front">
                        <div className="eng">{eng}</div>
                    </div>
                    <div className="front back">
                        <div className="rus">{rus}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentCard;