/// <reference path='./interfaces.ts' />
/// <reference path='./util.ts' />
/// <reference path='./grid.ts' />
/// <reference path='./ui.ts' />

namespace bwo{



  export class Game {

    ui:UI;
    cells:Array<Array<Cell>> = [];
    size:Vector2 = {x:50,y:50};
    grid:Grid;
    letters:Array<string> = ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    agents:Dict<Agent> = {};

    constructor(){
      this.ui = new UI(this);
      this.ui.logo();
      this.grid = new Grid(this,2);
    }

    start():void{
      this.generateCells();
      this.agents['2020'] = new Agent(this,'a',20,20);
      this.grid.draw();
    }

    end():void{

    }

    update(time:number):void{

    }

    draw():void{

    }

    setSize(size:Vector2):void{
      this.size = size;
      this.cells = [];
      this.grid.size = size;
    }

    generateCells():void{
      for(let y=0;y<this.size.y;y++){
        let row:Array<Cell> = [];
        this.cells.push(row);
        for(let x=0;x<this.size.x;x++){
          row.push(new Cell(this.grid,x,y));
        }
      }
    }

  }


}
