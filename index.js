const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;

// dzięki temu przy zmianie wielkości okna obiekt zachowa wielkość
window.addEventListener('resize', function() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
});

// obiekt z koordynatami myszy
const mouse = {
   x: undefined,
   y: undefined,
};

// rysowanie podczas kliknięcia
canvas.addEventListener('click', (event) => {
   mouse.x = event.x;
   mouse.y = event.y;
   // drawCircle();
});

// efekt malowania jak w paint przy ruchu myszy
canvas.addEventListener('mousemove', (event) => {
   mouse.x = event.x;
   mouse.y = event.y;
   // drawCircle();
   // taka pętla może być też pod 'click'
   for(let i = 0; i < 10; i++) {
      particleArray.push(new Particle());
   }
})

// function drawCircle() {
//    // fill - wypełnienie, stroke - krawędź
//    ctx.fillStyle = 'red';
//    ctx.strokeStyle = 'white';
//    ctx.lineWidth = 5;
//    ctx.beginPath();
//    ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2);
//    ctx.stroke();
//    ctx.fill();
// }

class Particle {
   constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      // this.x = Math.random() * canvas.width;
      // this.y = Math.random() * canvas.height;
      // tak liczymy losowy rozmiar
      this.size = Math.random() * 15 + 1;
      // tak liczymy losowy kierynek oraz długość ruch - wektor
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = 'hsl(' + hue + ', 100%, 50%)';
   }
   update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.size > 0.2) this.size -= 0.1;
   }
   draw() {
      // ctx.fillStyle = 'red';
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
   }
}

// function init() {
//    for(let i = 0; i < 100; i++) {
//       particleArray.push(new Particle());
//    }
// }
// 
// init();

function handleParticles() {
   for(let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
      particleArray[i].draw();
      if(particleArray[i].size <= 0.3) {
         particleArray.splice(i, 1);
         i--;
      }
   }
}

function animate() {
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = 'rgba(0,0,0,0.01';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   handleParticles();
   // jak szybko zmienia się kolor cząsteczek
   hue+=5;
   requestAnimationFrame(animate);
}

animate();