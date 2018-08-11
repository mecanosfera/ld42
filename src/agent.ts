/// <reference path='./game.ts' />

namespace bwo {



  export class Agent {

    game:Game;
    minRadius:number = 20;
    radius:number = 20;
    cells:Dict<Cell> = {};
    nucleus:Array<Cell> = [];
    color:string;
    x:number;
    y:number;
    letter:string;
    sound:HTMLAudioElement;

    constructor(game:Game,letter:string,x:number,y:number){
      this.game = game;
      this.letter = letter;
      this.x = x;
      this.y = y;
      this.drawRadius();
      this.color = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    }

    


    drawRadius():void{
      for(let r=1;r<this.radius+1;r++){
        let coords:Array<Vector2> = this.circle(r);
        for(let c of coords){
          //console.log(c);
          this.nucleus.push(this.game.cells[c.x][c.y].enter(this.color));
        }
      }
    }

    paintRadius(radius:number,nucleus:boolean=false):void{
      let outer:Array<Vector2> = this.circle(radius);

    }

    addCells(coords:Array<Vector2>):void{
      for(let c of coords){
        this.nucleus.push(this.game.cells[c.x][c.y].enter(this.color));
      }
    }

    circle(radius:number):Array<Vector2>{
      let pos:Array<Vector2> = [];
      let x:number = radius-1;
      let y:number = 0;
      let dx:number = 0;
      let dy:number = 0;
      let diameter = radius * 2;
	    let decisionOver2 = dx - diameter;
      while (x >= y){
        pos.push({x:this.x + x, y:this.y + y});
        pos.push({x:this.x + y, y:this.y + x});
        pos.push({x:this.x - y, y:this.y + x});
        pos.push({x:this.x - x, y:this.y + y});
        pos.push({x:this.x - x, y:this.y - y});
        pos.push({x:this.x - y, y:this.y - x});
        pos.push({x:this.x + y, y:this.y - x});
        pos.push({x:this.x + x, y:this.y - y});
        if (decisionOver2 <= 0) {
    		  y++;
    			decisionOver2 += dy; // Change in decision criterion for y -> y+1
    			dy += 2;
    		}
    		if (decisionOver2 > 0){
    			x--;
    			dx += 2;
    			decisionOver2 += (-diameter) + dx; // Change for y -> y+1, x -> x-1
    		}
      }
      return pos;
    }


    circle2(radius:number):Array<Vector2>{
      let pos:Array<Vector2> = [];
      let x:number = radius-1;
      let y:number = 0;
      let dx:number = 0;
      let dy:number = 0;
      let err:number = dx -(radius << 1);
      while (x >= y){
        pos.push({x:this.x + x, y:this.y + y});
        pos.push({x:this.x + y, y:this.y + x});
        pos.push({x:this.x - y, y:this.y + x});
        pos.push({x:this.x - x, y:this.y + y});
        pos.push({x:this.x - x, y:this.y - y});
        pos.push({x:this.x - y, y:this.y - x});
        pos.push({x:this.x + y, y:this.y - x});
        pos.push({x:this.x + x, y:this.y - y});

        if (err <= 0){
            y++;
            err += dy;
            dy += 2;
        }

        if (err > 0){
            x--;
            dx += 2;
            err += dx - (radius << 1);
        }
        return pos;
      }
    }

    update():void{

    }

    grow():void{
      this.radius++;
      this.addCells(this.circle(this.radius));
      //volume
    }

    shrink():void{

    }


  }



}
