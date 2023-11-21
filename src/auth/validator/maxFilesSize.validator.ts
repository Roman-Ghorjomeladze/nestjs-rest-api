import { FileValidator } from '@nestjs/common';
import { RegistrationFiles } from '../../common/types/shared';

export class MaxFileSizeValidator extends FileValidator {
  twentyMB = 20 * 1024 * 1024;
  size = 0;
  constructor() {
    super({});
  }

  isValid(files?: RegistrationFiles): boolean | Promise<boolean> {
    let size = 0;
    files?.images?.forEach((file) => {
      size += file.size;
    });
    const avatar = files.avatar && files.avatar[0];
    size += avatar?.size || 0;
    this.size = size;
    return this.twentyMB > size;
  }

  buildErrorMessage(): string {
    return `Maximum size of all attached images shouldn't be more than 20mb. Current size is ${Math.round(
      this.size / (1024 * 1024),
    )}`;
  }
}
