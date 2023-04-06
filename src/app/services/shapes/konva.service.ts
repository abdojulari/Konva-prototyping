import {  Injectable } from '@angular/core';
import { Line } from 'konva/lib/shapes/Line';
import { BehaviorSubject } from 'rxjs';
import Konva from 'konva';


@Injectable({
  providedIn: 'root'
})
export class KonvaService {
  // brushSize!: number;
  // brushOpacity!: number;

  public constructor(){}
  public createCircle(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any, menuNode: any, color: any, io:any) {
    const circle = new Konva.Circle({
      x: 250,
      y: 250,
      radius: 70,
      fill: color,
      stroke: 'black',
      strokeWidth: 1,
      draggable: true,
      name: 'circle' + Math.random(),
      isSelected: true
    });    
  
    circle.on('mouseover', () => {
      transformer.nodes([circle]);
      io.emit('updates', transformer.nodes([circle]) );
    });
  
    circle.on('click', (e) => {
      e.target.draggable(true);
      menuNode?.classList.add('hidden');
      io.emit('updates', e);
    });
  
    stage.on('click', (e: { evt: { clientX: any; clientY: any; }; }) => {
      const clickPos = {
        x: e.evt.clientX,
        y: e.evt.clientY
      };
      
      if (!circle.intersects(clickPos)) {
        transformer.nodes([]);
        return;
      }

      io.emit('updates', e);
    });
  
    layer.add(circle);
  
    stage.add(layer);
    layer.draw();
  
    io.emit('data', stage);
    io.on('updates', (data: any) => {
      // Update the stage using the received data      
      stage = Konva.Node.create(JSON.parse(data), '#container');
      //layer = stage.getLayers()[0]; 
      console.log(stage);
    });
  }
  
  
  // public createCircle(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any, menuNode: any, color: any, io:any) {
  //   const circle = new Konva.Circle({
  //       x: 250,
  //       y: 250,
  //       radius: 70,
  //       fill: color,
  //       stroke: 'black',
  //       strokeWidth: 1,
  //       draggable: true,
  //       name: 'circle' + Math.random(),
  //       isSelected: true
  //   });    

  //   circle.on('mouseover ', () => {
  //       transformer.nodes([circle]);
  //   });

  //   circle.on('click', (e) => {
  //     e.target.draggable(true);
  //     menuNode?.classList.add('hidden');
  //   });

  //   stage.on('click', (e: { evt: { clientX: any; clientY: any; }; }) => {
      
  //     const clickPos = {
  //       x: e.evt.clientX,
  //       y: e.evt.clientY
  //     };
      
  //     if (!circle.intersects(clickPos)) {
  //         transformer.nodes([]);
  //         return;
  //     }

  //     });

  //   layer.add(circle);

  //   stage.add(layer);
  //   layer.draw();

  //   // Add circle to preview layer
  //   previewLayer.add(circle.clone());
  //   previewStage.add(previewLayer);
  //   previewLayer.draw();

  //   io.emit('canvas-update', stage.toJSON());
    
  // }

  public createRectangle(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any, color: any) {
    const rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 200,
        height: 100,
        fill: color,
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: 'rectangle' + Math.random(),
        isSelected: true
    }); 
   
    
    rect.on('mouseover ', () => {
        transformer.nodes([rect]);
    });


    rect.on('dblclick dbltab', (e) => {
      const textNode = new Konva.Text({
        text: 'Some text here',
        x: e.evt.clientX,
        y: e.evt.clientY,
        fontSize: 20,
        draggable: true,
        width: 200,
        name: 'text' + Math.random()
      });

    });

    stage.on('click', (e: { evt: { clientX: any; clientY: any; }; }) => {
      const clickPos = {
        x: e.evt.clientX,
        y: e.evt.clientY
      };
      
      if (!rect.intersects(clickPos)) {
          transformer.detach();
      }
      });

    layer.add(rect);
    stage.add(layer);
    layer.draw();

    // Add circle to preview layer
    previewLayer.add(rect.clone());
    previewStage.add(previewLayer);
    previewLayer.draw();
  
  }

  public createSquare(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any, color: any) {
    const square = new Konva.Rect({
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: color,
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: 'square' + Math.random(),
        isSelected: true
    }); 

    square.on('mouseover ', () => {
        transformer.nodes([square]);;
    });

    stage.on('click', (e: { evt: { clientX: any; clientY: any; }; }) => {
      const clickPos = {
        x: e.evt.clientX,
        y: e.evt.clientY
      };
      
      if (!square.intersects(clickPos)) {
          transformer.detach();
      }
      });

    layer.add(square);
    stage.add(layer);
    transformer.attachTo(square);
    layer.draw();

   // Add square to preview layer
   previewLayer.add(square.clone());
   previewStage.add(previewLayer);
   previewLayer.draw();
   
  }

  public createLine(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any, color: any) {
    const line = new Konva.Line({
        points: [100, 0, 100, 100],
        stroke: color,
        strokeWidth: 3,
        draggable: true,
        name: 'line' + Math.random(), 
        isSelected: true
    }); 

    line.on('mouseover ', () => {
        transformer.nodes([line]);;
    });

    stage.on('click', (e: { evt: { clientX: any; clientY: any; }; }) => {
      const clickPos = {
        x: e.evt.clientX,
        y: e.evt.clientY
      };
      
      if (!line.intersects(clickPos)) {
          transformer.detach();
      }
      });
 
    layer.add(line);
    stage.add(layer);
    layer.draw();

    // Add line to preview layer
    previewLayer.add(line.clone());
    previewStage.add(previewLayer);
    previewLayer.draw();
  
  }
 
  public createArrow(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any, color: any) {
    const arrow = new Konva.Arrow({
      x: 200,
      y: 100,
      points: [0, 0,  100,  100],
      pointerLength: 20,
      pointerWidth: 20,
      fill: color,
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
      name: 'arrow' + Math.random(),
      isSelected: true
    });

    arrow.on('mouseover ', () => {
      transformer.nodes([arrow]);

    });

    stage.on('click', (e: { evt: { clientX: any; clientY: any; }; }) => {
      const clickPos = {
        x: e.evt.clientX,
        y: e.evt.clientY
      };
      
      if (!arrow.intersects(clickPos)) {
          transformer.detach();
      }
      });

    layer.add(arrow);
    stage.add(layer);
    layer.draw();

    // Add arrow to preview layer
    previewLayer.add(arrow.clone());
    previewStage.add(previewLayer);
    previewLayer.draw();
  }

  public createText(stage: any, layer: any, previewStage: any, previewLayer: any, transformer: any){
    const textNode = new Konva.Text({
      text: 'Add text here',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200,
      name: 'text' + Math.random()
    });

    layer.add(textNode);

    textNode.on('transform', function () {
      // reset scale, so only with is changing by transformer
      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        scaleX: 1,
      });
    });


    layer.add(transformer);

    textNode.on('dblclick dbltap', () => {
      // hide text node and transformer:
      textNode.hide();
      transformer.hide();
      
      // create textarea over canvas with absolute position
      // first we need to find position for textarea
      // how to find it?
      
      // at first lets find position of text node relative to the stage:
      const textPosition = textNode.absolutePosition();
      
      // so position of textarea will be the sum of positions above:
      const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
      };
      
      // create textarea and style it
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      
      // apply many styles to match text on canvas as close as possible
      // remember that text rendering on canvas and on the textarea can be different
      // and sometimes it is hard to make it 100% the same. But we will try...
      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
      textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + 'px';
      textarea.style.fontSize = textNode.fontSize() + 'px';
      textarea.style.border = 'none';
      textarea.style.padding = '0px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      //textarea.style.lineHeight = textNode.lineHeight();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = 'left top';
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      const rotation = textNode.rotation();
      let transform = '';
      if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
      }
          textarea.style.transform = transform;
          textarea.style.height = 'auto';
      
          textarea.focus();
      
          textarea.addEventListener('keydown', function (e) {
            // hide on enter key
            if (e.keyCode === 13) {
                textNode.show();
                transformer.show();
                textNode.text(textarea.value);
                layer.draw();
                document.body.removeChild(textarea);
              }
          });
          textarea.addEventListener('input', function () {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
          });

          textarea.addEventListener('mouseleave',() => {

          } )
    });

    // Add text to preview layer
    previewLayer.add(textNode.clone());
    previewStage.add(previewLayer);
    previewLayer.draw();
    
  }

  public createPen(stage: any, layer: any, lastLine: any, mode: any, isPaint: any) {
    mode = 'rectangle'; 
      stage.on('mousedown touchstart', (e: any) => {
        isPaint = true;
        const pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: '#000000',
          strokeWidth: 5,
          globalCompositeOperation:
             'source-over',
          lineCap: 'round',
          lineJoin: 'round',
          points: [pos!.x, pos!.y, pos!.x, pos!.y],
        });
        layer.add(lastLine);
        stage.container().style.cursor = 'pointer';
      });
  
      stage.on('mouseup touchend', () => {
        isPaint = false;
      });
  
      stage.on('mousemove touchmove', (e: any) => {
        if (!isPaint) {
          return;
        }
  
        e.evt.preventDefault();
  
        const pos = stage.getPointerPosition();
        const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
        lastLine.points(newPoints);
      });
  
    
  }

  public createErase(stage: any, layer: any, lastLine: any, mode: any, isPaint: any) {
    
    mode = 'rectangle'; 
      stage.on('mousedown touchstart', (e: any) => {
        isPaint = true;
        const pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: '#000000',
          strokeWidth: 5,
          globalCompositeOperation: 'destination-out',
          lineCap: 'round',
          lineJoin: 'round',
          points: [pos!.x, pos!.y, pos!.x, pos!.y],
        });
        layer.add(lastLine);
      });
  
      stage.on('mouseup touchend', () => {
        isPaint = false;
      });
  
      stage.on('mousemove touchmove', (e: any) => {
        if (!isPaint) {
          return;
        }
  
        e.evt.preventDefault();
  
        const pos = stage.getPointerPosition();
        const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
        lastLine.points(newPoints);
      });
  
      stage.on('click', (e: any) => {
        if (mode === 'erase') {
          stage.container().style.cursor = 'url(http://www.rw-designer.com/cursor-extern.php?id=72976), default';
          const shape = e.target;
          shape.destroy();
          layer.draw();
        } else {
          stage.container().style.cursor = 'auto';
        }
      });
    
  }
  // brush(pos: any, size: any, color: string, opacity: number) {
  //   this.brushSize = size;
  //   this.brushOpacity = opacity;
  //   return new Line({
  //     stroke: color,
  //     strokeWidth: size,
  //     globalCompositeOperation: 'source-over',
  //     points: [pos.x, pos.y, pos.x, pos.y],
  //     lineCap: 'round',
  //     lineJoin: 'round',
  //     opacity: opacity,
  //     tension: 0
  //   });
  // }

  // erase(pos: any, size: any) {
  //   return new Line({
  //     stroke: '#ffffff',
  //     strokeWidth: size,
  //     globalCompositeOperation: 'destination-out',
  //     points: [pos.x, pos.y, pos.x, pos.y],
  //     lineCap: 'round',
  //     lineJoin: 'round'
  //   });
  // }
}