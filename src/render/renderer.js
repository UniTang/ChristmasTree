const TAU=Math.PI*2;
const imageCache=new Map();
export function drawScene(ctx,width,height,ornaments,selectedId=null,controls=false,preview=null,treeIndex=0,customTree=null){
 ctx.clearRect(0,0,width,height);const scale=width/600;
 for(let i=0;i<34;i++){let x=(i*137+31)%width,y=(i*89+17)%height;ctx.fillStyle=`rgba(255,255,255,${.25+(i%4)*.08})`;ctx.beginPath();ctx.arc(x,y,(1+i%3)*scale,0,TAU);ctx.fill()}
 const cx=width/2, top=height*.11, base=height*.87, h=base-top, w=Math.min(width*.78,h*.82);
 // Rounded, overlapping boughs create a soft silhouette that widens toward the base.
 if(customTree){let im=imageCache.get(customTree);if(!im){im=new Image();im.src=customTree;imageCache.set(customTree,im)}if(im.complete)ctx.drawImage(im,cx-w*.48,top+h*.08,w*.96,h*.8)}else{ctx.fillStyle='#b87955';ctx.beginPath();ctx.roundRect(cx-w*.09,base-3*scale,w*.18,h*.12,10*scale);ctx.fill();
 const palette=treeIndex===0?['#62a879','#51996d','#408b60','#337c56','#286e4d']:['#729f75','#648c69','#557d60','#456f56','#365f4b'];const tiers=[{y:.20,r:.20,c:palette[0]},{y:.36,r:.33,c:palette[1]},{y:.54,r:.42,c:palette[2]},{y:.73,r:.50,c:palette[3]},{y:.91,r:.59,c:palette[4]}];
 tiers.forEach((t,i)=>{let yy=top+h*t.y,rx=w*t.r,ry=h*(.19+i*.014);ctx.save();ctx.shadowColor='#21513b2b';ctx.shadowBlur=12*scale;ctx.fillStyle=t.c;ctx.beginPath();ctx.ellipse(cx,yy,rx,ry,0,0,TAU);ctx.fill();ctx.restore();ctx.strokeStyle=['#a1d095','#90ca86','#80bd79','#72ad70','#659f68'][i];ctx.lineWidth=2.4*scale;ctx.beginPath();ctx.ellipse(cx,yy,rx,ry,0,Math.PI*.08,Math.PI*.92);ctx.stroke();
 // Small scallops along each bough edge.
 for(let side of [-1,1]) for(let j=0;j<5+i;j++){const a=(.18+j/(4+i)*.64)*Math.PI;ctx.fillStyle=t.c;ctx.beginPath();ctx.arc(cx+side*Math.cos(a)*rx,yy+Math.sin(a)*ry,ry*.13,0,TAU);ctx.fill()}
 });
 // Warm twinkling garland.
 ctx.strokeStyle='#f4d58a';ctx.lineWidth=2.4*scale;ctx.globalAlpha=.9;for(let row=0;row<4;row++){let y=top+h*(.34+row*.125),rw=w*(.22+row*.07);ctx.beginPath();ctx.moveTo(cx-rw,y);ctx.quadraticCurveTo(cx,y+h*.07,cx+rw,y);ctx.stroke()}ctx.globalAlpha=1;
 ctx.font=`${Math.min(48*scale,width*.1)}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('⭐',cx,top+3*scale)}
 for(const o of ornaments){const x=o.x*width,y=o.y*height,size=o.size*width;drawSticker(ctx,o,x,y,size,scale);if(controls&&o.instanceId===selectedId)drawControls(ctx,o,x,y,size,scale)}
 if(preview)drawSticker(ctx,preview,preview.x*width,preview.y*height,preview.size*width,scale,.72);
}
function drawSticker(ctx,o,x,y,size,scale,alpha=1){ctx.save();ctx.translate(x,y);ctx.rotate(o.rotation);ctx.globalAlpha=alpha;ctx.shadowColor='#3334';ctx.shadowBlur=5*scale;if(o.image){let image=imageCache.get(o.image);if(!image){image=new Image();image.onload=()=>{};image.src=o.image;imageCache.set(o.image,image)}if(image.complete)ctx.drawImage(image,-size/2,-size/2,size,size)}else{ctx.font=`${size}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.emoji,0,0)}ctx.restore()}
function drawControls(ctx,o,x,y,size,scale){const half=size*.64,r=6.3*scale;ctx.save();ctx.translate(x,y);ctx.rotate(o.rotation);ctx.strokeStyle='#fff8e9';ctx.lineWidth=2*scale;ctx.setLineDash([5*scale,4*scale]);ctx.strokeRect(-half,-half,half*2,half*2);ctx.setLineDash([]);[[-half,-half],[half,-half],[-half,half],[half,half]].forEach(([px,py],i)=>{ctx.beginPath();ctx.arc(px,py,r,0,TAU);ctx.fillStyle='#fffaf0';ctx.fill();ctx.strokeStyle='#d77b60';ctx.stroke();ctx.fillStyle='#9d584a';ctx.font=`bold ${8*scale}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(['+1','↻','↔','×'][i],px,py)});ctx.restore()}
