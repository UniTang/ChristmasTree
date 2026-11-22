import { drawScene } from '../render/renderer.js';

// Draw one master image with the editor's exact shape. Every export size crops
// this image, so changing the photo ratio never recalculates sticker positions.
export function exportPng(sourceCanvas, ornaments, treeIndex=0, ratio='3:4', names=[], customTree=null) {
  const editorRatio=sourceCanvas.width/sourceCanvas.height;
  const master=document.createElement('canvas');
  master.width=1800;
  master.height=Math.round(master.width/editorRatio);
  const masterContext=master.getContext('2d');
  masterContext.fillStyle='#f7eee0';
  masterContext.fillRect(0,0,master.width,master.height);
  drawScene(masterContext,master.width,master.height,ornaments,null,false,null,treeIndex,customTree);

  const [ratioWidth,ratioHeight]=ratio.split(':').map(Number);
  const targetRatio=ratioWidth/ratioHeight;
  let cropWidth=master.width;
  let cropHeight=master.height;
  if(editorRatio>targetRatio) cropWidth=Math.round(master.height*targetRatio);
  else cropHeight=Math.round(master.width/targetRatio);
  const cropX=Math.round((master.width-cropWidth)/2);
  const cropY=Math.round((master.height-cropHeight)/2);

  const output=document.createElement('canvas');
  output.width=1200;
  output.height=Math.round(output.width/targetRatio);
  const ctx=output.getContext('2d');
  ctx.drawImage(master,cropX,cropY,cropWidth,cropHeight,0,0,output.width,output.height);

  const signature=names.filter(Boolean).join('');
  if(signature){
    ctx.save();
    ctx.textAlign='right';ctx.textBaseline='bottom';ctx.fillStyle='#506852';ctx.shadowColor='#ffffff99';ctx.shadowBlur=4;
    ctx.font='italic 58px "Snell Roundhand","Segoe Script","Bradley Hand",cursive';
    ctx.fillText(signature,output.width-48,output.height-36);
    ctx.restore();
  }
  return output.toDataURL('image/png');
}
