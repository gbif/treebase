Smits={};
Smits.Common={nodeIdIncrement:0,activeNode:0,roundFloat:function(a,c){for(var b=0,f=1;b<c;)f*=10,b++;return Math.round(a*f)/f},apply:function(a,c){if(a&&typeof c=="object")for(var b in c)a[b]=c[b];return a},addEventHandler:function(a,c,b,f){try{a.addEventListener(c,function(a){return function(c){f.e=c;a(f)}}(b,f),!1)}catch(l){}},isInteger:function(a){return!isNaN(parseInt(a))},isXMLSerializerAvailable:function(){return typeof XMLSerializer=="function"?!0:!1},createSvgEl:function(a,c){a=document.createElementNS("http://www.w3.org/2000/svg",a);
if(c)for(var b in c)c.hasOwnProperty(b)&&a.setAttribute(b,String(c[b]));return a},createGradientEl:function(a,c,b){if(c.type!="radialGradient")return!1;a=Smits.Common.createSvgEl("radialGradient",{id:a,gradientUnits:"userSpaceOnUse",cx:b[0],cy:b[1],r:b[2],fx:b[0],fy:b[1]});if(c.stop){c=c.stop;for(b=0;b<c.length;b++){var f=c[b];f["@attributes"]?a.appendChild(Smits.Common.createSvgEl("stop",f["@attributes"])):(f._attributes&&delete f._attributes,f._children&&delete f._children,f.__proto__&&delete f.__proto__,
a.appendChild(Smits.Common.createSvgEl("stop",f)))}}return a},setCssStyle:function(a,c){var b=document.styleSheets[0];b.addRule?b.addRule(a,c):b.insertRule&&b.insertRule(a+" { "+c+" }",b.cssRules.length)}};
Smits.PhyloCanvas=function(){var a,c,b,f;return function(l,m,q,g,n){this.getNewickObject=function(){};this.clear=function(){};this.scale=function(d){b.svg.scale(d)};this.getSvg=function(){return b};this.getPhylogram=function(){return a};this.getSvgSource=function(){return Raphael.svg&&Smits.Common.isXMLSerializerAvailable()?(new XMLSerializer).serializeToString(b.svg.canvas):!1};if(typeof l==="object")if(l.xml){var d=l.fileSource?l.xml:XMLObjectifier.textToXML(l.xml),d=XMLObjectifier.xmlToJSON(d);
f=new Smits.PhyloCanvas.PhyloxmlParse(d)}else l.phyloxml?(d=l.fileSource?l.phyloxml:XMLObjectifier.textToXML(l.phyloxml),d=XMLObjectifier.xmlToJSON(d),f=new Smits.PhyloCanvas.PhyloxmlParse(d)):l.nexml?(d=l.fileSource?l.nexml:XMLObjectifier.textToXML(l.nexml),d=XMLObjectifier.xmlToJSON(d),f=new Smits.PhyloCanvas.NexmlParse(d,l)):l.json?f=new Smits.PhyloCanvas.PhyloxmlParse(l.json):l.newick?f=new Smits.PhyloCanvas.NewickParse(l.newick):l.nexmlJson?f=new Smits.PhyloCanvas.NexmlJsonParse(l):alert("Please set the format of input data");
else f=new Smits.PhyloCanvas.NewickParse(l);c=m;b=new Smits.PhyloCanvas.Render.SVG(c,q,g);a=n=="circular"?new Smits.PhyloCanvas.Render.CircularPhylogram(b,f):new Smits.PhyloCanvas.Render.Phylogram(b,f)}}();Smits.PhyloCanvas.prototype={};Smits.PhyloCanvas.Node=function(){return function(a,c){this.id=Smits.Common.nodeIdIncrement+=1;this.newickLen=this.len=this.level=0;this.type=this.name="";this.chart={};this.img=[];a&&Smits.Common.apply(this,a);this.children=[];c&&c.children.push(this)}}();
Smits.PhyloCanvas.Node.prototype={getCountAllChildren:function(){var a=0,c;for(c in this.children)if(Smits.Common.isInteger(c)){var b=this.children[c];b.children&&b.children.length>0?a+=b.getCountAllChildren():a++}return a},getCountImmediateChildren:function(){var a=0,c;for(c in this.children)a+=this.children[c].length;return a},getMidbranchPosition:function(){for(var a=[0,0],c=0;c<this.children.length;c++){var b=this.children[c];b.children&&b.children.length>0?c==0?(a[0]=b.getMidbranchPosition(),
a[1]+=b.getCountAllChildren()):a[1]+=c==this.children.length-1?b.getMidbranchPosition():b.getCountAllChildren():(c==0&&(a[0]=1),a[1]+=1)}return a[1]>=a[0]?(a[1]-a[0])/2+a[0]:a[0]}};
Smits.PhyloCanvas.NewickParse=function(){var a,c,b,f=0,l=0,m,q=function(a){for(var e=new Smits.PhyloCanvas.Node;c!==")"&&c!==",";)if(c===":"){if(d(),e.len=Smits.Common.roundFloat(n(),4),e.len==0)e.len=1.0E-4}else if(c==="'"||c==='"'){e.type="label";for(var g=e,k=c,b="";c!==k;)b+=c,d();g.name=b}else e.type="label",e.name=n();e.level=a.level+1;return e},g=function(a){var e=new Smits.PhyloCanvas.Node;if(a)e.level=a.level+1;for(;c!==")";)d(),c==="("?e.children.push(g(e)):e.children.push(q(e));d();if(c!==
":"&&c!==")"&&c!==","&&c!==";")e.type="label",e.name=n();if(c===":"){d();e.len=Smits.Common.roundFloat(n(),4);if(e.len==0)e.len=1.0E-4;e.type="stem"}return e},n=function(){for(var a="";c!==":"&&c!==")"&&c!==","&&c!==";";)a+=c,d();return a},d=function(){c=a.charAt(b);b+=1;return c},k=function(d){if(d.children&&d.children.length)for(var a=0;a<d.children.length;a++){var c=d.children[a];if(c.len===0)c.len=1;c.newickLen=Smits.Common.roundFloat(c.len+d.newickLen,4);if(c.level>f)f=c.level;if(c.newickLen>
l)l=c.newickLen;c.children.length>0&&k(c,d)}return d};return function(c){this.getRoot=function(){return m};this.getLevels=function(){return f};this.getNewickLen=function(){return l};this.getValidate=function(){};a=c;b=0;d();m=g();m=k(m)}}();Smits.PhyloCanvas.NewickParse.prototype={};
Smits.PhyloCanvas.PhyloxmlParse=function(){var a=0,c=0,b,f,l=function(a,c){var d=new Smits.PhyloCanvas.Node;if(c)d.level=c.level+1;if(a.clade&&a.clade.length)for(var k=0;k<a.clade.length;k++)d.children.push(l(a.clade[k],d));if(a.branch_length){if(typeof a.branch_length==="object")a.branch_length=a.branch_length[0].Text;d.len=Smits.Common.roundFloat(a.branch_length,4);if(d.len==0)d.len=1.0E-4}if(a.name){d.type="label";d.name=a.name[0].Text;if(a.name[0]&&a.name[0].style)d.style=a.name[0].style;if(a.name[0]&&
a.name[0].bgStyle)d.bgStyle=a.name[0].bgStyle}else if(a.confidence)d.name=a.confidence[0].Text;if(a.sequence&&a.sequence[0]&&a.sequence[0].name&&a.sequence[0].name[0]&&a.sequence[0].name[0].Text)d.sequenceName=a.sequence[0].name[0].Text;if(a.taxonomy&&a.taxonomy[0]){if(a.taxonomy[0].scientific_name&&a.taxonomy[0].scientific_name[0]&&a.taxonomy[0].scientific_name[0].Text)d.taxonomyScientificName=a.taxonomy[0].scientific_name[0].Text;if(a.taxonomy[0].common_name&&a.taxonomy[0].common_name[0]&&a.taxonomy[0].common_name[0].Text)d.taxonomyCommonName=
a.taxonomy[0].common_name[0].Text}if(a.sequence&&a.sequence[0]&&a.sequence[0].accession&&a.sequence[0].accession[0]&&a.sequence[0].accession[0].Text)d.sequenceAccession=a.sequence[0].accession[0].Text;if(a.point)d.LatLong=[a.point[0].lat[0].Text,a.point[0]["long"][0].Text];if(!d.name){if(d.sequenceName)d.name=d.sequenceName;else if(d.taxonomyScientificName)d.name=d.taxonomyScientificName;else if(d.taxonomyCommonName)d.name=d.taxonomyCommonName;else if(d.sequenceAccession)d.name=d.sequenceAccession;
if(d.name)d.type="label"}if(a.annotation){if(a.annotation[0]&&a.annotation[0].desc&&a.annotation[0].desc[0]&&a.annotation[0].desc[0].Text)d.description=a.annotation[0].desc[0].Text;if(a.annotation[0]&&a.annotation[0].uri&&a.annotation[0].uri[0]&&a.annotation[0].uri[0].Text)d.uri=a.annotation[0].uri[0].Text;if(a.annotation[0]&&a.annotation[0].img)for(k in a.annotation[0].img)if(Smits.Common.isInteger(k))d.img[k]=a.annotation[0].img[k].Text}if(a.chart&&a.chart[0])for(k in a.chart[0])if(k!="Text"&&k!=
"_children")d.chart[k]=a.chart[0][k][0].Text;d&&d.level>1&&(d.len||(f="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."));return d},m=function(b){if(b.children&&b.children.length)for(var f=0;f<b.children.length;f++){var d=b.children[f];d.newickLen=Math.round((d.len+b.newickLen)*1E4)/1E4;if(d.level>a)a=d.level;if(d.newickLen>c)c=d.newickLen;d.children.length>0&&m(d,b)}return b},q=function(a,c){for(var d in a)d!="_children"&&d!="Text"&&(d=="rectangular"||d=="circular"?
q(a[d][0],d):(Smits.PhyloCanvas.Render.Parameters[d]||(Smits.PhyloCanvas.Render.Parameters[d]={}),Smits.PhyloCanvas.Render.Parameters.set(d,a[d][0].Text,c)))};return function(g){this.getRoot=function(){return b};this.getLevels=function(){return a};this.getNewickLen=function(){return c};this.getValidate=function(){return f};g.phylogeny&&g.phylogeny[0]&&g.phylogeny[0].clade&&(b=l(g.phylogeny[0].clade[0]));if(g.phylogeny&&g.phylogeny[0]&&g.phylogeny[0].render&&g.phylogeny[0].render[0]){if((g=g.phylogeny[0].render[0])&&
g.styles){var n=g.styles[0],d;for(d in n)if(d!="_children"&&d!="Text")if(n[d][0].type&&n[d][0].type=="radialGradient"&&Raphael.svg)n[d][0].name=d,Smits.PhyloCanvas.Render.Style[d]=n[d][0],Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList||(Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList=[]),Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.push(d);else for(var k in Smits.PhyloCanvas.Render.Style[d]||(Smits.PhyloCanvas.Render.Style[d]={}),n[d][0])k!="_attributes"&&k!="_children"&&k!=
"type"&&(Smits.PhyloCanvas.Render.Style[d][k.replace("_","-")]=n[d][0][k])}g&&g.parameters&&q(g.parameters[0]);if(g&&g.charts)for(d in g=g.charts[0],g)if(d!="_children"&&d!="Text")for(k in g[d])if(g[d][k].type=="binary")g[d][k].chart=d,Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(g[d][k]);else if(g[d][k].type=="integratedBinary")g[d][k].chart=d,Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(g[d][k]);else if(g[d][k].type=="bar")g[d][k].chart=d,Smits.PhyloCanvas.Render.Parameters.barCharts.push(g[d][k])}b=
m(b)}}();Smits.PhyloCanvas.PhyloxmlParse.prototype={};
Smits.PhyloCanvas.NexmlParse=function(){var a=0,c=0,b,f,l,m,q=function(a,d,c){var j=new Smits.PhyloCanvas.Node;if(c)j.level=c.level+1;for(c=0;c<l.length;c++)if(l[c].source==a.id)for(var e=0;e<m.length;e++)l[c].target==m[e].id&&j.children.push(q(m[e],l[c].length,j));if(d&&(j.len=Smits.Common.roundFloat(d,4),j.len==0))j.len=1.0E-4;if(a.label&&(j.type="label",j.name=a.label,a.style))j.style=a.style;j&&j.level>1&&(j.len||(f="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."));return j},
g=function(b){if(b.children&&b.children.length)for(var d=0;d<b.children.length;d++){var k=b.children[d];k.newickLen=Math.round((k.len+b.newickLen)*1E4)/1E4;if(k.level>a)a=k.level;if(k.newickLen>c)c=k.newickLen;k.children.length>0&&g(k,b)}return b};return function(n,d){this.getRoot=function(){return b};this.getLevels=function(){return a};this.getNewickLen=function(){return c};this.getValidate=function(){return f};d.tree&&n.trees[0]&&n.trees[0].tree[d.tree-1]?(l=n.trees[0].tree[d.tree-1].edge,m=n.trees[0].tree[d.tree-
1].node):(l=n.trees[0].tree[0].edge,m=n.trees[0].tree[0].node);for(i=0;i<m.length;i++)m[i].root&&m[i].root=="true"&&(b=m[i]);b?(b=q(b),b=g(b)):f="Error. Currently, only rooted NeXML trees are supported."}}();Smits.PhyloCanvas.NexmlParse.prototype={};
Smits.PhyloCanvas.NexmlJsonParse=function(){var a=0,c=0,b,f,l=[],m=[],q=function(a,c,j){var e=new Smits.PhyloCanvas.Node;if(j)e.level=j.level+1;for(j=0;j<l.length;j++)if(l[j].source==a.id)for(var b=0;b<m.length;b++)l[j].target==m[b].id&&e.children.push(q(m[b],l[j].length,e));if(c&&(e.len=Smits.Common.roundFloat(c,4),e.len==0))e.len=1.0E-4;if(a.label){e.type="label";e.name=a.label;if(a.accession)e.accession=a.accession;if(a.style)e.style=a.style;if(a.bgStyle)e.bgStyle=a.bgStyle}if(a.chart)e.chart=
a.chart;e&&e.level>1&&(e.len||(f="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."));return e},g=function(d){if(d.children&&d.children.length)for(var b=0;b<d.children.length;b++){var j=d.children[b];j.newickLen=Math.round((j.len+d.newickLen)*1E4)/1E4;if(j.level>a)a=j.level;if(j.newickLen>c)c=j.newickLen;j.children.length>0&&g(j,d)}return d},n=function(a,c){for(var b in a)b!="_children"&&b!="Text"&&(b=="rectangular"||b=="circular"?n(a[b],b):(Smits.PhyloCanvas.Render.Parameters[b]||
(Smits.PhyloCanvas.Render.Parameters[b]={}),Smits.PhyloCanvas.Render.Parameters.set(b,a[b],c)))};return function(d){this.getRoot=function(){return b};this.getLevels=function(){return a};this.getNewickLen=function(){return c};this.getValidate=function(){return f};var k=d.nexmlJson.nexml,j=k.render;if(j&&j.styles){var e=j.styles,h;for(h in e)if(h!="_children"&&h!="Text")if(e[h]["@attributes"].type&&e[h]["@attributes"].type=="radialGradient"&&Raphael.svg)e[h].name=h,e[h].type=e[h]["@attributes"].type,
Smits.PhyloCanvas.Render.Style[h]=e[h],Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList||(Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList=[]),Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.push(h);else for(var o in Smits.PhyloCanvas.Render.Style[h]||(Smits.PhyloCanvas.Render.Style[h]={}),e[h]["@attributes"])o!="_attributes"&&o!="_children"&&o!="type"&&(Smits.PhyloCanvas.Render.Style[h][o.replace("_","-")]=e[h]["@attributes"][o])}j&&j.parameters&&n(j.parameters);if(j&&j.charts)for(h in j=
j.charts,j)j[h]["@attributes"].chart=h,j[h]["@attributes"].type=="binary"?Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(j[h]["@attributes"]):j[h]["@attributes"].type=="integratedBinary"?Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(j[h]["@attributes"]):j[h]["@attributes"].type=="bar"&&Smits.PhyloCanvas.Render.Parameters.barCharts.push(j[h]["@attributes"]);if(d.tree&&k.trees[0]&&k.trees[0].tree[d.tree-1])l=k.trees[0].tree[d.tree-1].edge,m=k.trees[0].tree[d.tree-1].node;else{for(h=
0;h<k.trees.tree.edge.length;h++)l.push(k.trees.tree.edge[h]["@attributes"]);for(h=0;h<k.trees.tree.node.length;h++){d=k.trees.tree.node[h]["@attributes"];if(d.label)d.chart=k.trees.tree.node[h].chart;m.push(d)}}for(h=0;h<m.length;h++)m[h].root&&m[h].root=="true"&&(b=m[h]);b?(b=q(b),b=g(b)):f="Error. Currently, only rooted NeXML trees are supported."}}();Smits.PhyloCanvas.NexmlParse.prototype={};Smits.PhyloCanvas.Render={};
Smits.PhyloCanvas.Render.Style={line:{stroke:"rgb(0,0,0)","stroke-width":1},text:{"font-family":"Verdana","font-size":12,"text-anchor":"start"},path:{stroke:"rgb(0,0,0)","stroke-width":1},connectedDash:{stroke:"rgb(200,200,200)","stroke-dasharray":". "},textSecantBg:{fill:"#EEE",stroke:"#DDD"},highlightedEdgeCircle:{fill:"red"},barChart:{fill:"#003300",stroke:"#DDD"},getStyle:function(a,c){return this[a]?this[a]:this[c]}};
Smits.PhyloCanvas.Render.Parameters={jsOverride:0,Rectangular:{bufferX:200,bufferY:40,bufferInnerLabels:10,bufferOuterLabels:5,minHeightBetweenLeaves:10,alignPadding:0,alignRight:!1,showScaleBar:!1},Circular:{bufferRadius:0.33,bufferAngle:20,initStartAngle:160,innerCircleRadius:0,minHeightBetweenLeaves:5,bufferInnerLabels:2,bufferOuterLabels:5},binaryCharts:[],integratedBinaryCharts:[],barCharts:[],binaryChartBufferInner:5,binaryChartBufferSiblings:0.01,binaryChartThickness:15,binaryChartDisjointed:!1,
barChartBufferInner:3,barChartHeight:50,barChartWidth:0.5,mouseRollOver:function(a){if(a.node.edgeCircleHighlight)a.node.edgeCircleHighlight.show();else{var c=a.svg.draw(new Smits.PhyloCanvas.Render.Circle(a.x,a.y,5,{attr:Smits.PhyloCanvas.Render.Style.highlightedEdgeCircle}));a.node.edgeCircleHighlight=c[0]}a.textEl.attr({fill:"red"})},mouseRollOut:function(a){a.node.edgeCircleHighlight.hide();a.textEl.attr({fill:"#000"})},set:function(a,c,b){this.jsOverride||(b?b=="circular"?this.Circular[a]=parseFloat(c):
b=="rectangular"&&(this.Rectangular[a]=parseFloat(c)):this[a]=parseFloat(c))}};Smits.PhyloCanvas.Render.Line=function(){return function(a,c,b,f,l){this.type="line";this.attr=Smits.PhyloCanvas.Render.Style.line;this.x1=a;this.x2=c;this.y1=b;this.y2=f;if(l&&(Smits.Common.apply(this,l),l.attr))this.attr=l.attr}}();
Smits.PhyloCanvas.Render.Text=function(){return function(a,c,b,f){this.type="text";this.attr=Smits.PhyloCanvas.Render.Style.text;this.x=a;this.y=c;this.text=b;if(f&&(Smits.Common.apply(this,f),f.attr))this.attr=f.attr}}();Smits.PhyloCanvas.Render.Path=function(){return function(a,c){this.type="path";this.attr=Smits.PhyloCanvas.Render.Style.path;this.path=a;if(c&&(Smits.Common.apply(this,c),c.attr))this.attr=c.attr}}();
Smits.PhyloCanvas.Render.Circle=function(){return function(a,c,b,f){this.type="circle";this.x=a;this.y=c;this.radius=b;if(f&&(Smits.Common.apply(this,f),f.attr))this.attr=f.attr}}();Smits.PhyloCanvas.Render.SVG=function(){return function(a,c,b){this.canvasSize=[c,b];this.svg=Raphael(a,this.canvasSize[0],this.canvasSize[1])}}();
Smits.PhyloCanvas.Render.SVG.prototype={render:function(){for(var a=this.phylogramObject.getDrawInstructs(),c=0;c<a.length;c++)if(a[c].type=="line")this.svg.path(["M",a[c].x1,a[c].y1,"L",a[c].x2,a[c].y2]).attr(Smits.PhyloCanvas.Render.Style.line);else if(a[c].type=="path")this.svg.path(a[c].path).attr(a[c].attr);else if(a[c].type=="circle")this.svg.circle(a[c].x,a[c].y,a[c].radius).attr({stroke:"red"});else{var b=this.svg.text(a[c].x,a[c].y,a[c].text).attr(Smits.PhyloCanvas.Render.Style.text);a[c].attr&&
b.attr(a[c].attr);a[c].rotate&&b.rotate(a[c].rotate);b.getBBox()}},draw:function(a){var c,b;a.type=="line"?c=this.svg.path(["M",a.x1,a.y1,"L",a.x2,a.y2]).attr(Smits.PhyloCanvas.Render.Style.line):a.type=="path"?c=this.svg.path(a.path).attr(a.attr):a.type=="circle"?c=this.svg.circle(a.x,a.y,a.radius).attr({stroke:"red"}):a.type=="text"&&(c=this.svg.text(a.x,a.y,a.text).attr(Smits.PhyloCanvas.Render.Style.text),a.attr&&c.attr(a.attr),a.rotate&&c.rotate(a.rotate),a=c.getBBox(),b=Math.sqrt(a.height*a.height+
a.width*a.width));return[c,b]}};
Smits.PhyloCanvas.Render.Phylogram=function(){var a,c=Smits.PhyloCanvas.Render.Parameters.Rectangular,b,f,l,m,q,g,n=!0,d=0,k=0,j,e,h,o,p=[],r=function(b,e){b.len&&(n?n=!1:b.children.length==0&&(d=Smits.Common.roundFloat(d+m,4)));if(b.children.length>0){var j=[],h,f,o,g;b.len&&(h=e,f=e=Smits.Common.roundFloat(e+l*b.len,4),g=o=d+b.getMidbranchPosition()*m,a.draw(new Smits.PhyloCanvas.Render.Line(h,f,o,g)));if(b.name){h={};h=Smits.PhyloCanvas.Render.Style.getStyle("bootstrap","text");if(b.uri)h.href=
b.uri;if(b.description)h.title=b.description;if(b.level==0){f=2;var u=d+b.getMidbranchPosition()*m}else u=g;a.draw(new Smits.PhyloCanvas.Render.Text(f+5,u,b.name,{attr:h}))}if(b.children&&b.children.length)for(f=0;f<b.children.length;f++)j.push(r(b.children[f],e));h=[];for(f=0;f<j.length;f++)j[f][0]&&h.push(j[f][0]),j[f][1]&&h.push(j[f][1]);j=Math.min.apply(null,h);h=Math.max.apply(null,h);a.draw(new Smits.PhyloCanvas.Render.Path(["M",e+1.0E-4,j,"L",e,j,"L",e,h,"L",e+1.0E-4,h],{attr:Smits.PhyloCanvas.Render.Style.line}))}else if(h=
e,f=Smits.Common.roundFloat(e+l*b.len,2),g=o=d,b.y=d,p.push(b),a.draw(new Smits.PhyloCanvas.Render.Line(h,f,o,g)),c.alignRight&&a.draw(new Smits.PhyloCanvas.Render.Path(["M",f,o,"L",c.alignPadding+q,g],{attr:Smits.PhyloCanvas.Render.Style.connectedDash})),b.name){h={};b.style&&(h=Smits.PhyloCanvas.Render.Style.getStyle(b.style,"text"));h["text-anchor"]="start";if(b.uri)h.href=b.uri;if(b.description)h.title=b.description;j=a.draw(new Smits.PhyloCanvas.Render.Text(c.alignRight?q+c.bufferInnerLabels+
c.alignPadding:f+c.bufferInnerLabels,g,b.name,{attr:h}));b.style&&console.log([b,h]);k=Math.max(j[1],k);Smits.PhyloCanvas.Render.Parameters.mouseRollOver&&Smits.Common.addEventHandler(j[0].node,"mouseover",Smits.PhyloCanvas.Render.Parameters.mouseRollOver,{svg:a,node:b,x:f,y:g,textEl:j[0]});Smits.PhyloCanvas.Render.Parameters.mouseRollOut&&Smits.Common.addEventHandler(j[0].node,"mouseout",Smits.PhyloCanvas.Render.Parameters.mouseRollOut,{svg:a,node:b,x:f,y:g,textEl:j[0]});Smits.PhyloCanvas.Render.Parameters.onClickAction&&
Smits.Common.addEventHandler(j[0].node,"click",Smits.PhyloCanvas.Render.Parameters.onClickAction,{svg:a,node:b,x:f,y:g,textEl:j[0]})}return[o,g]},u=function(d,c,b){for(var e=(b&&b.bufferInner?b.bufferInner:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,j=(b&&b.bufferSiblings?b.bufferSiblings*m:0)|(Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings<1?m*Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),
b=(b&&b.thickness?b.thickness:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartThickness,h=0;h<p.length;h++){var k=p[h];a.draw(new Smits.PhyloCanvas.Render.Path(["M",d+e,k.y-m/2+j/2,"L",d+e+b,k.y-m/2+j/2,"L",d+e+b,k.y+m/2-j/2,"L",d+e,k.y+m/2-j/2,"Z"],{attr:Smits.PhyloCanvas.Render.Style.getStyle(k.chart[c],"textSecantBg")}))}return d+e+b},A=function(d,c,b){for(var e=[],j=b&&b.bufferInner?b.bufferInner:0|Smits.PhyloCanvas.Render.Parameters.barChartBufferInner,h=b&&b.height?b.height:0|Smits.PhyloCanvas.Render.Parameters.barChartHeight,
b=b&&b.width?b.width<1?m*b.width:b.width:0|(Smits.PhyloCanvas.Render.Parameters.barChartWidth<1?m*Smits.PhyloCanvas.Render.Parameters.barChartWidth:Smits.PhyloCanvas.Render.Parameters.barChartWidth),k=0,f=0;f<p.length;f++)e.push(p[f].chart[c]);e=Math.max.apply(null,e);k=Smits.Common.roundFloat(h/e,4);for(f=0;f<p.length;f++)e=p[f],a.draw(new Smits.PhyloCanvas.Render.Path(["M",d+j,e.y-b/2,"L",d+j+k*e.chart[c],e.y-b/2,"L",d+j+k*e.chart[c],e.y+b/2,"L",d+j,e.y+b/2,"Z"],{attr:Smits.PhyloCanvas.Render.Style.getStyle(e.chart[c],
"barChart")}));return d+j+h};return function(p,n){d=0;this.getCanvasSize=function(){return[b,f]};this.getRoot=function(){return n.getRoot()};n.getValidate()&&a.draw(0,0,n.getValidate());a=p;var t=n.getRoot(),C=n.getNewickLen();b=a.canvasSize[0];f=a.canvasSize[1];h=c.bufferX;o=c.bufferY;g=c.minHeightBetweenLeaves;l=Math.round((b-h)/C);m=Math.round((f-o)/(c.showScaleBar?t.getCountAllChildren()+1:t.getCountAllChildren()));m<g&&(m=g);q=Math.round(b-h);if(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length||
Smits.PhyloCanvas.Render.Parameters.barCharts.length)c.alignRight=!0;r(t,0);c.showScaleBar&&(y=d+m,e=c.showScaleBar*l,a.draw(new Smits.PhyloCanvas.Render.Line(0,e,y,y)),a.draw(new Smits.PhyloCanvas.Render.Text((0+e)/2,y-8,c.showScaleBar)));j=q+k+c.bufferInnerLabels;if(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length){var t=Smits.PhyloCanvas.Render.Parameters.binaryCharts,s;for(s in t)j=u(j,t[s].chart,t[s])}if(Smits.PhyloCanvas.Render.Parameters.barCharts.length)for(s in t=Smits.PhyloCanvas.Render.Parameters.barCharts,
t)A(j,t[s].chart,t[s])}}();Smits.PhyloCanvas.Render.Phylogram.prototype={};
Smits.PhyloCanvas.Render.CircularPhylogram=function(){function a(a,d){d+=E;return[Smits.Common.roundFloat(t+a*Math.sin(d*G),4),Smits.Common.roundFloat(C+a*Math.cos(d*G),4)]}function c(a){a=l(90-a-E);if(a>90&&a<270){a+=180;var d="end"}else d="start";return[a,d]}function b(d,b,c,e){var j=a(d,b),h=a(d,c),k=[],f=0,b=Math.abs(l(c-b))>180?1:-1;e&&e.invertSecant&&(b*=-1,f=1);(!e||!e.noMove)&&k.push("M");k.push(j[0],j[1],"A",d,d,0,b<1?0:1,f,h[0],h[1]);return k}function f(d,b,c,e){var j=[],b=a(b,d),d=a(c,
d);(!e||!e.noMove)&&j.push("M");j.push(b[0],b[1],"L",d[0],d[1]);return j}function l(a){for(;a>360||a<0;)a>360?a-=360:a<0&&(a+=360);return a}function m(a,d,c,e){!d&&a.length>1&&(e=a[3],c=a[2],d=a[1],a=a[0]);return g("M",b(a,c,e,{noMove:1,invertSecant:0}),"L",b(d,e,c,{noMove:1,invertSecant:1}),"Z")}function q(d,h){d.len&&(F?(B=D||1,F=!1):d.children.length==0&&(B=Smits.Common.roundFloat(B+u,4)));if(d.children.length>0){var k=[],p,l,o;p=h;l=h+=Smits.Common.roundFloat(r*d.len,4);if(d.children&&d.children.length)for(var m=
0;m<d.children.length;m++){var n=q(d.children[m],h);n>0&&k.push(n)}m=Smits.Common.roundFloat(Math.min.apply(null,k),4);k=Smits.Common.roundFloat(Math.max.apply(null,k),4);j.draw(new Smits.PhyloCanvas.Render.Path(g("M",a(h+0.01,m),"L",b(h,m,k,{noMove:!0}),"L",a(h+0.01,k))));d.len&&(o=Smits.Common.roundFloat(m+(k-m)/2,4),j.draw(new Smits.PhyloCanvas.Render.Path(f(o,p,l))))}else if(d.y=B,w.push(d),p=h,l=Smits.Common.roundFloat(h+r*d.len),o=B,j.draw(new Smits.PhyloCanvas.Render.Path(f(o,p,l))),j.draw(new Smits.PhyloCanvas.Render.Path(f(o,
l,s),{attr:Smits.PhyloCanvas.Render.Style.connectedDash})),d.name){p=a(s+e.bufferInnerLabels,o);m=c(o);k=m[0];m=m[1];n={};d.style&&Smits.Common.apply(n,Smits.PhyloCanvas.Render.Style.getStyle(d.style,"text"));n["text-anchor"]=m;if(d.uri)n.href=d.uri;if(d.description)n.title=d.description;k=j.draw(new Smits.PhyloCanvas.Render.Text(p[0],p[1],d.name,{attr:n,rotate:[k,p[0],p[1]]}));d.bgStyle&&v.push([d.bgStyle,o]);p=a(l,o);Smits.PhyloCanvas.Render.Parameters.mouseRollOver&&Smits.Common.addEventHandler(k[0].node,
"mouseover",Smits.PhyloCanvas.Render.Parameters.mouseRollOver,{svg:j,node:d,x:p[0],y:p[1],textEl:k[0]});Smits.PhyloCanvas.Render.Parameters.mouseRollOut&&Smits.Common.addEventHandler(k[0].node,"mouseout",Smits.PhyloCanvas.Render.Parameters.mouseRollOut,{svg:j,node:d,x:p[0],y:p[1],textEl:k[0]});Smits.PhyloCanvas.Render.Parameters.onClickAction&&Smits.Common.addEventHandler(k[0].node,"click",Smits.PhyloCanvas.Render.Parameters.onClickAction,{svg:j,node:d,x:p[0],y:p[1],textEl:k[0]});z=Math.max(k[1],
z)}return o}function g(a){for(var d=a,b=1;b<arguments.length;b++)d=d.concat(arguments[b]);return d}function n(){var a=[];if(v.length>0){if(Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList)for(var d=0;d<Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.length;d++){var b=Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList[d],b=Smits.Common.createGradientEl(b,Smits.PhyloCanvas.Render.Style[b],[t,C,s+z+e.bufferOuterLabels]);j.svg.defs.appendChild(b)}for(d=0;d<v.length;d++)d!=v.length-1&&v[d][0]==
v[d+1][0]?v[d+1][2]=v[d][2]?v[d][2]:v[d][1]:(a=m(s,s+z+e.bufferOuterLabels,v[d][2]?v[d][2]-u/2:v[d][1]-u/2,v[d][1]+u/2),b=Smits.PhyloCanvas.Render.Style.getStyle(v[d][0],"textSecantBg"),a=j.draw(new Smits.PhyloCanvas.Render.Path(a,{attr:b.type?{}:b})),b.type&&b.type=="radialGradient"&&a[0].node.setAttribute("fill","url(#"+b.name+")"),b.type&&b.type=="radialGradient"&&a[0].node.setAttribute("stroke","none"),a[0].toBack())}a=m(s,s+z+e.bufferOuterLabels,(D||1)+u/2,360+u/2);a=j.draw(new Smits.PhyloCanvas.Render.Path(a,
{attr:Smits.PhyloCanvas.Render.Style.textSecantBg}));a[0].toBack();return s+z+e.bufferOuterLabels}function d(d,b,e){for(var h=e&&e.bufferInner?parseFloat(e.bufferInner):Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,k=(e&&e.bufferSiblings?e.bufferSiblings*u:0)|(Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings<1?u*Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),f=e&&e.thickness?parseFloat(e.thickness):
Smits.PhyloCanvas.Render.Parameters.binaryChartThickness,p=(e&&e.disjointed?e.disjointed:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartDisjointed,e=e&&e.isInternal?e.isInternal:!1,o=!0,g,n=0;n<w.length;n++){var r=w[n];if((!w[n+1]||r.chart[b]!==w[n+1].chart[b]||p)&&r.chart[b]!="none"){var q=Smits.PhyloCanvas.Render.Style.getStyle(r.chart[b],"textSecantBg");g=e?[s-h-f,s-h,(g?g:r.y)-u/2+(o&&!p?0:k/2),r.y+u/2-(n==w.length-1&&!p?0:k/2)]:[d+h,d+h+f,(g?g:r.y)-u/2+(o&&!p?0:k/2),r.y+u/2-(n==w.length-1&&
!p?0:k/2)];if(q.label){var o=Smits.PhyloCanvas.Render.Style.getStyle(q.labelStyle,"text"),r=a((g[0]+g[1])/2,(g[2]+g[3])/2),t=c((g[2]+g[3])/2),t=l(t[0]+(o.rotate?parseFloat(o.rotate):0)),v=l(90-(g[2]+g[3])/2-E);v>90&&v<270&&(t+=180);o["text-anchor"]||(o["text-anchor"]="middle");j.draw(new Smits.PhyloCanvas.Render.Text(r[0],r[1],q.label,{attr:o,rotate:t}))[0].toBack()}q.borderStyle&&(o=Smits.PhyloCanvas.Render.Style.getStyle(q.borderStyle,"textSecantBg"),j.draw(new Smits.PhyloCanvas.Render.Path(m([s,
o.fullsize?g[1]:g[0],g[2],g[3]]),{attr:o}))[0].toBack());j.draw(new Smits.PhyloCanvas.Render.Path(m(g),{attr:q}))[0].toBack();g=0}else{if(!g)g=r.y;r.chart[b]=="none"&&(g=0)}o=!1}return e?d:d+h+f}function k(d,a,b){for(var c=[],e=b&&b.bufferInner?parseFloat(b.bufferInner):Smits.PhyloCanvas.Render.Parameters.barChartBufferInner,h=b&&b.height?parseFloat(b.height):Smits.PhyloCanvas.Render.Parameters.barChartHeight?Smits.PhyloCanvas.Render.Parameters.barChartHeight:0,b=b&&b.width?parseFloat(b.width)<1?
u*parseFloat(b.width):parseFloat(b.width):0|(Smits.PhyloCanvas.Render.Parameters.barChartWidth<1?u*Smits.PhyloCanvas.Render.Parameters.barChartWidth:Smits.PhyloCanvas.Render.Parameters.barChartWidth),k=0,f=0;f<w.length;f++)c.push(w[f].chart[a]);c=Math.max.apply(null,c);k=Smits.Common.roundFloat(h/c,4);for(f=0;f<w.length;f++)c=w[f],c.chart[a]>0&&j.draw(new Smits.PhyloCanvas.Render.Path(m(d+e,d+e+k*c.chart[a],c.y-b/2,c.y+b/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(c.chart[a],"barChart")}));return d+
e+h}var j,e=Smits.PhyloCanvas.Render.Parameters.Circular,h,o,p,r,u,A,F=!0,B=0,t,C,s,w=[],v=[],D,x,z=0,E,G=Math.PI/180;return function(a,b,c){this.getCanvasSize=function(){return[h,o]};this.getRoot=function(){return b.getRoot()};if(b.getValidate())a.draw({type:"text",x:0,y:a.canvasSize[1]/3,text:b.getValidate()});else{j=a;var a=b.getRoot(),f=b.getNewickLen();h=j.canvasSize[0];o=j.canvasSize[1];t=h/2;C=o/2;p=Math.min.apply(null,[h,o]);c=e.bufferRadius>1?e.bufferRadius:Smits.Common.roundFloat(p*e.bufferRadius,
4);D=e.bufferAngle;A=e.innerCircleRadius;E=e.initStartAngle;s=Math.round((p-c-A)/2);r=(s-A)/f;u=Smits.Common.roundFloat((360-D)/a.getCountAllChildren(),4);q(a,A);x=s+z+e.bufferOuterLabels;if(Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.length){var c=Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts,g;for(g in c)x=d(x-(c[g].thickness?c[g].thickness:Smits.PhyloCanvas.Render.Parameters.binaryChartThickness)-(c[g].bufferInner?c[g].bufferInner:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner),
c[g].chart,c[g])}x=n();if(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length)for(g in c=Smits.PhyloCanvas.Render.Parameters.binaryCharts,c)x=d(x,c[g].chart,c[g]);if(Smits.PhyloCanvas.Render.Parameters.barCharts.length)for(g in c=Smits.PhyloCanvas.Render.Parameters.barCharts,c)x=k(x,c[g].chart,c[g])}}}();Smits.PhyloCanvas.Render.CircularPhylogram.prototype={};
var XMLObjectifier=function(){var a=function(a){var b="";a&&typeof a==="string"&&(b=a);return/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/.test(b)};return{xmlToJSON:function(c){try{if(!c)return null;var b={typeOf:"JSXBObject"},f=c.nodeType==9?c.documentElement:c;b.RootName=f.nodeName||"";if(c.nodeType==3||c.nodeType==4)return c.nodeValue;var l=function(a){return a.replace(/^\s+|\s+$/gm,"")},m=function(a,b){if(b.attributes.length>0){var c=b.attributes.length-1,e;a._attributes=[];do e=String(String(b.attributes[c].name).replace(/-/g,
"_")),a._attributes.push(e),a[e]=l(b.attributes[c].value);while(c--)}};(function(){return{activate:function(){var a=[];a.getNodesByAttribute=function(b,c){if(a&&a.length>0){var e=[],h,f=a.length-1;try{do h=a[f],h[b]===c&&e.push(h);while(f--);e.reverse();return e}catch(g){}return null}};a.getNodeByAttribute=function(b,c){if(a&&a.length>0){var e,h=a.length-1;try{do if(e=a[h],e[b]===c)return e;while(h--)}catch(f){}return null}};a.getNodesByValue=function(b){if(a&&a.length>0){var c=[],e,h=a.length-1;
try{do e=a[h],e.Text&&e.Text===b&&c.push(e);while(h--);return c}catch(f){}return null}};a.contains=function(b,c){if(a&&a.length>0){var e=a.length-1;try{do if(a[e][b]===c)return!0;while(e--)}catch(h){}return!1}};a.indexOf=function(b,c){var e=-1;if(a&&a.length>0){var h=a.length-1;try{do a[h][b]===c&&(e=h);while(h--)}catch(f){return-1}return e}};a.SortByAttribute=function(b,c){if(a&&a.length>0){var e=function(a,b){var d=a[b];return d=bam.validation.isNumeric(d)?parseFloat(d):d};a.sort(function(a,d){var f,
g;f=e(a,b);g=e(d,b);f=f<g?-1:g<f?1:0;c&&(f=c.toUpperCase()==="DESC"?0-f:f);return f})}};a.SortByValue=function(b){if(a&&a.length>0){var c=function(a){a=a.Text;return a=bam.validation.isNumeric(a)?parseFloat(a):a};a.sort(function(a,d){var f,g;f=c(a);g=c(d);f=f<g?-1:g<f?1:0;b&&(f=b.toUpperCase()==="DESC"?0-f:f);return f})}};a.SortByNode=function(b,c){if(a&&a.length>0){var e=function(a,b){var d=a[b][0].Text;return d=bam.validation.isNumeric(d)?parseFloat(d):d};a.sort(function(a,d){var f,g;f=e(a,b);g=
e(d,b);f=f<g?-1:g<f?1:0;c&&(f=c.toUpperCase()==="DESC"?0-f:f);return f})}};return a}}})();var q=function(b){b.getNodeByAttribute=function(a,b){if(this.length>0){var d,c=this.length-1;try{do if(d=this[c],d[a]==b)return d;while(c--)}catch(f){}return!1}};b.contains=function(a,b){if(this.length>0){var d=this.length-1;try{do if(this[d][a]==b)return!0;while(d--)}catch(c){}return!1}};b.indexOf=function(a,b){var d=-1;if(this.length>0){var c=this.length-1;try{do this[c][a]==b&&(d=c);while(c--)}catch(f){return-1}return d}};
b.SortByAttribute=function(b,d){if(this.length){var c=function(b,d){var c=b[d];return c=a(c)?parseFloat(c):c};this.sort(function(a,f){var g=0,l,m;l=c(a,b);m=c(f,b);l<m?g=-1:m<l&&(g=1);d&&(g=d.toUpperCase()=="DESC"?0-g:g);return g})}};b.SortByValue=function(b){if(this.length){var d=function(b){b=b.Text;return b=a(b)?parseFloat(b):b};this.sort(function(a,c){var f=0,g,l;g=d(a);l=d(c);g<l?f=-1:l<g&&(f=1);b&&(f=b.toUpperCase()=="DESC"?0-f:f);return f})}};b.SortByNode=function(b,d){if(this.length){var c=
function(b,d){var c=b[d][0].Text;return c=a(c)?parseFloat(c):c};this.sort(function(a,f){var g=0,l,m;l=c(a,b);m=c(f,b);l<m?g=-1:m<l&&(g=1);d&&(g=d.toUpperCase()=="DESC"?0-g:g);return g})}}},g=function(a,b){var c,e,f,n="";if(!b)return null;b.attributes.length>0&&m(a,b);a.Text="";if(b.hasChildNodes()){var p=b.childNodes.length-1,r=0;do switch(e=b.childNodes[r],e.nodeType){case 1:a._children=[];c=e.localName?e.localName:e.baseName;c=String(c).replace(/-/g,"_");n!=c&&a._children.push(c);a[c]||(a[c]=[]);
f={};a[c].push(f);e.attributes.length>0&&m(f,e);a[c].contains||q(a[c]);n=c;e.hasChildNodes()&&g(f,e);break;case 3:a.Text+=l(e.nodeValue);break;case 4:a.Text+=e.text?l(e.text):l(e.nodeValue)}while(r++<p)}};g(b,f);f=c=null;return b}catch(n){return null}},textToXML:function(a){var b=null;try{b=document.all?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser,b.async=!1}catch(f){throw Error("XML Parser could not be instantiated");}var l;try{l=document.all?b.loadXML(a)?b:!1:b.parseFromString(a,"text/xml")}catch(m){throw Error("Error parsing XML string");
}return l}}}();