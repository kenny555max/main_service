import { ErrorHandler } from '../utils/error-manager';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly logger: Logger) {}
  /**
   * Uploads an image file.
   *
   file - the file to be uploaded
   * @return {Promise<UploadApiResponse | UploadApiErrorResponse>} a promise that resolves to the upload response or rejects with an error
   */
  async uploadImage(file): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);

      // toStream(file.buffer).pipe(upload)
    });
  }

  /**
   * Uploads a base64 image.
   *
   * @param {string} base64Data - The base64 data of the image.
   * @return {string} The secure URL of the uploaded image, or null if the upload failed.
   */
  async uploadBase64Image(
    base64Data: string,
    config?: { maxAllowedFileSize?: number; public_id?: string },
  ): Promise<string | null> {
    try {
      if (base64Data) {
        const uploadResponse = await v2.uploader.upload(
          `data:text/plain;base64,${base64Data}`,
          {
            resource_type: 'auto',
            allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
            chunk_size: config?.maxAllowedFileSize,
          },
          (error, resp) => {
            if (error) {
              throw new UnprocessableEntityException(
                'Failed to upload image, please try again.',
              );
            } else {
              console.log(resp);
            }
          },
        );

        if (!uploadResponse) {
          throw new UnprocessableEntityException(
            'Unable to process image, please try again.',
          );
        }

        return uploadResponse?.secure_url;
      } else {
        throw new BadRequestException('Please upload a valid file.');
      }
    } catch (error) {
      if (
        error?.error?.code === 'ENOENT' ||
        error?.error?.code === 'ENAMETOOLONG'
      ) {
        throw new UnprocessableEntityException(
          'Unable to process image, please try again.',
        );
      }
      ErrorHandler.handleError('CloudinaryService.uploadBase64Image', error);
    }
  }
}
