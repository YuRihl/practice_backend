import type { Photo } from '../entities';

export default abstract class IPhotoService {

  public abstract findProductPhoto(id: number): Promise<Photo>;

}
