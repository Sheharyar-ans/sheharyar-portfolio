import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CASE_STUDIES, CaseStudy } from '../../data/portfolioData';
import './VideoRibbonHero.css';

interface VideoRibbonHeroProps {
  onOpenInquiry: () => void;
  onSelectCaseStudy?: (study: CaseStudy) => void;
}

interface PortfolioMediaItem {
  title: string;
  src: string;
  type: 'video' | 'image';
  caseStudyIndex?: number;
}

const PORTFOLIO_CARDS: PortfolioMediaItem[] = [
  {
    title: 'AI & WordPress Engineering Lab',
    src: '/video/Developer_working.webm',
    type: 'video',
    caseStudyIndex: 0,
  },
  {
    title: 'Contentwerk Agency — WordPress VIP',
    src: '/assets/images/portfolio/wp-contentwerk-agency.webp',
    type: 'image',
    caseStudyIndex: 1,
  },
  {
    title: 'Ende Online — Enterprise Web',
    src: '/assets/images/portfolio/wp-ende-online.webp',
    type: 'image',
    caseStudyIndex: 2,
  },
  {
    title: 'Everaard Techniek — Custom Build',
    src: '/assets/images/portfolio/wp-everaard-techniek.webp',
    type: 'image',
    caseStudyIndex: 3,
  },
  {
    title: 'Floortec — WooCommerce Engine',
    src: '/assets/images/portfolio/wp-floortec-flooring.webp',
    type: 'image',
    caseStudyIndex: 4,
  },
  {
    title: 'Moldstaff — Recruitment Platform',
    src: '/assets/images/portfolio/wp-moldstaff-recruitment.webp',
    type: 'image',
    caseStudyIndex: 5,
  },
  {
    title: 'Cloud Migration — PowerBI Telemetry',
    src: '/assets/images/dashboards/dashboard-cloud-migration-powerbi.webp',
    type: 'image',
  },
  {
    title: 'AI Churn Prediction — Streamlit',
    src: '/assets/images/dashboards/dashboard-customer-churn-streamlit.webp',
    type: 'image',
  },
];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - (1 - t) ** 3;
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

interface GridRect {
  x: number;
  y: number;
  w: number;
  h: number;
  vw: number;
  vh: number;
  c: number;
  r: number;
}

interface CardItem {
  i: number;
  title: string;
  caseStudyIndex?: number;
  v: HTMLVideoElement | null;
  tex: THREE.Texture;
  geo: THREE.PlaneGeometry;
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  rect: GridRect | null;
}

export const VideoRibbonHero: React.FC<VideoRibbonHeroProps> = ({
  onOpenInquiry,
  onSelectCaseStudy,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLButtonElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    const nameEl = nameRef.current;
    if (!canvas || !track || !stage || !nameEl) return;

    /* ---------- renderer ---------- */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const scene = new THREE.Scene();
    const FOV = 35;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

    /* ---------- ribbon path ---------- */
    let path: THREE.CatmullRomCurve3;
    let PATH_L = 1;
    const SAMPLES = 1200;
    const pathP: THREE.Vector3[] = [];
    const pathT: THREE.Vector3[] = [];
    const PH0 = -1.5;
    const PH1 = Math.PI * 2 + 1.35;

    function buildPath() {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        const depth = cs > 0 ? 7.6 + 16.4 * cs ** 0.9 : 7.6 + 2.2 * cs;
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * 0.63,
            -depth
          )
        );
      }
      path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      path.arcLengthDivisions = 1500;
      PATH_L = path.getLength();
      pathP.length = 0;
      pathT.length = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        pathP.push(path.getPointAt(u));
        pathT.push(path.getTangentAt(u));
      }
    }

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES;
      const i = Math.min(SAMPLES - 1, Math.floor(f));
      const k = f - i;
      op.lerpVectors(pathP[i], pathP[i + 1], k);
      ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
    };

    /* ---------- cards ---------- */
    const CARD_W = 2.1;
    const CARD_H = 1.32;
    const GAP = 0.03;
    const STEP = CARD_W + GAP;
    const NX = 28;
    const NY = 3;

    const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
    const fs = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
}`;

    const texLoader = new THREE.TextureLoader();

    const cards: CardItem[] = PORTFOLIO_CARDS.map((item, i) => {
      const ca = CARD_W / CARD_H;
      let v: HTMLVideoElement | null = null;
      let tex: THREE.Texture;

      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: null },
          cover: { value: new THREE.Vector2(1, 1) },
          aspect: { value: ca },
          ready: { value: 0 },
          radius: { value: 0.018 },
        },
      });

      if (item.type === 'video') {
        v = document.createElement('video');
        Object.assign(v, {
          crossOrigin: 'anonymous',
          muted: true,
          loop: true,
          playsInline: true,
          preload: 'auto',
          src: item.src,
        });
        v.setAttribute('playsinline', '');
        const vTex = new THREE.VideoTexture(v);
        vTex.colorSpace = THREE.NoColorSpace;
        vTex.minFilter = THREE.LinearFilter;
        vTex.magFilter = THREE.LinearFilter;
        vTex.generateMipmaps = false;
        tex = vTex;
        mat.uniforms.map.value = tex;

        v.addEventListener('loadeddata', () => {
          if (!v || !v.videoWidth || !v.videoHeight) return;
          const va = v.videoWidth / v.videoHeight;
          mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
          mat.uniforms.ready.value = 1;
        });
      } else {
        tex = texLoader.load(item.src, (loaded) => {
          const img = loaded.image as HTMLImageElement | undefined;
          if (img && img.width && img.height) {
            const va = img.width / img.height;
            mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
          }
          mat.uniforms.ready.value = 1;
        });
        tex.colorSpace = THREE.NoColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        mat.uniforms.map.value = tex;
      }

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      return {
        i,
        title: item.title,
        caseStudyIndex: item.caseStudyIndex,
        v,
        tex,
        geo,
        mat,
        mesh,
        rect: null,
      };
    });

    /* ---------- layout ---------- */
    const GZ = 8;
    let W = 1;
    let H = 1;
    let asp = 1;
    let cols = 3;
    let rows = 2;
    let tanH = 0.3153;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      asp = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = asp < 16 / 9 ? (Math.atan(0.561 / asp) * 360) / Math.PI : FOV;
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      cols = asp < 0.9 ? 2 : 3;
      rows = asp < 0.9 ? 3 : 2;
    }

    window.addEventListener('resize', resize);
    resize();
    buildPath();

    function grid(i: number): GridRect {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const gw = vw * (cols === 3 ? 0.74 : 0.88);
      const gap = gw * 0.017;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / (CARD_W / CARD_H);
      const gh = ch * rows + gap * 1.6 * (rows - 1);
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: -gw / 2 + cw / 2 + c * (cw + gap),
        y: gh / 2 - ch / 2 - r * (ch + gap * 1.6),
        w: cw,
        h: ch,
        vw,
        vh,
        c,
        r,
      };
    }

    /* ---------- scroll ---------- */
    let target = 0;
    let p = 0;
    const readScroll = () => {
      const denom = Math.max(1, track.offsetHeight - window.innerHeight);
      target = clamp(window.scrollY / denom);
    };
    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    /* ---------- pose ---------- */
    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c: CardItem, head: number) {
      const pos = c.geo.attributes.position;
      const centre = head - c.i * STEP;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * CARD_W, op, ot);
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * CARD_H);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    }

    function poseGrid(c: CardItem, q: number) {
      const g = grid(c.i);
      const pos = c.geo.attributes.position;
      const dx = (g.c - (cols - 1) / 2) * 1.2;
      const dy = g.r < rows / 2 ? 1 : -1;
      const ox = dx * g.vw * 0.62 * (1 - q);
      const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
      const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const x = (ix / NX - 0.5) * g.w;
          const y = (0.5 - iy / NY) * g.h;
          pos.setXYZ(
            k,
            g.x + ox + x * cs - y * sn,
            g.y + oy + x * sn + y * cs,
            -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI)
          );
        }
      }
      pos.needsUpdate = true;
      c.rect = g;
    }

    const RIB_A = 0.14;
    const RIB_B = 0.63;

    function render() {
      const pp = p;
      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.58));
      if (l1Ref.current) {
        l1Ref.current.style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
      }
      if (l2Ref.current) {
        l2Ref.current.style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;
      }
      const capA = 1 - span(pp, 0.52, 0.57);
      if (capRef.current) {
        capRef.current.style.opacity = String(capA);
        capRef.current.style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;
      }
      const intro = String(1 - span(pp, 0, 0.05));
      for (const ref of [hintRef, crossRef, glowRef]) {
        if (ref.current) ref.current.style.opacity = intro;
      }
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${ease(span(pp, 0.72, 0.86))})`;
        ruleRef.current.style.top = '50%';
      }

      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * STEP, pr);
      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else if (c.i < cols * rows) {
          const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.13));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q);
        } else {
          c.mesh.visible = false;
          c.rect = null;
        }
      }
      renderer.render(scene, camera);
    }

    /* ---------- hover & click ---------- */
    const hitTest = (clientX: number, clientY: number): CardItem | null => {
      if (p <= 0.86) return null;
      const nx = clientX / W - 0.5;
      const ny = 0.5 - clientY / H;
      for (const c of cards) {
        const g = c.rect;
        if (!g) continue;
        const x = nx * g.vw;
        const y = ny * g.vh;
        if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) {
          return c;
        }
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const hit = hitTest(e.clientX, e.clientY);
      nameEl.style.opacity = hit ? '1' : '0';
      stage.style.cursor = hit ? 'pointer' : 'default';
      if (hit) {
        nameEl.textContent = hit.title;
        nameEl.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`;
      }
    };

    const onClick = (e: MouseEvent) => {
      const hit = hitTest(e.clientX, e.clientY);
      if (hit && hit.caseStudyIndex !== undefined && onSelectCaseStudy) {
        const study = CASE_STUDIES[hit.caseStudyIndex];
        if (study) onSelectCaseStudy(study);
      }
    };

    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('click', onClick);

    /* ---------- loop ---------- */
    let rafId = 0;
    let disposed = false;
    function loop() {
      if (disposed) return;
      p += (target - p) * 0.09;
      if (Math.abs(target - p) < 0.00005) p = target;
      for (const c of cards) {
        if (!c.v) continue;
        if (c.mesh.visible && c.v.paused) c.v.play().catch(() => {});
        else if (!c.mesh.visible && !c.v.paused) c.v.pause();
      }
      render();
      rafId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('click', onClick);
      for (const c of cards) {
        if (c.v) {
          c.v.pause();
          c.v.removeAttribute('src');
          c.v.load();
        }
        c.tex.dispose();
        c.geo.dispose();
        c.mat.dispose();
      }
      renderer.dispose();
    };
  }, [onSelectCaseStudy]);

  const scrollToCaseStudies = () => {
    const el = document.getElementById('case-studies') || document.getElementById('home-content-start');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="vr-root"
      aria-label="Sheharyar Siraj — Enterprise Systems & AI Automation Showcase"
    >
      <div id="vr-track" ref={trackRef}>
        <div className="stage" id="vr-stage" ref={stageRef}>
          <h1 aria-label="Systems in motion">
            <div className="hl" id="vr-l1" ref={l1Ref} aria-hidden="true">
              <span>SYSTEMS IN</span>
            </div>
            <div className="hl" id="vr-l2" ref={l2Ref} aria-hidden="true">
              <span>MOTION</span>
            </div>
          </h1>
          <div id="vr-cap" ref={capRef}>
            Enterprise WordPress, Agentic AI &amp; Automation Systems — 1,200+ Projects Delivered.
          </div>
          <div id="vr-glow" ref={glowRef} />
          <div id="vr-cross" ref={crossRef}>
            <i>+</i>
          </div>
          <div id="vr-rule" ref={ruleRef} />
          <canvas id="vr-gl" ref={canvasRef} />
          <button type="button" id="vr-hint" ref={hintRef} onClick={onOpenInquiry}>
            START A PROJECT &nbsp;→
          </button>
          <footer className="bot">
            <p>
              Connected digital systems where WordPress provides the foundation, AI provides
              intelligence, and automation handles execution.
            </p>
            <div className="mid">
              WORDPRESS<s>/</s>AI AGENTS<s>/</s>VOICE AI<s>/</s>N8N
            </div>
            <button type="button" className="r" onClick={scrollToCaseStudies}>
              VIEW CASE STUDIES
            </button>
          </footer>
          <div id="vr-name" ref={nameRef} />
        </div>
      </div>
    </section>
  );
};
