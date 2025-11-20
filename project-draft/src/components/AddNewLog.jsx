import React from 'react';

export function AddNewLog() {
    return (
        <form>
            <div class="field">
                <label for="title">Title:</label><input type="text" id="title" name="title" />
            </div>
            <div class="field">
                <label for="category">Category:</label><input type="text" id="category" name="category" />
            </div>
            <div class="field">
                <label for="date">Date:</label><input type="date" id="date" name="date" />
            </div>
            <div class="field">
                <label for="rating">Rating (0-100):</label><input type="number" id="rating" name="rating" min="0" max="100" />
            </div>
            <div class="field">
                <label for="imageToUpload">Select image to upload:</label><input type="file" id="imageToUpload" name="imageToUpload" accept="image/*" />
            </div>
            <div class="field">
                <textarea id="notes" name="notes" placeholder="Add notes..." rows="4" cols="40"></textarea>
            </div>
            <div class="field">
                <input class="button" type="submit" value="Add log" />
            </div>
        </form>
    )
}