import type { Photo } from '../entities';

interface IPhotoService {
    findProductPhoto(id: number): Promise<Photo>;
}

export default IPhotoService;
