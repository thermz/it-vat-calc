#!/usr/bin/node

const args = process.argv.slice(2);

taxBrackets=[
        {
                mult: 0.23,
                lowerBound: 0,
		upperBound: 15000
        },
        {
                mult: 0.25,
		lowerBound: 15000,
                upperBound: 28000
        },
        {
                mult: 0.35,
		lowerBound: 28000,
                upperBound: 50000

        },
        {
                mult: 0.43,
		lowerBound: 50000,
                upperBound: Infinity

        }
];

function calculateTaxes( income ){
	console.log("Income is "+income);
	remaining = income;
	taxes = taxBrackets.map( b => {
		bracketAmount = b.upperBound - b.lowerBound;
		//console.log("bracketAmount is "+bracketAmount + " remaining is "+remaining);
		if(bracketAmount > remaining){
			actualBracket = remaining;
			//console.log("Last remaining is "+remaining);
			remaining = 0;
		} else {
			actualBracket = bracketAmount;
			remaining -= bracketAmount
		}
		//console.log("upperBound is "+b.upperBound);
		//console.log("actualBracket is "+actualBracket);
		tax = actualBracket * b.mult;
		return tax;
	} );
	
	return taxes.reduce( (val1, val2) => {
		return val1+val2;
	}, 0);
	
}

taxes = calculateTaxes( args[0] );

console.log("Total amount of taxes are: "+taxes);
console.log("Net income amount is "+ (args[0] - taxes) );
