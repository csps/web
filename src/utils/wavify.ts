import gsap from "gsap";

type WavifyOptions = {
  container?: string;
  height?: number;
  amplitude?: number;
  speed?: number;
  bones?: number;
  color?: string;
}

/*
 * Wavify
 * JavaScript library to make some nice waves
 * by peacepostman @ potion
 * Modified by @mavyfaby (Maverick Fabroa)
 */
export function wavify(wave_element: HTMLElement, options?: WavifyOptions) {
  if ("undefined" === typeof options) options = {};

  //  Options
  //
  //
  var settings = Object.assign(
    {},
    {
      container: options.container ? options.container : "body",
      // Height of wave
      height: 200,
      // Amplitude of wave
      amplitude: 100,
      // Animation speed
      speed: 0.15,
      // Total number of articulation in wave
      bones: 3,
      // Color
      color: "rgba(255,255,255, 0.20)"
    },
    options
  );

  const container = document.querySelector(settings.container);

  if (!container) {
    throw new Error(`No container found for ${settings.container}`);
  }

  var wave = wave_element,
    width = container.getBoundingClientRect()
      .width,
    height = container.getBoundingClientRect()
      .height,
    lastUpdate = 0,
    totalTime = 0,
    animationInstance = -1,
    tweenMaxInstance: gsap.core.Tween;

  //  Allow new settings, avoid setting new container for logic purpose please :)
  //
  function rebuilSettings(params: WavifyOptions) {
    settings = Object.assign({}, settings, params);
  }

  function drawPoints(factor: number) {
    var points = [];

    for (var i = 0; i <= settings.bones; i++) {
      var x = (i / settings.bones) * width;
      var sinSeed =
        (factor + (i + (i % settings.bones))) * settings.speed * 100;
      var sinHeight = Math.sin(sinSeed / 100) * settings.amplitude;
      var yPos = Math.sin(sinSeed / 100) * sinHeight + settings.height;
      points.push({ x: x, y: yPos });
    }

    return points;
  }

  function drawPath(points: string | any[]) {
    var SVGString = "M " + points[0].x + " " + points[0].y;

    var cp0 = {
      x: (points[1].x - points[0].x) / 2,
      y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
    };

    SVGString +=
      " C " +
      cp0.x +
      " " +
      cp0.y +
      " " +
      cp0.x +
      " " +
      cp0.y +
      " " +
      points[1].x +
      " " +
      points[1].y;

    var prevCp = cp0;
    var inverted = -1;

    for (var i = 1; i < points.length - 1; i++) {
      var cp1 = {
        x: points[i].x - prevCp.x + points[i].x,
        y: points[i].y - prevCp.y + points[i].y
      };

      SVGString +=
        " C " +
        cp1.x +
        " " +
        cp1.y +
        " " +
        cp1.x +
        " " +
        cp1.y +
        " " +
        points[i + 1].x +
        " " +
        points[i + 1].y;
      prevCp = cp1;
      inverted = -inverted;
    }

    SVGString += " L " + width + " " + height;
    SVGString += " L 0 " + height + " Z";
    return SVGString;
  }

  //  Draw function
  //
  //
  function draw() {
    var now = Date.now();

    if (lastUpdate) {
      var elapsed = (now - lastUpdate) / 1000;
      lastUpdate = now;
      totalTime += elapsed;

      var factor = totalTime * Math.PI;

      tweenMaxInstance = gsap.to(wave, {
        duration: 0,
        attr: {
          d: drawPath(drawPoints(factor))
        },
      });

    } else {
      lastUpdate = now;
    }

    animationInstance = requestAnimationFrame(draw);
  }

  //  Pure js debounce function to optimize resize method
  //
  //
  function debounce(func: { (): void; apply?: any; }, wait: number | undefined, immediate?: boolean) {
    var timeout: NodeJS.Timeout | null;

    return function(this: any) {
      var context = this, args = arguments;
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  //  Redraw for resize with debounce
  //
  var redraw = debounce(function() {
    pause();
    totalTime = 0;
    width = container.getBoundingClientRect()
      .width;
    height = container.getBoundingClientRect()
      .height;
    lastUpdate = -1;
    play();
  }, 250);

  function boot() {
    if (animationInstance === -1) {
      tweenMaxInstance = gsap.set(wave, { attr: { fill: settings.color } });
      play();
      window.addEventListener("resize", redraw);
    }

    
  }

  function reboot(options: any) {
    kill();
    if (typeof options !== undefined) {
      rebuilSettings(options);
    }
    tweenMaxInstance = gsap.set(wave, { attr: { fill: settings.color } });
    play();
    window.addEventListener("resize", redraw);
  }

  function play() {
    if (animationInstance === -1) {
      animationInstance = requestAnimationFrame(draw);
    }
  }

  function pause() {
    if (animationInstance) {
      cancelAnimationFrame(animationInstance);
      animationInstance = -1;
    }
  }

  function updateColor(options: { timing: string | number; color: string; onComplete: () => void; }) {
    if (typeof options.timing === undefined) {
      options.timing = 1;
    }
    if (typeof options.color === undefined) {
      options.color = settings.color;
    }
    tweenMaxInstance = gsap.to(wave, {
      duration: typeof options.timing === "string" ? parseInt(options.timing) : options.timing,
      attr: { fill: options.color },
      onComplete: function() {
        if (
          typeof options.onComplete !== undefined &&
          {}.toString.call(options.onComplete) === "[object Function]"
        ) {
          options.onComplete();
        }
      }
    });
  }

  function kill() {
    if (animationInstance) {
      pause();
      tweenMaxInstance.kill();
      tweenMaxInstance = gsap.set(wave, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 0,
        clearProps: "all",
        attr: {
          d: "M0,0",
          fill: ""
        }
      });
      window.removeEventListener("resize", redraw);
      animationInstance = -1;
    }
  }

  //  Boot Wavify
  //
  boot();

  return {
    reboot: reboot,
    play: play,
    pause: pause,
    kill: kill,
    updateColor: updateColor
  };
}