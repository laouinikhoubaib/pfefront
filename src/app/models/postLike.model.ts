import {Post} from './post.model';
import {User} from './user.model';

export class PostLike {
    postLikeId: number;
    isLiked: string;
    likedAt: string;
    user: User;
}
