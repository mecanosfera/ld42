/// <reference path='game.ts' />

namespace bwo {


  export class Grid {

    game:Game;
    ui:UI;
    canvas:HTMLCanvasElement;
    size:Vector2;
    cxt:CanvasRenderingContext2D;
    cellSize:number;


    constructor(game:Game,cellSize:number=5){
      this.game = game;
      this.size = this.game.size;
      this.cellSize = cellSize;
      this.canvas = document.getElementById('grid') as HTMLCanvasElement;
      this.cxt = this.canvas.getContext('2d');
      this.canvas.height = this.size.y*this.cellSize;
      this.canvas.width = this.size.x*this.cellSize;

    }

    draw():void{
      for(let arc of this.game.cells){
        console.log('zzzz');
        for(let c of arc){
          if(c.lastColor!==c.color){
            console.log('xxx');
            this.cxt.fillStyle = '#'+c.color;
            this.cxt.fillRect(c.x*this.cellSize,c.y*this.cellSize,this.cellSize,this.cellSize);
          }
        }
      }
    }

  }


  export class Cell {

    grid:Grid;
    x:number;
    y:number;
    val:number = 0;
    color:string = 'FFFFFF';
    nucleus:boolean = false;
    lastColor:string = 'FFFFFF';
    colors:Array<string> = [];

    constructor(grid:Grid,x:number,y:number){
      this.grid = grid;
      this.x = x;
      this.y = y;
    }

    addAgent(color:string,force:boolean=false):void{
      if(this.nucleus && !force){
        return;
      }
      this.val++;
      if(force){
        this.lastColor = color;
        this.color = color;
      }
      this.lastColor = this.color;
      this.color = this.val==1 ? color : this.colorCalc(this.colorn(this.color)+this.colorn(color));
    }

    removeAgent(color:string):Cell{
      if(this.val>0){
        this.val--;
        this.lastColor = this.color;
        this.color = this.val==0 ? 'FFFFFF' : this.colorCalc(this.colorn(this.color)-this.colorn(color));
      }
      return this;
    }

    enter(color:string):Cell{
      if(this.val==0){
        this.lastColor = this.color;
        this.color = color;
      }
      this.val++;
      console.log(this.x+' '+this.y+': '+this.color+' | '+this.lastColor);
      this.colors.push(color);
      return this;
    }

    exit(color:string):Cell{
      this.val--;
      this.colors.splice(this.colors.indexOf(color),1);
      if(this.val==0){
        this.lastColor = this.color;
        this.color = 'FFFFFF';
      } else {
        if(this.colors[0]!=this.color){
          this.lastColor = this.color;
          this.color = this.colors[0];
        }
      }
      return this;
    }

    colorn(color:string):number{
      return Number('0x'+color);
    }

    colorCalc(cn:number):string{
      let c = Number(cn).toString(16);
      return ''+( "000000".substr( 0, 6 - c.length ) + c.toUpperCase() );
    }

  }

}
