import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) =>{
    const [nweet, setNweet] = useState("");
    const [attachement, setAttachement] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachementURL = "";
        if(attachement !== ""){
            const attahementRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attahementRef.putString(attachement,"data_url");
            attachementURL = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachementURL
        }
         await dbService.collection("nweets").add(nweetObj);
        setNweet(""); 
        setAttachement("");
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent;
            setAttachement(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachement = () => setAttachement("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input className="factoryInput__arrow" type="submit" value="Nweet" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" onChange={onFileChange} type="file" accept="image/*" style={{opacity: 0,}}/>
            {attachement && ( 
                <div className="factoryForm__attachment">
                    <img src={attachement}  style={{backgroundImage: attachement,}}/>
                    <div className="factoryForm__clear" onClick={onClearAttachement}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;