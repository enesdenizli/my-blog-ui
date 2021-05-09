import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import superagent from 'superagent'
import Button from '@material-ui/core/Button'
import Typography from "@material-ui/core/Typography";
import {Box, TextField} from "@material-ui/core";

const Main = () => {
    const [ posts, setPosts ] = useState([])
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const retrievePosts = async () => {
        const { body } = await superagent.get('http://localhost:3001/posts')
        setPosts(body)
    }

    const deletePost = async id => {
        await superagent.delete(`http://localhost:3001/delete?id=${id}`)
        retrievePosts()
    }

    const createPost = async (title, content) => {
        await superagent.post('http://localhost:3001/create').send({
            body: { title, content }
        })
        retrievePosts()
    }

    const editPost = async id => {
        await superagent.patch(`http://localhost:3001/edit?id=${id}`).send({
            title: 'asdfasdfzzzzzzzzzzasf',
            content: 'asdasdasdasdaszzzzzzzzzzzzzzzzzzdas',
        })
        retrievePosts()
    }

    useEffect(() => {
        retrievePosts()
    }, [])

    const buttonStyle = {
        margin: '10px',
        justifyContent: 'center'
    }

    const titleStyle = {
        textAlign: 'center',
        margin: '30px',
        fontSize: '40px',
    }

    const contentStyle = {
        textAlign: 'center',
        margin: '30px',
        fontSize: '20px',
    }

    const dateStyle = {
        textAlign: 'right',
        margin: '30px',
        fontSize: '10px',
        fontStyle : 'italic',
    }

    const paperStyle = {
        padding: '5px',
        margin: '10px',
    }

    const headerStyle = {
        textAlign: 'center',
        margin: '10px',
        fontSize: '70px',
    }

    return (
        <div>
            <Paper style={paperStyle} elevation={10}>
                <Typography style={ headerStyle }>
                    MY BLOG
                </Typography>
                {/*<TextField value={title} onChange={event => event.target.value} />*/}
                <Box textAlign='center'>
                    <Button style={ buttonStyle } variant="contained" color="primary" onClick={() => createPost()}>
                        Create a new post!
                    </Button>
                </Box>
            </Paper>
            {posts.map(post => {
                return (
                    <Paper style={ paperStyle } elevation={10}>
                        <Typography style={ titleStyle }>
                            {post.title}
                            <Typography style={ contentStyle }>
                                {post.content}
                            </Typography>
                            <Typography style={ dateStyle }>
                                {post.postDate}
                            </Typography>
                        </Typography>
                        <Box textAlign='center'>
                            <Button style={ buttonStyle } variant="contained" color="primary" onClick={() => deletePost(post._id)}>
                                DELETE
                            </Button>
                            <Button style={ buttonStyle } variant="contained" color="primary" onClick={() => editPost(post._id)}>
                                EDIT
                            </Button>
                        </Box>
                    </Paper>
                )
            })}
        </div>
    )
}

export default Main