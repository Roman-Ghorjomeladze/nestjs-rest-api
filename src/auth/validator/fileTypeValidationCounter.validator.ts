import { FileValidator } from '@nestjs/common';

export class MinFileCountValidator extends FileValidator {
  allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/avif'];
  twentyMB = 20 * 1024 * 1024;
  constructor() {
    super({});
  }

  isValid(files?: {
    images: Express.Multer.File[];
    avatar: Express.Multer.File[];
  }): boolean | Promise<boolean> {
    if (files?.images?.length < 4) return false;
    let mimeTypesAreValid = true;
    files?.images?.forEach((file) => {
      if (mimeTypesAreValid && !this.allowedMimeTypes.includes(file.mimetype)) {
        mimeTypesAreValid = false;
      }
    });
    const avatar = files.avatar && files.avatar[0];
    if (avatar && !this.allowedMimeTypes.includes(avatar.mimetype)) {
      return false;
    }
    return mimeTypesAreValid;
  }

  buildErrorMessage(): string {
    return `You should upload at least 4 image inside images key, each of them should have mime type from the following list [image/jpeg, image/jpg, image/png, image/avif]`;
  }
}
