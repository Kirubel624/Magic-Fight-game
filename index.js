const canvas=document.querySelector('canvas');
const c= canvas.getContext('2d');

canvas.width=1024;
canvas.height=576

c.fillRect(0,0,canvas.width, canvas.height)
const gravity=0.7
const background =new Sprite({
    position:{
x:0,
y:0
    },
    imageSrc:'./background.png'
})
const shop =new Sprite({
    position:{
x:600,
y:128
    },
    imageSrc:'./oak_woods_v1.0/decorations/shop_anim.png',
    scale:2.75,
    framesMax:6,
   
})
const player=new Fighter({
    position:{
   x:70,
   y:0
},
velocity:{
    x:0,
    y:0
},
offset:{
    x:0,
    y:0
},
imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Idle.png',
framesMax:8,
scale:2.8,
offset: {
    x:215,
    y:135
},
sprites:{
idle:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Idle.png',
    framesMax:10
},  
run:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Run.png',
    framesMax:8,
}, 
jump:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Jump.png',
    framesMax:3,
},
fall:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Fall.png',
    framesMax:3,
},
attack1:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Attack3.png',
    framesMax:8,
},
takeHit:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Take hit.png',
    framesMax:3,
},
death:{
    imageSrc:'./character_assets/Fantasy Warrior/Fantasy Warrior/Sprites/Death.png',
    framesMax:7,
}
},
attakBox:{
    offset: {
        x:100,
        y:50
    },
    width:160,
    height:50
}

})
const enemy=new Fighter({
    position:{
   x:900,
   y:100
},
velocity:{
    x:0,
    y:0
},
color: "blue",
offset:{
    x:-50,
    y:0
},
imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Idle.png',
framesMax:8,
scale:2.3,
offset: {
    x:265,
    y:235
},
sprites:{
idle:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Idle.png',
    framesMax:8
},  
run:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Run.png',
    framesMax:8,
}, 
jump:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Jump.png',
    framesMax:2,
},
fall:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Fall.png',
    framesMax:2,
},
attack1:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Attack1.png',
    framesMax:8,
},
takeHit:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Take hit.png',
    framesMax:3
},
death:{
    imageSrc:'./character_assets/EVil_Wizard_2/Sprites/Death.png',
    framesMax:7,
}
},
attakBox:{
    offset: {
        x:-230,
        y:50
    },
    width:230,
    height:50
}
})


// enemy.draw()
const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false

    },
    ArrowRight:{
        pressed:false

    }
}

decreaseTimer();
function animate(){
window.requestAnimationFrame(animate)
c.fillStyle="black"
c.fillRect(0,0,canvas.width,canvas.height)
background.update();
shop.update();
c.fillStyle='rgba(255,255,255,0.15)'
c.fillRect(0,0,canvas.width,canvas.height)
player.update()
enemy.update()
player.velocity.x=0
enemy.velocity.x=0
//player movt
// player.image=player.sprites.idle.image
// player.framesMax=8
if(keys.a.pressed&&player.lastKey==='a'){
    player.velocity.x=-5
    player.switchSprite('run')
}else if(keys.d.pressed&&player.lastKey==='d'){
    player.velocity.x=5
    player.switchSprite('run')

}else{
player.switchSprite('idle')

}
if(player.velocity.y<0){
    player.switchSprite('jump')
}else if(player.velocity.y>0){
    player.switchSprite('fall')

}
//enemy movt
if(keys.ArrowRight.pressed&&enemy.lastKey==='ArrowRight'){
    enemy.velocity.x=5
    enemy.switchSprite('run')

}else if(keys.ArrowLeft.pressed&&enemy.lastKey==='ArrowLeft'){
    enemy.velocity.x=-5
    enemy.switchSprite('run')
}else{
    enemy.switchSprite('idle')
    
    }if(enemy.velocity.y<0){
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y>0){
        enemy.switchSprite('fall')
    }
//detect fro collision
if( rectangularCollision({
    rectangle1:player,
    rectangle2:enemy
})&&
player.isAttacking&&player.frameCurrent===4
    ){
        enemy.takeHit()
        player.isAttacking=false
        
        // document.querySelector('#enemyHealth').style.width=enemy.health+'%'
    gsap.to('#enemyHealth',{
width:enemy.health+'%'
    })
        // console.log('hit')
}
if(player.isAttacking&&player.frameCurrent==4){
    player.isAttacking=false
}



if( rectangularCollision({
    rectangle1:enemy,
    rectangle2:player
})&&
enemy.isAttacking&&enemy.frameCurrent===1
    ){
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#playerHealth',{
            width:player.health+'%'
                })
}
if(enemy.isAttacking&&enemy.frameCurrent==4){
    enemy.isAttacking=false
}
//end game based on health
if(enemy.health<=0||player.health<=0){
    determineWinner({player,enemy,timerId})
}
}
animate()
window.addEventListener('keydown',(event)=>{
    if(!player.dead){
    switch(event.key){
        case 'd':
            keys.d.pressed=true
player.lastKey='d'
            break;
            case 'a':
                keys.a.pressed=true
                player.lastKey='a'

                break;
                case ' ':
                    player.attack()
                    break;
                    case 'w':
                        player.velocity.y=-20
                        break;

                     
    }}
    if(!enemy.dead){
   switch(event.key)
   { case 'ArrowRight':
        keys.ArrowRight.pressed=true
        enemy.lastKey='ArrowRight'

        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastKey='ArrowLeft'

            break;
            case 'ArrowDown':
              enemy.attack()
                break;
                case 'ArrowUp':
                    enemy.velocity.y=-20
                    break;
// console.log(event.key)

}
}
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed=false

            break;
            case 'a':
            keys.a.pressed=false
            break;
            case 's':
            player.velocity.y=0
            break;
            case 'w':
            keys.w.pressed.y=false
            break;
    }
    //enemy key
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed=false

            break;
            case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break;
            case 'ArrowDown':
                enemy.isAttacking = false
            case 's':
            player.velocity.y=0
            break;
            case 'w':
            keys.w.pressed.y=false
            break;
    }
// console.log(event.key)
})