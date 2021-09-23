(()=>{"use strict";const e=window,o=dat.gui,t=new e.Textformer({output:"#demo-title",from:"",to:"Textformer",mode:e.Textformer.modes.EXPAND,steps:20,stagger:3,noise:0,speed:15,easing:e.Textformer.ease.CIRC_OUT,delay:500,loop:!0,yoyo:!0,align:e.Textformer.align.LEFT,fill:"."}),n="\nEasy text animations with\nrandom character changes.\n\nExample usage :\n\nconst textformer = new Textformer( {\n\n\t//Target\n\toutput: \"#demo-title\",\n\n\t//Texts\n\tfrom: '',\n\tto: 'Textformer',\n\n\t//Options\n\tmode: Textformer.modes.EXPAND,\n\tsteps: 20,\n\tstagger: 3,\n\n\t//Autoplay\n\tspeed: 15,\n\teasing: Textformer.ease.CIRC_OUT,\n\tdelay: 500,\n\n} );\n",a={element:document.querySelector("#demo-paragraph"),build:()=>{a.textformer.build({...t.options,...a.getOverrides()})},getOverrides:()=>{const e=t.textform.length,o=e>0?n.length/e*.25:10;return{output:a.element,from:"",to:n,stagger:Math.ceil(t.options.stagger/o),duration:t.options.duration||t.convertSpeedToDuration(t.options.speed),noise:0===t.options.noise?0:t.options.noise*o}}};a.textformer=t.clone(a.getOverrides()),t.options.duration||(t.options.duration=t.convertSpeedToDuration()),void 0===t.options.origin&&(t.options.origin=-1),t.player.onBegin=t.player.onComplete=()=>{const{options:e,player:o}=t;e.reversed=o.isReversed};const s=new o.GUI;s.controls={play:()=>{const e=t.player.isPlaying?"pause":"play";t[e](),a.textformer[e]()},rebuild:()=>{t.build(),a.build()},setPlayersProperty:(e,o)=>{t.player[e]=o,a.textformer.player[e]=o},updatePlayers:()=>{const{setPlayersProperty:o,play:n}=s.controls;o("repeat",t.options.loop?-1:0),o("isReversed",t.options.reversed),o("isYoyo",t.options.yoyo),o("ease",e.Textformer.easing[t.options.easing]),t.player.isPlaying||n()},updateProgress:()=>{t.pause(),a.textformer.pause(),s.controls.setPlayersProperty("progress",t.progress)}};const{rebuild:i,updatePlayers:r,updateProgress:d}=s.controls,p=s.addFolder("Textform");p.add(t.options,"from").onChange(i),p.add(t.options,"to").onChange(i),p.add(t.options,"mode",e.Textformer.modes).onChange(i),p.add(t.options,"steps",1,60).step(1).onChange(i),p.add(t.options,"stagger",0,30).step(1).onChange(i),p.add(t.options,"noise",0,30).step(1).onChange(i),p.open();const l=s.addFolder("Animation");l.add(t,"speed",1,30).step(1).onChange(i),l.add(t.options,"easing",e.Textformer.ease).onChange(r),l.add(t,"progress",0,1).step(.001).onChange(d).listen(),l.add(s.controls,"play"),l.open();const m=s.addFolder("Advanced");m.add(t.options,"charset",e.Textformer.charsets).onChange(i),m.add(t.options,"align",e.Textformer.align).onChange(i),m.add(t.options,"fill").onChange(i),m.add(t.options,"origin",-1,10).step(1).onChange(i);const g=s.addFolder("Advanced ( Animation )");g.add(t.options,"reversed").onChange(r).listen(),g.add(t.options,"loop").onChange(r),g.add(t.options,"yoyo").onChange(r),g.add(t.options,"delay",0,5e3).step(50).onChange(i),g.add(t.options,"duration",150,1e4).step(50).onChange(i).listen(),g.open();const c=navigator.userAgent||navigator.vendor||window.opera,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|mediump|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(c)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,4)),h=window.innerWidth<640;(u||h)&&s.close()})();