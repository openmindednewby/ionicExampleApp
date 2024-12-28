import { isValueDefined } from 'src/app/utils/tools/isValueDefined';

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64Data] = dataUrl.split(',');
  const match = header.match(/:(.*?);/);
  if (!isValueDefined(match)) {
    throw new Error('Invalid data URL');
  }
  const mime = match![1];
  const byteString = atob(base64Data);
  const byteNumbers = new Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
}

export default dataUrlToBlob;
