import type { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

declare type ApplyDecorators = <TFunction extends () => void, Y>(target: object | TFunction,
  propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

declare type UploadFile = MulterField & { required?: boolean }

declare type ApiBodyProperty = Record<string, SchemaObject | ReferenceObject>

declare type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};
