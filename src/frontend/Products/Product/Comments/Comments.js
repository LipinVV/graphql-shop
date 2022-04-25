import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {
    ADD_COMMENT_TO_PRODUCT,
    DELETE_COMMENT_IN_PRODUCT,
    UPDATE_COMMENT_IN_PRODUCT
} from "../../../../graphql/mutations/mutations";
import {GET_FILTERED_PRODUCT} from "../../../../graphql/queries/queries";
import './comments.css';

export const Comments = ({comments, productId, id}) => {
    const [commentary, setCommentary] = useState('');
    const [startComment, setStartComment] = useState(false);
    const [newComments, setNewComments] = useState([]);

    useEffect(() => {
        setNewComments(comments);
    }, [comments])

    const [addComment] = useMutation(ADD_COMMENT_TO_PRODUCT);

    const writeCommentHandler = async () => {
        try {
            await addComment({
                variables: {
                    productId: productId,
                    text: commentary
                },
                refetchQueries: [{query: GET_FILTERED_PRODUCT, variables: {id}}]
            })
        } catch (error) {
            console.error(error)
        }
    }

    const [edit, setEdit] = useState(false);
    const [updateComment] = useMutation(UPDATE_COMMENT_IN_PRODUCT);

    const updateCommentHandler = async (commentId) => {
        try {
            await updateComment({
                variables: {
                    commentId: commentId,
                    productId: productId,
                    text: commentary
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const [deleteComment] = useMutation(DELETE_COMMENT_IN_PRODUCT);

    const deleteCommentHandler = async (commentId) => {
        try {
            await deleteComment({
                variables: {
                    commentId: commentId,
                    productId: productId,
                },
                refetchQueries: [{query: GET_FILTERED_PRODUCT, variables: {id}}]
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='comments'>
            {newComments?.map(comment => {
                return (
                    <div key={comment.id} className='comment'>
                        <div className='comment__text'>{comment.text}</div>
                        {comment.edit === true && <div className='comment__input'>
                            <input type='text'
                                   value={commentary}
                                   onChange={(event) => setCommentary(event.target.value)}/>
                        </div>}
                        {edit === false &&
                            <button
                                className='comment__button comment__button_edit'
                                value={comment.id}
                                type='button'
                                onClick={(event) => {
                                    const { value } = event.target;
                                    if (value === comment.id) {
                                        setEdit(!edit);
                                        setCommentary(comment.text);
                                        setNewComments(newComments.map(comment => {
                                            const { value } = event.target;
                                            if (comment.id === value) {
                                                return {
                                                    ...comment, edit: true
                                                }
                                            }
                                            return comment;
                                        }))
                                    }
                                }}>edit
                            </button>}
                        {edit !== true && <button
                            className='comment__button comment__button_delete'
                            type='button'
                            onClick={() => {
                                void deleteCommentHandler(comment.id);
                            }}>delete
                        </button>}
                        {comment.edit === true && <button
                            className='comment__button comment__button_confirm'
                            type='button'
                            onClick={() => {
                                setEdit(!edit);
                                void updateCommentHandler(comment.id);
                            }}>confirm
                        </button>}
                    </div>
                )
            })}
            {startComment === true && <div>
                <input type='text'
                       value={commentary.text}
                       onChange={(event) => setCommentary(event.target.value)}/>
            </div>}
            {startComment === false ?
                <button
                    className='comment__button comment__button_add'
                    type='button'
                    onClick={() => setStartComment(!startComment)}>add comment
                </button> :
                <button
                    className='comment__button comment__button_submit'
                    type='button'
                    onClick={() => {
                        setStartComment(!startComment);
                        void writeCommentHandler();
                    }}>submit
                </button>}
        </div>
    )
}