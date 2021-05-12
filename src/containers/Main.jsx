import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import superagent from 'superagent'
import Button from '@material-ui/core/Button'
import Typography from "@material-ui/core/Typography";
import {Box, makeStyles, Modal, TextField} from "@material-ui/core";

const Main = () => {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [open, setOpen] = React.useState(false)
    const [titleEditor, setTitleEditor] = useState('')
    const [contentEditor, setContentEditor] = useState('')
    const [idEditor, setIdEditor] = useState('')

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (oldId, oldTitle, oldContent) => {
        setIdEditor(oldId)
        setTitleEditor(oldTitle)
        setContentEditor(oldContent)
        setOpen(true)
    }

    const retrievePosts = async () => {
        const {body} = await superagent.get('http://localhost:3001/posts')
        setPosts(body)
    }

    const deletePost = async id => {
        await superagent.delete(`http://localhost:3001/delete?id=${id}`)
        retrievePosts()
    }

    const createPost = async () => {
        await superagent.post('http://localhost:3001/create').send({
            title, content
        })
        retrievePosts()
    }

    const editPost = async () => {
        await superagent.patch(`http://localhost:3001/edit?id=${idEditor}`).send({
            title: titleEditor, content: contentEditor
        })
        setOpen(false)
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
        fontStyle: 'italic',
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

    const modalStyle = {
        width: '500px',
        top: '30%',
        left: '30%',
        position: 'absolute',
        height: '350px'
    }

    const textFieldStyle = {
        margin: '10px',
        marginTop: '20px',
        position: 'center',
        width: '480px',
    }

    return (
        <div>
            <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            onClose={handleClose}>
            <Paper style={modalStyle}>
                <div >
                    <TextField style={textFieldStyle}
                        label="Title"
                        multiline
                        rows={2}
                        variant="outlined"
                        value={titleEditor}
                        onChange={event => setTitleEditor(event.target.value)}
                    />
                </div>
                <div>
                    <TextField  style={textFieldStyle}
                    label="Content"
                    multiline
                    rows={6}
                    variant="outlined"
                    value={contentEditor}
                    onChange={event => setContentEditor(event.target.value)}
                />
                </div>
                <Button style={buttonStyle} variant="contained" color="primary" onClick={() => editPost()}>
                    SUBMIT
                </Button>
            </Paper>
        </Modal>
            <Paper style={paperStyle} elevation={10}>
                <Typography style={headerStyle}>
                    MY BLOG
                </Typography>
            </Paper>
            <Paper style={paperStyle} elevation={10}>
                <Box textAlign='center'>
                    <TextField label="Some cool title about yourself"
                               helperText="Please enter the title" style={{width: '300px'}} value={title}
                               onChange={event => setTitle(event.target.value)}/>
                    <br/>
                    <TextField label="Tell me about yourself"
                               helperText="Please enter the content" style={{width: '300px'}} value={content}
                               onChange={event => setContent(event.target.value)}/>
                    <br/>
                    <Button style={buttonStyle} variant="contained" color="primary" onClick={() => createPost()}>
                        Create a new post!
                    </Button>
                </Box>
            </Paper>
            {posts.map(post => {
                return (
                    <Paper key={post._id} elevation={10}>
                        <Typography style={titleStyle}>
                            {post.title}
                            <Typography style={contentStyle}>
                                {post.content}
                            </Typography>
                            <Typography style={dateStyle}>
                                {post.postDate}
                            </Typography>
                        </Typography>
                        <Box textAlign='center'>
                            <Button style={buttonStyle} variant="contained" color="primary"
                                    onClick={() => deletePost(post._id)}>
                                DELETE
                            </Button>
                            <Button style={buttonStyle} variant="contained" color="primary"
                                    onClick={() => handleOpen(post._id, post.title, post.content)}>
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