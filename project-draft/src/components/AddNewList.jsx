import React from 'react';

export function AddNewList() {
    return (
        <main>
            <section className="newList">
                <h1>Add New List</h1>
                <form>
                    <div className="field">
                        <label for="listName">List Name:</label><input type="text" id="listName" name="listName" />
                    </div>
                    <div className="field">
                        <label for="imageToUpload">Select image to upload:</label><input type="file" id="imageToUpload" name="imageToUpload" accept="image/*" />
                    </div>
                    <div className="field">
                        <textarea id="description" name="description" placeholder="Description (optional)..." rows="4" cols="40"></textarea>
                    </div>
                    <p>Choose which logs/things to include:</p>
                    <div className="field">
                        <input className="button" type="submit" value="Create List" />
                    </div>
                </form>
            </section>
        </main>
    )
}