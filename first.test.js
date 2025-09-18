function plus (a,b) {
    return a + b;
}

test('My first test', () => {
    expect(plus(2,8)).toBe(10);
});

test('toEqual with objects', () => {
    expect({ foo: 'foo', subObject: { baz: 'baz' }}).toEqual({ foo: 'foo', subObject: { baz: 'baz' } });  // Ок
    expect({ foo: 'foo', subObject: { num: 0 } }).toEqual({ foo: 'foo', subObject: { baz: 'baz' } });  // А вот так ошибка.
});

test('toEqual with arrays', () => {
    expect([11, 19, 5]).toEqual([19, 11, 5]); // Ок
    expect([11, 19, 5]).toEqual([11, 19]); // Ошибка
});

test('Название теста', () => {
    const arr = ['apple', 'orange', 'banana'];
    expect(arr).toContain('banana');
    expect(new Set(arr)).toContain('banana');
    expect('apple, orange, banana').toContain('banana');
});