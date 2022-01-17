import { Component } from "react";
import { Button } from "react-bootstrap";

import './edit-panel.css';

class EditPanel extends Component {
    render() {
        return (
            <div className="edit-panel">
                <div className="buttons">
                    <Button variant="danger">Плохо</Button>
                    <Button className="medium" variant="warning">Средне</Button>
                    <Button variant="success">Хорошо</Button>
                </div>
                <div className="all-in-one-page">
                    <Button variant="secondary">Показать все</Button>
                </div>
            </div>
        );
    }
}

export default EditPanel;