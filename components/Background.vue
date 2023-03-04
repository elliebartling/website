<template>
    <div class="wrapper">
        <!-- <div class="blob">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"/>
            </svg>
        </div> -->
        <div class="blob-2">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"/>
            </svg>
        </div>
        <div class="gradient gradient-1">&nbsp;</div>
    </div>
</template>
<style scoped>
.wrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100vw;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
}

.gradient {
    @apply h-full w-screen z-0 absolute top-0 left-0;
}
.gradient-1 {
    @apply bg-gradient-to-tr from-violet-500 via-purple-400 to-cyan-400;
}
/*.gradient-2 {
    @apply absolute top-0 left-0;
    @apply bg-gradient-to-br from-pink-400 to-purple-400;
    @apply opacity-40;
}*/

.blob {
    @apply fill-purple-500 z-10;
    position: absolute;
    top: 0;
    left: 0;
    width: 30vh;
    height: 40vh;
    animation: move 10s ease-in-out infinite;
    filter: blur(120px);
    transform-origin: 50% 50%;
    /*clip-path: path("M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z");*/
  }

  .blob-2 {
    @apply fill-rose-300 z-10 absolute top-28 left-1/3;
    height: 80vh;
    width: 50vw;
    filter: blur(120px);
    opacity: 80%;
    animation: sway 20s linear infinite;
  }

  @keyframes sway {
    0%   { transform: scale(1) ; }
    40%  { transform: scale(0.8, 1.3) translate(10vw, 30vh) rotate(120deg); }
    60%  { transform: scale(1.3, 1.5) translate(-10vw, -10vh) rotate(-20deg); }
    80%  { transform: scale(1.5, 1) translate(-40vw, 20vh) rotate(-20deg); }
    100% { transform: scale(1) ; }
  } 

  @keyframes move {
    0%   { transform: scale(1.4)   ; }
    38%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
    40%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
    78%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
    80%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
    100% { transform: scale(1)   translate(10px, -30px); }
  }
</style>