import { useEffect, useState, useRef } from "react";
import MerchandDataService from "../../services/MerchandService";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

function MerchandAbout() {
    const [informations, setInformations] = useState([]);
    const [user, setUser] = useState(null);

    const classes = useStyles();

    const getInformations = async () => {
        MerchandDataService.getUserInfos(user)
        .then(response => {
            setInformations(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const currentUser = JSON.parse(loggedInUser);
          setUser(currentUser);
          getInformations();
        }
    }, []);
    
    const deleteCredentials = () => {
        MerchandDataService.deleteCredentials(user)
        .then(response => {
            setInformations(response.informations);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const updateCredentials = () => {
        MerchandDataService.updateCredentials(user)
        .then(response => {
            setInformations(response.informations);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <>
            <h1 className="text-center">Mon espace</h1>
            <div className="merchand-infos row mt-5">
                <div className="col-6 px-5 mb-5">
                    <div className="infos-block shadow">
                        <h2 className="text-center">Mes Informations</h2>
                        <div className="col-6 mt-5">
                            <ul className="left-list">
                                <li>username: </li>
                                <li>phone number: </li>
                                <li>contact: </li>
                                <li>society name: </li>
                                <li>kbis: </li>
                                <li>currency: </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            { user && 
                                <ul className="right-list">
                                    <li>{ informations.username }</li>
                                    <li>{ informations.phone }</li>
                                    <li>{ informations.contact }</li>
                                    <li>{ informations.societyName }</li>
                                    <li>{ informations.kbis }</li>
                                    <li>{ informations.currency }</li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="infos-block shadow">
                        <h2 className="text-center">Credentials</h2>
                        <div className="col-6 mt-5">
                            <ul className="left-list">
                                <li>token key: </li>
                                <li>secret key: </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            { user && 
                                <ul className="right-list">
                                    <li>{ informations.clientToken }</li>
                                    <li>{ informations.clientSecret }</li>
                                </ul>
                            }
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={deleteCredentials}
                            >Delete</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<RefreshIcon />}
                                onClick={updateCredentials}
                            >Regenerate</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MerchandAbout;