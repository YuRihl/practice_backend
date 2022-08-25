import type { Photo } from '../entities';

export default abstract class PhotoService {

  public abstract findOnePhoto(id: number): Promise<Photo>;
  public abstract createUserPhoto(userId: number, buffer: Buffer, size: number, mimetype: string): Promise<Photo>

}
