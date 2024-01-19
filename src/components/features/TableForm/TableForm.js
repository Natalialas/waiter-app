import { getStatus } from '../../../redux/StatusRedux';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux/es/hooks/useSelector";




const TableForm = ({ action, actionText, ...props}) => {

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    const tableStatus = useSelector(getStatus);

    const [status, setStatus] = useState(props.status || '');
    const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
    const [bill, setBill] = useState(props.bill || '');
    const [statusError, setStatusError] = useState(false);

    const handleSubmit = () => {
        setStatusError(!status || !tableStatus.includes(status));
        if (status && tableStatus.includes(status)) {
          action({ status, peopleAmount, maxPeopleAmount, bill });
        }
    };

}

export default TableForm;