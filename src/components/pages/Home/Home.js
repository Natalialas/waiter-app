import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Home = (props) => {

    const tables = useSelector((state) => getAllTables(state));

    return (
        <div>
        <Row className="mb-4">
            <Col>
                <h1 className="mb-0">All tables</h1>
            </Col>
        </Row>
        <Row>
                <Col>
                    {tables.map(table => (
                        <Card key={table.id} className="mb-3 border-0 border-bottom">
                            <Card.Body className="d-flex justify-content-between">
                                <div style={{ marginRight: '10px' }}>
                                    <Card.Title className="h2">Table {table.id}</Card.Title>
                                </div>
                                <div className="me-auto">
                                    <span className="font-weight-bold"><b>Status:</b></span> {table.status}
                                </div>
                                <Link to={`/table/${table.id}`}>
                                    <div>
                                        <Button>Show more</Button>
                                    </div>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default Home;