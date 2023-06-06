import {User} from "./user.model";

export class PostComment {
    postCommentId: number;
    commentBody: string;
    commentedAt: string;
    user: User;
    postComments: PostComment[];
}
