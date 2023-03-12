import Head from "next/head";
import { useRef, useEffect } from "react";
import CMS from "../cms";

import styles from "../styles/Ghostbuddy.module.css";

const controls = [
    " ",
    "ArrowLeft",
    "ArrowRight"
]

const Ghostbuddypage = () => {
    const META = CMS.META,
        PAGE = CMS.CONTENT.GHOSTBUDDY;

    const canvasRef = useRef({
        ctx: null,
        dim: {
            width: 0,
            height: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        isRunning: false,
        player: null,
        background: null,
        gameSpeed: 0,
        gbn: [],
        gravity: 0.00,
    });

    class Background {
        constructor(props) {
            this.pos = props.pos || { x: 0, y: 0 };
            this.dim = { width: props.dim.width - (props.gameSpeed * 0.666666) * 2, height: props.dim.height };
            this.image = new Image();
            this.image.src = props.imageSrc;
            this.image.width = this.image.width * 2
            this.gameSpeed = props.gameSpeed / 2;
        }
        
        draw(ctx) {
            ctx.drawImage(this.image, this.pos.x, this.pos.y, this.dim.width, this.dim.height);
        }

        update() {
            this.pos.x -= this.gameSpeed;
            if (this.pos.x <= -this.dim.width * 0.666666 + this.gameSpeed) 
                this.pos.x = 0;
        }
    };

    class Path {
        constructor(props) {
            this.pos = props.pos;
            this.dim = props.dim;
            this.gameSpeed = props.gameSpeed;
            this.image = new Image();
            this.image.src = props.imageSrc;
            
        }

        draw(ctx) {
            // ctx.fillStyle = "black";
            // ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
            ctx.drawImage(this.image, this.pos.x, this.pos.y, this.dim.width, this.dim.height);
        }

        update() {
            this.pos.x -= this.gameSpeed;
            if (this.pos.x + this.dim.width < 0)
                this.pos.x = -this.dim.width - 1;
        }
    }

    class Player {
        constructor(props) {
            this.pos = props.pos;
            this.dim = props.dim;
            this.image = new Image();
            this.image.src = props.imageSrc;
            this.gbn = props.gbn;
            this.gameSpeed = props.gameSpeed;
            this.gravity = props.gravity;
            this.vel = { x: 0, y: 0 };
            this.keys = [];
            this.keyCombo = [];
            this.timingLastkey = 0;
            this.isJumping = false;
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.pos.x, this.pos.y, this.dim.width, this.dim.height);
            ctx.font = "48px serif";
            ctx.strokeText(`GBN: ${this.gbn}`, 10, 50);
        }

        jump() {
            this.isJumping = true;
            this.vel.y = -this.gravity * 2.5;
        }

        detectPathway() {
            const { x, y } = this.pos;
            const { width, height } = this.dim;
            const left = x;
            const right = x + width;
            const top = y;
            const bottom = y + height;

            let isOnPathway = -1;

            const { pathways } = canvasRef.current;
            
            for (let i = 0; i < pathways.length; i++) {
                const { pos, dim } = pathways[i];
                const pLeft = pos.x;
                const pRight = pos.x + dim.width;
                const pTop = pos.y;
                if (right > pLeft &&  left < pRight 
                &&  bottom > pTop 
                &&  bottom < pTop + 10
                )
                    isOnPathway = i;
            }

            return isOnPathway;
        }

        detectGBNCollision() {
            const { gbn } = canvasRef.current;

            if (gbn.length === 0) 
                return;

            const { x, y } = this.pos;
            const { width, height } = this.dim;
            const left = x;
            const right = x + width;
            const top = y;
            const bottom = y + height;

            for (let i = 0; i < gbn.length; i++) {
                const { pos, dim } = gbn[i];
                const tLeft = pos.x;
                const tRight = pos.x + dim.width;
                const tTop = pos.y;
                const tBottom = pos.y + dim.height;
                if (right > tLeft
                &&  left < tRight
                &&  bottom > tTop
                &&  top < tBottom
                ) {
                    gbn.splice(i, 1);
                    this.gbn++;
                };
            }
        }

        update() {
            if (this.keyCombo[this.keyCombo.length -1] === " " 
            &&  this.keys[" "] === true
            && !this.isJumping
            )
                this.jump();
            
            const isOnPathway = this.detectPathway();

            if (isOnPathway > -1 
            &&  !this.isJumping
            ) {
                this.vel.y = 0;                
            }
            else if (this.isJumping) {
                this.vel.y += this.gravity;
                if (this.vel.y > 0) {
                    this.isJumping = false;
                    this.vel.y = 0;
                }
            }
            else {
                this.vel.y = this.vel.y + this.gravity > this.gravity ? this.gravity : this.vel.y + this.gravity;
            };

            this.detectGBNCollision();

            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;                
        }
    };

    class GBN {
        constructor(props) {
            this.pos = props.pos;
            this.dim = props.dim;
            this.image = new Image();
            this.image.src = props.imageSrc;
            this.framesMax = props.framesMax;
            this.framesElapsed = 0;
            this.framesHold = props.framesHold;
            this.frame = props.frame || 0;
            this.gbn = 1;
            this.gameSpeed = props.gameSpeed;
        }

        draw(ctx) {
            ctx.drawImage(
                this.image,
                this.frame * this.image.width / this.framesMax,
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.pos.x,
                this.pos.y,
                this.dim.width,
                this.dim.height
            );
        }

        update() {
            this.pos.x -= this.gameSpeed
            if (this.pos.x < 0)
                this.pos.x = 0;

            this.framesElapsed++;
            if (this.framesElapsed % this.framesHold === 0)
                this.frame = this.frame < this.framesMax - 1 ? this.frame + 1 : 0;

        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.ctx = canvas.getContext("2d");
        
        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight;

        const speed = canvas.gameSpeed = 36;
        const gravity = canvas.gravity = 1.618 * 3;

        canvas.isRunning = true;
        
        const background = canvas.background = new Background({
            dim: {
                width: (w * 3),
                height: h
            },
            imageSrc: "/ghostbuddy-sky-far.png",
            gameSpeed: speed * 0.075
        });

        const pathways = canvas.pathways = Array(10).fill(0)
            .map((_, i) => {
                return new Path({
                    pos: {
                        x: 100 + (w * i),
                        y: h * 0.75
                    },
                    dim: {
                        width: w * 0.666,
                        height: 300
                    },
                    gameSpeed: speed * 0.1,
                    imageSrc: "/cloud.png",
                    framesMax: 1,
                    framesHold: 1
                });
            });

        const player = canvas.player = new Player({
            pos: {
                x: w / 4,
                y: h * 0.5
            },
            dim: {
                width: 300,
                height: 300
            },
            imageSrc: "/ghostbuddy.png",
            framesMax: 1,

            gbn: 0,
            gameSpeed: speed * 0.1,
            gravity: gravity,
        });

        const gbns = canvas.gbn = Array(10).fill(0)
            .map((_, i) => {
                return new GBN({
                    pos: {
                        x: (w * 0.875) + (w * i),
                        y: h * 0.45 + (h * 0.25 * Math.random())
                    },
                    dim: {
                        width: 75,
                        height: 75
                    },
                    imageSrc: "/coin.png",
                    framesMax: 16,
                    framesHold: 15,
                    frame: Math.floor(Math.random() * 15) - 1,
                    gbn: 1,
                    gameSpeed: speed * 0.1
                });
            });

        const resize = e => {
            canvas.width = w;
            canvas.height = h;
        };

        const animate = () => {
            canvas.ctx.clearRect(0, 0, w, h);
            
            background.update();

            background.draw(canvas.ctx);
            
            gbns.forEach(gbn => {
                gbn.update();    
                gbn.draw(canvas.ctx)
            });

            if (gbns.length > 0)
                gbns[gbns.length -1].pos.x < 1 && (canvas.isRunning = false);

            player.update();
            player.draw(canvas.ctx);

            player.pos.y > h && (canvas.isRunning = false);

            pathways.forEach(path => {
                path.update();
                path.draw(canvas.ctx);
            });

            if (canvas.isRunning)
                requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("keydown", e => {
            if (controls.includes(e.key)) {
                player.keys[e.key] = true;
                player.keyCombo.push(e.key);
                player.timingLastkey = new Date() * 1 + 1000;
            }
        });
        window.addEventListener("keyup",  e => {
            if (controls.includes(e.key))
                player.keys[e.key] = false;
        });

        animate();
    }, []);



    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content={META.THEME} />
            <meta name="description" content={PAGE.DESC} />
            <meta name="title" content={PAGE.TITLE} />
            <meta property="og:title" content={PAGE.TITLE} />
            <meta property="og:description" content={PAGE.DESC} />
            <meta property="og:url" content={META.URL} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/cutout.png" />
            <link rel="canonical" href={META.URL} />
            <title>{PAGE.TITLE}</title>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="78x78" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <div id="__paralax">
            <canvas
                id="canvas"
                className={[styles.Canvas]}
                ref={canvasRef}
            />
        </div>
    </>);
};

export default Ghostbuddypage;