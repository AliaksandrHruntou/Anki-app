import { FC } from "react";
import { Badge, Button } from "react-bootstrap";
import { ItemType } from "../../../types/types";

import './deck-info.css';

type DeckInfoPropsType = {
  items: Array<ItemType>
}

type InfoType = {
  new: number
  inProcess: number
  learned: number
}

const DeckInfo: FC<DeckInfoPropsType> = ({ items }) => {

  const renderInfo = (items: Array<ItemType>): InfoType => {
    const info: InfoType = {
      new: 0,
      inProcess: 0,
      learned: 0
    };
    items.forEach((item) => {
      if (item.rating === 1) {
        info.new = info.new + 1;
      } else if (item.rating > 1 && item.rating < 4) {
        info.inProcess = info.inProcess + 1;
      } else if (item.rating === 4) {
        info.learned = info.learned + 1;
      }
    });
    return info;
  };

  //добавить полную обработку 
  
  const deckInfo = renderInfo(items);

  return (
    <div className="deck-info">
      <Button variant="primary">
        New <Badge bg="secondary">{ deckInfo.new }</Badge>
      </Button>
      <Button variant="warning">
        Learning <Badge bg="secondary">{ deckInfo.inProcess }</Badge>
      </Button>
      <Button variant="success">
        Learned <Badge bg="secondary">{ deckInfo.learned }</Badge>
      </Button>
    </div>
  );
};

export default DeckInfo;
