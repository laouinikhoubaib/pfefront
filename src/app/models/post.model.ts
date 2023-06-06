
import {PostComment} from './postComment.model';
import {PostLike} from './postLike.model';
import {User} from './user.model';
import {PostMedia} from './PostMedia.model';

export class Post {
    postId: number;
    body: string;
    createdAt: string;
    nb_Signal: number;
    nb_etoil: number;
    postTitle: string;
    postComments: PostComment[];
    postLikes: PostLike[];
    user: User;
    medias: PostMedia[];
}
