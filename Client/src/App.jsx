import { useEffect, useState } from 'react';
import './styles/cards.css';

export const App = () => {
    const [Posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', body: '' });

    const getPosts = () => {
        fetch('http://localhost:3000/api/post')
            .then((res) => res.json())
            .then((data) => setPosts(data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Verificar si alguno de los campos está vacío
        if (formData.title.trim() === '' || formData.body.trim() === '') {
            alert('Please fill in all fields');
            return; // Detener el proceso de envío del formulario
        }
    
        fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts([data, ...Posts]); // Agrega el nuevo post a la lista de posts
                setFormData({ title: '', body: '' }); // Limpia el formulario después de enviar
            })
            .catch((error) => {
                console.error('Error:', error);
                // Manejar errores de la solicitud aquí
            });
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <h1>Welcome to NotesApp 2024</h1>

            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    placeholder='Enter the title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='body'>Body</label>
                <textarea
                    autoCapitalize='words'
                    type='text'
                    placeholder='Enter the body'
                    name='body'
                    value={formData.body}
                    onChange={handleChange}
                />

                <button type='submit'>Post</button>
            </form>

            <div className='container'>
                {Posts.map(({ body, id, title }) => {
                    return (
                        <div className='card' key={id}>
                            <h4 className='title'>{title}</h4>
                            <p className='body'>{body}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
