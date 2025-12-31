const frames = {
    currentIndex: 0,
    maxIndex:381
};

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let imagesloded = 0;
const images = [];

function preloadimages(){
    for(var i = 1; i<=frames.maxIndex + 1; i++){
        const imageurl = `./Frames/frame_${i.toString().padStart(4,"0")}.jpeg`
        const img = new Image();
        img.src = imageurl;
        img.onload = () => {
            imagesloded++;
            if(imagesloded === frames.maxIndex){
                loadImage(frames.currentIndex);
                Animation();
            }
        }
        images.push(img);
    }
}
preloadimages();

function loadImage(index){
    if(index >= 0 && index <= frames.maxIndex){
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height/img.height;
        const scale = Math.max(scaleX,scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0,0,canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img,offsetX,offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}


function Animation(){
    var t1 = gsap.timeline({
        scrollTrigger:{
            trigger: ".parent",
            start: "top top",
            scrub: 1,
            // markers: true,
        }
    })
    
    t1.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function(){
            loadImage(Math.floor(frames.currentIndex));
        }
    })
}
