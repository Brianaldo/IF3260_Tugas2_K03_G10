function initBuffer(gl, data){
    const { vertices, indices, faceColors } = data;
    // Buat verticesnya
    const verticesBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    // Buat index
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices), gl.STATIC_DRAW);

    // Buat colors
    let colors = [];
    const color = document.getElementById("color-picker").value;
    for (let j = 0; j < faceColors.length; ++j) {
        const c = rgbToArray(color);

        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c);
    }
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return {
        vertices: verticesBuffer,
        indices: indexBuffer,
        colors: colorBuffer,
    };
}

function rgbToArray(rgbString) {
    rgbString = rgbString.substring(1);
  
    var red = parseInt(rgbString.substring(0, 2), 16) / 255;
    var green = parseInt(rgbString.substring(2, 4), 16) / 255;
    var blue = parseInt(rgbString.substring(4, 6), 16) / 255;
  
    return [red, green, blue, 1];
} 
