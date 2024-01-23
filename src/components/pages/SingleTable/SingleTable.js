import { useSelector, useDispatch } from "react-redux";
import { getTableById } from '../../../redux/tablesRedux'; 
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Form, InputGroup, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getStatus } from "../../../redux/StatusRedux";
import { editTableRequest } from "../../../redux/tablesRedux";
import { useState, useEffect } from "react";


const SingleTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { tableId } = useParams();
    const tableData = useSelector(state => getTableById(state, tableId));
    const statusOptions = useSelector(getStatus);

    const [status, setStatus] = useState(tableData.status || '');
    const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount || '0');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount || '');
    const [bill, setBill] = useState(tableData.bill);
    const [showBill, setShowBill] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editTableRequest({ id: tableId, status, peopleAmount, maxPeopleAmount, bill }))
        navigate('/');
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        if (newStatus === 'Busy') {
            setShowBill(true);
            setBill('0');
        } else if (newStatus === 'Cleaning' || newStatus === 'Free') {
            setShowBill(false);
            setPeopleAmount('0');
        } else {
            setShowBill(false)
            setPeopleAmount(tableData.peopleAmount);
        };
    };

    const handlePeopleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 10 && value < parseInt(maxPeopleAmount)) {
            setPeopleAmount(value.toString());
        }
    };

    const handleMaxPeopleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        const currentPeopleAmount = parseInt(peopleAmount);
        if (!isNaN(value) && value >= 0 && value <= 10) {
            setMaxPeopleAmount(value.toString());
            if (currentPeopleAmount > value) {
                setPeopleAmount(value.toString());
            }
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 500);
    
        return () => clearTimeout(timeoutId);
    }, [tableData]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </div>
        );
    }

    if(!tableData) return <Navigate to="/" />
    return (
        <Form onSubmit={handleSubmit} className="ms-0" style={{ width: '30%'}}>
            <h1 className="pb-2">Table {tableData.id}</h1>
            <Row className="my-2">
                <Col><b>Status: </b></Col>
                <Col>
                    <Form.Select value={status} onChange={handleStatusChange}>
                        {statusOptions.map(({ id, name }) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row className="my-2">
                <Col><b>People: </b></Col>
                <Col xs="auto">
                    <InputGroup><Form.Control style={{ maxWidth: '50px', marginRight: '-30px' }} value={peopleAmount} onChange={handlePeopleAmountChange}></Form.Control></InputGroup>
                </Col>
                <Col xs="auto">
                    <InputGroup.Text className="border-0 bg-transparent" >/</InputGroup.Text>
                </Col>
                <Col xs="auto">
                    <InputGroup><Form.Control style={{ maxWidth: '50px', marginLeft: '-30px' }} value={maxPeopleAmount} onChange={handleMaxPeopleAmountChange}></Form.Control></InputGroup>
                </Col>
            </Row>
            {(showBill || status === 'Busy') ? (
                <Row className="my-2">
                    <Col><b>Bill: </b></Col>
                    <Col xs="auto">
                        <InputGroup.Text className="border-0 bg-transparent" style={{ marginRight: '-30px' }}>$</InputGroup.Text>
                    </Col>
                    <Col xs="auto">
                        <InputGroup><Form.Control style={{ maxWidth: '60px' }} value={bill} onChange={e => setBill(e.target.value)}></Form.Control></InputGroup>
                    </Col>
                </Row>
            ) : '' }
            <Button type="submit">Update</Button>
        </Form>
    );
};

  export default SingleTable;