import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux'; 
import { useParams } from 'react-router';
import { Card, Button, Row, Col } from 'react-bootstrap';


const SingleTable = (props) => {

    const { tableId } = useParams();

    const tableData = useSelector(state => getTableById(state, tableId));


    return(
        <Row className="justify-content-start">
            <Col  className="col-lg-6">
                <Row>
                    <Col>
                    <h1  className={'px-3'}>Table {tableData.id}</h1>
                    </Col>
                    <Card className="border-0" >
                    <Card.Body>
                        <Card.Text className="mb-2"><b>Status:</b> {tableData.status}</Card.Text>
                        <Card.Text className="mb-3"><b>People:</b> {tableData.peopleAmount} / {tableData.maxPeopleAmount}</Card.Text>
                        <Card.Text className="mb-3"><b>Bill:</b> $ {tableData.bill}</Card.Text>
                    </Card.Body>
                    </Card>
                    <Col>
                    <Link key={props.id} to={`/table/edit/${tableId}`} className={'px-2'}>
                        <Button>Update</Button>
                    </Link>
                    </Col>
                </Row>
            </Col> 
        </Row>  
    );
  };

  export default SingleTable;