var MineSweeper = (function(){
	
	function _init(){
		drawBoard();
	}

	function drawBoard(){
		document.getElementById("container").innerHTML = "";

		var rows = Constants.numOfRows,
			cols = Constants.numOfColumns,
			cellW = Constants.cellWidth,
			cellH = Constants.cellHeight;

		var puzzleContainerWidth = cols * cellW,
			puzzleContainerHeight = rows * cellH;

		var puzzleContainer = document.createElement('div');
			puzzleContainer.id= "puzzle";
			puzzleContainer.classList.add("puzzleContainer");
			puzzleContainer.style.width = puzzleContainerWidth + 'px';
			puzzleContainer.style.height = puzzleContainerHeight + 'px'; 
		document.getElementById("container").appendChild(puzzleContainer);

		puzzleContainer.addEventListener("click" , function(e){
			var $target =  e.target;

			if(isCellHasBomb($target)){
				var cellHavingBomb = getCellContaingBombs();
				cellHavingBomb.forEach(function(ele){
					ele.classList.add("bomb");
				})
				alert("you lost the game")
				return;
			}
			revealCell($target);
		});

		drawGrid(rows, cols, cellW, cellH);
	}

	function drawGrid(rows, cols, w, h){
		var puzzleContainer = document.getElementById("puzzle"),
			documentFragment = document.createDocumentFragment(),
			id,
			numOfBombs = Constants.numberOfBombs,
			randomBombPosArr = Utils.make2DArray(rows, cols, numOfBombs);
		var val , isBomb = false , isRevealed = false;
		for(var i=0;i<rows;i++){
			for(j =0; j < cols ; j++){
				id = "cell_"+ i + "_" + j;
				val = randomBombPosArr[i][j].isBomb ? 1 : 0;
				isBomb = randomBombPosArr[i][j].isBomb;
				isRevealed = randomBombPosArr[i][j].isRevealed;
				documentFragment.appendChild( createCell(id, w, h, val, isBomb ,isRevealed));
			}
		}
		puzzleContainer.appendChild(documentFragment);
	}

	function createCell (id, w , h, val ,isBomb , isRevealed){
		var cell ;
			cell = document.createElement('div');
			cell.classList.add("cell");
			cell.style.width = w + 'px';
			cell.style.height = h + 'px';
			if(isRevealed){
				cell.innerHTML = val;
				cell.classList.add("revealed");	
			}
			cell.setAttribute("isBomb" , isBomb ? "true":"");
			// if(isBomb){
			// 	cell.classList.add("bomb");	
			// }
			cell.setAttribute("isRevealed" , isRevealed ? "true" : "")
			cell.id = id;
		return cell;
	}

	function isCellHasBomb(cell){
		return cell.getAttribute("isBomb") == "true";
	}

	function isCellRevealed (cell){
		return cell.getAttribute("isrevealed") == "true";
	}

	function getCell(row, col){
		return document.getElementById('cell_'+row+'_'+col);
	}

	function revealCell(cell){
		if (isCellRevealed(cell)) {
			return;
		}
		cell.classList.add("revealed");
		cell.setAttribute("isrevealed" ,true);

		var adjacentCells = getAdjacentUnrevealedCell(cell);

		var numCellHavBombs = 0;
		adjacentCells.forEach(function(ele){
			if(isCellHasBomb(ele)){
				numCellHavBombs ++;
			}
		});

		if(numCellHavBombs){
			cell.innerHTML = numCellHavBombs;
			if(checkWin()){
				alert("you won")
			}
			return;
		}

		adjacentCells.forEach(function(ele){
			if(!isCellHasBomb(ele)){
				revealCell(ele);	
			}
		})
	}

	function checkWin(){
		var revealedCells = getAllRevealedCell();
		var rows = Constants.numOfRows,
			cols = Constants.numOfColumns,
			numOfBombs = Constants.numberOfBombs,
			totalCellWithoutBomb = rows * cols - numOfBombs;

		return totalCellWithoutBomb <= revealedCells.length;
	}

	function getAdjacentUnrevealedCell(cell){
		var id = cell.id;
		var arr= id.split("_");
		var row = parseInt(arr[1]), col = parseInt(arr[2]);
		var neighbour = [] , cell;
		
		for(i = row - 1 ; i <= (row+1) ; i ++){
			for(j = col - 1 ; j <=(col+1) ; j ++){
				cell =  getCell(i,j);
				if(cell && !isCellRevealed(cell)){
					neighbour.push(cell);
				}
			}
		}

		return neighbour;
	}

	function getAllRevealedCell(){
		var arr = [];
		var rows = Constants.numOfRows,
			cols = Constants.numOfColumns;

		for(var i =0 ; i < rows ; i++){
			for(var j=0; j < cols; j++){
				cell =  getCell(i,j);
				if(cell && isCellRevealed(cell)){
					arr.push(cell);
				}
			}
		}

		return arr;
	}

	function getCellContaingBombs(){
		var arr = [];
		var rows = Constants.numOfRows,
			cols = Constants.numOfColumns;

		for(var i =0 ; i < rows ; i++){
			for(var j=0; j < cols; j++){
				cell =  getCell(i,j);
				if(cell && isCellHasBomb(cell)){
					arr.push(cell);
				}
			}
		}

		return arr;
	}

	return {
		start : _init
	} 
})();

MineSweeper.start();