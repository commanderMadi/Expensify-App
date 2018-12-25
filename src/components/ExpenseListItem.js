import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//Format currency to EGP
numeral.register('locale', 'eg', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'EGP' : 'L.E';
    },
    currency: {
        symbol: 'EGP'
    }
});



export const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`edit/${id}`}><h3>{description}</h3></Link>
        <p>{numeral(amount / 100).format('$0,0.00')} - 
        {moment(createdAt).format('DD-MMMM-YYYY')}</p>
    </div>
)

numeral.locale('eg');

export default ExpenseListItem;