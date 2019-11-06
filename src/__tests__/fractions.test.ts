import {Fractionalize, FractionalizeOptions} from '../index';

test('Exact match', () => {
    expect(Fractionalize(.5)).toBe("\u00BD");
});

test('Exact match with negative numbers', () => {
    expect(Fractionalize(-.5)).toBe("-\u00BD");
});

test('Close enough', () => {
    expect(Fractionalize(.5001)).toBe("\u00BD");
});

test('Close enough with approximation', () => {
    const opts = new FractionalizeOptions();
    opts.showApproximationSymbol = true;
    expect(Fractionalize(.5001, opts)).toBe("\u2248\u00BD");
});

test('No exact match', ()=> {
    const opts = new FractionalizeOptions();
    opts.exactMatch = true;
    expect(Fractionalize(.5001, opts)).toBe("0.5001");
});

test('There isnt a unicode equivalent', ()=> {
    expect(Fractionalize(.03)).toBe("1/26");
});

test('There isnt a unicode equivalent with approximation', ()=> {
    const opts = new FractionalizeOptions();
    opts.showApproximationSymbol = true;
    expect(Fractionalize(.03, opts)).toBe("\u22481/26");
});

test('There isnt a unicode equivalent with numbers > 1', ()=> {
    expect(Fractionalize(1.09)).toBe("1 1/10");
});

test('Whole numbers are cool', ()=> {
    expect(Fractionalize(1)).toBe("1");
});

test('Negative whole numbers are cool', ()=> {
    expect(Fractionalize(-1)).toBe("-1");
});

test('Whole numbers are fractionalized', ()=> {
    expect(Fractionalize(1.25)).toBe("1 \u00BC");
});

test('Negative whole numbers are fractionalized', ()=> {
    expect(Fractionalize(-1.25)).toBe("-1 \u00BC");
});

test('Negative real numbers are fractionalized', ()=> {
    expect(Fractionalize(-1.06)).toBe("-1 1/15");
});

test('Zero works', ()=> {
    expect(Fractionalize(0)).toBe("0");
});

test('Negative zero works', ()=> {
    expect(Fractionalize(-0)).toBe("0");
});

test('Infinity works ok', ()=> {
    expect(Fractionalize(Infinity)).toBe("Infinity");
});

test('Negative infinity works ok', ()=> {
    expect(Fractionalize(Number.NEGATIVE_INFINITY)).toBe("-Infinity");
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

test('Works with strings', ()=> {
    expect(Fractionalize("1")).toBe("1");
});
