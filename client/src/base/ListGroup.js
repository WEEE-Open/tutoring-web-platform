import { Container, Row, Col } from "react-bootstrap";
import { List } from "./";
import "./ListGroup.css";
import {Route,Link} from "react-router-dom";
import {Answers} from "../pages";

function ListGroup(props) {
  return (
    <Container>
      {props.lists
        .filter((useless, i) => i % props.cols === 0)
        .map((useless, i) => (
          <Row>
            {props.lists
              .slice(i * props.cols, (i + 1) * props.cols)
              .map((l) => (
                    <Col>
                      <Link className={"list-attributes"} to={'/listfullpage'}>
                      <List
                          scope={l.scope}
                          title={l.title}
                          rows={l.rows}
                          rounded={props.rounded}
                      />
                      </Link>
                    </Col>
              ))}
            {props.tiled &&
              (i + 1) * props.cols > props.lists.length - 1 &&
              props.lists.length % props.cols > 0 &&
              [
                ...Array(props.cols - (props.lists.length % props.cols)).keys(),
              ].map((key) => <Col></Col>)}
          </Row>
        ))}
    </Container>
  );
}

export default ListGroup;
