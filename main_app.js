const Grid = document.getElementById('grid')
const tile_width = innerHeight * 0.8 * 0.05

let ticks = 48, layers = 10;
let selected = 0, cleared = 0;
let curr_piece, ref_piece;
let held_piece, next_piece;
let color, next_color;
let held_color;
let curr_x, curr_y
let score, game_status = 0


function initialize_grid(){
    score = 0;
    Grid.style.width = tile_width * 10;
    Grid.style.height = innerHeight * 0.8
    for(var a = 0; a < 20; a++){
        for(var b = 0; b < 10; b++){
            Empty_tile(a,b,'grid')
        }
    }
    //Render the held section
    for(var a = 0; a < 4; a++){
        for(var b = 0; b < 4; b++){
            Empty_tile('h'+a,b,'held')
            Empty_tile('n'+a,b,'next')
        }
    }
    document.getElementById('held').style.width = tile_width*4;
    document.getElementById('next').style.width = tile_width*4;
}
function clear_grid(){
    let parent = document.getElementById('grid')
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
    parent = document.getElementById('held')
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
    parent = document.getElementById('next')
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}
function new_game(){
    game_status = 1;
    score = 0;
    document.getElementById('held').setAttribute('helded', 'false')
    clear_grid()
    initialize_grid()
    New_Piece()
    Update_Pieces()
    New_Piece()
    New_Score()
    Render_Piece()
}

new_game()

window.addEventListener('keydown', function(e){
    if(!Collided(curr_piece,curr_x,curr_y)){
        clear_Piece()
    }
    else {
        document.getElementById('held').setAttribute('helded', 'false')
        Update_Board()
        Update_Pieces()
        New_Piece()
        New_Score()
        if(Collided(curr_piece, curr_x, curr_y)){
            game_status = 2
        }
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
        case "d":
            Drop_Piece()
            break;
        case "s":
            if(document.getElementById('held').getAttribute('helded') == "false"){
                Hold_Piece()
                document.getElementById('held').setAttribute('helded', 'true')
            }
            break;
        case "p":
            new_game()
            break;
    }
    curr_piece = ref_piece[selected]
    Render_Piece()
})

setInterval(function(){
    if(game_status == 1){
        if(!Collided(curr_piece,curr_x,curr_y)){ 
            clear_Piece()
            curr_y ++
        }
        else {
            document.getElementById('held').setAttribute('helded', 'false')
            Update_Board()
            Update_Pieces()
            New_Piece()
            New_Score()
            if(Collided(curr_piece, curr_x, curr_y)){
                game_status = 2
            }
        }
        Render_Piece()
    }
},Math.floor(ticks/60*1000))