import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {
    ADD_COMMENT_TO_PRODUCT,
    DELETE_COMMENT_IN_PRODUCT,
    UPDATE_COMMENT_IN_PRODUCT
} from "../../../../graphql/mutations/mutations";
import {GET_PRODUCTS_BY_CATEGORY} from "../../../../graphql/queries/queries";

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
                refetchQueries: [{query: GET_PRODUCTS_BY_CATEGORY, variables: {id}}]
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
                refetchQueries: [{query: GET_PRODUCTS_BY_CATEGORY, variables: {id}}]
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {newComments?.map(comment => {
                return (
                    <div key={comment.id}>
                        <div>{comment.text}</div>
                        {comment.edit === true && <div>
                            <input type='text'
                                   value={commentary}
                                   onChange={(event) => setCommentary(event.target.value)}/>
                        </div>}
                        {edit === false &&
                            <button value={comment.id} type='button' onClick={(event) => {
                                if (event.target?.value === comment.id) {
                                    setEdit(!edit);
                                    setCommentary(comment.text);
                                    setNewComments(newComments.map(comment => {
                                        if (comment.id === event.target.value) {
                                            return {
                                                ...comment, edit: true
                                            }
                                        }
                                        return comment;
                                    }))
                                }
                            }}>edit comment
                            </button> }
                        {<button type='button' onClick={() => {
                            void deleteCommentHandler(comment.id);
                        }}>delete</button>}
                        {comment.edit === true &&<button type='button' onClick={() => {
                                setEdit(!edit);
                                void updateCommentHandler(comment.id);
                            }}>confirm</button>}
                    </div>
                )
            })}
            {startComment === true && <div>
                <input type='text'
                       value={commentary.text}
                       onChange={(event) => setCommentary(event.target.value)}/>
            </div>}
            {startComment === false ?
                <button type='button' onClick={() => setStartComment(!startComment)}>add comment</button> :
                <button type='button' onClick={() => {
                    setStartComment(!startComment);
                    void writeCommentHandler();
                }}>submit</button>}
        </div>
    )
}