import React from 'react';

export function AddNewList() {
    return (
        <main>
            <section class="newList">
                <h1>Add New List</h1>
                <form>
                    <div class="field">
                        <label for="listName">List Name:</label><input type="text" id="listName" name="listName" />
                    </div>
                    <div class="field">
                        <label for="imageToUpload">Select image to upload:</label><input type="file" id="imageToUpload" name="imageToUpload" accept="image/*" />
                    </div>
                    <div class="field">
                        <textarea id="description" name="description" placeholder="Description (optional)..." rows="4" cols="40"></textarea>
                    </div>
                    <p>Choose which logs/things to include:</p>
                    <div class="field">
                        <input class="button" type="submit" value="Create List" />
                    </div>
                </form>
            </section>
        </main>
    )
}