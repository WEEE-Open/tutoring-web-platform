import { Col, Container, Row, Table } from "react-bootstrap";
import { ListEntry } from "./";
import "./List.css";

function HeaderColspan(scope) {
  switch (scope) {
    case "courses":
      return "4";
    case "questions":
      return "4";
    default:
      return "10";
  }
}

function ListDefault({ props }) {
  return (
    <>
      {props.rounded ? (
        <table className="list roundedList">
          <thead>
            <tr>
              <th className="listTitle" colSpan={HeaderColspan(props.scope)}>
                {props.title}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((r) => (
              <ListEntry scope={props.scope} row={r} />
            ))}
          </tbody>
        </table>
      ) : (
        <Table striped bordered borderless className="list">
          <thead className="listTitle">
            <tr>
              <th colSpan={HeaderColspan(props.scope)}>{props.title}</th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((r) => (
              <ListEntry scope={props.scope} row={r} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

function ListQuestions({ props }) {
  return (
    <>
      <h3 className="listQuestionsTitle">{props.title}</h3>
      {props.rows.map((r) => (
        <ListEntry scope={props.scope} row={r} />
      ))}
    </>
  );
}

function ListAnswers({ props }) {
  return (
    <Table borderless className="list listAnswers">
      <tbody>
        {props.rows.map((r) => (
          <ListEntry scope={props.scope} row={r} />
        ))}
      </tbody>
    </Table>
  );
}

function ListSuggestion({ props }) {
  return (
    <>
      <Container>
        <h3 className="listSuggestionTitle">{props.title}</h3>
        <div className="listSuggestion-questions">
          {props.rows.map((r) => (
            <ListEntry scope={props.scope} row={r} />
          ))}
        </div>
      </Container>
    </>
  );
}

function ListSimulationResult ({props}) {
  return (
    <>
      <Container>
        <h4 className="listSimulationResultTitle">Your Answers</h4>
        <div className='listSimulationResults'>
          {props.rows.map((r) => (
              <ListEntry scope={props.scope} row={r}/>
          ))}
        </div>
      </Container>
    </>
  );
}
function List(props) {
  if (props.scope === "questions") return <ListQuestions props={props} />;
  if (props.scope === "answers") return <ListAnswers props={props} />;
  if (props.scope === "suggestion") return <ListSuggestion props={props} />;
  if(props.scope === "simulationResult") return <ListSimulationResult props={props}/>;
  return <ListDefault props={props} />;
}

export default List;
