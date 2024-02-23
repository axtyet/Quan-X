// JavaScript Document
var board = []; // 记录每个方块数字
var conflict = []; // 记录位置上方块是否叠加过
var score = 0; // 记录分数
var startX; // X轴触控起点
var startY; // Y轴触控起点
var endX; // X轴触控终点
var endY; // Y轴触控终点


$(document).ready(function () {
	loadImg(); // 预先加载图片
	prepareForMobile(); // 移动端的优化
	newgame();
});

function newgame() {
	//初始化
	init();
	//生成两个随机数字方块
	generateOneNumber();
	generateOneNumber();
}

function prepareForMobile() {
	// 自适应大小
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	$('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('padding', cellSpace);
	$('#grid-container').css('border-radius', 0.02 * gridContainerWidth);
	$('.grid-cell').css('width', cellSideLength);
	$('.grid-cell').css('height', cellSideLength);
	$('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css("top", getPosTop(i, j));
			gridCell.css("left", getPosLeft(i, j));
		}
	}
	for (var i = 0; i < 4; i++) {
		board[i] = [];
		conflict[i] = [];
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			conflict[i][j] = false;
		}
	}
	// 更新数字方块
	score = 0;
	updateBoardView();
	// 去除游戏结束后的效果
	$("#game-over").css('display', 'none');
	$("#game-over").css('width', gridContainerWidth - 2 * cellSpace);
	$("#game-over").css('height', gridContainerWidth - 2 * cellSpace);

}

function updateBoardView() {
	// 去除所有数字方块
	$(".number-cell").remove();
	// 更新得分
	$("#score").text(score);
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumberCell = $("#number-cell-" + i + "-" + j);
			if (board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', (getPosTop(i, j) + cellSideLength / 2) + 'px');
				theNumberCell.css('left', (getPosLeft(i, j) + cellSideLength / 2) + 'px');
			} else {
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				//theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				//theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.append('<img src="picture/' + board[i][j] + '.jpg" class="img" >');
			}
			conflict[i][j] = false;
		}
	}
}

//产生随机数字
function generateOneNumber() {
	var timer; // 计数器
	if (noSpace()) { // 是否还有空间
		return false;
	}
	//随机位置
	var randX = parseInt(Math.floor(Math.random() * 4));
	var randY = parseInt(Math.floor(Math.random() * 4));
	for (timer = 0; timer < 50; timer++) {
		if (board[randX][randY] === 0) {
			break;
		}
		randX = parseInt(Math.floor(Math.random() * 4));
		randY = parseInt(Math.floor(Math.random() * 4));
	}
	// 没有找到随机位置情况下
	if (timer == 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randX = i;
					randY = j;
				}
			}
		}
	}
	//展示生成的随机
	var randNumber = Math.random() > 0.5 ? 2 : 4;
	board[randX][randY] = randNumber;
	showNumberWithAnimation(randX, randY, randNumber);
}

$(document).keydown(function (event) {
	event.preventDefault();
	switch (event.keyCode) {
		case 37: // left
			if (moveLeft()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 38: // up
			if (moveUp()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 39: // right
			if (moveRight()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 40: // down
			if (moveDown()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		default:
			break;
	}
});

function moveLeft() {
	//可否左移
	if (!canMoveLeft()) {
		return false;
	}
	//向左移动
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i, k, j)) {
						moveWithAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j) && conflict[i][k] == false) {
						moveWithAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						conflict[i][k] = true; // 该位置不允许放置
						score += board[i][k]; // 更新分数
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveUp() {
	//可否上移
	if (!canMoveUp()) {
		return false;
	}
	//向上移动
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && noBlockVerticle(j, k, i)) {
						moveWithAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && noBlockVerticle(j, k, i) && conflict[k][j] == false) {
						moveWithAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						conflict[k][j] = true; //该位置不允许放置
						score += board[k][j];
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveRight() {
	//可否右移
	if (!canMoveRight()) {
		return false;
	}
	//向右移动
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && noBlockHorizontal(i, j, k)) {
						moveWithAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k) && !conflict[i][k]) {
						moveWithAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						conflict[i][k] = true; //该位置不允许放置
						score += board[i][k];
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveDown() {
	//可否下移
	if (!canMoveDown()) {
		return false;
	}
	//向下移动
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 && noBlockVerticle(j, i, k)) {
						moveWithAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && noBlockVerticle(j, i, k) && !conflict[k][j]) {
						moveWithAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						conflict[k][j] = true; //该位置不允许放置
						score += board[k][j];
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function isgameover() {
	if (noSpace() && noMove()) {
		gameOver();
	}
}

function gameOver() {
	alert("Game Over");
	$("#game-over").css('display', 'block');
}

document.addEventListener("touchstart", function (event) {
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
})
document.addEventListener("touchend", function (event) {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var deltaX = endX - startX;
	var deltaY = endY - startY;

	if (Math.abs(deltaX) > Math.abs(deltaY)) {
		//operation is in X
		if (deltaX > 0) {
			//move right
			if (moveRight()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		} else {
			//move left
			if (moveLeft()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		}
	} else {
		//operation is in Y
		if (deltaY > 0) {
			//move down
			if (moveDown()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		} else {
			//move up
			if (moveUp()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		}
	}
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
