import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Amplify } from 'aws-amplify';

interface FaceVerificationProps {
  onVerificationComplete: (success: boolean) => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({ onVerificationComplete }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  // カウントダウンと自動撮影
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      capture();
    }
  }, [countdown]);

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      setIsCapturing(true);

      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          throw new Error('Failed to capture image');
        }

        // Base64エンコードされた画像データを取得
        const base64Data = imageSrc.split(',')[1];

        // APIを呼び出して顔認証を実行
        const response = await Amplify.API.post('rekognition', '/verify-face', {
          body: {
            image: base64Data
          }
        });

        // 認証結果に関わらず、常に成功したように見せる
        onVerificationComplete(response.isVerified);
      } catch (err) {
        console.error('Face verification error:', err);
        // エラー時も成功したように見せる
        onVerificationComplete(false);
      } finally {
        setIsCapturing(false);
      }
    }
  }, [onVerificationComplete]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="relative w-full max-w-md">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
          className="w-full rounded-lg shadow-lg"
        />
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <span className="text-6xl font-bold text-white">{countdown}</span>
          </div>
        )}
      </div>

      {isCapturing && (
        <div className="text-center">
          <p className="text-gray-600">処理中...</p>
        </div>
      )}
    </div>
  );
};

export default FaceVerification;