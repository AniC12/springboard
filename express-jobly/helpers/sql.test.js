const { sqlForPartialUpdate } = require('./sql');

describe('sqlForPartialUpdate', function () {
    test('should generate SQL parts for given data', function () {
        const data = { firstName: 'Aliya', age: 32 };
        const mappings = { firstName: 'first_name' };
        const result = sqlForPartialUpdate(data, mappings);
        expect(result).toEqual({
            setCols: '"first_name"=$1, "age"=$2',
            values: ['Aliya', 32]
        });
    });

    test('should handle data without any jsToSql mapping', function () {
        const data = { name: 'John', age: 25 };
        const result = sqlForPartialUpdate(data, {});
        expect(result).toEqual({
            setCols: '"name"=$1, "age"=$2',
            values: ['John', 25]
        });
    });
});