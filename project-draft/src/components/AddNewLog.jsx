import { React, useState } from 'react';

export function AddNewLog(props) {
    const { addLog } = props;

    const [logName, setName] = useState('');
    const [category, setCat] = useState('');
    const [date, setDate] = useState('');
    const [rating, setRating] = useState();
    const [img, setImg] = useState('');
    const [review, setReview] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleCatChange = (event) => {
        setCat(event.target.value)
    }
    const handleDateChange = (event) => {
        setDate(event.target.value)
    }
    const handleRatingChange = (event) => {
        setRating(event.target.value)
    }
    const handleImgChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
          setImg(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleReviewChange = (event) => {
        setReview(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting:", logName, category, date, rating, img, review);
        addLog(logName, category, date, rating, img, review);
        
        setName('');
        setCat('');
        setDate();
        setRating('');
        setImg();
        setReview('');
    }

    return (
        <div>
            <h2>Add New Log</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">Name:</label><input type="text" id="name" name="name" value={logName} onChange={handleNameChange} required />
                </div>
                <div className="field">
                    <label htmlFor="category">Category:</label><input type="text" id="category" name="category" value={category} onChange={handleCatChange} />
                </div>
                <div className="field">
                    <label htmlFor="date">Date:</label><input type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                </div>
                <div className="field">
                    <label htmlFor="rating">Rating:</label><input type="number" id="rating" name="rating" min="0" max="5" value={rating} onChange={handleRatingChange} />
                </div>
                <div className="field">
                    <label htmlFor="imageToUpload" className="image-label">Image:</label><input type="file" id="imageToUpload" name="imageToUpload" accept="image/*" onChange={handleImgChange} />
                </div>
                <div className="field">
                    <textarea id="review" name="review" placeholder="Add your review..." rows="4" cols="40" value={review} onChange={handleReviewChange}></textarea>
                </div>
                <div className="field">
                    <input className="button" type="submit" value="Add log" />
                </div>
            </form>
        </div>
    )
}