import { authService, dbService } from "fbase";
import react, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    }
    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets")
                        .where("creatorId", "==", userObj.uid)
                        .orderBy("createdAt").get();
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    const onSubmit = async (event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({displayName:newDisplayName,});
            refreshUser();
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="Display Name" value={newDisplayName}/>
                <input type="submit" value ="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};