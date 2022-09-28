import React , {useState} from 'react';
import {useDispatch , useSelector} from 'react-redux'
import { addPost , deletePost , updatePost} from '../redux/postsSlice'

function Posts() {
    const [title , setTitle] = useState ('')
    const [description , setDescription] = useState ('')

    const [updatedtitle , setUpdatedTitle] = useState ('')
    const [updatedDescription , setUpdatedDescription] = useState ('')

    const [edit, setEdit] = useState(false)
    const [id ,setId]= useState(null)

    const dispatch = useDispatch()
    const posts = useSelector((state) =>state.posts.items)
    return (
        <div>
           <div className='form'>
            <input type='text' 
            value={title}
            placeholder='Enter Post Title'
             onChange={e => setTitle(e.target.value)} required/>

            <input type='text'
            value={description}
             placeholder='Enter Post Desc'
              onChange={e => setDescription(e.target.value)} required/>

            <button onClick={()=> {
                dispatch(addPost({id: posts.length + 1, title, description}))
                setTitle('')
                setDescription('')
            }}>Add Post</button>
            </div>

            <div className='posts'>
            {posts.length > 0 ? 
            posts.map((post) =>
            <div key={post.id} className='post'>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button onClick={()=>{ 
                    setEdit(true)
                     setId(post.id)
                     }}>Edit</button>
                <button 
                onClick={() => dispatch(deletePost(post.id))}>Delete</button>
                <br/>
                
                {edit && id == post.id &&(
                    <>
                    <input type='text' 
                    placeholder='updated Title'
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input type='text
                    ' placeholder='updated Description'
                    onChange={(e)=> setUpdatedDescription(e.target.value)}
                    />
                    <button onClick={() =>{
                        dispatch(updatePost({id : post.id , title:updatedtitle , description:updatedDescription}))
                        setEdit(false)
                    }}>Save</button>
                    </>
                )}
                </div>
                
                ): 'There is no posts'}
            </div> 
        </div>
    );
}

export default Posts;