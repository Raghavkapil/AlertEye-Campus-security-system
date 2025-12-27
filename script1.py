from ultralytics import YOLO
import cv2

from ultralytics import YOLO

model = YOLO(
    r"D:/Capstone/Dataset_yolo 2/alertEye_models/alertEye_models/model/v_model.pt"
)

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Webcam not detected!")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)

    annotated_frame = results[0].plot()

    cv2.imshow("Violence Detection - Webcam", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
