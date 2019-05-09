import {Fractionalize, FractionalizeOptions} from '../index';

test('Exact match', () => {
    expect(Fractionalize(.5)).toBe("\u00BD");
});

test('Close enough', () => {
    expect(Fractionalize(.5001)).toBe("\u00BD");
});

test('No exact match', ()=> {
    const opts = new FractionalizeOptions();
    opts.exactMatch = true;
    expect(Fractionalize(.5001, opts)).toBe("0.5001");
});

test('There isnt a unicode equivalent', ()=> {
    expect(Fractionalize(.03)).toBe("1/26");
});


test('Whole numbers are cool', ()=> {
    expect(Fractionalize(1)).toBe("1");
});

test('Whole numbers are fractionalized', ()=> {
    expect(Fractionalize(1.25)).toBe("1 \u00BC");
});

test('Whole numbers are fractionalized - no space', ()=> {
    const opts = new FractionalizeOptions();
    opts.spaceBetweenIntegerAndFraction = false;
    expect(Fractionalize(1.25, opts)).toBe("1\u00BC");
});

test('Null doesnt break things', ()=> {
    expect(Fractionalize(null)).toBe(null);
});

test('Undefined doesnt break things', ()=> {
    expect(Fractionalize(undefined)).toBe(undefined);
});

test('Nan doesnt break things', ()=> {
    expect(Fractionalize(NaN)).toBe(NaN);
});
