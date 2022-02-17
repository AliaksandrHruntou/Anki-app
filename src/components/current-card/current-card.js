import { Component } from "react";

import './current-card.css';

class CurrentCard extends Component {

    render() {
        let {front, back} = this.props;
        return (
            <div className="card-container">
                <div className="card">
                    <div className="front">
                        <div className="eng">{front}</div>
                    </div>
                    <div className="front back">
                        <div className="rus">{back}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentCard;