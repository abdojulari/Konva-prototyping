import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { 
  KonvaService, 
  SocketClientService 
} from '../services';
import Konva from 'konva';
import { BehaviorSubject, Subject } from 'rxjs';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { Stage } from 'konva/lib/Stage';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit, AfterViewInit {

  public stage!: Konva.Stage;
  public previewStage!: Konva.Stage;
  public layer!: Konva.Layer;
  public transformer: Konva.Transformer = new Konva.Transformer();
  private isPaint: boolean = false;
  private mode = 'brush';
  private lastLine!: Konva.Line;
  public isDrawing: Boolean = false;
  public selectedTool: string = '';
  public previewLayer: any;
  public isShapeDisplay:  boolean = false;
  public isImageDisplay: boolean = false;
  public selectionRectangle: any;
  public contextMenuPosition:any;
  public color: string = '#ffffff';
  public x1: any;
  public y1: any;
  public x2: any;
  public y2: any;
  public currentShape: any;
  public menuNode: any;
  public color$ = new Subject<string>();
  public images: any;
  public emojis: any;
  public shapes: any;
  public io = io('http://localhost:3000');
  public data$:  BehaviorSubject<any> = new BehaviorSubject('');

  @ViewChild('tool') tool: ElementRef<any>;
  
 
  public constructor(
      private elementRef: ElementRef,
      private shapeService: KonvaService,
      private socket: SocketClientService
      ) {
            this.tool =  this.elementRef.nativeElement;
            this.images  = [
              {
                name:  'Appreciation',
                image: './assets/images/appreciate.png'
              },
              {
                name:  'Audio Conversation',
                image: './assets/images/audio_conversation.png'
              },
              {
                name:  'Basketball',
                image: './assets/images/basketball.png'
              },
              {
                name:  'Stand By Car',
                image: './assets/images/by_my_car.png'
              },
              {
                name:  'Compose Music',
                image: './assets/images/compose_music.png'
              },
              {
                name:  'Delivery Truck',
                image: './assets/images/delivery_truck.png'
              },
              {
                name:  'Educator',
                image: './assets/images/educator.png'
              },
              {
                name:  'Family',
                image: './assets/images/family.png'
              },
              {
                name:  'Female',
                image: './assets/images/female.png'
              },
              {
                name:  'Flying',
                image: './assets/images/flying.png'
              },
              {
                name:  'Gaming',
                image: './assets/images/gaming.png'
              },
              {
                name:  'Halloween',
                image: './assets/images/halloween.png'
              },
              {
                name:  'Learning',
                image: './assets/images/learning_sketching.png'
              },
              {
                name:  'Male',
                image: './assets/images/male.png'
              },
              {
                name:  'Mindfulness',
                image: './assets/images/mindfulness.png'
              },
              {
                name:  'Multitasking',
                image: './assets/images/multitasking.png'
              },
              {
                name:  'Newspaper',
                image: './assets/images/newspaper.png'
              },
              {
                name:  'Scientist',
                image: './assets/images/scientist.png'
              },
              {
                name:  'Sharing Knowledge',
                image: './assets/images/sharing_knowledge.png'
              },
              {
                name:  'Shopping',
                image: './assets/images/shopping_bags.png'
              },
              {
                name:  'Traveling',
                image: './assets/images/traveling.png'
              },
              {
                name:  'Website',
                image: './assets/images/website_builder.png'
              },
              {
                name:  'Well done',
                image: './assets/images/well_done.png'
              },
              {
                name:  'Working',
                image: './assets/images/working.png'
              },
              
            ];
            this.emojis = [
              {
                name:  'Anger',
                image: './assets/emojis/anger.png'
              },
              {
                name:  'Crying',
                image: './assets/emojis/crying.png'
              },
              {
                name:  'Gamer',
                image: './assets/emojis/gamer.png'
              },
              {
                name:  'Hush',
                image: './assets/emojis/hush.png'
              },
              {
                name:  'Lover',
                image: './assets/emojis/in_love.png'
              },
              {
                name:  'Love',
                image: './assets/emojis/love.png'
              },
              {
                name:  'Kiss',
                image: './assets/emojis/kiss.png'
              },
              {
                name:  'Mute',
                image: './assets/emojis/mute.png'
              },
              {
                name:  'Laugh',
                image: './assets/emojis/laugh.png'
              },
              {
                name:  'Naughty',
                image: './assets/emojis/naughty.png'
              },
              {
                name:  'Partying',
                image: './assets/emojis/partying.png'
              },
              {
                name:  'Happy',
                image: './assets/emojis/happy.png'
              },
              {
                name:  'Sad',
                image: './assets/emojis/sad.png'
              },
              {
                name:  'Sick',
                image: './assets/emojis/sick.png'
              },
              {
                name:  'Singing',
                image: './assets/emojis/singing.png'
              },
              {
                name:  'Smile',
                image: './assets/emojis/smile.png'
              },
              {
                name:  'Sleep',
                image: './assets/emojis/sleep.png'
              },
              {
                name:  'Tongue',
                image: './assets/emojis/tongue.png'
              },
              {
                name:  'Wink',
                image: './assets/emojis/wink.png'
              },
              {
                name:  'Tear',
                image: './assets/emojis/tear.png'
              },
            ];
            this.shapes = [
              {
                name: 'circle',
                image: './assets/icons/circle.png'
              },
              {
                name: 'rectangle',
                image: './assets/icons/rectangle.png'
              },
              {
                name: 'square',
                image: './assets/icons/square.png'
              },
              {
                name: 'line',
                image: './assets/icons/line.png'
              },
              {
                name: 'arrow',
                image: './assets/icons/arrow.png'
              },
            ];
          
  }

  public ngOnInit(): void {
    
    this.stage = new Konva.Stage({
      container: '#container',
      width: window.innerWidth * 0.92,
      height: window.innerHeight * 0.9
    });
    this.stage.clearCache();
    this.layer = new Konva.Layer();
    this.layer.add(this.transformer);
    
    // setup menu
    this.menuNode = document.getElementById('menu');
   
    this.stage.on('click', (e) => {
      // when click out, the menu should disappear
      this.menuNode?.classList.add('hidden');
      this.io.emit('updates', e);
    
    });

    this.layer.on('contextmenu', (e) => {
      e.evt.preventDefault();
      e.target.draggable(false);
      this.currentShape = e.target.name();
      this.menuNode?.classList.remove('hidden');
      this.menuNode.style.top = e.evt.clientY + 'px';
      this.menuNode.style.left = e.evt.clientX + 'px';
      this.io.emit('updates', this.currentShape);
      
    });

    this.layer.on('click', (e) => {
      e.evt.preventDefault();
      this.currentShape = e.target;
      
      if (!this.currentShape?.attrs.isSelected){
        return ;
      }
      
      if(this.currentShape.attrs.isSelected) {        
        this.currentShape.getLayer()?.batchDraw();
        // This is a subscription to the color$ subject. It is used to update the color of the shapes.
        this.color$.subscribe(color => {  
          const shape =  this.currentShape.attrs;
          shape.fill = color;
          shape.isSelected = false;
          shape.id ='selected';
          shape.stroke = 10
      });
      
     }

     // Show the transformer around the selected shape
      this.color = '#ffffff';
  
    });
 
   
  }

 
  public ngAfterViewInit(): void {

    // create smaller preview stage
    this.previewStage = new Konva.Stage({
      container: '#preview',
      width: window.innerWidth / 4,
      height: window.innerHeight / 4,
      scaleX: 1 / 4,
      scaleY: 1 / 4,
    });
    // clone original layer, and disable all events on it
    this.previewLayer = this.layer.clone();
    this.previewStage.add(this.previewLayer);

    this.stage.on('dragmove',  () => {
      // we just need to update ALL nodes in the preview
      this.layer.children!.forEach((shape) => {
      // find cloned node
        this.io.emit('updates', shape);
        const clone = this.previewLayer.findOne('.' + shape.name());
        // update its position from the original
        if (clone) {
          clone.position(shape.position(), clone.position());
        }
    
      });
    });

    // websocket 

      //   this.io.on('data', (data: any) => {
      // // Update the stage using the received data      
      //   this.stage = Konva.Node.create(JSON.parse(data), '#container');
      //   this.layer = this.stage.getLayers()[0];    
     
      // });

  }
  
  public createShape(shape: string) {
    this.menuNode?.classList.add('hidden');
    switch (shape) {
        case 'circle':
            this.endPen();
            this.shapeService.createCircle(this.stage, this.layer, this.previewStage, this.previewLayer, this.transformer, this.menuNode, this.color, this.io);
            break;
        case 'rectangle':
            this.endPen();
            this.shapeService.createRectangle(this.stage, this.layer, this.previewStage, this.previewLayer, this.transformer, this.color);
            break;
        case 'square':
            this.endPen();
            this.shapeService.createSquare(this.stage, this.layer, this.previewStage, this.previewLayer, this.transformer, this.color);
            break;
        case 'line':
            this.endPen();
            this.shapeService.createLine(this.stage, this.layer, this.previewStage, this.previewLayer, this.transformer, this.color);
            break;        
        case 'arrow':
            this.endPen();
            this.shapeService.createArrow(this.stage, this.layer, this.previewStage, this.previewLayer, this.transformer, this.color);
            break;   
        case 'text':
              this.endPen();
              this.shapeService.createText(this.stage, this.layer, this.previewStage, this.previewLayer, this.transformer);
              break;
        case 'pen':
            this.shapeService.createPen(this.stage, this.layer, this.lastLine, this.mode, this.isPaint);
            this.socket.sendData(this.shapeService.createPen(this.stage, this.layer, this.lastLine, this.mode, this.isPaint));
            break;
        case 'erase':
          this.shapeService.createErase(this.stage, this.layer, this.lastLine, this.mode, this.isPaint);
              break;
    }
  
    this.selectedTool = shape;
  }

  public endPen() {
    this.stage.off('mousedown');
    this.stage.off('mousemove');
    this.stage.off('mouseup');
  }
  // Images 
  public createImage(index: number, image: any): void {
      if(!image) {
        return;
      }

      const imageObj = new Image();
      const selectedImage = image[index];
      imageObj.onload = () => {
        const imageNode = new Konva.Image({
          x: 240,
          y: 20,
          width: 120,
          height: 120,
          stroke: '#6e6e6e',
          strokeWidth: 1,
          image: imageObj,
          name: selectedImage.name.replace(/\s/g, '')
        });
        imageNode.draggable(true); 
        this.layer.add(imageNode);  
        imageNode.on('mouseover ', () => {
        this.transformer.nodes([imageNode]);
        });

        const json =  this.layer.toJSON();
        console.log(json);
      };
      imageObj.src = selectedImage.image;
    
  }
  
  public toggle(): void {
    this.isShapeDisplay = !this.isShapeDisplay;
    // if the isImageDisplay is true, set it to false
    this.isImageDisplay = false;
  }

  public toggleImage(): void {
    this.isImageDisplay = !this.isImageDisplay;
    this.isShapeDisplay = false;
  }

  public bringToFront(): void {
    const shape = this.layer.findOne('.' + this.currentShape);
    shape.moveToTop();
    shape.draggable(true);
    this.menuNode?.classList.add('hidden');
    
  }

  public sendToBack(): void {
    
    const shape = this.layer.findOne('.' + this.currentShape);
    shape.moveToBottom();
    shape.draggable(true);
    this.menuNode?.classList.add('hidden');
  }
  // onToolSelected(event: any) {
  //   const selectedTool = (event.target as HTMLSelectElement).value;
  //   this.mode = selectedTool;
  //   console.log(this.mode);
  // }

  public refreshStage(){
    this.stage.clear();
    this.previewStage.clear();
  }
  
}
