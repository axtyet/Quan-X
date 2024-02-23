// JavaScript Document
var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
	return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft(i, j) {
	return cellSpace + j * (cellSideLength + cellSpace);
}

function noSpace() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) return false;
		}
	}
	return true;
}

function getNumberBackgroundColor(num) {
	switch (num) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
		case 16384:
			return "#7906b3";
			break;
	}
}

function getNumberColor(num) {
	if (num <= 4) {
		return "#000";
	} else {
		return "#fff"
	}
}

function canMoveLeft() {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp() {
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (board[i][j] != 0) {
				if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row, col1, col2) {
	for (var i = col1 + 1; i < col2; i++)
		if (board[row][i] != 0)
			return false;
	return true;
}

function noBlockVerticle(col, row1, row2) {
	for (var i = row1 + 1; i < row2; i++)
		if (board[i][col] != 0)
			return false;
	return true;
}

function noMove() {
	if (canMoveDown() ||
		canMoveLeft() ||
		canMoveRight() ||
		canMoveUp()) {
		return false;
	} else {
		return true;
	}
}

function loadImg() {
	var img = [];
	for (var i = 2; i < 16385; i = 2 * i) {
		img[i] = new Image();
		img[i].src = 'picture/' + i + '.jpg';
	}
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
