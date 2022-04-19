import {useState} from "react";
import {useMutation} from "@apollo/client";
import {UPDATE_PRODUCT_COMMENT} from "../../../../graphql/mutations/mutations";

export const Comments = ({comments, productId}) => {
    const [commentary, setCommentary] = useState('');
    const [startComment, setStartComment] = useState(false);

    const [addComment] =  useMutation(UPDATE_PRODUCT_COMMENT);
    const handler = async () => {
        await addComment({
            variables: {
                productId: productId,
                text: commentary
            }
        })
    }

    return (
        <div>
            {comments?.map(comment => {
                return (
                    <div key={comment.id}>
                        <div>{comment.text}</div>
                    </div>
                )
            })}
            {startComment === true && <div><input type='text' value={commentary.text}
                                                  onChange={(event) => setCommentary(event.target.value)}/></div>}
            {startComment === false ?
                <button type='button' onClick={() => setStartComment(!startComment)}>add comment</button> :
                <button type='button' onClick={() => {
                    setStartComment(!startComment);
                    handler();
                }}>submit</button>}
        </div>
    )
}