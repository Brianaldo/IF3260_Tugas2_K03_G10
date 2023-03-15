class Model{
    constructor(
        type= "",
        vertices = [],
        vertexCount = 0,
        indices = [],
        faceColor = [[0.0, 1.0, 0.0, 1.0],
                    [0.0, 1.0, 0.0, 1.0],
                    [0.0, 1.0, 0.0, 1.0],   
                    [0.0, 1.0, 0.0, 1.0]]   
    ){
        this.type = type;
        this.vertices = vertices;
        this.indices = indices;
        this.vertexCount = vertexCount;
        this.faceColor = faceColor;
    }

    checkVertex(x,y){
        
    }

    isClicked(x,y){

    }

    rotation(x,y,z){

    }

    scale(x,y,z){

    }

    translation(x,y,z){

    }

    projection(type){

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