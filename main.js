
var VPlayer = (function() {
  /**
   * Video player
   */
  var player = document.querySelector('.player');
  var video = document.querySelector('video');
  var controls = document.querySelector('.controls');

  /**
   * Streamer panel
   */
  var s1 = document.querySelector('.streamer1');
  var s2 = document.querySelector('.streamer2');
  var s3 = document.querySelector('.streamer3');
  
  /**
   * Change video
   */
  s1.addEventListener('click', function(e){
    s2.classList.remove('active');
    s3.classList.remove('active');
    s1.classList.add('active');
    video.pause();
    videosrc.setAttribute('src', 'https://sakuralive.tv/video/stream1.mp4');
    video.load();
    video.play();
    playButton.classList.remove('paused');
    playButton.classList.add('playing');
  })
  s2.addEventListener('click', function(e){
    s1.classList.remove('active');
    s3.classList.remove('active');
    s2.classList.add('active');
    video.pause();
    videosrc.setAttribute('src', 'https://sakuralive.tv/video/stream2.mp4');
    video.load();
    video.play();
    playButton.classList.remove('paused');
    playButton.classList.add('playing');
  })
  s3.addEventListener('click', function(e){
    s1.classList.remove('active');
    s2.classList.remove('active');
    s3.classList.add('active');
    video.pause();
    videosrc.setAttribute('src', 'https://sakuralive.tv/video/stream3.mp4');
    video.load();
    video.play();
    playButton.classList.remove('paused');
    playButton.classList.add('playing');
  })

  /**
   * Render intro video
   */
  var videosrc = document.getElementById('videosrc');
  videosrc.setAttribute('src', 'https://sakuralive.tv/video/stream1.mp4');
  video.load();
  /**
   * Controls â†’ Buttons
   */
  var playButton = document.querySelector('.play');
  var volume = document.querySelector('.volume');
  var fullscreenButton = document.querySelector('.fullscreen');

  /**
   * Events
   */
  video.addEventListener('click', togglePlayPause);
  playButton.addEventListener('click', togglePlayPause);

  volume.addEventListener('click', changeVolume);

  video.addEventListener('dblclick', toggleFullScreen);
  fullscreenButton.addEventListener('click', toggleFullScreen);

  video.addEventListener('ended', onVideoEnd);

  player.addEventListener('mouseout', hideControls);
  player.addEventListener('mousemove', showControls);
  player.addEventListener('mousemove', debounce(hideControls, 2000));


  function hideControls() {
    // Hide controls only after video has initiated a playback
    if (video.played.length > 0) {
      controls.style.opacity = 0;
    }
  }

  function showControls() {
    controls.style.opacity = 1;
  }

  function play() {
    video.play();
    playButton.classList.remove('ended');
    playButton.classList.remove('paused');
    playButton.classList.add('playing');
  }

  function pause() {
    video.pause();
    playButton.classList.remove('playing');
    playButton.classList.add('paused');
  }

  function togglePlayPause() {
    if (video.paused) {
      play();
    } else {
      pause();
    }
  }

  function onVideoEnd() {
    video.pause();
    showControls();
    playButton.classList.remove('playing');
    playButton.classList.add('ended');
  }

  function changeVolume(event) {
    var TOTAL_BARS = 5;
    var TOTAL_BAR_WIDTH = 4.8;

    // Get the first volume bar
    var volumeBar = volume.firstElementChild;

    // Returns the size of an element and its position relative to the viewport
    var rect = volume.getBoundingClientRect();

    var relX = event.pageX - (rect.left + document.body.scrollLeft);

    var position = 0;

    for (var i = 0; i < TOTAL_BARS; i++) {
      if (volumeBar) {
        if (relX > position) {
          volumeBar.classList.remove('fill-0', 'fill-1', 'fill-2');

          var order = relX > TOTAL_BAR_WIDTH ? Math.floor(relX / TOTAL_BAR_WIDTH) : 0;
          if (order === i) {
            var remainder = relX % (position || TOTAL_BAR_WIDTH);
            if (remainder > 0 && Math.floor(remainder) <= 1) {
              volumeBar.classList.add('fill-1');
            } else if (Math.floor(remainder) === 2) {
              volumeBar.classList.add('fill-2');
            }
          }
        } else {
          // Grey-out volume bars after mouse cursor
          volumeBar.classList.add('fill-0');
        }

        // Go to next volume bar
        volumeBar = volumeBar.nextElementSibling;
      }

      position += TOTAL_BAR_WIDTH;
    }

    // Set ARIA accessibility attributes
    volume.setAttribute('aria-valuenow', parseFloat(relX / volume.offsetWidth).toFixed(2));
    volume.setAttribute('aria-valuetext', Math.round((relX / volume.offsetWidth) * 100) + '%');

    // Update the actual video volume
    video.volume = relX / volume.offsetWidth;
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        player.msRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
      fullscreenButton.classList.add('is-fullscreen');
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      fullscreenButton.classList.remove('is-fullscreen');
    }
  }

  /**
   * Utilities
   */
  function debounce(fn, delay) {
    var timer = null;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  setTimeout(function(){
    video.pause();
    document.querySelector('.nav-btn').style.display = "none";
    document.querySelector('.close2').style.display = "none";
    document.querySelector('.close').style.display = "none";
    document.querySelector('.controls').style.display = "none";
    document.querySelector('.bg-modal2').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
}, 60000);
})();
