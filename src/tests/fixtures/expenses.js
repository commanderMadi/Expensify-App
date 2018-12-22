import moment from 'moment';

export default [
    {
        id: '1',
        description: 'Gum',
        amount: 1995,
        note: '',
        createdAt: 0
    },
    {
        id: '2',
        description: 'Credit Card',
        amount: 20000,
        note: '',
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: '3',
        description: 'Rental',
        amount: 50000,
        note: '',
        createdAt: moment(0).add(4, 'days').valueOf()
    }
]

