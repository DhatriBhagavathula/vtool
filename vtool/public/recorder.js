document.addEventListener("DOMContentLoaded", () => {
  const startVideoBtn = document.getElementById("start-video-btn");
  const stopVideoBtn = document.getElementById("stop-video-btn");
  const videoPreview = document.getElementById("video-preview");
  const filterSelect = document.getElementById("filter-select");
  const recordedVideos = document.getElementById("recorded-videos");

  let mediaRecorder;
  let recordedChunks = [];

  startVideoBtn.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoPreview.srcObject = stream;
    videoPreview.style.display = "block";
    videoPreview.style.width = "200px";
    videoPreview.style.height = "150px";
    videoPreview.style.borderRadius = "8px";
    videoPreview.style.objectFit = "cover";
    videoPreview.style.border = "1px solid #ccc";
    videoPreview.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = function (event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = function () {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      saveRecordedVideo(blob);  // only call save function once with the final blob
    };

    mediaRecorder.start();
    startVideoBtn.disabled = true;
    stopVideoBtn.disabled = false;
  });

  // Stop recording & cleanup
  stopVideoBtn.addEventListener("click", () => {
    mediaRecorder.stop();
    const tracks = videoPreview.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoPreview.srcObject = null;
    videoPreview.style.display = "none";

    startVideoBtn.disabled = false;
    stopVideoBtn.disabled = true;
  });

  // Function to save recorded video
  // Function to save recorded video and display it below
function saveRecordedVideo(blob) {
  const videoUrl = URL.createObjectURL(blob);  // Create video URL from blob

  const videoElement = document.createElement("video");
  videoElement.src = videoUrl;
  videoElement.controls = true;  // Allow play/pause/volume control
  videoElement.style.width = "300px";
  videoElement.style.height = "auto";
  videoElement.style.objectFit = "cover";
  videoElement.style.borderRadius = "6px";
  videoElement.style.margin = "10px";
  videoElement.style.border = "1px solid #aaa";
  videoElement.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
  videoElement.style.filter = filterSelect.value;

  videoElement.style.transform = "scaleX(-1)"; 
  
  // Create a wrapper for the video element
  const videoWrapper = document.createElement("div");
  videoWrapper.classList.add("video-wrapper");
  videoWrapper.style.marginBottom = "10px";
  
  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginTop = "8px";
  deleteButton.style.padding = "6px 12px";
  deleteButton.style.fontSize = "14px";
  deleteButton.style.border = "1px solid #c00";
  deleteButton.style.backgroundColor = "#fdd";
  deleteButton.style.color = "#c00";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.borderRadius = "4px";
  deleteButton.style.display = "block";
  deleteButton.style.marginLeft = "auto";
  deleteButton.style.marginRight = "auto";

  // Attach delete functionality to the delete button
  deleteButton.onclick = () => {
    recordedVideos.removeChild(videoWrapper);
  };

  // Append the video and delete button to the wrapper
  videoWrapper.appendChild(videoElement);
  videoWrapper.appendChild(deleteButton);

  // Append the wrapper to the recorded videos section
  recordedVideos.appendChild(videoWrapper);
}

  // Process audio for speech-to-text and feedback
  function processVideoAudio(videoBlob) {
    const videoURL = URL.createObjectURL(videoBlob);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Speech-to-text output:", transcript);

      const feedbackText = generateFeedback(transcript, currentQuestionIndex);
      displayVideoWithFeedback(videoURL, feedbackText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      displayVideoWithFeedback(videoURL, "Couldn't process audio. Try speaking clearly.");
    };

    recognition.start();
  }

  // Apply filters to all recorded videos
  filterSelect.addEventListener("change", () => {
    document.querySelectorAll("#recorded-videos video").forEach(video => {
      video.style.filter = filterSelect.value;
    });
  });

  function displayVideoWithFeedback(videoURL, feedbackText) {
    const feedbackBox = document.getElementById("feedback-box");
    feedbackBox.innerText = feedbackText;
    feedbackBox.style.display = "block";
  }
});
