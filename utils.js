class Colors {
  constructor(color = '') {
    this.color = this.parseColor(color);
  }

  parseColor(color = '') {
    const prefix = color.slice(0, 3).toLowerCase();
    const vals = color.slice(3, -1).split(',').map(val => parseInt(val.trim()));
    const types = {
      hex: {type: "hex", value: color.slice(1)},
      rgb: {type: "rgb", value: {r: vals[0], g: vals[1], b: vals[2], a: vals[3] || 1}},
      hsl: {type: "hsl", value: {h: vals[0], s: vals[1], l: vals[2]}},
      cmyk: {type: "cmyk", value: {c: vals[0], m: vals[1], y: vals[2], k: vals[3]}},
      hsv: {type: "hsv", value: {h: vals[0], s: vals[1], v: vals[2]}}
    };
    return types[prefix] || (console.error("Error: Unrecognized color format.") && false);
  }

  getType(color) {
    return color ? this.parseColor(color).type : (console.error("Error: No color provided.") && false);
  }

  convertType(color, type = 'hex') {

  }

  hexToRgb(hex) {
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  hexToHsl(hex) {
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2,4), 16) / 255;
    let b = parseInt(hex.substring(4,6), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return "hsl(" + (h * 360).toFixed(0) + ", " + (s * 100).toFixed(0) + "%, " + (l * 100).toFixed(0) + "%)";
  }


  hexToHsv(hex) {
    const r = parseInt(hex.substring(0,2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4,6), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return "hsv(" + (h * 360).toFixed(0) + ", " + (s * 100).toFixed(0) + "%, " + (v * 100).toFixed(0) + "%)";
  }

  hexToCmyk(hex) {
    let r = parseInt(hex.substring(0,2), 16) / 255;
    let g = parseInt(hex.substring(2,4), 16) / 255;
    let b = parseInt(hex.substring(4,6), 16) / 255;

    let k = 1 - Math.max(r, g, b);
    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);

    return "cmyk(" + (c * 100).toFixed(0) + "%, " + (m * 100).toFixed(0) + "%, " + (y * 100).toFixed(0) + "%, " + (k * 100).toFixed(0) + "%)";
  }


  cmykToHex(cmyk) {
    let parts = cmyk.replace(/[^\d,.]/g, '').split(',');
    let c = parseInt(parts[0]) / 100;
    let m = parseInt(parts[1]) / 100;
    let y = parseInt(parts[2]) / 100;
    let k = parseInt(parts[3]) / 100;

    let r = Math.round((1 - Math.min(1, c * (1 - k) + k)) * 255).toString(16).padStart(2, '0');
    let g = Math.round((1 - Math.min(1, m * (1 - k) + k)) * 255).toString(16).padStart(2, '0');
    let b = Math.round((1 - Math.min(1, y * (1 - k) + k)) * 255).toString(16).padStart(2, '0');

    return "#" + r + g + b;
  }


  cmykToRgb(cmyk) {
    let parts = cmyk.replace(/[^\d,.]/g, '').split(',');
    let c = parseInt(parts[0]) / 100;
    let m = parseInt(parts[1]) / 100;
    let y = parseInt(parts[2]) / 100;
    let k = parseInt(parts[3]) / 100;

    let r = Math.round((1 - Math.min(1, c * (1 - k) + k)) * 255);
    let g = Math.round((1 - Math.min(1, m * (1 - k) + k)) * 255);
    let b = Math.round((1 - Math.min(1, y * (1 - k) + k)) * 255);

    return "rgb(" + r + ", " + g + ", " + b + ")";
  }


  cmykToHsl(cmyk) {
    let parts = cmyk.replace(/[^\d,.]/g, '').split(',');
    let c = parseInt(parts[0]) / 100;
    let m = parseInt(parts[1]) / 100;
    let y = parseInt(parts[2]) / 100;
    let k = parseInt(parts[3]) / 100;

    let r = Math.round((1 - Math.min(1, c * (1 - k) + k)) * 255);
    let g = Math.round((1 - Math.min(1, m * (1 - k) + k)) * 255);
    let b = Math.round((1 - Math.min(1, y * (1 - k) + k)) * 255);

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return "hsl(" + (h * 360).toFixed(0) + ", " + (s * 100).toFixed(0) + "%, " + (l * 100).toFixed(0) + "%)";
  }


  cmykToHsv(cmyk) {
    let parts = cmyk.replace(/[^\d,.]/g, '').split(',');
    let c = parseInt(parts[0]) / 100;
    let m = parseInt(parts[1]) / 100;
    let y = parseInt(parts[2]) / 100;
    let k = parseInt(parts[3]) / 100;

    let r = Math.round((1 - Math.min(1, c * (1 - k) + k)) * 255);
    let g = Math.round((1 - Math.min(1, m * (1 - k) + k)) * 255);
    let b = Math.round((1 - Math.min(1, y * (1 - k) + k)) * 255);

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return "hsv(" + (h * 360).toFixed(0) + ", " + (s * 100).toFixed(0) + "%, " + (v * 100).toFixed(0) + "%)";
  }


  rgbToCmyk(rgb) {
    let parts = rgb.replace(/[^\d,.]/g, '').split(',');
    let r = parseInt(parts[0]) / 255;
    let g = parseInt(parts[1]) / 255;
    let b = parseInt(parts[2]) / 255;
    let alpha = parts[3] ? parseFloat(parts[3]) : 1;

    let k = 1 - Math.max(r, g, b);
    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);

    return "cmyk(" + (c * 100).toFixed(0) + "%, " + (m * 100).toFixed(0) + "%, " + (y * 100).toFixed(0) + "%, " + (k * 100).toFixed(0) + "%)";
  }


  rgbToHex(rgb) {
    let parts = rgb.replace(/[^\d,.]/g, '').split(',');
    let r = parseInt(parts[0]).toString(16).padStart(2, '0');
    let g = parseInt(parts[1]).toString(16).padStart(2, '0');
    let b = parseInt(parts[2]).toString(16).padStart(2, '0');
    let alpha = parts[3] ? Math.round(parseFloat(parts[3]) * 255).toString(16).padStart(2, '0') : '';

    return "#" + r + g + b + alpha;
  }


  rgbToHsl(rgb) {
    let parts = rgb.replace(/[^\d,.]/g, '').split(',');
    let r = parseInt(parts[0]) / 255;
    let g = parseInt(parts[1]) / 255;
    let b = parseInt(parts[2]) / 255;
    let alpha = parts[3] ? parseFloat(parts[3]) : 1;

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return "hsl(" + (h * 360).toFixed(0) + ", " + (s * 100).toFixed(0) + "%, " + (l * 100).toFixed(0) + "%)";
  }


  rgbToHsv(rgb) {
    let parts = rgb.replace(/[^\d,.]/g, '').split(',');
    let r = parseInt(parts[0]) / 255;
    let g = parseInt(parts[1]) / 255;
    let b = parseInt(parts[2]) / 255;
    let alpha = parts[3] ? parseFloat(parts[3]) : 1;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return "hsv(" + (h * 360).toFixed(0) + ", " + (s * 100).toFixed(0) + "%, " + (v * 100).toFixed(0) + "%)";
  }


  hslToHex(hsl) {
    let parts = hsl.replace(/[^\d,.]/g, '').split(',');
    let h = parseInt(parts[0]) / 360;
    let s = parseInt(parts[1]) / 100;
    let l = parseInt(parts[2]) / 100;
    let alpha = parts[3] ? parseFloat(parts[3]) : 1;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = this.hue2rgb(p, q, h + 1/3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255).toString(16).padStart(2, '0');
    g = Math.round(g * 255).toString(16).padStart(2, '0');
    b = Math.round(b * 255).toString(16).padStart(2, '0');

    return "#" + r + g + b;
  }

  hslToRgb(hsl) {
    let parts = hsl.replace(/[^\d,.]/g, '').split(',');

    let a = parts[3] ? parseFloat(parts[3]) : 1;

    let r, g, b, h, s, l;

    if (s === 0) {
      g = r = b = l;
    }
    else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = this.hue2rgb(p, q, h + 1/3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1/3);
    }

    return "rgb(" + Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255) + ", " + a + ")";
  }


  hslToCmyk(hsl) {
    let [h, s, l] = hsl.match(/\d+/g).map(n => +n / (n > 100 ? 100 : 360));
    let r, g, b;
    let c, m, y, k;

    s || ([r, g, b] = [l, l, l]);
    s && (([r, g, b] = [h + 1/3, h, h - 0.333].map(hue => {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
        p = 2 * l - q;
      return this.hue2rgb(p, q, hue);
    })), [r, g, b] = [r, g, b].map(n => n / 255));
    k = 1 - Math.max(r, g, b);
    [c, m, y] = [1 - r - k, 1 - g - k, 1 - b - k].map(n => n / (1 - k));

    return `cmyk(${[c, m, y, k].map(n => n * 100).join("%, ")}%)`;
  }

  hslToHsv(hsl) {
    let [h, s, l] = hsl.match(/\d+/g).map(n => +n / (n > 100 ? 100 : 360));
    let r, g, b;
    let max, min;
    let h_, s_, v_;

    s || ([r, g, b] = [l, l, l]);
    s && (([r, g, b] = [h + 0.333, h, h - 1/3].map(hue => {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
        p = 2 * l - q;
      return this.hue2rgb(p, q, hue);
    })), [r, g, b] = [r, g, b].map(n => n / 255),
      [max, min] = [r, g, b].reduce((a, b) => [Math.max(a[0], b), Math.min(a[1], b)], [0, 1]),
      s_ = max === 0 ? 0 : (max - min) / max,
      h_ = max === min ? 0 : (
        max === r ? (g - b) / (max - min) + (g < b ? 6 : 0) :
          max === g ? (b - r) / (max - min) + 2 :
            (r - g) / (max - min) + 4
      ) / 6,
      v_ = max);

    return `hsv(${[h_ * 360, s_ * 100, v_ * 100].join("%, ")}%)`;
  }


  hsvToHex(hsv) {
    let parts = hsv.replace(/[^\d,.]/g, '').split(',');
    let h = parseInt(parts[0]) / 360;
    let s = parseInt(parts[1]) / 100;
    let v = parseInt(parts[2]) / 100;

    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;
        break;
      case 1:
        r = q, g = v, b = p;
        break;
      case 2:
        r = p, g = v, b = t;
        break;
      case 3:
        r = p, g = q, b = v;
        break;
      case 4:
        r = t, g = p, b = v;
        break;
      case 5:
        r = v, g = p, b = q;
        break;
      default:
        console.error("Error: Something went wrong.");
    }

    let hex = "#" + ((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1);
    return hex;
  }


  hsvToHsl(h, s, v) {
    h /= 360;
    s /= 100;
    v /= 100;

    let l = (2 - s) * v / 2;
    if (l !== 0) {
      if (l === 1) {
        s = 0;
      } else if (l < 0.5) {
        s = s * v / (l * 2);
      } else {
        s = s * v / (2 - l * 2);
      }
    }

    return [h * 360, s * 100, l * 100];
  }


  hsvToRgb(h, s, v) {
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;
        break;
      case 1:
        r = q, g = v, b = p;
        break;
      case 2:
        r = p, g = v, b = t;
        break;
      case 3:
        r = p, g = q, b = v;
        break;
      case 4:
        r = t, g = p, b = v;
        break;
      case 5:
        r = v, g = p, b = q;
        break;
    }

    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }


  hsvToCmyk(h, s, v) {
    const c = (1 - v) * s;
    const m = 1 - v;
    const y = (1 - c) / (1 - (1 - c) * s);
    const k = 1 - m;

    return [c, m, y, k];
  }

  generateComplementaryPalette(rgb) {
    let [r, g, b] = rgb.map(c => c / 255);
    let cmyk = this.rgbToCmyk(r, g, b);
    let [c, m, y, k] = cmyk;
    let hsl = this.cmykToHsl(c, m, y, k);
    let [h, s, l] = hsl;
    let complement = (h + 180) % 360;

    let palette = [];
    for (let i = 0; i < 5; i++) {
      let newHue = (complement + i * 72) % 360;
      let newRgb = this.hslToRgb(newHue, s, l);
      palette.push(newRgb);
    }

    return palette;
  }


  generateShades(r, g, b) {
    const shades = [];
    for (let i = -5; i <= 5; i++) {
      let rShade = Math.round(r + i * (255 - r) / 10);
      let gShade = Math.round(g + i * (255 - g) / 10);
      let bShade = Math.round(b + i * (255 - b) / 10);
      rShade = Math.min(Math.max(rShade, 0), 255);
      gShade = Math.min(Math.max(gShade, 0), 255);
      bShade = Math.min(Math.max(bShade, 0), 255);
      shades.push([rShade, gShade, bShade]);
    }
    return shades;
  }





  hue2rgb(p, q, t) {
    if (t < 0) t++;
    if (t > 1) t--;
    if (t < 0.166) return p + (q - p) * 6 * t;
    if (t < 0.5) return q;
    if (t < 0.666) return p + (q - p) * (0.666 - t) * 6;
    return p;
  }



}
