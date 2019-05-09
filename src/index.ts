const denominatorMap:number[][]=[];

const unicodeMap = [
    []/*Zero*/,[]/*One*/,
    //Half
    [
        [] /*Zero*/,"\u00BD"
    ]
    ,
    [ /*Third*/
        [] /*Zero*/, "\u2153","\u2154"
    ],
    [ //Fourth
        [] /*Zero*/, "\u00BC", [],"\u00BE"
    ],
    [ //Fifth
        [] /*Zero*/, "\u2155", "\u2156", "\u2157", "\u2158"
    ],
    [ //Sixth
        [] /*Zero*/, "\u2159", [],[],[], "\u215A"
    ],
    [ //Seventh
        [] /*Zero*/, "\u2150",
    ],
    [ //Eighth
        [] /*Zero*/, "\u215B", [], "\u215C",[],"\u215D",[],"\u215E"
    ],
    [ //Ninths
        [] /*Zero*/,"\u2151"
    ]

];

export class FractionalizeOptions {
    maxDenominator=64;
    spaceBetweenIntegerAndFraction=true;
    tolerance=.01;
    exactMatch = false;
}

export function Fractionalize(text:any, fractionalizeOptions:FractionalizeOptions = new FractionalizeOptions()): string {
    if (text === null || text === undefined) {
        return text;
    }

    if (denominatorMap.length < fractionalizeOptions.maxDenominator) {
        createDenominatorMap(fractionalizeOptions.maxDenominator);
    }

    var v = text;
    if (typeof v !== "number") {
        v = Number(v);
    }

    if (isNaN(v)) {
        return text;
    }

    var decimalPortion = v%1;
    var integerPortion = Math.floor(v);
    for (var i=0;i<fractionalizeOptions.maxDenominator;i++) {
        for (var j=0;j<denominatorMap[i].length;j++) {
            if (decimalPortion === denominatorMap[i][j]) {
                return formatResult(integerPortion, j+1,i+1, fractionalizeOptions);
            }
        }
    }

    if (!fractionalizeOptions.exactMatch) {
        for (var i = 0; i < fractionalizeOptions.maxDenominator; i++) {
            for (var j = 0; j < denominatorMap[i].length; j++) {
                if (decimalPortion + fractionalizeOptions.tolerance > denominatorMap[i][j] &&
                    decimalPortion - fractionalizeOptions.tolerance < denominatorMap[i][j]) {
                    return formatResult(integerPortion, j + 1, i + 1, fractionalizeOptions);
                }
            }
        }
    }

    return text.toString();
}

function createDenominatorMap(maxDenominator:number) {
    while (denominatorMap.length < maxDenominator) {
        var currentDenominator = denominatorMap.length+1;
        var m = [];
        for (var i=1;i<= currentDenominator;i++) {
            m.push(i/currentDenominator);
        }
        denominatorMap.push(m);
    }
}

function formatResult(integerPortion:number, numerator:number, denominator:number, fractionalizeOptions:FractionalizeOptions):string {

    if (unicodeMap[denominator] &&
        unicodeMap[denominator][numerator]) {

        return [
            integerPortion ? integerPortion:'',
            integerPortion && fractionalizeOptions.spaceBetweenIntegerAndFraction ? ' ':'',
            unicodeMap[denominator][numerator]
        ].join('');
    }

    return [
        integerPortion ? integerPortion:'',
        integerPortion && fractionalizeOptions.spaceBetweenIntegerAndFraction ? ' ':'',
        numerator,
        "/",
        denominator].join('');
}
