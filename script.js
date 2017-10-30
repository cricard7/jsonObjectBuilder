(function () {


	var DBExport = {

		tbl1: [
			{
				indID: 1,
				indTitle: "indication one",
				Criteria: "<em>Criteria one</em>"
			},
			{
				indID: 2,
				indTitle: "indication two",
				Criteria: "<em>Criteria two</em>"
			},
			{
				indID: 3,
				indTitle: "indication three",
				Criteria: "<em>Criteria three</em>"
			},
			{
				indID: 4,
				indTitle: "indication four",
				Criteria: "<em>Criteria four</em>"
			}

		],

		tbl2: [
			{
				drugID: 1,
				drugName: "drugOne",
				drugInfo: "infoOne"

			},
			{
				drugID: 2,
				drugName: "drugTwo",
				drugInfo: "infoTwi"

			},
			{
				drugID: 3,
				drugName: "drugThree",
				drugInfo: "infoThree"

			}

		],

		tbl3: [
			{
				indID: 1,
				drugID: 3
			},
			{
				indID: 1,
				drugID: 2
			},
			{
				indID: 2,
				drugID: 1
			},
			{
				indID: 3,
				drugID: 3
			},
			{
				indID: 4,
				drugID: 1
			},
			{
				indID: 4,
				drugID: 2
			},
			{
				indID: 4,
				drugID: 3
			}
		],

		tbl4: [
			{
				brandID: 1,
				drugName: "genericOne",
				brandName: "brandOne"
			},
			{
				brandID: 2,
				drugName: "generictwo",
				brandName: "brandtwo"
			},
			{
				brandID: 3,
				drugName: "genericthree",
				brandName: "brandthree"
			},
			{
				brandID: 4,
				drugName: "genericFour",
				brandName: "brandFour"
			},
			{
				brandID: 5,
				drugName: "genericFive",
				brandName: "brandFive"
			}

		],

		tbl5: [
			{
				drugID: 1,
				brandID: 1
			},
			{
				drugID: 1,
				brandID: 2
			},
			{
				drugID: 1,
				brandID: 3
			},
			{
				drugID: 2,
				brandID: 4
			},
			{
				drugID: 3,
				brandID: 5
			}

		]


	}




	// with tbl1 : add a objarray property to each object called drugs with the info from tbl2 and tbl3

	var combineInfoTwo = function (tblInfo) {


		var jxnTbl = tblInfo.jxnTbl;
		var tblOne = tblInfo.tblOne;
		var tblTwo = tblInfo.tblTwo;
		var tblOneIndex = tblInfo.tblOneIndex;
		var tblTwoIndex = tblInfo.tblTwoIndex;
		var propertyName = tblInfo.propertyName;


		console.log(tblInfo);

		tblOne.forEach(function (item) {

			item[propertyName] = [];
			// for each time tblOneIndex is found on jxnTbl, use the value from tblTwoIndex to find the corresponding object on tblTwo

			// get the index number from item
			var currentIndex = item[tblOneIndex];

			// for the current index, get all corresponding tblTwoIndex values on tblJxn. Array returned

			var jxnTblRefVals = jxnTblLookup(currentIndex, jxnTbl, tblOneIndex, tblTwoIndex);

			// with jxnTblRefVals find corresponding object(s) in tblTwo. For each, append key value to current item.

			appendTblTwoProps(item, jxnTblRefVals, tblTwo, tblTwoIndex, propertyName);


		});

		console.log(tblInfo);
	}



	function jxnTblLookup(currentIndex, jxnTbl, tblOneIndex, tblTwoIndex) {

		// loop through jxnTbl. Return all tblTwoIndex values matching the currentIndex value.

		var returnIndex = [];

		for (var i = 0, j = jxnTbl.length; i < j; i++) {

			if (jxnTbl[i][tblOneIndex] === currentIndex) {

				returnIndex.push(jxnTbl[i][tblTwoIndex]);

			}
		}

		return returnIndex;
	}





	function appendTblTwoProps(item, jxnTblRefVals, tblTwo, tblTwoIndex, propertyName) {


		//get all keys from tblTwo object
		var tblTwoKeys = Object.keys(tblTwo[0]);
		console.log(tblTwoKeys);

		//loop through all values in jxnTblRefVals. For each number, find the corresponding object in tblTwo with the matching tblTwoIndex property. Add all of this objects properties to the item object with the key "propertyName"



		for (i = 0, j = jxnTblRefVals.length; i < j; i++) {

			for (k = 0, l = tblTwo.length; k < l; k++) {

				if (tblTwo[k][tblTwoIndex] === jxnTblRefVals[i]) {
					// add all properties from tblTwo to item[propertyName]

					appendProperty(item, tblTwoKeys, tblTwo, propertyName);

				}
			}
		}
	}

	function appendProperty(item, tblTwoKeys, tblTwo, propertyName) {

		var tempObj = {};
		item[propertyName].push(tempObj);
		for (m = 0, n = tblTwoKeys.length; m < n; m++) {

			tempObj[tblTwoKeys[m]] = tblTwo[k][tblTwoKeys[m]];

			
		}
	}

	
		combineInfoTwo({
		tblOne: DBExport.tbl2,
		tblOneIndex: "drugID",
		tblTwo: DBExport.tbl4,
		tblTwoIndex: "brandID",
		jxnTbl: DBExport.tbl5,
		propertyName: "brandInfo"
	});
	
	

	combineInfoTwo({
		tblOne: DBExport.tbl1,
		tblOneIndex: "indID",
		tblTwo: DBExport.tbl2,
		tblTwoIndex: "drugID",
		jxnTbl: DBExport.tbl3,
		propertyName: "drugInfo"
	});


	


}());
