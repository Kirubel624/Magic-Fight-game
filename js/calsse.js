class Sprite{
    constructor({position,imageSrc,scale=1,framesMax=1}){
      this.position=position
      this.height=150
      this.width=50
      this.image=new Image()
      this.image.src=imageSrc
      this.scale=scale
      this.framesMax=framesMax
      this.frameCurrent=0
      this.framesElapsed=0
      this.frameHold=10
    }
    draw(){
      c.drawImage(
        this.image,
        this.frameCurrent*(this.image.width/this.framesMax),
        0,
        this.image.width/this.framesMax,
        this.image.height,
         this.position.x, 
         this.position.y,
         (this.image.width/this.framesMax)*this.scale,
         this.image.height*this.scale
         )
    
       
    }
    update(){
        this.draw()
        this.framesElapsed++
        if(this.framesElapsed%this.frameHold==0){
        if(this.frameCurrent<this.framesMax-1){
          this.frameCurrent++

        }else{
          this.frameCurrent=0
        }

      }  
    }

}
class Fighter{
    constructor({position,velocity,color='red',offset}){
      this.position=position
      this.velocity=velocity
      this.height=150
      this.width=50
      this.lastKey
      this.attakBox={
        position: {
        x:this.position.x,
        y:this.position.y
    },
    offset,
        width: 100,
        height: 50
      }
      this.color=color
      this.isAttacking
      this.health=100
    }
    draw(){
        c.fillStyle=this.color
        c.fillRect(this.position.x, this.position.y,this.width,this.height)

        if(this.isAttacking){
            c.fillStyle='green'

            c.fillRect(
                this.attakBox.position.x,
                this.attakBox.position.y,
                this.attakBox.width,
                this.attakBox.height
                )
        }
       
    }
    update(){
        this.draw()
      this.attakBox.position.x=this.position.x + this.attakBox.offset.x
      this.attakBox.position.y=this.position.y  
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height-96){
this.velocity.y = 0
        }else this.velocity.y+=gravity 

        
    }
    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking=false
        }, 100)
    }
}