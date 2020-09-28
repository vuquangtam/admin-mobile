import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { useUpdate } from 'react-admin';

const VisitCountField = ({ source, record = {} }: any) => {
    const [approve, { loading }] = useUpdate('comments', record.id, record);

    const handleClick = (type) => {
        record[source] = Math.max((+record[source] || 0) + (type === 'increase' ? 1 : -1), 0);

        approve();
    }

    return (
        <ButtonGroup color="primary" size="small">
            <Button disabled={loading} onClick={e => {handleClick('decrease')}}>-</Button>
            <Button onClick={e => e.stopPropagation()}>{record[source]}</Button>
            <Button disabled={loading} onClick={e => {handleClick('increase')}}>+</Button>
        </ButtonGroup>
    )
};

export default VisitCountField;