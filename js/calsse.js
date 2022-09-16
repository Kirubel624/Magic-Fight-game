class Sprite{
    constructor({position,imageSrc}){
      this.position=position
      this.height=150
      this.width=50
      this.image=new Image()
      this.image.src=imageSrc
    
 

    }
    draw(){
      c.drawImage(this.image, this.position.x, this.position.y)
    
       
    }
    update(){
        this.draw()
     

        
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
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
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