
/**
 * Waves animation
 * @author cojdev (Charles Ojukwu)
 * @author mavyfaby (Maverick Fabroa)
 * 
 * @param cvs Canvas element
 * @param fg Foreground color
 */
export default function wave(cvs: HTMLCanvasElement, fg: string) {
  let ctx: CanvasRenderingContext2D = cvs.getContext("2d")!;
  let nodes = 8;
  let wave: Wave;
  let waveHeight = 60;

  function update() {
    ctx.globalCompositeOperation = "destination-out"
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.globalCompositeOperation = "source-over"

    for (var j = 0; j < wave.nodes.length; j++) {
      bounce(wave.nodes[j]);
    }

    drawWave(wave);
    requestAnimationFrame(update);
  }

  class Wave {
    public colour: string;
    public nodes: any[];

    constructor(colour: string, nodes: number) {
      this.colour = colour;
      this.nodes = [];

      for (var i = 0; i <= nodes + 2; i++) {
        var temp: any = [(i - 1) * cvs.width / nodes, 0, Math.random() * 200, .3];
        this.nodes.push(temp);
      }
    }

    setColor(colour: string) {
      this.colour = colour;
    }
  }

  function bounce(nodeArr: any[]) {
    nodeArr[1] = waveHeight / 2 * Math.sin(nodeArr[2] / 20) + cvs.height / 2;
    nodeArr[2] = nodeArr[2] + nodeArr[3];
  }

  function drawWave(obj: { colour: string | CanvasGradient | CanvasPattern; nodes: string | any[]; }) {
    var diff = function (a: number, b: number) {
      return (b - a) / 2 + a;
    }

    ctx.beginPath();
    ctx.fillStyle = obj.colour;
    ctx.moveTo(0, cvs.height);
    ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);

    for (var i = 0; i < obj.nodes.length; i++) {

      if (obj.nodes[i + 1]) {
        ctx.quadraticCurveTo(
          obj.nodes[i][0], obj.nodes[i][1],
          diff(obj.nodes[i][0], obj.nodes[i + 1][0]), diff(obj.nodes[i][1], obj.nodes[i + 1][1])
        );
      }
      else {
        ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
        ctx.lineTo(cvs.width, cvs.height);
      }
    }

    ctx.closePath();
    ctx.fill();
  }

  function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
    }
    else {

      if (window.innerWidth > 1920) {
        canvas.width = window.innerWidth;
      }
      else {
        canvas.width = 1920;
      }

      canvas.height = waveHeight;
    }
  }

  resizeCanvas(cvs, window.innerWidth, waveHeight);
  wave = new Wave(fg, nodes);
  update();

  window.addEventListener("resize", function () {
    resizeCanvas(cvs, window.innerWidth, waveHeight);
  })

  function setColor(fg: string) {
    wave.setColor(fg);
  }

  return {
    setColor
  };
}