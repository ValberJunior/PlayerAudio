//all itens

let art = document.getElementById('art');
let time = document.getElementById('time');
let iconVol = document.getElementById('iconVol');
let volume = document.getElementById('volume');
let audio = document.getElementById('audio');
let source = document.getElementById('audio-source');
let back = document.getElementById('back');
let backward = document.getElementById('back10');
let loop = document.getElementById('loop');
let playAndPause = document.getElementById('play');
let mutedSong = document.getElementById('mutedSong');
let next = document.getElementById('next');
let forward= document.getElementById('next10');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let display = document.getElementById('display');
let minutes = document.getElementById('minutes');

//my playlist

let songs = [
    {
        image: '../assets/art/GuitarHero.PNG',
        name: 'Talk Dirty To Me (Cover version)',
        singer: 'Guitar Hero III',
        file: '../assets/musics/TalkDirtyToMe.mp3'
    },
    {
        image: '../assets/art/PearJam.PNG',
        name: 'Even Flow (Official Version)',
        singer: 'Pearl Jam',
        file: '../assets/musics/EvenFlow.mp3'
    },
    {
        image: '../assets/art/LivingC.jpg',
        name: 'Cult Of Personality (Official Version)',
        singer: 'Living Colour',
        file: '../assets/musics/CultOfPersonality.mp3'
    },
    {
        image: '../assets/art/Guns_N_Roses.png',
        name: 'Sweet Child O Mine (Official Version)',
        singer: 'Guns N Roses',
        file: '../assets/musics/Scomine.mp3'
    },
    {
        image: '../assets/art/RHCP.jpg',
        name: 'Zephyr Song (Official version)',
        singer: 'Red Hot Chili Peppers',
        file: '../assets/musics/zephyrsong.mp3'
    },
    {
        image: '../assets/art/Scorpions.jpg',
        name: 'Rock you like a Hurricane (Official version)',
        singer: 'Scorpions',
        file: '../assets/musics/scp.mp3'
    }
]

//load music

let index = 0;

function player(index){

    art.src = songs[index].image;
    title.innerText = songs[index].name;
    artist.innerText = songs[index].singer;
    source.src = songs[index].file;

    audio.load();

}

player(index);


//controls

//play and Pause

let playing = false;
playAndPause.addEventListener('click', pAndp);

function pAndp(){
    let action = !playing;

    if(action){
        audio.play();
        playAndPause.src = '../assets/icon/Pause.png';
        return playing = true;
    } else{
        audio.pause();
        playAndPause.src= '../assets/icon/Play.png';
        return playing = false;
    }
}

//play/pause with one click

art.addEventListener('click',function(){
    pAndp();
})


//volume 

//button Muted

let muted = false;
iconVol.addEventListener('click', changeMuted);

function changeMuted(){
    let action = !muted;

    if(action){
        audio.muted = true;
        iconVol.src = '../assets/icon/VolOff.png';
        mutedSong.src = '../assets/icon/muteOn.png';
        return muted = true;
    } else{
        audio.muted = false;
        iconVol.src = '../assets/icon/vol.png';
        mutedSong.src = '../assets/icon/mute.png';
        return muted = false;
    }
}

// MutedSong Button
let mt = false;
mutedSong.addEventListener('click',function(){
    let action = !mt;
    if (action){
        mutedSong.src = '../assets/icon/muteOn.png';
        iconVol.src = '../assets/icon/VolOff.png';
        audio.muted = true;
        return mt = true;
    }else{
        mutedSong.src = '../assets/icon/mute.png';
        iconVol.src = '../assets/icon/vol.png';
        audio.muted = false;
        return mt = false;
    }
})

//volume value (input)
let status;
volume.addEventListener('input',changeVol);

function changeVol(){
    status = volume.value/100;
    audio.volume = status;

    if (status == 0){
        iconVol.src = '../assets/icon/VolOff.png';
        mutedSong.src = '../assets/icon/muteOn.png';
    }else{
        iconVol.src = '../assets/icon/vol.png';
        mutedSong.src = '../assets/icon/mute.png';
    }
}

//time

//change the currentTime with the input range.

time.addEventListener('input',function(){
    audio.currentTime = time.value;
})


// Change the minutes
function changeTime(){

    time.max = audio.duration;
    time.value = audio.currentTime;
   
    let min = Math.floor(audio.currentTime / 60)
    let displayMin = (min < 10 ? '0' : '') + min
    let sec = Math.round(audio.currentTime % 60)
    let displaySec = (sec < 10 ? '0' : '') + sec
    minutes.innerHTML = `${displayMin} : ${displaySec}`

    changeMusic();

}

setInterval(changeTime, 1000);


// Change music

function changeMusic(){

let total = audio.duration;
let currentTime = audio.currentTime ;

if (currentTime == total && index < songs.length){
    nextSong();
}
}


// Display time and volume disable/enable

display.addEventListener('mouseover', function(){
    display.style.opacity = '1';
})
display.addEventListener('mouseout', function(){
    display.style.opacity = '0';
})


//Action foward 10 seconds

forward.addEventListener('click',function(){
    audio.currentTime += 10;
})

//Action backward
backward.addEventListener('click',function(){
    audio.currentTime -= 10;
})

//loop

loop.addEventListener('click', activeLoop)

let lp = false;

function activeLoop(){
    action = !lp;

    if(action){
    loop.src = '../assets/icon/loopOn.png';
    audio.loop = true;
    return lp = true;
    } else{
    loop.src = '../assets/icon/loop.png';
    audio.loop = false;
    return lp = false;
    }
}

//next song and previous song

//next song
  
next.addEventListener('click', nextSong);


function nextSong(){
    if (index == songs.length){
        index = 0;
        player(index);
        playing = false;
        pAndp();
    } else{
         index += 1;
           player(index);
          playing = false;
          pAndp()
    
    }
}

//previous song

back.addEventListener('click', previousSong);


function previousSong(){
    if (index == 0){
       index = songs.length;
        player(index);
        playing = false;
        pAndp();
        
    }
    else{
    index -= 1;
    player(index);
    playing = false;
    pAndp()
    }
}



 
