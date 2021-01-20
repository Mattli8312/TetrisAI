function Empty_tile(i,j){
    let tile = document.createElement('div')
    tile.style.background = "white"
    tile.style.border = "solid 2px black"
    tile.style.width = tile.style.height = tile_width;
    tile.setAttribute('id', i + ',' + j)
    tile.setAttribute('filled', "false")
    Grid.appendChild(tile)
}

function Render_Piece(){
    for(var a = 0; a < curr_piece.length; a++){
        for(var b = 0; b < curr_piece[a].length; b++){
            let tile = document.getElementById((a + curr_y) + ',' + (b + curr_x))
            if(tile != undefined && curr_piece[a][b]){
                tile.style.background = color
                tile.setAttribute('filled', "temp")
            }
            else if(tile != undefined && tile.getAttribute('filled') == "false"){
                tile.style.background = "white"
            }
        }
    }
}

function clear_Piece(){
    for(var a = 0; a < curr_piece.length; a++){
        for(var b = 0; b < curr_piece[a].length; b++){
            tile = document.getElementById((a + curr_y) + ',' + (b + curr_x))
            if(curr_piece[a][b]){
                tile.style.background = "white"
                tile.setAttribute('filled', "false")
            }
        }
    }
}

function Rotate_Piece(){
    let temp = selected < 3 ?( selected + 1) : 0 //Index pointing to future orientation
    let temp_grid = ref_piece[temp]
    for(var a = 0; a < temp_grid.length; a++){
        for(var b = 0; b < temp_grid[a].length; b++){
            if(temp_grid[a][b]){
                if(b+curr_x < 0 || b+curr_x > 9){
                    return 
                }
                else if(document.getElementById((a+curr_y)+','+(b+curr_x)).getAttribute('filled') == "true"){
                    return 
                }
            }
        }
    }
    selected = temp
}

function Shift_Piece(delta_x){
    for(var a = 0; a < curr_piece.length; a++){
        for(var b = 0; b < curr_piece[a].length; b++){
            if(curr_piece[a][b]){
                if(b+curr_x+delta_x < 0 || b+curr_x+delta_x > 9){
                    return 
                }
                else if(document.getElementById((a+curr_y)+','+(b+curr_x+delta_x)).getAttribute('filled') == "true"){
                    return 
                }
            }
        }
    }
    curr_x += delta_x
}

function Add_Piece(){
    for(var a = 0; a < curr_piece.length; a++){
        for(var b = 0; b < curr_piece[a].length; b++){
            tile = document.getElementById((a + curr_y) + ',' + (b + curr_x))
            if(curr_piece[a][b]){
                tile.setAttribute('filled', "true")
            }
        }
    }
}

function Collided(piece, x, y){
    for(var a = 0; a < piece.length; a++){
        for(var b = 0; b < piece[a].length; b++){
            tile = document.getElementById((a + y) + ',' + (b + x))
            if(piece[a][b]){
                if(a + y + 1 > 19 || document.getElementById((a + y + 1) + ',' + (b + x)).getAttribute('filled') == "true"){
                    Add_Piece()
                    return true;
                }
            }
        }
    }
    return false
}

function Clear_Row(i){
    for(var a = 0; a < 10; a++){
        let tile = document.getElementById(i + ',' + a)
        tile.setAttribute('filled', "false")
        tile.style.background = "white"
    }
}

function Fill_Row(i_o, i_f){
    //io is the initial y location, if is the final y location
    if(i_o != i_f){
        for(var a = 0; a < 10; a++){
            let tile_o = document.getElementById(i_o + ',' + a)
            let tile_f = document.getElementById(i_f + ',' + a)
            tile_f.style.background = tile_o.style.background 
            tile_f.setAttribute('filled', tile_o.getAttribute('filled'))
            tile_o.style.background = "white"
            tile_o.setAttribute('filled', 'false')
        }
    }
}

function Update_Board(){
    //Need to check if we can Actually Clear a row
    //Use a stack
    let uncleared_rows = []
    let cleared_rows = []
    for(var a = 19; a > -1; a--){   //Start at bottom row and work up
        let count = 0;
        for(var b = 0; b < 10; b++){
            if(document.getElementById(a + ',' + b).getAttribute('filled') == "true")
                count ++;
        }
        if(count == 10){
            cleared_rows.push(a)
        }
        else if(count > 0){
            uncleared_rows.push(a)
        }
        else{
            break;
        }
    }
    let row_counter = 1;
    while(cleared_rows.length){
        if(cleared_rows.length > 1 && cleared_rows[0]-cleared_rows[1] == 1)
            row_counter++
        else{
            switch(row_counter){
                case 1: 
                    score += 40
                    break
                case 2: 
                    score += 100
                    break
                case 3: 
                    score += 300
                    break
                case 4:
                    score += 1200
                    break
            }
        }
        Clear_Row(cleared_rows[cleared_rows.length-1])
        cleared_rows.pop()
    }
    let i = 19;
    while(uncleared_rows.length){
        Fill_Row(uncleared_rows[0],i)
        uncleared_rows.splice(0,1)
        i--
    }
}

function Drop_Piece(){
    let temp = curr_piece
    let temp_y = curr_y 
    while(!Collided(temp, curr_x, temp_y)){
        temp_y ++
    }
    clear_Piece()
    curr_y = temp_y 
}