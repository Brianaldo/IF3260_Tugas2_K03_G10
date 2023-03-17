class Model{
    constructor(
        type= "",
        vertices = [],
        vertexCount = 0,
        angle = 0,
        indices = [],
        faceColors = [[0.0, 1.0, 0.0, 1.0],
                    [0.0, 1.0, 0.0, 1.0],
                    [0.0, 1.0, 0.0, 1.0],   
                    [0.0, 1.0, 0.0, 1.0]]   
    ){
        this.type = type;
        this.vertices = vertices;
        this.indices = indices;
        this.vertexCount = vertexCount;
        this.faceColors = faceColors;
        this.angle = angle;
    }

    checkVertex(x,y){
        
    }

    isClicked(x,y){

    }

    rotation(x,y,z){
        Matrix.rotate(this.vertices, this.angle, x, y,z);
    }

    scale(x,y,z){
        Matrix.scale(this.vertices, x,y,z);
    }

    translation(x,y,z){
        Matrix.translate(this.vertices,x,y,z);
    }

    projection(type){
        if(type=="OBLQ"){
            Matrix.oblique
        }else if(type=="PRSPTV"){

        }else{

        }
    }

    RadiusCamera(value){

    }

    AngleCamera(value){

    }

    shadingActivater(isShadingOn){

    }

    idleAnimation(isIdleAnimationOn){

    }
}