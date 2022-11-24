import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOnwer }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delte this nweet?");
        if(ok){
           await dbService.doc(`nweets/${nweetObj.id}`).delete();
           await storageService.refFromURL(nweetObj.attachementURL).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();
        console.log(nweetObj, newNweet)
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    }
    const onChange = (event) =>{
        const {target:{value}} = event;
        setNewNweet(value);
    }
    return (
        <div className="nweet">
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input type="text" placeholder="Edit your nweet" value={newNweet} required autoFocus onChange={onChange} className="formInput"/>
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <button onClick={toggleEditing} className="formBtn cancelBtn">Cancle</button>
                    </>
                ):(
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOnwer && (
                        <>
                            <div class="nweet__actions">
                                {nweetObj.attachementURL && <img src={nweetObj.attachementURL} width="50px/" height="50px" />}
                                <button onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></button>
                                <button onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></button>
                            </div>
                        </>
                    )}
                </>)
            }
        </div>
    );
};

export default Nweet;