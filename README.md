# Fractions 
[![npm version](https://badge.fury.io/js/fractionize.svg)](https://badge.fury.io/js/fractionalize)

Function that formats numbers to an approximate fraction

### Install
```
npm install fractionalize
```

### Usage

```TypeScript
import {Fractionalize, FractionalizeOptions} from 'fractionalize';

const x = 2.4;
const xFormatted = Fractionalize(x);

```

Outputs: 2 &#x2156;

### Options
```TypeScript
class FractionalizeOptions {
    maxDenominator=64;
    spaceBetweenIntegerAndFraction=true;
    tolerance=.01;
    exactMatch = false;
    showApproximationSymbol = false;
}
```

Supply a structure to the fractionalize function to fine tune the process.

* maxDenominator - The highest number that would acceptable as a denominator in the fraction.  Defaults to 64.
* spaceBetweenIntegerAndFraction - Determines whether or not to place a space between the fraction and the integer portion of the number.  Defaults to true
* tolerance - if exactMatch is false, how close does the real number need to be to the fractional number to be used.  Default is 1/100 (.01)
* exactMatch - if true, the number will only be shown as a fraction if it exactly matches. 
* showApproximationSymbol - if true, and the fractional representation, show the ≈ symbol.
