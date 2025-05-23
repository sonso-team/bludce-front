import type React from 'react';
import { useEffect, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { sendBill } from '../../../redux/store/bill/billThunks';

export const useBillInput = (onSuccess) => {
  const dispatch = useAppDispatch();
  const { billsData, isFetched } = useAppSelector(
    (state) => state.billsReducer,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (isFetched && billsData.length) {
      onSuccess?.();
    }
  }, [isFetched]);

  function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    dispatch(showLocalLoader());

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.9,
        fileType: 'image/jpeg',
      };

      // Сжимаем
      const compressedBlob = await imageCompression(file, options);

      // Преобразуем в DataURL
      const dataUrl = await imageCompression.getDataUrlFromFile(compressedBlob);

      // Конвертируем обратно в File
      const compressedFile = dataURLtoFile(dataUrl, file.name); // <= это твой файл

      const formData = new FormData();
      formData.append('file', compressedFile, file.name);

      await dispatch(sendBill(formData));
    } catch (error) {
      console.error('Ошибка при сжатии файла:', error);
    } finally {
      dispatch(hideLocalLoader());
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return {
    handleButtonClick,
    handleFileChange,
    inputRef,
  };
};
