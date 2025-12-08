import React, { useState } from 'react';

export function AddNewList(props) {
    const { addList } = props;

    const [listName, setListName] = useState('');
    const [listImg, setListImg] = useState('');
    const [listDesc, setListDesc] = useState('');

    const handleNameChange = (event) => {
        setListName(event.target.value)
    }

    const handleImgChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = () => {
            const dataUrl = reader.result;
            setListImg(dataUrl);
        };

        reader.readAsDataURL(file);
        setListImg(event.target.value)
    }

    const handleDescChange = (event) => {
        setListDesc(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addList(listName, listImg, listDesc);

        setListName('');
        setListImg('');
        setListDesc('');
    }
   
    return (
        <main>
            <section className="newList">
                <h1>Create a New List</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="listName">List Name:</label><input type="text" id="listName" name="listName" onChange={handleNameChange} required />
                    </div>
                    <div className="field">
                        <label htmlFor="imageToUpload" className='image-label'>Upload an image:</label><input type="file" id="imageToUpload" name="imageToUpload" accept="image/*" onChange={handleImgChange} />
                    </div>
                    <div className="field">
                        <textarea id="description" name="description" placeholder="Description (optional)..." rows="4" cols="40" onChange={handleDescChange}></textarea>
                    </div>
                    <div className="field">
                    <label htmlFor="description"></label><input className="button" type="submit" value="Create List" />
                    </div>
                </form>
            </section>
        </main>
    )
}