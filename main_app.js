const Grid = document.getElementById('grid')
const tile_width = innerHeight * 0.8 * 0.05

let selected = 0
let curr_piece;
let ref_piece;
let color;
let curr_x, curr_y
let score;


function New_Piece(){
    switch(Math.floor(Math.random() * 3)){
        case 0:
            curr_piece = I_piece[selected]
            ref_piece = I_piece
            color = "#1CB5F5"
            break;
        case 1:
            curr_piece = J_piece[selected]
            ref_piece = J_piece
            color = "#0750FE"
            break;
        case 2:
            curr_piece = L_piece[selected]
            ref_piece = L_piece 
            color = "#FE7007"
    }
    curr_y = 0
    curr_x = 4
}
function New_Score(){
    let element = document.getElementById("Score")
    element.innerHTML = "Score: " + score
}
function initialize_grid(){
    score = 0;
    Grid.style.width = tile_width * 10;
    Grid.style.height = innerHeight * 0.8
    for(var a = 0; a < 20; a++){
        for(var b = 0; b < 10; b++){
            Empty_tile(a,b)
        }
    }
}

initialize_grid()
New_Piece()
New_Score()
Render_Piece()

window.addEventListener('keydown', function(e){
    if(!Collided(curr_piece,curr_x,curr_y)){
        clear_Piece()
    }
    else {
        Update_Board()
        New_Piece()
        New_Score()
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
        case "f":
            Drop_Piece()
            break;
    }
    curr_piece = ref_piece[selected]
    Render_Piece()
})

/*setInterval(function(){
    if(!Collided(curr_piece,curr_x,curr_y))
        clear_Piece()
    else {
        Update_Board()
        New_Piece()
        New_Score()
    }
    curr_y ++
    Render_Piece()
},500)*/