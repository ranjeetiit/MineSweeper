var Utils = (function () {
	function _make2DArray (rows, cols, numOfbombs){
	/*	var arr = Array(rows)
				.fill(0)
				.map(function(ele, idx){
					return Array(cols)
						.fill(
							{
								isRevealed : false,
								isBomb : false
							}
						);
				});
	*/

		var arr = [];

		for(var i =0 ; i < rows ; i++){
			arr.push([]);
			arr[i].push( new Array(cols));
			for(var j=0; j < cols; j++){
				 arr[i][j] = {
					isRevealed : false,
					isBomb : false
				};  
			}
		}


		var bombPos = selectRandomBomPos(numOfbombs, rows, cols);
		bombPos.forEach(function(ele){
			arr[ele[0]][ele[1]].isBomb = true;
		})
		return arr;
	}

	function selectRandomBomPos (numOfbombs , rows, cols){
		var options =[]
		for(var i =0 ; i < rows ; i++){
			for(var j=0; j < cols; j++){
				options.push([i,j]) 
			}
		}

		var bompPos = [];
		var rand;
		for(var i =0 ; i < numOfbombs; i++){
			rand = getRandomNumBetween(0 , options.length-1);
			bompPos.push(options[rand]);
			options.splice(rand,1);
		}

		return bompPos;
	}

	function getRandomNumBetween (min , max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		make2DArray : _make2DArray
	}
})();