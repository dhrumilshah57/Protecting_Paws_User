import warnings

# Filter out specific warnings
warnings.filterwarnings("ignore", message="Your inference package version.*")
warnings.filterwarnings("ignore", message="BoxAnnotator is deprecated.*")
warnings.filterwarnings("ignore", message="BoxAnnotator is deprecated.*")
warnings.filterwarnings("ignore", message="Specified provider.*")
warnings.filterwarnings("ignore", message="SupervisionWarnings:.*")
warnings.filterwarnings("ignore", message="SupervisionWarnings: __call__ is deprecated.*")
import cv2
import winsound
import time
from twilio.rest import Client
from inference import InferencePipeline
from inference.core.interfaces.camera.entities import VideoFrame
import supervision as sv
import os
import boto3
import socket
import datetime
from botocore.exceptions import NoCredentialsError

account_sid = 'AC4bd4c4be9835e91fb81588a803d97420'
auth_token = '01cadb70a0895287bd515f7d01f7a6be'
twilio_phone_number = '+15162724269'
target_phone_number = '+13828800396'

# AWS credentials
AWS_ACCESS_KEY_ID = 'AKIA5FTZBV5V5QLBMG7W'
AWS_SECRET_ACCESS_KEY = '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'
AWS_REGION = 'us-east-2'
BUCKET_NAME = 'animalpicsdata'

# Initialize S3 client
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                  region_name=AWS_REGION)

client = Client(account_sid, auth_token)

last_animal_detection_time = 0
animal_detection_interval = 2  # 20 minutes in seconds
last_image_save_time = 0
animal_detection_interval_sms = 200

# Directory to save images
image_save_path = 'detected_images/'


def generate_camera_id():
    # Get the hostname of the machine
    hostname = socket.gethostname()
    # Extract the laptop name and use it as the camera ID
    laptop_name = hostname.split('-')[0]  # Assuming the laptop name is before the first hyphen
    return laptop_name + '_Camera_1'


def upload_to_s3(local_file, s3_file):
    """
    Upload a file to an S3 bucket
    """
    try:
        s3.upload_file(local_file, BUCKET_NAME, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


# Function to play alert sound
def play_alert_sound():
    frequency = 2500  # Set frequency to 2500 Hertz
    duration_ms = 1000  # Set duration to 1000 milliseconds (1 second)

    winsound.Beep(frequency, duration_ms)


def send_sms(message):
    message = client.messages.create(
        body=message,
        from_=twilio_phone_number,
        to=target_phone_number
    )
    print(f"SMS sent! SID: {message.sid}")


def notify_detection(object_type, frame, camera_id):
    global last_animal_detection_time
    global last_image_save_time

    current_time = time.time()
    if object_type == "Animal/Bird":
        play_alert_sound()
        play_alert_sound()
        play_alert_sound()
        play_alert_sound()
        play_alert_sound()

    if object_type == "Animal/Bird" and (current_time - last_animal_detection_time) >= animal_detection_interval_sms:
        message = f"{object_type} motion detected! Rescue/take necessary action"
        send_sms(message)
        last_animal_detection_time = current_time
    else:
        if object_type != "Motion":
            print(f"{object_type} motion detected!")
    if object_type == "Animal/Bird" and (current_time - last_image_save_time) >= animal_detection_interval:
        # Save image when animal/bird is detected and every 20 minutes
        if not os.path.exists(image_save_path):
            os.makedirs(image_save_path)
        current_time1 = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        image_name = f"animal_detection_{current_time1}_{camera_id}.jpg"
        cv2.imwrite(os.path.join(image_save_path, image_name), frame)
        print(f"Image saved: {os.path.join(image_save_path, image_name)}")
        # Upload image to S3
        upload_to_s3(os.path.join(image_save_path, image_name), image_name)
        last_image_save_time = current_time


annotator = sv.BoxAnnotator()


def my_custom_sink(predictions: dict, video_frame: VideoFrame):
    # get the text labels for each prediction
    labels = [p["class"] for p in predictions["predictions"]]
    # print("Predictions:", labels)
    # load our predictions into the Supervision Detections api
    detections = sv.Detections.from_inference(predictions)
    # annotate the frame using our supervision annotator, the video_frame, the predictions (as supervision Detections), and the prediction labels
    image = annotator.annotate(
        scene=video_frame.image.copy(), detections=detections, labels=labels
    )
    # display the annotated image
    cv2.imshow("Predictions", image)
    cv2.waitKey(10)
    animals = ["dog", "horse", "cat", "bird", "lion", "tiger", "elephant", "monkey", "bear", "chimpanzee", "cow",
               "buffalo", "donkey", "rabbit", "turtle", "tortoise"]
    human = ["person", "male", "female"]
    for label in labels:
        if label in animals:
            notify_detection("Animal/Bird", image, camera_id)
        elif label in human:
            notify_detection("Human", image, camera_id)


def integrate_inference_pipeline(video_source):
    pipeline = InferencePipeline.init(
        model_id="yolov8x-1280",
        video_reference=video_source,
        on_prediction=my_custom_sink,
    )
    try:
        pipeline.start()
        pipeline.join()
    except KeyboardInterrupt:
        print("\nIntegration terminated by user.")
    finally:
        cv2.destroyAllWindows()  # Close any open windows


if __name__ == "__main__":
    try:
        print("Object Differentiation...\n")
        print("Select an option:")
        print("1. Open Webcam")
        print("2. Take Video Input")
        print("3. Open Phone camera")

        choice = input("Enter the option (1 or 2 or 3): ")
        camera_id = generate_camera_id()
        print(f"Camera ID: {camera_id}")

        if choice == '1':
            integrate_inference_pipeline(0)  # Open Webcam
        elif choice == '2':
            integrate_inference_pipeline(
                r"D:\University of windsor MAC Documents\ASE\ASE project (animal bird )\prototype\bird.mp4")
        elif choice == '3':
            stream_url = "https://8c781dc5e91e.us-east-1.playback.live-video.net/api/video/v1/us-east-1.905418223467.channel.7FuWjmSBM0Kn.m3u8"
            camera_id = "Your_Camera_ID"
            integrate_inference_pipeline(stream_url)
        else:
            print("Invalid option. Exiting...")
    except KeyboardInterrupt:
        print("\nIntegration terminated by user.")
    finally:
        cv2.destroyAllWindows()
