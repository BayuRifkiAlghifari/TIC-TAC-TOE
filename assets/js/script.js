/*!
* 	
*	Corona Game
*	Author : Bayu Rifki Alghifari
*
*/


/*
*	Variable Declaration
*/
WINNING 	= [
	[0, 1, 2, 3],
	[0, 6, 12, 18],
	[4, 5, 6, 7],
	[8, 9, 10, 11],
	[12, 13, 14, 15],
	[16, 17, 18, 19],
	[20, 21, 22, 23],
	[1, 4, 7, 10],
	[2, 5, 8, 11],
	[0, 4, 8, 11],
	[2, 4, 6, 8],
]

_CORONA 	= 'corona'
_PLAYER 	= 'player'
turn 		= ''
cell 		= document.querySelectorAll('[data-cell]')
board 		= document.getElementById('board')
message 	= document.getElementById('message')
data_msg 	= document.getElementById('message-data')

cell.forEach(cell =>
{
	/*
	*	
	*	Setting Up Cell Becomes Clickable Only Once
	*	
	*/

	cell.addEventListener('click', click, { once: true })
})


/*
*	Handle Click Action
*/
function click(ev)
{
	target 		= ev.target
	curentTurn 	= turn ? _CORONA : _PLAYER

	/*
	*	Set a Mark
	*/
	if(board.classList.toString().includes('disable') != true)
	{
		curentTurn = _PLAYER
		setMark(target, curentTurn)
	}

	/*
	*	Cek Win
	*/	

	if(checkWin(curentTurn))
	{
		/*
		*	End Game
		*/			
		endGame(curentTurn)
	}

	/*
	*	Switch Turn
	*/

	swapTurn()
}


/*
*	Handle Set a Mark Action
*/
function setMark(target, curentTurn)
{
	target.classList.add(curentTurn)
}


/*
*	Handle Switch Turn
*/
function swapTurn()
{
	turn 	= _CORONA
	/*
	*	Change Mark Hover On Board
	*/
	board.classList.remove(_PLAYER)
	board.classList.remove(_CORONA)
	if(turn)
	{
		board.classList.add(_CORONA)

		/*
		*	Bot Click
		*/
		interval = setInterval(clickBot, 500)
	}
	else
	{
		board.classList.add(_PLAYER)
	}
}


/*
* Cek Win
*/
function checkWin(turn)
{
	return WINNING.some(combine =>
	{
		return combine.every(index =>
		{
			return cell[index].classList.contains(turn)
		})
	})
}


/*
*	End Game
*/
function endGame(turn = null)
{
	if(turn != null)
	{
		/*
		*	Player Win
		*/
		if(turn == _PLAYER)
		{
			data_msg.innerHTML 	= 'Selamat, kamu berhasil mengalahkan virus corona'
			message.classList.add('show')
		}
		/*
		*	Corona Win
		*/
		else
		{
			data_msg.innerHTML 	= 'Yah, kamu belum berhasil. Coba kembali untuk meraih kemenangan dan akhiri pandemi ini!'
			message.classList.add('show')	
		}
	}
}

/*
*	Restart The Game
*/
function restart()
{
	board.classList.remove(_PLAYER)
	board.classList.remove(_CORONA)
	board.classList.add(_PLAYER)

	message.classList.remove('show')

	cell.forEach(cell =>
	{
		/*
		*	
		*	Clear Cell
		*	
		*/

		cell.classList.remove(_PLAYER)
		cell.classList.remove(_CORONA)
	})
}


/*
*	Click Bot
*/
function clickBot()
{
	board.classList.add('disable')

	cell[Math.floor(Math.random() * cell.length)].classList.add(_CORONA)

	clearInterval(interval)

	board.classList.remove('disable')
	board.classList.remove(_PLAYER)
	board.classList.remove(_CORONA)
	board.classList.add(_PLAYER)
}