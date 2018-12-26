import getTotalExpenses from '../../selectors/total';
import expenses from '../fixtures/expenses';

test('should return 0 if empty array was provided', () => {
    const total = getTotalExpenses([]);
    expect(total).toBe(0);
});

test('should return total if a single item was provided', () => {
    const expense = [
        {
            id: '6',
            description: 'Jam',
            amount: 1300,
            note: '',
            createdAt: 0
        }
    ]
    const total = getTotalExpenses(expense);
    expect(total).toBe(1300);

});

test('should return total if multiple items were provided', () => {
    const total = getTotalExpenses(expenses);
    expect(total).toBe(71995); 
})