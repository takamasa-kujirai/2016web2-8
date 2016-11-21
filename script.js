onload = function(){
    var canvas = document.getElementById('canvas');
    canvas.width = 500;
    canvas.height = 300;
    
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};


var m = new matIV();
var wMatrix = m.identity(m.create());
var vMatrix = m.identity(m.create());
var pMatrix = m.identity(m.create());
var vpMatrix = m.identity(m.create());
var wvpMatrix = m.identity(m.create());

m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0], vMatrix);
m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);
m.multiply(pMatrix, vMatrix, vpMatrix);

var rad = (count % 360) * Math.PI / 180;

m.identity(wMatrix);
m.translate(wMatrix, [1.0, -1.0, 0.0], wMatrix);
m.rotate(wMatrix, rad, [0, 1, 0], wMatrix);

m.multiply(vpMatrix, wMatrix, wvpMatrix);
gl.uniformMatrix4fv(uniLocation, false, wvpMatrix);
gl.drawArrays(gl.TRIANGLES, 0, 3);
