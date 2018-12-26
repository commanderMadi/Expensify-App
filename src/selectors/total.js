const getTotalExpenses = (arr) => {
    if (arr.length === 0) {
        return 0;
    } else {
        const reducer = (acc, currVal) => acc + currVal.amount;
        let total = arr.reduce(reducer, 0);
        return total;
    }
}

export default getTotalExpenses;