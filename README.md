<html lang="en">
<body>

<header>
  <h1>Protecting Paws User DashBoard</h1>
  <p>A project designed to a system built for real-time object recognition and annotation in construction sites where an animal or bird may enter and pose a risk. It uses computer vision models to identify animals, birds, and people in a video stream or camera.</p>
    <p>The software sends out warnings and notifications when it detects specific objects of interest. It also supports interaction with a dashboard, which allows for quick viewing of discovered objects.
</p>
</header>

<div class="container">

  <h2>Installation</h2>

  <h3>Node.js (for React.JS)</h3>
  <ol>
    <li>Install Node.js from <a href="https://nodejs.org/">https://nodejs.org/</a>.</li>
    <li>Clone the repository:</li>
    <pre><code>git clone https://github.com/dhrumilshah57/Protecting_Paws_User.git</code></pre>
    <li>Navigate to the JavaScript directory:</li>
    <pre><code>cd Protecting_Paws_User/javascript</code></pre>
    <li>Install dependencies:</li>
    <pre><code>npm install</code></pre>
  </ol>

  <h3>Python</h3>
  <ol>
    <li>Clone the repository:</li>
    <pre><code>git clone https://github.com/dhrumilshah57/Protecting_Paws_User.git</code></pre>
    <li>Navigate to the Python directory:</li>
    <pre><code>cd Protecting_Paws_User/python</code></pre>
    <li>Install dependencies:</li>
    <pre><code>pip install -r requirements.txt</code></pre>
  </ol>

   <h3>AWS IVS Player</h3>
  <ol>
    <li>Sign in to the AWS Management Console and open the Amazon IVS console at <a href="https://console.aws.amazon.com/ivs/">https://console.aws.amazon.com/ivs/</a>.</li>
    <li>Create a new channel and configure your stream settings.</li>
    <li>Retrieve your playback URL from the Amazon IVS console.</li>
    <li>Integrate the AWS IVS Player into your project:
      <ul>
        <li>Include the AWS IVS Player SDK in your HTML file:</li>
        <pre><code>&lt;script src="https://player.live-video.net/1.4.0/amazon-ivs-player.min.js"&gt;&lt;/script&gt;</code></pre>
        <li>Initialize the player in your JavaScript file:</li>
        <pre><code>// Create a new IVSPlayer object
const player = new IVSPlayer();

// Attach the player to a video element
player.attachHTMLVideoElement(document.getElementById('video-player'));

// Load your stream URL
player.load('YOUR_STREAM_URL');</code></pre>
      </ul>
    </li>
  </ol>

<h2>How to Run the code</h2>

  <h3>React.JS</h3>
  <p>Once the code is clone and installed all dependencies.</p>
  <p>Open App.js file which can be found from directory.</p>
  <p>Write the below code in terminal</p>
  <pre><code>npm start</code></pre>
  <p>Hurray! your code is running.</p>

  <h3>Python</h3>
  <p>Ensure Python is installed on your system.(version 3.6 and above)</p>
  <p>AWS Account Setup for S3 Storage</p>
  <p>Twilio Account Setup for SMS Notifications</p>
  <p>Run the backend script MVP_alert_objectdifferentiation_aws_twilio.py.</p>

  <h2>Features</h2>

<img src="https://github.com/dhrumilshah57/Protecting_Paws_User/blob/master/Screenshots_github/Screenshot%202024-04-04%20163153.png"/>

  <h3>Live Video Feature</h3>
  <p>To access the live video feature:</p>
  <ol>
    <li>Open the dashboard application.</li>
    <li>Click on the "Live Video" tab.</li>
    <li>The live video stream will be displayed using the AWS IVS Player.</li>
  </ol>

  <h3>Animal Detection Photos</h3>
  <p>To view past photos:</p>
  <ol>
    <li>Navigate to the "Animal Detection Photos" section of the dashboard application.</li>
    <li>Select the photos which is displayed in the table with date and time.</li>
    <li>Click on any Photo it will display the photo.</li>
  </ol>

  <h3>Python Files</h3>
  <p>The Python files in this project use YOLO (You Only Look Once) as a machine learning algorithm to detect animals, birds, and humans. Additionally, they perform the following actions:</p>
  <ol>
    <li><strong>Send SMS:</strong> When an animal or bird is detected, an SMS is sent to the mobile device.</li>
    <li><strong>Alarm Ringing:</strong> An alarm rings when an animal or bird is detected.</li>
    <li><strong>Photo Capture:</strong> The system captures a photo of the detected animal or bird and stores it in an Amazon AWS S3 bucket.</li>
  </ol>

 <h2>Conclusion</h2>
  <p>Protecting Paws User Dashboard aims to revolutionize safety and monitoring in construction sites and similar environments where the presence of animals or birds can pose risks to both workers and wildlife. By leveraging cutting-edge technologies such as computer vision and real-time alerts, our project empowers users to proactively identify and address potential hazards, ensuring the safety of all stakeholders involved.</p>

  <p>We believe that with your contribution and support, Protecting Paws can make a significant difference in enhancing safety standards across various industries. Whether you're a developer, designer, domain expert, or simply passionate about leveraging technology for social good, there are numerous ways you can contribute to our project and help us achieve our mission.</p>
  <h3>Get Involved!</h3>
  <p>Join our community today and become a part of the Protecting Paws movement:</p>
  <ul>
    <li>Contribute code enhancements or bug fixes by submitting pull requests.</li>
    <li>Share your ideas and feedback on our project roadmap by opening issues.</li>
    <li>Spread the word about Protecting Paws on social media and among your peers.</li>
    <li>Collaborate with us to explore new features and use cases for our technology.</li>
  </ul>

  <p>Together, we can build a safer and more sustainable future for both humans and wildlife. Let's make a difference, one paw at a time!</p>
<img src="https://github.com/dhrumilshah57/Protecting_Paws_User/blob/master/Screenshots_github/thankyou_img.png"/>

</div>

</body>
</html>
