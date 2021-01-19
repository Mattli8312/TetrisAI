const Grid = document.getElementById('grid')
const tile_width = innerHeight * 0.045

let selected = 0
let curr_piece;
let ref_piece;
let color;
let curr_x = curr_y = 0

function New_Piece(){
    switch(Math.floor(Math.random() * 3)){
        case 0:
            curr_piece = I_piece[selected]
            ref_piece = I_piece
            color = "cyan"
            break;
        case 1:
            curr_piece = J_piece[selected]
            ref_piece = J_piece
            color = "blue"
            break;
        case 2:
            curr_piece = L_piece[selected]
            ref_piece = L_piece 
            color = "orange"
    }
}

initialize_grid()
New_Piece()
Render_Piece()

window.addEventListener('keydown', function(e){
    if(!Collided(curr_piece,curr_x,curr_y)){
        clear_Piece()
    }
    else {
        Update_Board()
        New_Piece()
        curr_y = 0
        curr_x = 4
    }
    switch(e.key){
        case "ArrowUp": 
            Rotate_Piece()
            break 
        case "ArrowDown":
            curr_y ++
            break 
        case "ArrowRight":
            Shift_Piece(1)
            break 
        case "ArrowLeft":
            Shift_Piece(-1)
            break
    }
    curr_piece = ref_piece[selected]
    Render_Piece()
})

/*setInterval(function(){
    if(!Collided(curr_piece,curr_x,curr_y))
        clear_Piece()
    else 
        curr_y = 0
    curr_y ++
    Render_Piece()
},500)*/